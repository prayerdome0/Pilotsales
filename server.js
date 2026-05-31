const fs = require("node:fs");
const fsp = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const crypto = require("node:crypto");
const { spawn } = require("node:child_process");

const ROOT = __dirname;
const DATA_DIR = path.resolve(process.env.PSE_DATA_DIR || path.join(ROOT, "data"));
const JSON_PATH = path.join(DATA_DIR, "worker-registrations.json");
const CSV_PATH = path.join(DATA_DIR, "worker-registrations.csv");
const LIFE_INSURANCE_JSON_PATH = path.join(DATA_DIR, "life-insurance-applications.json");
const LIFE_INSURANCE_CSV_PATH = path.join(DATA_DIR, "life-insurance-applications.csv");
const SALES_APPLICANTS_JSON_PATH = path.join(DATA_DIR, "sales-applicants.json");
const SALES_APPLICANTS_CSV_PATH = path.join(DATA_DIR, "sales-applicants.csv");
const SALES_APPLICANT_SEQUENCE_PATH = path.join(DATA_DIR, "sales-applicant-sequence.json");
const DASHBOARD_STATUS_PATH = path.join(DATA_DIR, "sales-applicant-dashboard-status.json");
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "127.0.0.1";
const DATA_STORAGE_MODE = process.env.PSE_DATA_DIR ? "private" : "site-local";
const MAX_BODY_BYTES = Number(process.env.PSE_MAX_BODY_BYTES || 100_000);
const RATE_LIMIT_WINDOW_MS = Number(process.env.PSE_APPLICANT_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
const RATE_LIMIT_MAX = Number(process.env.PSE_APPLICANT_RATE_LIMIT_MAX || 5);
const DUPLICATE_WINDOW_MS = Number(process.env.PSE_APPLICANT_DUPLICATE_WINDOW_MS || 14 * 24 * 60 * 60 * 1000);
const DASHBOARD_BUILD_SCRIPT =
  process.env.PSE_APPLICANT_DASHBOARD_BUILD_SCRIPT ||
  "/srv/codex/repos/pse-dashboard/operations-hub/build_pse_sales_applicant_dashboard.mjs";
const NOTIFICATION_ENDPOINT =
  process.env.PSE_APPLICANT_NOTIFY_URL === "none"
    ? ""
    : process.env.PSE_APPLICANT_NOTIFY_URL || "http://127.0.0.1:8791/api/notifications";
const NOTIFICATION_ADMIN_TOKEN =
  process.env.PSE_APPLICANT_NOTIFY_TOKEN || process.env.PSE_ASSIGNMENT_ADMIN_TOKEN || "";
const NOTIFICATION_LOG_PATH = path.join(DATA_DIR, "sales-applicant-notifications.jsonl");
let registrationQueue = Promise.resolve();
let lifeInsuranceQueue = Promise.resolve();
let salesApplicantQueue = Promise.resolve();
let dashboardRefreshQueue = Promise.resolve();
const rateLimitBuckets = new Map();

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};
const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
};
const BLOCKED_PUBLIC_BASENAMES = new Set([
  "server.js",
  "package.json",
  "package-lock.json",
  "README.md",
  "LICENSE",
  "Caddyfile",
]);
const BLOCKED_PUBLIC_EXTENSIONS = new Set([
  ".csv",
  ".env",
  ".json",
  ".lock",
  ".log",
  ".map",
  ".md",
  ".mjs",
  ".toml",
  ".yaml",
  ".yml",
]);

function sendHealth(req, res) {
  const payload = JSON.stringify({
    ok: true,
    service: "pilot-sales-enterprise",
    dataStorage: DATA_STORAGE_MODE,
    uptimeSeconds: Math.round(process.uptime()),
  });

  res.writeHead(200, {
    ...SECURITY_HEADERS,
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  res.end(`${payload}\n`);
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    ...SECURITY_HEADERS,
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

function sendText(res, statusCode, message) {
  res.writeHead(statusCode, {
    ...SECURITY_HEADERS,
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(message);
}

function sendRedirect(res, location, statusCode = 302) {
  res.writeHead(statusCode, {
    ...SECURITY_HEADERS,
    Location: location,
    "Cache-Control": "no-store",
  });
  res.end();
}

function cleanText(value, maxLength = 160) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanWhatsapp(value) {
  return String(value || "")
    .replace(/[^\d+]/g, "")
    .replace(/(?!^)\+/g, "")
    .slice(0, 24);
}

function cleanLongText(value, maxLength = 600) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function phoneDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function clientIp(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "")
    .split(",")[0]
    .trim();
  return forwarded || req.socket.remoteAddress || "unknown";
}

function consumeRateLimit(req, scope) {
  const now = Date.now();
  const key = `${scope}:${clientIp(req)}`;
  const bucket = rateLimitBuckets.get(key) || [];
  const recent = bucket.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitBuckets.set(key, recent);
    return false;
  }

  recent.push(now);
  rateLimitBuckets.set(key, recent);

  if (rateLimitBuckets.size > 10_000) {
    for (const [bucketKey, timestamps] of rateLimitBuckets.entries()) {
      if (!timestamps.some((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)) {
        rateLimitBuckets.delete(bucketKey);
      }
    }
  }

  return true;
}

function csvValue(value) {
  return `"${String(value || "").replace(/"/g, '""')}"`;
}

function isPathInside(parentPath, childPath) {
  const relative = path.relative(path.resolve(parentPath), path.resolve(childPath));
  return relative === "" || (relative && !relative.startsWith("..") && !path.isAbsolute(relative));
}

async function readRegistrations() {
  try {
    const raw = await fsp.readFile(JSON_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

function nextEmployeeNumber(registrations) {
  const highest = registrations.reduce((max, registration) => {
    const match = /^EMP-(\d+)$/.exec(String(registration.employeeNumber || ""));
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);

  return `EMP-${String(highest + 1).padStart(3, "0")}`;
}

async function saveRegistrations(registrations) {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  await fsp.writeFile(JSON_PATH, `${JSON.stringify(registrations, null, 2)}\n`);
}

async function appendCsv(registration) {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  const exists = fs.existsSync(CSV_PATH);
  const header = [
    "submittedAt",
    "employeeNumber",
    "fullName",
    "email",
    "whatsapp",
    "consent",
  ].join(",");
  const row = [
    registration.submittedAt,
    registration.employeeNumber,
    registration.fullName,
    registration.email,
    registration.whatsapp,
    registration.consent ? "yes" : "no",
  ]
    .map(csvValue)
    .join(",");

  await fsp.appendFile(CSV_PATH, `${exists ? "" : `${header}\n`}${row}\n`);
}

async function readLifeInsuranceApplications() {
  try {
    const raw = await fsp.readFile(LIFE_INSURANCE_JSON_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function saveLifeInsuranceApplications(applications) {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  await fsp.writeFile(LIFE_INSURANCE_JSON_PATH, `${JSON.stringify(applications, null, 2)}\n`);
}

async function appendLifeInsuranceCsv(application) {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  const exists = fs.existsSync(LIFE_INSURANCE_CSV_PATH);
  const header = [
    "submittedAt",
    "applicationId",
    "fullName",
    "whatsapp",
    "email",
    "country",
    "timeZone",
    "salesOrInsuranceExperience",
    "licenseStatus",
    "availability",
    "readiness",
    "bestContactTime",
    "notes",
    "consent",
    "source",
  ].join(",");
  const row = [
    application.submittedAt,
    application.applicationId,
    application.fullName,
    application.whatsapp,
    application.email,
    application.country,
    application.timeZone,
    application.salesOrInsuranceExperience,
    application.licenseStatus,
    application.availability,
    application.readiness,
    application.bestContactTime,
    application.notes,
    application.consent ? "yes" : "no",
    application.source,
  ]
    .map(csvValue)
    .join(",");

  await fsp.appendFile(LIFE_INSURANCE_CSV_PATH, `${exists ? "" : `${header}\n`}${row}\n`);
}

async function readSalesApplicants() {
  try {
    const raw = await fsp.readFile(SALES_APPLICANTS_JSON_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function saveSalesApplicants(applicants) {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  await fsp.writeFile(SALES_APPLICANTS_JSON_PATH, `${JSON.stringify(applicants, null, 2)}\n`);
}

function salesApplicantNumberFromId(applicationId) {
  const match = /^PSE-SA-(\d+)$/i.exec(String(applicationId || "").trim());
  return match ? Number(match[1]) : 0;
}

async function readSalesApplicantSequence(applicants) {
  let persisted = 0;
  try {
    const raw = await fsp.readFile(SALES_APPLICANT_SEQUENCE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    persisted = Number(parsed.lastNumber || 0);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  const observed = applicants.reduce(
    (highest, applicant) => Math.max(highest, salesApplicantNumberFromId(applicant.applicationId)),
    0,
  );
  return Math.max(persisted, observed);
}

async function writeSalesApplicantSequence(lastNumber) {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${SALES_APPLICANT_SEQUENCE_PATH}.${process.pid}.tmp`;
  await fsp.writeFile(
    tmp,
    `${JSON.stringify({ lastNumber, updatedAt: new Date().toISOString() }, null, 2)}\n`,
  );
  await fsp.rename(tmp, SALES_APPLICANT_SEQUENCE_PATH);
}

async function nextSalesApplicantApplicationId(applicants) {
  const nextNumber = (await readSalesApplicantSequence(applicants)) + 1;
  await writeSalesApplicantSequence(nextNumber);
  return `PSE-SA-${String(nextNumber).padStart(4, "0")}`;
}

async function appendSalesApplicantCsv(applicant) {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  const exists = fs.existsSync(SALES_APPLICANTS_CSV_PATH);
  const header = [
    "submittedAt",
    "applicationId",
    "fullName",
    "whatsapp",
    "email",
    "location",
    "timeZone",
    "preferredLanguage",
    "startDate",
    "salesExperience",
    "doorToDoorComfort",
    "phoneDmComfort",
    "b2bComfort",
    "homeownerComfort",
    "availability",
    "readiness",
    "transportation",
    "internetEquipment",
    "socialProfile",
    "licensesCertifications",
    "proofLinks",
    "whyPse",
    "bestContactTime",
    "sourceChannel",
    "notes",
    "consent",
    "source",
  ].join(",");
  const row = [
    applicant.submittedAt,
    applicant.applicationId,
    applicant.fullName,
    applicant.whatsapp,
    applicant.email,
    applicant.location,
    applicant.timeZone,
    applicant.preferredLanguage,
    applicant.startDate,
    applicant.salesExperience,
    applicant.doorToDoorComfort,
    applicant.phoneDmComfort,
    applicant.b2bComfort,
    applicant.homeownerComfort,
    applicant.availability,
    applicant.readiness,
    applicant.transportation,
    applicant.internetEquipment,
    applicant.socialProfile,
    applicant.licensesCertifications,
    applicant.proofLinks,
    applicant.whyPse,
    applicant.bestContactTime,
    applicant.sourceChannel,
    applicant.notes,
    applicant.consent ? "yes" : "no",
    applicant.source,
  ]
    .map(csvValue)
    .join(",");

  await fsp.appendFile(SALES_APPLICANTS_CSV_PATH, `${exists ? "" : `${header}\n`}${row}\n`);
}

function queueRegistrationSave(task) {
  const next = registrationQueue.then(task, task);
  registrationQueue = next.catch(() => {});
  return next;
}

function queueLifeInsuranceSave(task) {
  const next = lifeInsuranceQueue.then(task, task);
  lifeInsuranceQueue = next.catch(() => {});
  return next;
}

function queueSalesApplicantSave(task) {
  const next = salesApplicantQueue.then(task, task);
  salesApplicantQueue = next.catch(() => {});
  return next;
}

function queueDashboardRefresh() {
  const next = dashboardRefreshQueue.then(refreshSalesApplicantDashboard, refreshSalesApplicantDashboard);
  dashboardRefreshQueue = next.catch(() => {});
  return next;
}

async function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > MAX_BODY_BYTES) {
        req.destroy();
        reject(new Error("Request is too large."));
      }
    });

    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function findDuplicateSalesApplicant(applicants, email, whatsapp) {
  const emailKey = normalize(email);
  const phoneKey = phoneDigits(whatsapp);
  const cutoff = Date.now() - DUPLICATE_WINDOW_MS;

  return applicants.find((applicant) => {
    const submittedAt = Date.parse(applicant.submittedAt || "");
    if (Number.isFinite(submittedAt) && submittedAt < cutoff) {
      return false;
    }

    return (
      (emailKey && normalize(applicant.email) === emailKey) ||
      (phoneKey && phoneDigits(applicant.whatsapp) === phoneKey)
    );
  });
}

async function updateApplicantOpsStatus(patch) {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  let current = {};
  try {
    current = JSON.parse(await fsp.readFile(DASHBOARD_STATUS_PATH, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  const next = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  const tmp = `${DASHBOARD_STATUS_PATH}.${process.pid}.tmp`;
  await fsp.writeFile(tmp, `${JSON.stringify(next, null, 2)}\n`);
  await fsp.rename(tmp, DASHBOARD_STATUS_PATH);
  return next;
}

async function refreshSalesApplicantDashboard() {
  const startedAt = new Date().toISOString();
  if (!DASHBOARD_BUILD_SCRIPT || !fs.existsSync(DASHBOARD_BUILD_SCRIPT)) {
    const result = { ok: true, skipped: true, status: "skipped", startedAt, finishedAt: new Date().toISOString() };
    await updateApplicantOpsStatus({ dashboardRefresh: result });
    return result;
  }

  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [DASHBOARD_BUILD_SCRIPT], {
      cwd: path.dirname(DASHBOARD_BUILD_SCRIPT),
      env: {
        ...process.env,
        PSE_SALES_APPLICANTS_JSON: SALES_APPLICANTS_JSON_PATH,
      },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });

    child.on("error", async (error) => {
      await updateApplicantOpsStatus({
        dashboardRefresh: {
          ok: false,
          status: "failed",
          startedAt,
          finishedAt: new Date().toISOString(),
          error: error.message,
        },
      }).catch((statusError) => console.error("Applicant status update failed:", statusError));
      reject(error);
    });
    child.on("close", async (code) => {
      if (code === 0) {
        if (stdout.trim()) {
          console.log(stdout.trim());
        }
        const result = {
          ok: true,
          status: "ok",
          startedAt,
          finishedAt: new Date().toISOString(),
          stdout: stdout.trim().slice(-1200),
        };
        await updateApplicantOpsStatus({ dashboardRefresh: result }).catch((error) => {
          console.error("Applicant status update failed:", error);
        });
        resolve(result);
        return;
      }

      const error = new Error(`Applicant dashboard rebuild failed with exit ${code}: ${stderr || stdout}`);
      await updateApplicantOpsStatus({
        dashboardRefresh: {
          ok: false,
          status: "failed",
          startedAt,
          finishedAt: new Date().toISOString(),
          exitCode: code,
          stderr: (stderr || stdout).trim().slice(-1200),
        },
      }).catch((statusError) => console.error("Applicant status update failed:", statusError));
      reject(error);
    });
  });
}

async function appendNotificationLog(applicant, result) {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  const entry = {
    loggedAt: new Date().toISOString(),
    applicationId: applicant.applicationId,
    fullName: applicant.fullName,
    result,
  };
  await fsp.appendFile(NOTIFICATION_LOG_PATH, `${JSON.stringify(entry)}\n`);
}

async function notifySalesApplicant(applicant) {
  const payload = {
    audience: "ceo",
    title: `New sales applicant: ${applicant.fullName}`,
    details: [
      `Application: ${applicant.applicationId}`,
      `Location: ${applicant.location || "Not provided"}`,
      `Readiness: ${applicant.readiness || "Not provided"}`,
      `Availability: ${applicant.availability || "Not provided"}`,
      `Start date: ${applicant.startDate || "Not provided"}`,
      `Language: ${applicant.preferredLanguage || "Not provided"}`,
      `WhatsApp: ${applicant.whatsapp || "Not provided"}`,
      `Email: ${applicant.email || "Not provided"}`,
    ].join("\n"),
    priority: "high",
    createdBy: "PSE applicant intake",
  };

  if (!NOTIFICATION_ENDPOINT || typeof fetch !== "function") {
    const result = { ok: false, skipped: true, finishedAt: new Date().toISOString() };
    await appendNotificationLog(applicant, result);
    await updateApplicantOpsStatus({
      lastNotification: { ...result, applicationId: applicant.applicationId, fullName: applicant.fullName },
    });
    return;
  }

  try {
    const headers = { "Content-Type": "application/json" };
    if (NOTIFICATION_ADMIN_TOKEN) {
      headers["X-Admin-Token"] = NOTIFICATION_ADMIN_TOKEN;
    }
    const response = await fetch(NOTIFICATION_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const result = {
      ok: response.ok,
      status: response.status,
      endpoint: NOTIFICATION_ENDPOINT,
      finishedAt: new Date().toISOString(),
    };
    await appendNotificationLog(applicant, result);
    await updateApplicantOpsStatus({
      lastNotification: { ...result, applicationId: applicant.applicationId, fullName: applicant.fullName },
    });
    if (!response.ok) {
      console.error(`Applicant notification failed with status ${response.status}`);
    }
  } catch (error) {
    const result = { ok: false, error: error.message, finishedAt: new Date().toISOString() };
    await appendNotificationLog(applicant, result);
    await updateApplicantOpsStatus({
      lastNotification: { ...result, applicationId: applicant.applicationId, fullName: applicant.fullName },
    });
    console.error("Applicant notification failed:", error);
  }
}

async function handleWorkerRegistration(req, res) {
  try {
    const rawBody = await readRequestBody(req);
    const payload = JSON.parse(rawBody || "{}");
    const fullName = cleanText(payload.fullName, 120);
    const email = cleanText(payload.email, 180).toLowerCase();
    const whatsapp = cleanWhatsapp(payload.whatsapp);
    const consent = payload.consent === true;

    if (!fullName) {
      sendJson(res, 400, { message: "Please enter your full name." });
      return;
    }

    if (!email || !isValidEmail(email)) {
      sendJson(res, 400, { message: "Please enter a valid email address." });
      return;
    }

    if (!whatsapp || whatsapp.replace(/\D/g, "").length < 8) {
      sendJson(res, 400, { message: "Please enter a valid WhatsApp phone number." });
      return;
    }

    if (!consent) {
      sendJson(res, 400, { message: "Please confirm that the team can contact you." });
      return;
    }

    const registration = await queueRegistrationSave(async () => {
      const registrations = await readRegistrations();
      const nextRegistration = {
        id: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
        employeeNumber: nextEmployeeNumber(registrations),
        fullName,
        email,
        whatsapp,
        consent,
      };

      registrations.push(nextRegistration);
      await saveRegistrations(registrations);
      await appendCsv(nextRegistration);

      return nextRegistration;
    });

    sendJson(res, 201, {
      employeeNumber: registration.employeeNumber,
      fullName: registration.fullName,
      message: "Registration received.",
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      sendJson(res, 400, { message: "The registration form sent invalid data." });
      return;
    }

    console.error(error);
    sendJson(res, 500, { message: "Registration could not be saved right now." });
  }
}

async function handleLifeInsuranceApplication(req, res) {
  try {
    const rawBody = await readRequestBody(req);
    const payload = JSON.parse(rawBody || "{}");
    const fullName = cleanText(payload.fullName, 120);
    const whatsapp = cleanWhatsapp(payload.whatsapp);
    const email = cleanText(payload.email, 180).toLowerCase();
    const country = cleanText(payload.country, 120);
    const timeZone = cleanText(payload.timeZone, 120);
    const salesOrInsuranceExperience = cleanLongText(payload.salesOrInsuranceExperience, 700);
    const licenseStatus = cleanText(payload.licenseStatus, 120);
    const availability = cleanText(payload.availability, 160);
    const readiness = cleanText(payload.readiness, 160);
    const bestContactTime = cleanText(payload.bestContactTime, 160);
    const notes = cleanLongText(payload.notes, 700);
    const consent = payload.consent === true;

    if (!fullName) {
      sendJson(res, 400, { message: "Please enter your full name." });
      return;
    }

    if (!whatsapp || whatsapp.replace(/\D/g, "").length < 8) {
      sendJson(res, 400, { message: "Please enter a valid WhatsApp phone number." });
      return;
    }

    if (!email || !isValidEmail(email)) {
      sendJson(res, 400, { message: "Please enter a valid email address." });
      return;
    }

    if (!country) {
      sendJson(res, 400, { message: "Please enter your country or market." });
      return;
    }

    if (!licenseStatus || !availability || !readiness) {
      sendJson(res, 400, {
        message: "Please select your license status, availability, and readiness.",
      });
      return;
    }

    if (!consent) {
      sendJson(res, 400, { message: "Please confirm that PSE can contact you." });
      return;
    }

    const application = await queueLifeInsuranceSave(async () => {
      const applications = await readLifeInsuranceApplications();
      const nextApplication = {
        id: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
        applicationId: `PSE-LI-${String(applications.length + 1).padStart(4, "0")}`,
        fullName,
        whatsapp,
        email,
        country,
        timeZone,
        salesOrInsuranceExperience,
        licenseStatus,
        availability,
        readiness,
        bestContactTime,
        notes,
        consent,
        source: "life-insurance-application.html",
      };

      applications.push(nextApplication);
      await saveLifeInsuranceApplications(applications);
      await appendLifeInsuranceCsv(nextApplication);

      return nextApplication;
    });

    sendJson(res, 201, {
      applicationId: application.applicationId,
      message: "Application received.",
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      sendJson(res, 400, { message: "The application form sent invalid data." });
      return;
    }

    console.error(error);
    sendJson(res, 500, { message: "Application could not be saved right now." });
  }
}

async function handleSalesApplicantIntake(req, res) {
  try {
    if (!consumeRateLimit(req, "sales-applicant-intake")) {
      sendJson(res, 429, { message: "Too many applicant submissions. Please wait a few minutes and try again." });
      return;
    }

    const rawBody = await readRequestBody(req);
    const payload = JSON.parse(rawBody || "{}");
    const honeypot = cleanText(payload.pseWebsite || payload.websiteUrl || "", 120);
    const fullName = cleanText(payload.fullName, 120);
    const whatsapp = cleanWhatsapp(payload.whatsapp);
    const email = cleanText(payload.email, 180).toLowerCase();
    const location = cleanText(payload.location, 180);
    const timeZone = cleanText(payload.timeZone, 120);
    const preferredLanguage = cleanText(payload.preferredLanguage, 160);
    const startDate = cleanText(payload.startDate, 40);
    const salesExperience = cleanLongText(payload.salesExperience, 900);
    const doorToDoorComfort = cleanText(payload.doorToDoorComfort, 160);
    const phoneDmComfort = cleanText(payload.phoneDmComfort, 160);
    const b2bComfort = cleanText(payload.b2bComfort, 160);
    const homeownerComfort = cleanText(payload.homeownerComfort, 160);
    const availability = cleanText(payload.availability, 160);
    const readiness = cleanText(payload.readiness, 160);
    const transportation = cleanText(payload.transportation, 220);
    const internetEquipment = cleanText(payload.internetEquipment, 260);
    const socialProfile = cleanText(payload.socialProfile, 260);
    const licensesCertifications = cleanLongText(payload.licensesCertifications, 700);
    const proofLinks = cleanLongText(payload.proofLinks, 900);
    const whyPse = cleanLongText(payload.whyPse, 900);
    const bestContactTime = cleanText(payload.bestContactTime, 160);
    const sourceChannel = cleanText(payload.sourceChannel, 160);
    const notes = cleanLongText(payload.notes, 700);
    const consent = payload.consent === true;

    if (honeypot) {
      sendJson(res, 400, { message: "Applicant intake could not be saved right now." });
      return;
    }

    if (!fullName) {
      sendJson(res, 400, { message: "Please enter your full name." });
      return;
    }

    if (!whatsapp || whatsapp.replace(/\D/g, "").length < 8) {
      sendJson(res, 400, { message: "Please enter a valid WhatsApp phone number." });
      return;
    }

    if (!email || !isValidEmail(email)) {
      sendJson(res, 400, { message: "Please enter a valid email address." });
      return;
    }

    if (!location) {
      sendJson(res, 400, { message: "Please enter your city, state, or market." });
      return;
    }

    if (!availability || !readiness) {
      sendJson(res, 400, { message: "Please select your availability and readiness." });
      return;
    }

    if (!consent) {
      sendJson(res, 400, { message: "Please confirm that PSE can contact you." });
      return;
    }

    const applicant = await queueSalesApplicantSave(async () => {
      const applicants = await readSalesApplicants();
      const duplicate = findDuplicateSalesApplicant(applicants, email, whatsapp);
      if (duplicate) {
        const error = new Error(`We already have this applicant intake as ${duplicate.applicationId}.`);
        error.statusCode = 409;
        error.applicationId = duplicate.applicationId;
        throw error;
      }

      const applicationId = await nextSalesApplicantApplicationId(applicants);
      const nextApplicant = {
        id: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
        applicationId,
        fullName,
        whatsapp,
        email,
        location,
        timeZone,
        preferredLanguage,
        startDate,
        salesExperience,
        doorToDoorComfort,
        phoneDmComfort,
        b2bComfort,
        homeownerComfort,
        availability,
        readiness,
        transportation,
        internetEquipment,
        socialProfile,
        licensesCertifications,
        proofLinks,
        whyPse,
        bestContactTime,
        sourceChannel,
        notes,
        consent,
        source: "sales-applicant-intake.html",
      };

      applicants.push(nextApplicant);
      await saveSalesApplicants(applicants);
      await appendSalesApplicantCsv(nextApplicant);

      return nextApplicant;
    });

    void queueDashboardRefresh().catch((error) => {
      console.error("Applicant dashboard refresh failed:", error);
    });
    void notifySalesApplicant(applicant);

    sendJson(res, 201, {
      applicationId: applicant.applicationId,
      message: "Sales applicant intake received.",
      dashboardRefreshQueued: true,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      sendJson(res, 400, { message: "The applicant form sent invalid data." });
      return;
    }

    if (error.statusCode) {
      sendJson(res, error.statusCode, {
        message: error.message,
        applicationId: error.applicationId,
      });
      return;
    }

    console.error(error);
    sendJson(res, 500, { message: "Applicant intake could not be saved right now." });
  }
}

async function serveStatic(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === "/") {
    pathname = "/index.html";
  }

  if (pathname === "/apply" || pathname === "/apply/") {
    sendRedirect(res, "sales-applicant-intake.html", 302);
    return;
  }

  if (pathname === "/life-insurance-application.html") {
    sendRedirect(res, "sales-applicant-intake.html", 302);
    return;
  }

  if (isBlockedPublicPath(pathname)) {
    sendText(res, 404, "Not found");
    return;
  }

  const filePath = path.resolve(ROOT, pathname.replace(/^[/\\]+/, ""));
  if (!isPathInside(ROOT, filePath)) {
    sendText(res, 403, "Forbidden");
    return;
  }

  try {
    const stat = await fsp.stat(filePath);
    const finalPath = stat.isDirectory() ? path.join(filePath, "index.html") : filePath;
    const extension = path.extname(finalPath).toLowerCase();
    res.writeHead(200, {
      ...SECURITY_HEADERS,
      "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
    });
    fs.createReadStream(finalPath).pipe(res);
  } catch (error) {
    sendText(res, 404, "Not found");
  }
}

function isBlockedPublicPath(pathname) {
  const normalizedPath = pathname.replace(/\\/g, "/");
  const parts = normalizedPath.split("/").filter(Boolean);
  const basename = parts.at(-1) || "";
  const extension = path.extname(basename).toLowerCase();

  return (
    normalizedPath.startsWith("/data/") ||
    parts.some((part) => part.startsWith(".")) ||
    BLOCKED_PUBLIC_BASENAMES.has(basename) ||
    BLOCKED_PUBLIC_EXTENSIONS.has(extension)
  );
}

const server = http.createServer((req, res) => {
  if ((req.method === "GET" || req.method === "HEAD") && req.url === "/healthz") {
    sendHealth(req, res);
    return;
  }

  if (req.method === "POST" && req.url === "/api/worker-registration") {
    handleWorkerRegistration(req, res);
    return;
  }

  if (req.method === "POST" && req.url === "/api/life-insurance-application") {
    sendJson(res, 410, {
      message: "This field-specific application is retired. Please use the general PSE sales applicant intake.",
      intakeUrl: "sales-applicant-intake.html",
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/sales-applicant-intake") {
    handleSalesApplicantIntake(req, res);
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    serveStatic(req, res);
    return;
  }

  sendText(res, 405, "Method not allowed");
});

server.listen(PORT, HOST, () => {
  console.log(`Pilot Sales Enterprise site running at http://${HOST}:${PORT}`);
});
