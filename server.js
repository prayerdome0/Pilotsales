const fs = require("node:fs");
const fsp = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const crypto = require("node:crypto");

const ROOT = __dirname;
const DATA_DIR = path.resolve(process.env.PSE_DATA_DIR || path.join(ROOT, "data"));
const JSON_PATH = path.join(DATA_DIR, "worker-registrations.json");
const CSV_PATH = path.join(DATA_DIR, "worker-registrations.csv");
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "127.0.0.1";
const DATA_STORAGE_MODE = process.env.PSE_DATA_DIR ? "private" : "site-local";
let registrationQueue = Promise.resolve();

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

function sendHealth(req, res) {
  const payload = JSON.stringify({
    ok: true,
    service: "pilot-sales-enterprise",
    dataStorage: DATA_STORAGE_MODE,
    uptimeSeconds: Math.round(process.uptime()),
  });

  res.writeHead(200, {
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
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
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

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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

function queueRegistrationSave(task) {
  const next = registrationQueue.then(task, task);
  registrationQueue = next.catch(() => {});
  return next;
}

async function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100_000) {
        req.destroy();
        reject(new Error("Request is too large."));
      }
    });

    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
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

async function serveStatic(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === "/") {
    pathname = "/index.html";
  }

  if (pathname.startsWith("/data/")) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const filePath = path.resolve(ROOT, pathname.replace(/^[/\\]+/, ""));
  if (!isPathInside(ROOT, filePath)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  try {
    const stat = await fsp.stat(filePath);
    const finalPath = stat.isDirectory() ? path.join(filePath, "index.html") : filePath;
    const extension = path.extname(finalPath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
    });
    fs.createReadStream(finalPath).pipe(res);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
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

  if (req.method === "GET" || req.method === "HEAD") {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Method not allowed");
});

server.listen(PORT, HOST, () => {
  console.log(`Pilot Sales Enterprise site running at http://${HOST}:${PORT}`);
});
