const servers = [
  {
    id: "srv-01",
    name: "api-gateway-01",
    ip: "192.0.2.18",
    region: "New York",
    plan: "4 vCPU / 8 GB",
    image: "Ubuntu 24.04 LTS",
    status: "running",
    cpu: 42,
    memory: 58,
    disk: 47,
    traffic: 814,
    spend: 48,
    uptime: "37d 12h",
    series: [36, 42, 39, 44, 51, 49, 56, 53, 58, 61, 57, 63]
  },
  {
    id: "srv-02",
    name: "payments-db-02",
    ip: "198.51.100.27",
    region: "Frankfurt",
    plan: "8 vCPU / 16 GB",
    image: "Debian 12",
    status: "warning",
    cpu: 76,
    memory: 82,
    disk: 68,
    traffic: 1296,
    spend: 96,
    uptime: "91d 4h",
    series: [58, 62, 68, 71, 66, 73, 79, 74, 82, 78, 84, 81]
  },
  {
    id: "srv-03",
    name: "worker-eu-03",
    ip: "203.0.113.44",
    region: "London",
    plan: "2 vCPU / 4 GB",
    image: "AlmaLinux 9",
    status: "running",
    cpu: 31,
    memory: 44,
    disk: 33,
    traffic: 428,
    spend: 26,
    uptime: "16d 20h",
    series: [28, 33, 29, 35, 31, 37, 41, 36, 39, 43, 40, 46]
  },
  {
    id: "srv-04",
    name: "media-cache-sg",
    ip: "203.0.113.91",
    region: "Singapore",
    plan: "4 vCPU / 8 GB",
    image: "Ubuntu 24.04 LTS",
    status: "running",
    cpu: 52,
    memory: 61,
    disk: 72,
    traffic: 1740,
    spend: 64,
    uptime: "52d 7h",
    series: [42, 48, 51, 49, 55, 57, 62, 59, 65, 69, 64, 70]
  },
  {
    id: "srv-05",
    name: "staging-sydney",
    ip: "198.51.100.88",
    region: "Sydney",
    plan: "2 vCPU / 4 GB",
    image: "Debian 12",
    status: "stopped",
    cpu: 0,
    memory: 9,
    disk: 22,
    traffic: 64,
    spend: 18,
    uptime: "0h",
    series: [6, 4, 5, 3, 4, 2, 3, 4, 3, 2, 3, 2]
  }
];

const bots = [
  {
    id: "youtube-shorts-prep",
    name: "YouTube Shorts Prep",
    lane: "Package scanner",
    cadence: "Every 30 minutes",
    health: "ready_for_manual_review",
    gate: "Manual review before publishing",
    record: "latest-inbox-scan.json",
    enabled: true,
    agents: [
      { id: "inbox-scanner", name: "Inbox Scanner", role: "Finds new video packages", enabled: true },
      { id: "metadata-checker", name: "Metadata Checker", role: "Validates titles and sidecars", enabled: true },
      { id: "review-queue", name: "Review Queue Agent", role: "Marks ready or blocked", enabled: true }
    ]
  },
  {
    id: "youtube-bot-watchdog",
    name: "YouTube Bot Watchdog",
    lane: "Prep worker guard",
    cadence: "Continuous checks",
    health: "ok",
    gate: "No account or publishing access",
    record: "watchdog-audit.jsonl",
    enabled: true,
    agents: [
      { id: "prep-health", name: "Prep Health", role: "Checks prep worker state", enabled: true },
      { id: "stale-scan", name: "Stale Scan Guard", role: "Refreshes stale local scans", enabled: true },
      { id: "restart-request", name: "Restart Request", role: "Requests correction if missing", enabled: true }
    ]
  },
  {
    id: "youtube-publisher",
    name: "YouTube Publisher",
    lane: "Timed public upload lane",
    cadence: "Checks every 15 minutes",
    health: "authorization_pending",
    gate: "Channel-owner approval required",
    record: "latest-status.json",
    enabled: true,
    agents: [
      { id: "oauth-gate", name: "OAuth Gate", role: "Waits for account approval", enabled: false },
      { id: "package-loader", name: "Package Loader", role: "Prepares ready packages", enabled: true },
      { id: "upload-runner", name: "Upload Runner", role: "Runs only after approval", enabled: false }
    ]
  },
  {
    id: "sports-arbitrage-monitor",
    name: "Sports Arbitrage Monitor",
    lane: "Read-only monitor",
    cadence: "Read-only sweeps",
    health: "waiting_for_required_configuration",
    gate: "Jurisdiction, source, and compliance approval",
    record: "latest-arbitrage-scan.csv",
    enabled: true,
    agents: [
      { id: "odds-source", name: "Odds Source Agent", role: "Checks approved sources", enabled: true },
      { id: "compliance", name: "Compliance Agent", role: "Blocks risky actions", enabled: true },
      { id: "alert-router", name: "Alert Router", role: "Routes findings", enabled: false }
    ]
  },
  {
    id: "dashboard-auto-recorder",
    name: "Dashboard Auto Recorder",
    lane: "Snapshots and records",
    cadence: "Every 15 minutes",
    health: "covered",
    gate: "Move canonical dashboard source under Git",
    record: "latest-dashboard-summary.json",
    enabled: true,
    agents: [
      { id: "snapshotter", name: "Snapshotter", role: "Captures dashboard state", enabled: true },
      { id: "redactor", name: "Redaction Agent", role: "Hides private names", enabled: true },
      { id: "backup-checker", name: "Backup Checker", role: "Verifies archives", enabled: true }
    ]
  },
  {
    id: "real-estate-surplus-monitor",
    name: "Surplus Funds Monitor",
    lane: "Official-source checks",
    cadence: "Every 6 hours",
    health: "research_only",
    gate: "Permitted-use and holding-office confirmation",
    record: "latest-source-sweep.json",
    enabled: true,
    agents: [
      { id: "source-discovery", name: "Source Discovery", role: "Finds county sources", enabled: true },
      { id: "amount-parser", name: "Amount Parser", role: "Reads available proceeds", enabled: true },
      { id: "evidence-writer", name: "Evidence Writer", role: "Writes source notes", enabled: true }
    ]
  },
  {
    id: "status-reporter",
    name: "Status Update Reporter",
    lane: "Five-minute summary",
    cadence: "Every 5 minutes",
    health: "healthy",
    gate: "Watch nonzero problem counts",
    record: "latest-status-update.json",
    enabled: true,
    agents: [
      { id: "service-checker", name: "Service Checker", role: "Reads bot state", enabled: true },
      { id: "route-checker", name: "Route Checker", role: "Checks dashboard routes", enabled: true },
      { id: "summary-writer", name: "Summary Writer", role: "Publishes latest status", enabled: true }
    ]
  },
  {
    id: "bot-improvement-manager",
    name: "Bot Improvement Manager",
    lane: "Continuous improvement queue",
    cadence: "Every 30 minutes",
    health: "attention_needed",
    gate: "Human approval for blocked actions",
    record: "latest-improvement-plan.md",
    enabled: true,
    agents: [
      { id: "fleet-reader", name: "Fleet Reader", role: "Checks all configured bots", enabled: true },
      { id: "backlog-writer", name: "Backlog Writer", role: "Writes improvement queue", enabled: true },
      { id: "approval-gate", name: "Approval Gate", role: "Keeps risky work blocked", enabled: true }
    ]
  }
];

const visualizerHub = {
  id: "control-panel",
  name: "PSE Bot Control",
  lane: "Supervisor service",
  cadence: "Always on",
  health: "active",
  gate: "Basic auth and sensitive-route guard",
  record: "pse-bot-control.service",
  enabled: true
};

const visualizerPositions = {
  "control-panel": { x: 50, y: 50 },
  "youtube-shorts-prep": { x: 18, y: 18 },
  "youtube-bot-watchdog": { x: 50, y: 18 },
  "youtube-publisher": { x: 82, y: 18 },
  "sports-arbitrage-monitor": { x: 18, y: 50 },
  "dashboard-auto-recorder": { x: 82, y: 50 },
  "real-estate-surplus-monitor": { x: 18, y: 82 },
  "status-reporter": { x: 50, y: 82 },
  "bot-improvement-manager": { x: 82, y: 82 }
};

const visualizerConnections = [
  ["control-panel", "youtube-shorts-prep"],
  ["control-panel", "youtube-bot-watchdog"],
  ["control-panel", "youtube-publisher"],
  ["control-panel", "sports-arbitrage-monitor"],
  ["control-panel", "dashboard-auto-recorder"],
  ["control-panel", "real-estate-surplus-monitor"],
  ["control-panel", "status-reporter"],
  ["control-panel", "bot-improvement-manager"],
  ["youtube-bot-watchdog", "youtube-shorts-prep"],
  ["youtube-shorts-prep", "youtube-publisher"],
  ["dashboard-auto-recorder", "status-reporter"],
  ["bot-improvement-manager", "status-reporter"]
];

const previewRecords = [
  {
    id: "operations-tracker",
    type: "Workbook",
    title: "Operations Tracker",
    summary: "Priority workstreams, owners, gates, and next actions.",
    columns: ["Workstream", "Owner", "State", "Next"],
    rows: [
      ["YouTube launch", "Ada", "Authorization blocked", "Complete owner approval"],
      ["Dashboard source", "Cicero", "Needs Git home", "Pick canonical repo"],
      ["Sports monitor", "Erdos", "Read-only", "Approve source scope"]
    ]
  },
  {
    id: "google-intake",
    type: "Intake",
    title: "Google Response Sheet",
    summary: "Incoming form responses summarized without opening a raw export.",
    columns: ["Response", "Route", "Status", "Owner"],
    rows: [
      ["Sales applicant", "Applicant tracker", "Needs screen", "Riley"],
      ["Website inquiry", "Pipeline", "Call queued", "Jordan"],
      ["Channel lead", "Social", "Verify source", "Avery"]
    ]
  },
  {
    id: "applicant-tracker",
    type: "Pipeline",
    title: "Applicant Tracker",
    summary: "Recruiting funnel view for candidates and interview movement.",
    columns: ["Candidate", "Track", "Stage", "Action"],
    rows: [
      ["Taylor M.", "Sales", "Interview", "Confirm slot"],
      ["Maya J.", "Sales", "Second interview", "Schedule"],
      ["Luis P.", "Operations", "Offer", "Approval needed"]
    ]
  },
  {
    id: "change-log",
    type: "Audit",
    title: "Change Log",
    summary: "Readable dashboard changes, bot updates, and approval gates.",
    columns: ["Time", "Area", "Change", "Gate"],
    rows: [
      ["23:16", "Bots", "Improvement manager added", "None"],
      ["21:48", "Records", "Nested browsing enabled", "None"],
      ["19:44", "Publisher", "Public timer configured", "OAuth required"]
    ]
  }
];

const rootActions = [
  {
    id: "youtube-oauth",
    status: "now",
    priority: "High",
    title: "Finish YouTube authorization",
    lane: "Social media automation",
    owner: "Ada",
    detail: "Complete channel-owner authorization before the publisher can upload.",
    target: "youtube-publisher"
  },
  {
    id: "private-upload-review",
    status: "next",
    priority: "High",
    title: "Review first private upload",
    lane: "YouTube release gate",
    owner: "Ada",
    detail: "After authorization succeeds, verify the first private Short in YouTube Studio before any public release.",
    target: "youtube-publisher"
  },
  {
    id: "dashboard-source",
    status: "now",
    priority: "Medium",
    title: "Put dashboard source under Git",
    lane: "Dashboard ownership",
    owner: "Cicero",
    detail: "Choose the canonical source folder so future dashboard edits have version history and rollback.",
    target: "dashboard-auto-recorder"
  },
  {
    id: "sports-approval",
    status: "gated",
    priority: "High",
    title: "Approve sports monitor scope",
    lane: "Sports compliance",
    owner: "Erdos",
    detail: "Keep active betting blocked until jurisdiction, source, operator, and alert-policy approvals are explicit.",
    target: "sports-arbitrage-monitor"
  },
  {
    id: "surplus-governance",
    status: "gated",
    priority: "Medium",
    title: "Confirm surplus lead rules",
    lane: "Real estate surplus",
    owner: "Boyle",
    detail: "Do not move to lead handling or outreach until permitted use and holding-office confirmation are recorded.",
    target: "real-estate-surplus-monitor"
  },
  {
    id: "record-previews",
    status: "next",
    priority: "Medium",
    title: "Replace file clicks with previews",
    lane: "Command center UX",
    owner: "Status",
    detail: "Keep tracker, intake, applicant, and change-log interactions in-browser unless the user explicitly exports.",
    preview: "operations-tracker"
  }
];

const operationTunnels = [
  {
    id: "sales-recruiting",
    name: "Sales Recruiting",
    lane: "Applicant pipeline",
    state: "Active",
    tone: "running",
    owner: "Riley",
    metric: "64 applicants",
    meta: "18 interviews set",
    summary: "Applicant intake, screening, interviews, and onboarding movement for commission sales reps.",
    analytics: [
      ["Applicant intake", 64, 70, "var(--teal)"],
      ["Screened", 42, 64, "var(--blue)"],
      ["Interviewing", 25, 42, "var(--amber)"],
      ["Offers", 9, 25, "var(--green)"]
    ],
    next: ["Screen new WhatsApp applicants", "Confirm interview slots", "Route accepted reps into onboarding"],
    programs: ["status-reporter", "dashboard-auto-recorder"],
    records: ["applicant-tracker", "google-intake"]
  },
  {
    id: "website-sales",
    name: "Website Sales",
    lane: "Website build offers",
    state: "Active",
    tone: "running",
    owner: "Jordan",
    metric: "$42.1K booked",
    meta: "37 closed deals",
    summary: "Lead handling, proposals, follow-ups, and rep performance for website offer campaigns.",
    analytics: [
      ["New leads", 46, 60, "var(--teal)"],
      ["Demos", 28, 46, "var(--blue)"],
      ["Proposals", 17, 28, "var(--amber)"],
      ["Closing", 9, 17, "var(--rose)"]
    ],
    next: ["Follow up open proposals", "Review rep close rate", "Keep pricing and offer notes current"],
    programs: ["status-reporter"],
    records: ["operations-tracker", "google-intake"]
  },
  {
    id: "health-insurance",
    name: "Health Insurance Leads",
    lane: "Compliant appointments",
    state: "Scoped",
    tone: "warning",
    owner: "Casey",
    metric: "Compliance first",
    meta: "scripts and routing pending",
    summary: "Qualified lead or appointment generation only after compliance rules and approved scripts are clear.",
    analytics: [
      ["Script approved", 35, 100, "var(--amber)"],
      ["Source review", 50, 100, "var(--blue)"],
      ["Rep readiness", 30, 100, "var(--teal)"]
    ],
    next: ["Confirm approved language", "Define allowed lead sources", "Add compliance checkpoint to tracker"],
    programs: ["bot-improvement-manager"],
    records: ["operations-tracker", "change-log"]
  },
  {
    id: "barnacle-removal",
    name: "Barnacle Removal",
    lane: "Local service campaign",
    state: "Building",
    tone: "warning",
    owner: "Morgan",
    metric: "Offer setup",
    meta: "market list needed",
    summary: "Territory, customer routing, call notes, and partner capacity for barnacle removal demand.",
    analytics: [
      ["Market list", 45, 100, "var(--teal)"],
      ["Partner capacity", 30, 100, "var(--amber)"],
      ["Follow-up queue", 60, 100, "var(--blue)"]
    ],
    next: ["Confirm service areas", "Load partner capacity", "Add local follow-up tags"],
    programs: ["dashboard-auto-recorder"],
    records: ["operations-tracker"]
  },
  {
    id: "solar-bird-proofing",
    name: "Solar Bird Proofing",
    lane: "Home-service leads",
    state: "Building",
    tone: "running",
    owner: "Avery",
    metric: "4 markets",
    meta: "Phoenix, Dallas, Tampa, Atlanta",
    summary: "Solar-panel bird proofing demand, market coverage, rep scripts, and partner handoff status.",
    analytics: [
      ["Market coverage", 4, 6, "var(--teal)"],
      ["Lead quality", 72, 100, "var(--green)"],
      ["Partner handoff", 58, 100, "var(--blue)"]
    ],
    next: ["Review city-level demand", "Tighten partner handoff checklist", "Track booked consultations"],
    programs: ["status-reporter"],
    records: ["operations-tracker", "google-intake"]
  },
  {
    id: "youtube-media",
    name: "YouTube Media",
    lane: "Shorts and publishing",
    state: "Gated",
    tone: "warning",
    owner: "Ada",
    metric: "3 bots linked",
    meta: "owner approval required",
    summary: "Shorts prep, package review, publishing readiness, and public-release approvals.",
    analytics: [
      ["Package prep", 85, 100, "var(--green)"],
      ["Review queue", 70, 100, "var(--teal)"],
      ["Publishing gate", 20, 100, "var(--amber)"]
    ],
    next: ["Finish owner approval", "Review first private upload", "Keep release log current"],
    programs: ["youtube-shorts-prep", "youtube-bot-watchdog", "youtube-publisher"],
    records: ["operations-tracker", "change-log"]
  },
  {
    id: "surplus-funds",
    name: "Surplus Funds Research",
    lane: "Official-source checks",
    state: "Research",
    tone: "warning",
    owner: "Boyle",
    metric: "Source sweeps",
    meta: "permitted-use gate",
    summary: "County source discovery and evidence notes before any lead handling or outreach.",
    analytics: [
      ["Source discovery", 68, 100, "var(--teal)"],
      ["Amount parsing", 54, 100, "var(--blue)"],
      ["Use approval", 25, 100, "var(--amber)"]
    ],
    next: ["Record permitted-use decision", "Keep evidence notes with source links", "Block outreach until approved"],
    programs: ["real-estate-surplus-monitor"],
    records: ["operations-tracker", "change-log"]
  },
  {
    id: "sports-research",
    name: "Sports Research Monitor",
    lane: "Read-only scan",
    state: "Gated",
    tone: "warning",
    owner: "Erdos",
    metric: "Read-only",
    meta: "scope approval required",
    summary: "Monitoring and alert routing only after source, jurisdiction, and compliance scope are approved.",
    analytics: [
      ["Source scope", 45, 100, "var(--blue)"],
      ["Compliance gate", 20, 100, "var(--amber)"],
      ["Alert route", 35, 100, "var(--teal)"]
    ],
    next: ["Approve allowed sources", "Confirm jurisdiction boundaries", "Keep action-taking disabled"],
    programs: ["sports-arbitrage-monitor"],
    records: ["operations-tracker", "change-log"]
  },
  {
    id: "bot-ops",
    name: "VPS Bot Operations",
    lane: "Dashboard and automation",
    state: "Active",
    tone: "running",
    owner: "Status",
    metric: "8 bots",
    meta: "5 live VPS instances",
    summary: "Bot health, fleet state, dashboard snapshots, records, and improvement queue ownership.",
    analytics: [
      ["Bots enabled", 8, 8, "var(--green)"],
      ["Live VPS", 4, 5, "var(--teal)"],
      ["Warning lanes", 4, 8, "var(--amber)"]
    ],
    next: ["Watch warning lanes", "Keep dashboard source versioned", "Review improvement queue"],
    programs: ["dashboard-auto-recorder", "status-reporter", "bot-improvement-manager"],
    records: ["operations-tracker", "change-log"]
  }
];

let activeActionFilter = "all";
let selectedOperationId = operationTunnels[0].id;

const regionLayout = {
  "New York": { x: 18, y: 37 },
  London: { x: 44, y: 30 },
  Frankfurt: { x: 51, y: 42 },
  Singapore: { x: 72, y: 61 },
  Sydney: { x: 82, y: 76 }
};

let activeStatus = "all";
let selectedId = servers[0].id;
let selectedProgramId = "control-panel";
let logs = [
  { time: "14:42", title: "Snapshot completed", detail: "api-gateway-01 retained 7 restore points" },
  { time: "14:19", title: "CPU threshold crossed", detail: "payments-db-02 peaked at 84%" },
  { time: "13:56", title: "Firewall rule updated", detail: "London region accepted SSH allowlist" },
  { time: "13:02", title: "Backup verified", detail: "media-cache-sg integrity check passed" }
];

const elements = {
  commandSummary: document.querySelector("#commandSummary"),
  commandStatusGrid: document.querySelector("#commandStatusGrid"),
  operationSummary: document.querySelector("#operationSummary"),
  operationTunnelGrid: document.querySelector("#operationTunnelGrid"),
  operationTunnelDetail: document.querySelector("#operationTunnelDetail"),
  rootActionSummary: document.querySelector("#rootActionSummary"),
  rootActionGrid: document.querySelector("#rootActionGrid"),
  flowStrip: document.querySelector("#flowStrip"),
  flowContext: document.querySelector("#flowContext"),
  activeCount: document.querySelector("#activeCount"),
  activeDelta: document.querySelector("#activeDelta"),
  cpuAverage: document.querySelector("#cpuAverage"),
  spendTotal: document.querySelector("#spendTotal"),
  securityCount: document.querySelector("#securityCount"),
  serverList: document.querySelector("#serverList"),
  updatedAt: document.querySelector("#updatedAt"),
  detailName: document.querySelector("#detailName"),
  detailStatus: document.querySelector("#detailStatus"),
  detailCpu: document.querySelector("#detailCpu"),
  detailMemory: document.querySelector("#detailMemory"),
  detailDisk: document.querySelector("#detailDisk"),
  cpuRing: document.querySelector("#cpuRing"),
  memoryRing: document.querySelector("#memoryRing"),
  diskRing: document.querySelector("#diskRing"),
  detailIp: document.querySelector("#detailIp"),
  detailRegion: document.querySelector("#detailRegion"),
  detailPlan: document.querySelector("#detailPlan"),
  detailUptime: document.querySelector("#detailUptime"),
  trafficValue: document.querySelector("#trafficValue"),
  trafficChart: document.querySelector("#trafficChart"),
  activityLog: document.querySelector("#activityLog"),
  regionMap: document.querySelector("#regionMap"),
  searchInput: document.querySelector("#searchInput"),
  regionSelect: document.querySelector("#regionSelect"),
  serverModal: document.querySelector("#serverModal"),
  serverForm: document.querySelector("#serverForm"),
  botGrid: document.querySelector("#botGrid"),
  botSummary: document.querySelector("#botSummary"),
  botMap: document.querySelector("#botMap"),
  visualizerDetail: document.querySelector("#visualizerDetail"),
  visualizerSummary: document.querySelector("#visualizerSummary"),
  previewGrid: document.querySelector("#previewGrid"),
  previewModal: document.querySelector("#previewModal"),
  previewEyebrow: document.querySelector("#previewEyebrow"),
  previewTitle: document.querySelector("#previewTitle"),
  previewContent: document.querySelector("#previewContent")
};

function icon(id) {
  return `<svg aria-hidden="true"><use href="#${id}"></use></svg>`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function filteredServers() {
  const query = elements.searchInput.value.trim().toLowerCase();
  const region = elements.regionSelect.value;

  return servers.filter((server) => {
    const statusMatch = activeStatus === "all" || server.status === activeStatus;
    const regionMatch = region === "all" || server.region === region;
    const queryMatch =
      !query ||
      [server.name, server.ip, server.region, server.plan, server.image].some((value) =>
        value.toLowerCase().includes(query)
      );

    return statusMatch && regionMatch && queryMatch;
  });
}

function renderMetrics() {
  const activeServers = servers.filter((server) => server.status !== "stopped");
  const active = activeServers.length;
  const onlineRegions = new Set(
    activeServers.map((server) => server.region)
  ).size;
  const averageCpu = activeServers.length
    ? Math.round(activeServers.reduce((total, server) => total + server.cpu, 0) / activeServers.length)
    : 0;
  const spend = servers.reduce((total, server) => total + server.spend, 0);
  const securityEvents = servers.filter((server) => server.status === "warning").length + 2;

  elements.activeCount.textContent = String(active);
  elements.activeDelta.textContent = `${onlineRegions} regions online`;
  elements.cpuAverage.textContent = `${averageCpu}%`;
  elements.spendTotal.textContent = formatCurrency(spend);
  elements.securityCount.textContent = String(securityEvents);
}

function statusPill(status) {
  return `<span class="status-pill ${status}">${status}</span>`;
}

function botStatus(bot) {
  if (!bot.enabled) return "stopped";
  return bot.agents.some((agent) => !agent.enabled) ? "warning" : "running";
}

function programStatus(program) {
  if (!program.enabled) return "stopped";
  if (/awaiting|waiting|attention|research/i.test(program.health)) return "warning";
  if (program.agents?.some((agent) => !agent.enabled)) return "warning";
  return "running";
}

function actionStatusLabel(status) {
  return status === "now" ? "Now" : status === "next" ? "Next" : "Gated";
}

function selectedOperation() {
  return operationTunnels.find((operation) => operation.id === selectedOperationId) || operationTunnels[0];
}

function renderCommandOverview() {
  const liveServers = servers.filter((server) => server.status !== "stopped").length;
  const enabledBots = bots.filter((bot) => bot.enabled).length;
  const warningPrograms = bots.filter((bot) => programStatus(bot) === "warning").length;
  const nowActions = rootActions.filter((action) => action.status === "now").length;
  const gatedActions = rootActions.filter((action) => action.status === "gated").length;

  elements.commandSummary.textContent =
    `Start with one of ${operationTunnels.length} operation tunnels. Each tunnel keeps its own analytics, records, bots, and owner actions off the front page until you open it.`;

  const statusItems = [
    {
      label: "Operations",
      value: String(operationTunnels.length),
      meta: "available tunnels",
      tone: "running"
    },
    {
      label: "Bot Ops",
      value: `${enabledBots}/${bots.length}`,
      meta: "bots enabled",
      tone: warningPrograms ? "warning" : "running"
    },
    {
      label: "Fleet",
      value: String(liveServers),
      meta: "live VPS instances",
      tone: "running"
    },
    {
      label: "Attention",
      value: String(nowActions + gatedActions),
      meta: "owner actions",
      tone: warningPrograms ? "warning" : "running"
    }
  ];

  elements.commandStatusGrid.innerHTML = statusItems
    .map(
      (item) => `
        <article class="command-status ${item.tone}">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
          <small>${item.meta}</small>
        </article>
      `
    )
    .join("");
}

function renderOperationTunnels() {
  const operation = selectedOperation();
  elements.operationSummary.textContent = `${operationTunnels.length} tunnels - ${operation.name}`;

  elements.operationTunnelGrid.innerHTML = operationTunnels
    .map(
      (item) => `
        <button class="tunnel-card ${item.tone}${item.id === operation.id ? " selected" : ""}" type="button" data-operation-id="${item.id}" aria-pressed="${item.id === operation.id}">
          <span class="status-pill ${item.tone}">${item.state}</span>
          <span class="tunnel-card-main">
            <strong>${item.name}</strong>
            <small>${item.lane}</small>
          </span>
          <span class="tunnel-card-metric">
            <strong>${item.metric}</strong>
            <small>${item.meta}</small>
          </span>
        </button>
      `
    )
    .join("");

  const analytics = operation.analytics
    .map(([label, value, total, color]) => {
      const percent = Math.max(4, Math.min(100, Math.round((value / total) * 100)));
      return `
        <div class="tunnel-analytic">
          <div>
            <span>${label}</span>
            <strong>${value}/${total}</strong>
          </div>
          <span class="tunnel-bar" style="--bar: ${percent}%; --bar-color: ${color}"><span></span></span>
        </div>
      `;
    })
    .join("");

  const programButtons = operation.programs
    .map((programId) => allPrograms().find((program) => program.id === programId))
    .filter(Boolean)
    .map(
      (program) =>
        `<button class="secondary-button tunnel-link" type="button" data-program-id="${program.id}">${program.name}</button>`
    )
    .join("");

  const recordButtons = operation.records
    .map((recordId) => previewRecords.find((record) => record.id === recordId))
    .filter(Boolean)
    .map(
      (record) =>
        `<button class="secondary-button tunnel-link" type="button" data-preview-id="${record.id}">${record.title}</button>`
    )
    .join("");

  elements.operationTunnelDetail.innerHTML = `
    <div class="tunnel-detail-head">
      <span class="status-pill ${operation.tone}">${operation.state}</span>
      <div>
        <p class="eyebrow">${operation.lane}</p>
        <h3>${operation.name}</h3>
        <p>${operation.summary}</p>
      </div>
    </div>
    <div class="tunnel-owner-row">
      <span>Owner</span>
      <strong>${operation.owner}</strong>
      <span>Primary signal</span>
      <strong>${operation.metric}</strong>
    </div>
    <div class="tunnel-analytics">${analytics}</div>
    <div class="tunnel-next">
      <p class="eyebrow">Next Moves</p>
      <ul>${operation.next.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
    <div class="tunnel-links">
      ${programButtons}
      ${recordButtons}
    </div>
  `;
}

function renderRootActions() {
  const visibleActions = rootActions.filter(
    (action) => activeActionFilter === "all" || action.status === activeActionFilter
  );
  const nowCount = rootActions.filter((action) => action.status === "now").length;
  const gatedCount = rootActions.filter((action) => action.status === "gated").length;

  elements.rootActionSummary.textContent = `${nowCount} now - ${gatedCount} gated`;
  elements.rootActionGrid.innerHTML = visibleActions
    .map((action) => {
      const button = action.preview
        ? `<button class="secondary-button action-open" type="button" data-preview-id="${action.preview}">Open preview</button>`
        : `<button class="secondary-button action-open" type="button" data-program-id="${action.target}">Open program</button>`;

      return `
        <article class="root-action-card ${action.status}">
          <div class="root-action-top">
            <span class="action-tag">${actionStatusLabel(action.status)}</span>
            <span class="priority-pill ${action.priority.toLowerCase()}">${action.priority}</span>
          </div>
          <h3>${action.title}</h3>
          <p class="root-action-lane">${action.lane}</p>
          <p>${action.detail}</p>
          <div class="root-action-meta">
            <span>Owner</span>
            <strong>${action.owner}</strong>
          </div>
          ${button}
        </article>
      `;
    })
    .join("");
}

function togglePair(kind, id, enabled, label) {
  return `
    <span class="toggle-pair" role="group" aria-label="${label}">
      <button class="toggle-choice${enabled ? " active" : ""}" type="button" data-${kind}-action="${kind}-on" data-${kind}-id="${id}" aria-pressed="${enabled}">On</button>
      <button class="toggle-choice${enabled ? "" : " active"}" type="button" data-${kind}-action="${kind}-off" data-${kind}-id="${id}" aria-pressed="${!enabled}">Off</button>
    </span>
  `;
}

function renderServers() {
  const visible = filteredServers();

  if (!visible.some((server) => server.id === selectedId)) {
    selectedId = visible[0]?.id || "";
  }

  if (!visible.length) {
    elements.serverList.innerHTML = `<div class="empty-state">No VPS matches this view.</div>`;
    return;
  }

  elements.serverList.innerHTML = visible
    .map((server) => {
      const selected = server.id === selectedId ? " selected" : "";
      const hot = server.cpu >= 70 || server.memory >= 80 ? " hot" : "";

      return `
        <button class="server-row${selected}" type="button" data-server-id="${server.id}">
          <span class="server-main">
            <span class="server-icon">${icon("icon-server")}</span>
            <span>
              <strong>${server.name}</strong>
              <span>${server.image}</span>
            </span>
          </span>
          <span class="server-meta">
            <strong>${server.region}</strong>
            <span>${server.ip}</span>
          </span>
          ${statusPill(server.status)}
          <span class="usage-cell${hot}">
            <strong>${server.cpu}% CPU</strong>
            <span class="usage-bar" style="--bar: ${server.cpu}%"><span></span></span>
          </span>
          <span class="row-actions">
            <span class="icon-button" data-row-action="console" title="Console" aria-label="Console">
              ${icon("icon-terminal")}
            </span>
            <span class="icon-button" data-row-action="more" title="More" aria-label="More">
              ${icon("icon-more")}
            </span>
          </span>
        </button>
      `;
    })
    .join("");
}

function selectedServer() {
  return servers.find((server) => server.id === selectedId) || null;
}

function setRing(element, value) {
  element.style.setProperty("--value", String(Math.max(0, Math.min(100, value))));
}

function renderDetail() {
  const server = selectedServer();
  if (!server) {
    elements.detailName.textContent = "Select a server";
    elements.detailStatus.className = "status-pill neutral";
    elements.detailStatus.textContent = "Idle";
    elements.detailCpu.textContent = "0%";
    elements.detailMemory.textContent = "0%";
    elements.detailDisk.textContent = "0%";
    elements.detailIp.textContent = "-";
    elements.detailRegion.textContent = "-";
    elements.detailPlan.textContent = "-";
    elements.detailUptime.textContent = "-";
    elements.trafficValue.textContent = "0 GB";
    setRing(elements.cpuRing, 0);
    setRing(elements.memoryRing, 0);
    setRing(elements.diskRing, 0);
    drawChart([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    return;
  }

  elements.detailName.textContent = server.name;
  elements.detailStatus.className = `status-pill ${server.status}`;
  elements.detailStatus.textContent = server.status;
  elements.detailCpu.textContent = `${server.cpu}%`;
  elements.detailMemory.textContent = `${server.memory}%`;
  elements.detailDisk.textContent = `${server.disk}%`;
  elements.detailIp.textContent = server.ip;
  elements.detailRegion.textContent = server.region;
  elements.detailPlan.textContent = server.plan;
  elements.detailUptime.textContent = server.uptime;
  elements.trafficValue.textContent = `${server.traffic.toLocaleString()} GB`;

  setRing(elements.cpuRing, server.cpu);
  setRing(elements.memoryRing, server.memory);
  setRing(elements.diskRing, server.disk);
  drawChart(server.series);
}

function renderBots() {
  const botCount = bots.filter((bot) => bot.enabled).length;
  const agents = bots.flatMap((bot) => bot.agents);
  const agentCount = agents.filter((agent) => agent.enabled).length;

  elements.botSummary.textContent = `${botCount}/${bots.length} bots on - ${agentCount}/${agents.length} agents on`;
  elements.botGrid.innerHTML = bots
    .map((bot) => {
      const status = botStatus(bot);
      const selected = bot.id === selectedProgramId ? " selected" : "";
      const activeAgents = bot.agents.filter((agent) => agent.enabled).length;
      const agentRows = bot.agents
        .map(
          (agent) => `
            <div class="agent-row">
              <span class="agent-main">
                <strong>${agent.name}</strong>
                <span>${agent.role}</span>
              </span>
              ${statusPill(agent.enabled ? "running" : "stopped")}
              ${togglePair("agent", agent.id, agent.enabled, `${agent.name} power`)}
            </div>
          `
        )
        .join("");

      return `
        <section class="bot-row${selected}" data-bot-id="${bot.id}">
          <div class="bot-row-head">
            <span class="bot-main">
              <span class="bot-icon">${icon("icon-power")}</span>
              <span>
                <strong>${bot.name}</strong>
                <span>${bot.lane} - ${activeAgents}/${bot.agents.length} agents on</span>
              </span>
            </span>
            ${statusPill(status)}
            ${togglePair("bot", bot.id, bot.enabled, `${bot.name} power`)}
          </div>
          <div class="agent-list">
            ${agentRows}
          </div>
        </section>
      `;
    })
    .join("");
}

function allPrograms() {
  return [visualizerHub, ...bots];
}

function selectedProgram() {
  return allPrograms().find((program) => program.id === selectedProgramId) || visualizerHub;
}

function renderFlow() {
  const operation = selectedOperation();

  elements.flowContext.innerHTML = `
    <span class="status-pill ${operation.tone}">${operation.state}</span>
    <span>
      <strong>${operation.name}</strong>
      <small>${operation.summary}</small>
    </span>
  `;
}

function setActiveFlowTarget(target) {
  document.querySelectorAll("[data-flow-target]").forEach((step) => {
    step.classList.toggle("active", step.dataset.flowTarget === target);
  });
}

function selectOperation(id, scrollToTunnel = false) {
  if (!operationTunnels.some((operation) => operation.id === id)) return;
  selectedOperationId = id;
  renderOperationTunnels();
  renderFlow();
  setActiveFlowTarget("#operationTunnels");

  if (scrollToTunnel) {
    document.querySelector("#operationTunnels").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function selectProgram(id, scrollToVisualizer = false) {
  selectedProgramId = id;
  renderVisualizer();
  renderBots();
  renderFlow();

  if (scrollToVisualizer) {
    setActiveFlowTarget("#programVisualizer");
    document.querySelector("#programVisualizer").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderVisualizerDetail() {
  const program = selectedProgram();
  const status = programStatus(program);
  const agents = program.agents || [
    { name: "Supervisor", role: "Starts, stops, restarts, and records worker state", enabled: true },
    { name: "Records Browser", role: "Opens summaries and exports inside the control panel", enabled: true },
    { name: "Sensitive Guard", role: "Keeps private trust paths out of public routes", enabled: true }
  ];

  elements.visualizerDetail.innerHTML = `
    <div class="visualizer-detail-head">
      <span class="status-pill ${status}">${status}</span>
      <h3>${program.name}</h3>
      <p>${program.lane}</p>
    </div>
    <dl class="program-facts">
      <div>
        <dt>Cadence</dt>
        <dd>${program.cadence}</dd>
      </div>
      <div>
        <dt>Latest health</dt>
        <dd>${program.health}</dd>
      </div>
      <div>
        <dt>Approval gate</dt>
        <dd>${program.gate}</dd>
      </div>
      <div>
        <dt>Record</dt>
        <dd>${program.record}</dd>
      </div>
    </dl>
    <div class="program-agents">
      ${agents
        .map(
          (agent) => `
            <div class="program-agent">
              <span class="status-dot-small ${agent.enabled ? "on" : "off"}"></span>
              <span>
                <strong>${agent.name}</strong>
                <small>${agent.role}</small>
              </span>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderVisualizer() {
  const programs = allPrograms();
  const enabledCount = bots.filter((bot) => bot.enabled).length;
  elements.visualizerSummary.textContent = `${enabledCount}/${bots.length} bots enabled`;

  const lines = visualizerConnections
    .map(([from, to]) => {
      const a = visualizerPositions[from];
      const b = visualizerPositions[to];
      if (!a || !b) return "";
      return `<line x1="${a.x}%" y1="${a.y}%" x2="${b.x}%" y2="${b.y}%"></line>`;
    })
    .join("");

  const nodes = programs
    .map((program) => {
      const position = visualizerPositions[program.id];
      const status = programStatus(program);
      const selected = program.id === selectedProgramId ? " selected" : "";
      return `
        <button class="program-node ${status}${selected}" type="button" data-program-id="${program.id}" style="left: ${position.x}%; top: ${position.y}%;">
          <strong>${program.name}</strong>
          <span>${program.lane}</span>
        </button>
      `;
    })
    .join("");

  elements.botMap.innerHTML = `
    <svg class="program-links" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">${lines}</svg>
    ${nodes}
  `;
  renderVisualizerDetail();
}

function renderPreviewGrid() {
  elements.previewGrid.innerHTML = previewRecords
    .map(
      (record) => `
        <article class="preview-card">
          <span>${record.type}</span>
          <h3>${record.title}</h3>
          <p>${record.summary}</p>
          <button class="secondary-button preview-open" type="button" data-preview-id="${record.id}">Open preview</button>
        </article>
      `
    )
    .join("");
}

function openPreview(id) {
  const record = previewRecords.find((item) => item.id === id);
  if (!record) return;

  elements.previewEyebrow.textContent = record.type;
  elements.previewTitle.textContent = record.title;
  elements.previewContent.innerHTML = `
    <p>${record.summary}</p>
    <div class="preview-table-wrap">
      <table class="preview-table">
        <thead>
          <tr>${record.columns.map((column) => `<th>${column}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${record.rows
            .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
            .join("")}
        </tbody>
      </table>
    </div>
  `;
  elements.previewModal.hidden = false;
}

function closePreview() {
  elements.previewModal.hidden = true;
}

function drawChart(series) {
  const canvas = elements.trafficChart;
  const context = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const bounds = canvas.getBoundingClientRect();
  const width = Math.max(280, Math.floor(bounds.width));
  const height = Math.max(120, Math.floor(width / 2.9));

  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);

  const padding = 24;
  const max = Math.max(...series, 100);
  const min = 0;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const points = series.map((value, index) => {
    const x = padding + (index / (series.length - 1)) * innerWidth;
    const y = padding + (1 - (value - min) / (max - min)) * innerHeight;
    return { x, y };
  });

  context.strokeStyle = "#d8e0e5";
  context.lineWidth = 1;
  context.beginPath();
  for (let i = 0; i < 4; i += 1) {
    const y = padding + (innerHeight / 3) * i;
    context.moveTo(padding, y);
    context.lineTo(width - padding, y);
  }
  context.stroke();

  const gradient = context.createLinearGradient(0, padding, 0, height - padding);
  gradient.addColorStop(0, "rgba(15, 118, 110, 0.26)");
  gradient.addColorStop(1, "rgba(15, 118, 110, 0)");

  context.beginPath();
  points.forEach((point, index) => {
    if (index === 0) context.moveTo(point.x, point.y);
    else context.lineTo(point.x, point.y);
  });
  context.lineTo(width - padding, height - padding);
  context.lineTo(padding, height - padding);
  context.closePath();
  context.fillStyle = gradient;
  context.fill();

  context.beginPath();
  points.forEach((point, index) => {
    if (index === 0) context.moveTo(point.x, point.y);
    else context.lineTo(point.x, point.y);
  });
  context.strokeStyle = "#0f766e";
  context.lineWidth = 3;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.stroke();

  const last = points[points.length - 1];
  context.beginPath();
  context.arc(last.x, last.y, 4, 0, Math.PI * 2);
  context.fillStyle = "#ffffff";
  context.fill();
  context.strokeStyle = "#0f766e";
  context.lineWidth = 2;
  context.stroke();
}

function renderRegions() {
  const regions = Object.entries(regionLayout).map(([name, coords]) => {
    const regionServers = servers.filter((server) => server.region === name);
    const warning = regionServers.some((server) => server.status === "warning");
    const online = regionServers.filter((server) => server.status === "running").length;
    const latency = 18 + Math.floor(coords.x / 6) + Math.floor(coords.y / 8);

    return `
      <div class="region-node${warning ? " warning" : ""}" style="left: clamp(70px, ${coords.x}%, calc(100% - 70px)); top: clamp(38px, ${coords.y}%, calc(100% - 38px));">
        <strong>${name}</strong>
        <span>${online}/${regionServers.length || 1} online - ${latency} ms</span>
      </div>
    `;
  });

  elements.regionMap.innerHTML = regions.join("");
}

function renderLog() {
  elements.activityLog.innerHTML = logs
    .map(
      (entry) => `
        <li>
          <time>${entry.time}</time>
          <span>
            <strong>${entry.title}</strong>
            <span>${entry.detail}</span>
          </span>
        </li>
      `
    )
    .join("");
}

function updateTimestamp() {
  const now = new Date();
  elements.updatedAt.textContent = `Updated ${now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })}`;
}

function renderAll() {
  renderCommandOverview();
  renderOperationTunnels();
  renderRootActions();
  renderMetrics();
  renderServers();
  renderDetail();
  renderBots();
  renderVisualizer();
  renderPreviewGrid();
  renderFlow();
  renderRegions();
  renderLog();
}

function selectServer(id) {
  selectedId = id;
  renderServers();
  renderDetail();
}

function addLog(title, detail) {
  const now = new Date();
  logs = [
    {
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title,
      detail
    },
    ...logs
  ].slice(0, 8);
  renderLog();
}

function findBot(id) {
  return bots.find((bot) => bot.id === id);
}

function findAgent(id) {
  for (const bot of bots) {
    const agent = bot.agents.find((item) => item.id === id);
    if (agent) return { bot, agent };
  }

  return null;
}

function setBotEnabled(bot, enabled) {
  bot.enabled = enabled;
  bot.agents.forEach((agent) => {
    agent.enabled = enabled;
  });
  updateTimestamp();
  renderBots();
  renderVisualizer();
  renderCommandOverview();
  renderFlow();
  addLog("Bot power changed", `${bot.name} switched ${enabled ? "on" : "off"}`);
}

function setAgentEnabled(bot, agent, enabled) {
  agent.enabled = enabled;
  if (enabled) {
    bot.enabled = true;
  } else if (bot.agents.every((item) => !item.enabled)) {
    bot.enabled = false;
  }

  updateTimestamp();
  renderBots();
  renderVisualizer();
  renderCommandOverview();
  renderFlow();
  addLog("Agent power changed", `${agent.name} switched ${enabled ? "on" : "off"} for ${bot.name}`);
}

function randomizeMetrics() {
  servers.forEach((server) => {
    if (server.status === "stopped") {
      server.cpu = 0;
      server.memory = Math.max(7, server.memory + Math.round(Math.random() * 2 - 1));
      return;
    }

    server.cpu = Math.max(12, Math.min(95, server.cpu + Math.round(Math.random() * 18 - 9)));
    server.memory = Math.max(20, Math.min(96, server.memory + Math.round(Math.random() * 10 - 5)));
    server.disk = Math.max(12, Math.min(96, server.disk + Math.round(Math.random() * 4 - 1)));
    server.traffic += Math.round(Math.random() * 24);
    server.series = [...server.series.slice(1), server.cpu + Math.round(Math.random() * 8 - 4)];
    server.status = server.cpu > 82 || server.memory > 88 ? "warning" : "running";
  });

  updateTimestamp();
  renderAll();
  addLog("Metrics refreshed", "Fleet telemetry updated across all regions");
}

function openModal() {
  elements.serverModal.hidden = false;
  elements.serverForm.elements.name.focus();
}

function closeModal() {
  elements.serverModal.hidden = true;
  elements.serverForm.reset();
}

function createServer(formData) {
  const region = formData.get("region");
  const plan = formData.get("plan");
  const name = formData.get("name").trim();
  const seed = servers.length + 19;
  const server = {
    id: `srv-${Date.now()}`,
    name,
    ip: `203.0.113.${seed}`,
    region,
    plan,
    image: formData.get("image"),
    status: "running",
    cpu: 14,
    memory: 28,
    disk: 18,
    traffic: 0,
    spend: plan.startsWith("2") ? 26 : plan.startsWith("4") ? 48 : plan.startsWith("8") ? 96 : 188,
    uptime: "1m",
    series: [3, 5, 7, 9, 11, 13, 12, 14, 15, 13, 16, 14]
  };

  servers.unshift(server);
  selectedId = server.id;
  closeModal();
  updateTimestamp();
  renderAll();
  addLog("VPS created", `${name} provisioned in ${region}`);
}

document.querySelectorAll("[data-status]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-status]").forEach((segment) => segment.classList.remove("active"));
    button.classList.add("active");
    activeStatus = button.dataset.status;
    renderServers();
    renderDetail();
  });
});

document.querySelectorAll("[data-action-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-action-filter]").forEach((segment) => segment.classList.remove("active"));
    button.classList.add("active");
    activeActionFilter = button.dataset.actionFilter;
    renderRootActions();
  });
});

elements.serverList.addEventListener("click", (event) => {
  const row = event.target.closest(".server-row");
  if (!row) return;

  const action = event.target.closest("[data-row-action]");
  selectServer(row.dataset.serverId);

  if (action?.dataset.rowAction === "console") {
    const server = selectedServer();
    if (server) addLog("Console opened", `${server.name} session prepared`);
  }
});

elements.botGrid.addEventListener("click", (event) => {
  const botButton = event.target.closest("[data-bot-action]");
  if (botButton) {
    const bot = findBot(botButton.dataset.botId);
    if (!bot) return;
    setBotEnabled(bot, botButton.dataset.botAction === "bot-on");
    return;
  }

  const agentButton = event.target.closest("[data-agent-action]");
  if (!agentButton) {
    const row = event.target.closest("[data-bot-id]");
    if (row) selectProgram(row.dataset.botId);
    return;
  }

  const match = findAgent(agentButton.dataset.agentId);
  if (!match) return;
  setAgentEnabled(match.bot, match.agent, agentButton.dataset.agentAction === "agent-on");
});

elements.botMap.addEventListener("click", (event) => {
  const node = event.target.closest("[data-program-id]");
  if (!node) return;
  selectProgram(node.dataset.programId);
});

elements.operationTunnelGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-operation-id]");
  if (!card) return;
  selectOperation(card.dataset.operationId);
});

elements.operationTunnelDetail.addEventListener("click", (event) => {
  const previewButton = event.target.closest("[data-preview-id]");
  if (previewButton) {
    openPreview(previewButton.dataset.previewId);
    return;
  }

  const programButton = event.target.closest("[data-program-id]");
  if (!programButton) return;
  selectProgram(programButton.dataset.programId, true);
});

elements.rootActionGrid.addEventListener("click", (event) => {
  const previewButton = event.target.closest("[data-preview-id]");
  if (previewButton) {
    openPreview(previewButton.dataset.previewId);
    return;
  }

  const programButton = event.target.closest("[data-program-id]");
  if (!programButton) return;
  selectProgram(programButton.dataset.programId, true);
});

elements.flowStrip.addEventListener("click", (event) => {
  const step = event.target.closest("[data-flow-target]");
  if (!step) return;
  setActiveFlowTarget(step.dataset.flowTarget);
  document.querySelector(step.dataset.flowTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
});

elements.previewGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-preview-id]");
  if (!button) return;
  openPreview(button.dataset.previewId);
});

elements.searchInput.addEventListener("input", () => {
  renderServers();
  renderDetail();
});
elements.regionSelect.addEventListener("change", () => {
  renderServers();
  renderDetail();
});

document.querySelector("#refreshButton").addEventListener("click", randomizeMetrics);
document.querySelector("#newServerButton").addEventListener("click", openModal);
document.querySelector("#visualizerButton").addEventListener("click", () => {
  document.querySelector("#programVisualizer").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.querySelector("#closeModalButton").addEventListener("click", closeModal);
document.querySelector("#cancelModalButton").addEventListener("click", closeModal);
document.querySelector("#closePreviewButton").addEventListener("click", closePreview);

document.querySelector("#clearLogButton").addEventListener("click", () => {
  logs = [];
  renderLog();
});

document.querySelector("#consoleButton").addEventListener("click", () => {
  const server = selectedServer();
  if (server) addLog("Console opened", `${server.name} session prepared`);
});

document.querySelector("#powerButton").addEventListener("click", () => {
  const server = selectedServer();
  if (!server) return;
  server.status = server.status === "stopped" ? "running" : "stopped";
  server.cpu = server.status === "stopped" ? 0 : 18;
  server.uptime = server.status === "stopped" ? "0h" : "1m";
  updateTimestamp();
  renderAll();
  addLog("Power state changed", `${server.name} is now ${server.status}`);
});

document.querySelector("#copyIpButton").addEventListener("click", async () => {
  const server = selectedServer();
  if (!server) return;
  try {
    await navigator.clipboard.writeText(server.ip);
    addLog("IP copied", `${server.ip} copied from ${server.name}`);
  } catch {
    addLog("IP selected", `${server.ip} is ready to copy`);
  }
});

elements.serverModal.addEventListener("click", (event) => {
  if (event.target === elements.serverModal) closeModal();
});

elements.previewModal.addEventListener("click", (event) => {
  if (event.target === elements.previewModal) closePreview();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.serverModal.hidden) closeModal();
  if (event.key === "Escape" && !elements.previewModal.hidden) closePreview();
});

elements.serverForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createServer(new FormData(elements.serverForm));
});

window.addEventListener("resize", () => {
  const server = selectedServer();
  drawChart(server ? server.series : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
});

updateTimestamp();
renderAll();
