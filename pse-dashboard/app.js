const ranges = {
  today: {
    label: "Truth Check",
    metrics: {
      revenue: 14,
      deals: 5,
      conversion: 0,
      applicants: 9,
      revenueTrend: "Static tunnel index",
      dealsTrend: "Marked active only",
      conversionTrend: "No verified live feed",
      applicantsTrend: "Needs human approval",
    },
    goals: { revenue: 14, deals: 14, applicants: 14 },
    momentum: {
      labels: ["Mapped", "Sourced", "Active", "Gated", "Blocked", "Live feed"],
      revenue: [14, 11, 5, 9, 2, 0],
      target: [14, 14, 14, 14, 14, 14],
    },
    pipeline: [
      ["Service", 3, "#2596a6"],
      ["Automation", 2, "#7157d9"],
      ["Revenue / People", 3, "#2563eb"],
      ["Other Support", 6, "#b7791f"],
    ],
    reps: [
      ["Mapped", 14],
      ["Needs source", 9],
      ["Active", 5],
      ["Blocked", 2],
    ],
    funnel: [
      ["Mapped tunnels", 14, "#2596a6"],
      ["Local files", 11, "#2563eb"],
      ["Approval gates", 9, "#b7791f"],
      ["Live feeds", 0, "#d04f3f"],
    ],
    followUps: [
      ["Data policy", "Do not show revenue/deals without a source feed", "PSE", "High", "In force", "sales"],
      ["Operation owners", "Confirm real owner names before publishing", "PSE", "High", "Needs source", "sales"],
      ["Worker intake", "Connect only verified registration totals", "PSE", "Medium", "Not connected", "recruiting"],
      ["Compliance gates", "Keep approval-required lanes visibly gated", "PSE", "High", "Visible", "sales"],
      ["Public copy", "Keep private metrics out of public pages", "PSE", "Medium", "Guarded", "sales"],
    ],
    activities: [
      ["Truth", "Demo numbers removed from the board", "Only source-backed status should display"],
      ["Source", "Operation tunnels are a local static index", "No live business feed is connected"],
      ["Gate", "Approval lanes remain marked before outreach or publishing", "Honesty-first operating view"],
    ],
  },
  week: {
    label: "Source Review",
    metrics: {
      revenue: 14,
      deals: 11,
      conversion: 0,
      applicants: 9,
      revenueTrend: "Mapped in this file",
      dealsTrend: "Have local context",
      conversionTrend: "No live feed",
      applicantsTrend: "Approval or source checks",
    },
    goals: { revenue: 14, deals: 14, applicants: 14 },
    momentum: {
      labels: ["Mapped", "Docs", "Runbooks", "Reports", "Gates", "Live feed"],
      revenue: [14, 11, 7, 5, 9, 0],
      target: [14, 14, 14, 14, 14, 14],
    },
    pipeline: [
      ["Local docs", 7, "#2596a6"],
      ["Reports", 5, "#2563eb"],
      ["Compliance gates", 9, "#b7791f"],
      ["Live feeds", 0, "#d04f3f"],
    ],
    reps: [
      ["Mapped", 14],
      ["Local context", 11],
      ["Needs owner", 9],
      ["Live feed", 0],
    ],
    funnel: [
      ["Mapped tunnels", 14, "#2596a6"],
      ["Has files", 11, "#2563eb"],
      ["Needs approval", 9, "#b7791f"],
      ["Verified metrics", 0, "#d04f3f"],
    ],
    followUps: [
      ["Source audit", "Attach each tunnel to its source file", "PSE", "High", "Open", "sales"],
      ["Metric feeds", "Do not estimate sales or applicant counts", "PSE", "High", "Open", "sales"],
      ["Owners", "Replace placeholder owners with confirmed owners", "PSE", "Medium", "Open", "sales"],
      ["Recruiting", "Use worker-registration storage before showing totals", "PSE", "Medium", "Not connected", "recruiting"],
      ["Publishing", "Keep YouTube and channel work gated until authorized", "PSE", "High", "Gated", "sales"],
    ],
    activities: [
      ["Source", "Static tunnel map is visible", "Use the tunnel detail before acting"],
      ["Metric", "No sales, deal, or applicant totals are asserted", "Verified feed required"],
      ["Owner", "Placeholder names should be confirmed or removed", "Truth mode keeps gaps visible"],
    ],
  },
  month: {
    label: "Approval Gates",
    metrics: {
      revenue: 14,
      deals: 9,
      conversion: 0,
      applicants: 2,
      revenueTrend: "Every tunnel shown",
      dealsTrend: "Approval or evidence needed",
      conversionTrend: "No verified live feed",
      applicantsTrend: "Blocked until source exists",
    },
    goals: { revenue: 14, deals: 14, applicants: 14 },
    momentum: {
      labels: ["Mapped", "Review", "Approve", "Connect", "Publish"],
      revenue: [14, 9, 5, 0, 0],
      target: [14, 14, 14, 14, 14],
    },
    pipeline: [
      ["Human approval", 5, "#b7791f"],
      ["Source missing", 4, "#d04f3f"],
      ["Ready with guardrails", 3, "#2563eb"],
      ["Support", 2, "#64748b"],
    ],
    reps: [
      ["Mapped", 14],
      ["Gated", 9],
      ["Blocked", 2],
      ["Live feed", 0],
    ],
    funnel: [
      ["Tunnels", 14, "#2596a6"],
      ["Gates", 9, "#b7791f"],
      ["Blocked", 2, "#d04f3f"],
      ["Connected feeds", 0, "#64748b"],
    ],
    followUps: [
      ["Compliance", "Approve health-insurance language before use", "PSE", "High", "Gated", "sales"],
      ["Medical delivery", "Complete training before operations expand", "PSE", "High", "Gated", "sales"],
      ["YouTube", "No publishing without official account authorization", "PSE", "High", "Gated", "sales"],
      ["Surplus research", "No outreach until permitted use is confirmed", "PSE", "High", "Gated", "sales"],
      ["Referrals", "No campaign until official link is confirmed", "PSE", "Medium", "Blocked", "sales"],
    ],
    activities: [
      ["Gate", "Approval-required tunnels remain visible", "No hidden green lights"],
      ["Truth", "Missing metrics are shown as missing", "No invented counts"],
      ["Scope", "Tunnels explain limits before action", "Use detail view for the guardrails"],
    ],
  },
};

const marketMultipliers = {
  all: { revenue: 1, deals: 1, applicants: 1, conversion: 1 },
  public: { revenue: 1, deals: 1, applicants: 1, conversion: 1 },
  operations: { revenue: 1, deals: 1, applicants: 1, conversion: 1 },
  vps: { revenue: 1, deals: 1, applicants: 1, conversion: 1 },
  gates: { revenue: 1, deals: 1, applicants: 1, conversion: 1 },
};

const colors = {
  revenue: "#2596a6",
  target: "#172033",
  deals: "#2563eb",
  applicants: "#d04f3f",
  grid: "#d8e0ea",
  muted: "#637083",
  ink: "#18202b",
};

const operationVisuals = {
  "command-dashboard": { label: "Command", icon: "op-command", color: "#2596a6", soft: "#e7f8fb" },
  "website-sales": { label: "Web Sales", icon: "op-website", color: "#2563eb", soft: "#eaf0ff" },
  "sales-recruiting": { label: "Recruiting", icon: "op-recruiting", color: "#16865a", soft: "#e5f8ef" },
  "medical-supply-delivery": { label: "Med Delivery", icon: "op-delivery", color: "#b7791f", soft: "#fff3d8" },
  "health-insurance": { label: "Health Leads", icon: "op-health", color: "#d04f3f", soft: "#ffe9e5" },
  "barnacle-removal": { label: "Barnacle", icon: "op-marine", color: "#137d8b", soft: "#e4f6f8" },
  "solar-bird-proofing": { label: "Solar Proof", icon: "op-solar", color: "#ca8a04", soft: "#fff4cc" },
  "youtube-media": { label: "YouTube", icon: "op-media", color: "#dc2626", soft: "#fee2e2" },
  "vps-bot-ops": { label: "Bot Ops", icon: "op-automation", color: "#7157d9", soft: "#f0edff" },
  "sports-arbitrage": { label: "Sports", icon: "op-sports", color: "#d04f3f", soft: "#ffe9e5" },
  "surplus-funds": { label: "Surplus", icon: "op-research", color: "#0f766e", soft: "#e3f8f4" },
  "trezor-referrals": { label: "Trezor", icon: "op-referral", color: "#7c3aed", soft: "#f1eaff" },
  "channel-updates": { label: "Channels", icon: "op-channel", color: "#2563eb", soft: "#eaf0ff" },
  "documents-handoffs": { label: "Docs", icon: "op-docs", color: "#64748b", soft: "#eef2f7" },
};

const defaultOperationVisual = { label: "Operation", icon: "op-command", color: "#2596a6", soft: "#e7f8fb" };

const operations = [
  {
    id: "command-dashboard",
    name: "PSE Command Dashboard",
    category: "Control",
    status: "Live",
    tone: "active",
    owner: "PSE",
    metric: "14 lanes mapped",
    meta: "brand pull-up view",
    freshness: "Today",
    summary: "Simple branded command view for seeing every operation, opening its tunnel, and checking the next gate without digging through folders.",
    tunnel: [
      ["Collect", "Pull lane notes, reports, and active dashboard signals into one view.", "active"],
      ["Map", "Group every operation by status, owner, scope, blockers, and outputs.", "active"],
      ["Watch", "Keep gates visible before work moves into outreach, publishing, or paid traffic.", "watch"],
      ["Decide", "Use the open tunnel to choose the next move for the selected lane.", "active"]
    ],
    scope: [
      ["Brand", "Pilot Sales Enterprise logo, colors, and command-center language"],
      ["Coverage", "Sales, recruiting, media, bots, referrals, research, documents, and service lanes"],
      ["Source", "PSE dashboard files plus operations-hub records"]
    ],
    analytics: [
      ["Mapped lanes", 14, 14, "#16865a"],
      ["Live or active", 5, 14, "#2596a6"],
      ["Gated lanes", 6, 14, "#b7791f"],
      ["Support lanes", 3, 14, "#2563eb"]
    ],
    charts: ["All Operation Tunnels", "Priority Follow-Ups", "Live Activity"],
    next: ["Choose a production location", "Keep this source versioned", "Update tunnel status after each lane changes"]
  },
  {
    id: "website-sales",
    name: "Website Sales",
    category: "Revenue",
    status: "Active",
    tone: "active",
    owner: "Unverified",
    metric: "No revenue feed",
    meta: "source needed",
    freshness: "Needs verification",
    summary: "Website sales is mapped, but verified revenue, deal, proposal, and customer data are not connected.",
    tunnel: [
      ["Lead", "Capture website prospects and market demand.", "active"],
      ["Qualify", "Move prospects into demos, pricing, and proposal follow-ups.", "active"],
      ["Close", "Track offers, decision-maker activity, and rep performance.", "active"],
      ["Retain", "Record upsells, referrals, and account expansion chances.", "watch"]
    ],
    scope: [
      ["Offer", "Website and sales service packages"],
      ["Team", "Rep close rate, proposal quality, and follow-up speed"],
      ["Output", "Only source-backed revenue, deal, and account notes"]
    ],
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Revenue feed", 0, 1, "#d04f3f"],
      ["Owner verified", 0, 1, "#b7791f"]
    ],
    charts: ["Source Coverage", "Tunnel Mix"],
    next: ["Choose a sales source of truth", "Connect it before showing numbers", "Remove placeholder owner names"]
  },
  {
    id: "sales-recruiting",
    name: "Sales Recruiting",
    category: "People",
    status: "Active",
    tone: "active",
    owner: "Unverified",
    metric: "No applicant feed",
    meta: "source needed",
    freshness: "Needs verification",
    summary: "Recruiting is mapped, but applicant and interview counts are hidden until a verified feed is connected.",
    tunnel: [
      ["Source", "Use worker registration storage or an approved recruiting tracker.", "hold"],
      ["Verify", "Confirm totals before showing applicant or interview counts.", "watch"],
      ["Protect", "Keep private contact details out of the public dashboard.", "active"],
      ["Report", "Display only aggregate, approved recruiting status.", "watch"]
    ],
    scope: [
      ["Known", "Worker registration route exists in the site server"],
      ["Not Shown", "Applicant totals, interview counts, candidate names"],
      ["Reason", "Recruiting data needs a verified source and privacy review"]
    ],
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Applicant feed", 0, 1, "#d04f3f"],
      ["Privacy gate", 1, 1, "#b7791f"]
    ],
    charts: ["Truth Funnel", "Activity Notes", "Priority Follow-Ups"],
    next: ["Point the dashboard to verified aggregate data", "Keep applicant PII private", "Confirm who owns recruiting"]
  },
  {
    id: "medical-supply-delivery",
    name: "Medical Supply Delivery",
    category: "Service",
    status: "Launching",
    tone: "watch",
    owner: "Pilot",
    metric: "Eastvale radius",
    meta: "50-mile courier lane",
    freshness: "Today",
    summary: "Transport-only contractor route lane for professional pickup and delivery of approved client-owned healthcare supplies around Eastvale.",
    tunnel: [
      ["Certify", "Finish HIPAA, Bloodborne Pathogens, OSHA 10, and HazCom training.", "watch"],
      ["Package", "Use the contractor profile, route tracker, and rate-card packet.", "active"],
      ["Apply", "Target medical courier and independent contractor route companies first.", "active"],
      ["Operate", "Accept only approved non-regulated loads until written procedures expand scope.", "hold"]
    ],
    scope: [
      ["Market", "Eastvale, California with car and truck coverage inside a 50-mile radius"],
      ["Accepted", "Healthcare office supplies, DME accessories, records, and approved supply loads"],
      ["Do Not Accept", "Controlled substances, prescriptions, oxygen, specimens, infectious waste, or cold-chain meds at launch"]
    ],
    analytics: [
      ["Training", 35, 100, "#b7791f"],
      ["Route targets", 10, 10, "#16865a"],
      ["Profile packet", 80, 100, "#2596a6"],
      ["Compliance gate", 40, 100, "#d04f3f"]
    ],
    charts: ["Priority Follow-Ups", "Live Activity"],
    next: ["Complete the first certifications", "Apply to the first courier targets", "Keep regulated-load exclusions visible"]
  },
  {
    id: "health-insurance",
    name: "Health Insurance Leads",
    category: "Revenue",
    status: "Scoped",
    tone: "watch",
    owner: "Unverified",
    metric: "Compliance first",
    meta: "scripts pending",
    freshness: "Draft",
    summary: "Lead or appointment generation after approved language, source rules, and routing are documented.",
    tunnel: [
      ["Define", "Clarify allowed offer language and appointment-routing rules.", "watch"],
      ["Approve", "Confirm sources, disclaimers, and compliance owner signoff.", "hold"],
      ["Launch", "Route approved leads or appointments to the right sales lane.", "watch"],
      ["Audit", "Keep copy, source, and follow-up records reviewable.", "watch"]
    ],
    scope: [
      ["Offer", "Lead or appointment generation only after compliance signoff"],
      ["Controls", "Approved language, approved sources, and routing rules"],
      ["Output", "Qualified handoffs with audit notes"]
    ],
    analytics: [
      ["Script approval", 35, 100, "#b7791f"],
      ["Source review", 50, 100, "#2563eb"],
      ["Rep readiness", 30, 100, "#2596a6"]
    ],
    charts: ["Priority Follow-Ups", "Live Activity"],
    next: ["Approve call language", "Define allowed sources", "Add compliance checkpoint"]
  },
  {
    id: "barnacle-removal",
    name: "Barnacle Removal",
    category: "Service",
    status: "Building",
    tone: "watch",
    owner: "Unverified",
    metric: "Offer setup",
    meta: "source needed",
    freshness: "Today",
    summary: "Barnacle removal is mapped as a planning lane until partner capacity, service areas, and job records are verified.",
    tunnel: [
      ["Research", "Verify service areas and partner candidates.", "active"],
      ["Qualify", "Collect vessel details, photos, location, growth severity, and timing.", "watch"],
      ["Match", "Route work to insured marine partners before any direct service promise.", "watch"],
      ["Book", "Track inspection, cleaning appointment, and recurring-account potential.", "active"]
    ],
    scope: [
      ["Model", "PSE handles sales, qualification, scheduling, and partner coordination"],
      ["Guardrail", "Do not promise in-water work before marina, environmental, and partner checks"],
      ["Output", "Booked inspections, partner handoffs, and recurring service opportunities"]
    ],
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Partner verified", 0, 1, "#b7791f"],
      ["Job feed", 0, 1, "#d04f3f"]
    ],
    charts: ["Tunnel Mix", "Priority Follow-Ups"],
    next: ["Confirm service areas", "Load partner capacity", "Tag local follow-ups"]
  },
  {
    id: "solar-bird-proofing",
    name: "Solar Bird Proofing",
    category: "Service",
    status: "Active",
    tone: "active",
    owner: "Unverified",
    metric: "Demand check",
    meta: "source needed",
    freshness: "Needs source",
    summary: "Solar bird proofing is mapped as a possible service lane, but market, lead, and handoff metrics need verified records before display.",
    tunnel: [
      ["Demand", "Watch city-level homeowner demand and lead quality.", "active"],
      ["Consult", "Book inspections and consultation calls.", "active"],
      ["Handoff", "Send qualified jobs to partner installers or service teams.", "active"],
      ["Follow", "Track completion, reviews, referrals, and market expansion.", "watch"]
    ],
    scope: [
      ["Market", "Home-service lead lane pending verified market source"],
      ["Workflow", "Demand check, consultation, partner handoff, follow-up"],
      ["Output", "Booked consultations and partner-ready jobs"]
    ],
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Market source", 0, 1, "#b7791f"],
      ["Lead feed", 0, 1, "#d04f3f"]
    ],
    charts: ["Tunnel Mix", "Priority Follow-Ups"],
    next: ["Verify market demand source", "Confirm partner handoff process", "Keep lead counts hidden until sourced"]
  },
  {
    id: "youtube-media",
    name: "YouTube Shorts Media",
    category: "Media",
    status: "Gated",
    tone: "watch",
    owner: "Unverified",
    metric: "Review queue",
    meta: "publishing approval needed",
    freshness: "Operations hub",
    summary: "Shorts prep, review queue, publishing readiness, and release approvals.",
    tunnel: [
      ["Package", "Prep local Shorts assets, sidecars, titles, descriptions, hashtags, and rights notes.", "active"],
      ["Review", "Manual approval checks audience setting, rights clearance, and target channel.", "watch"],
      ["Authorize", "Publisher waits for official Google OAuth client secrets and channel-owner token.", "hold"],
      ["Release", "Timed public posting stays capped and recorded after authorization.", "watch"]
    ],
    scope: [
      ["Bots", "Prep worker, watchdog, publisher, and video ledger"],
      ["Gate", "No account access or publishing without official authorization"],
      ["Output", "Ready packages, ledger exports, and release records"]
    ],
    analytics: [
      ["Package prep", 85, 100, "#16865a"],
      ["Review queue", 70, 100, "#2596a6"],
      ["Publishing gate", 20, 100, "#b7791f"]
    ],
    charts: ["Live Activity", "Priority Follow-Ups"],
    next: ["Finish owner approval", "Review first private upload", "Log release decisions"]
  },
  {
    id: "vps-bot-ops",
    name: "VPS Bot Operations",
    category: "Automation",
    status: "Active",
    tone: "active",
    owner: "Status",
    metric: "Reports staged",
    meta: "verify service state",
    freshness: "Operations hub",
    summary: "Bot health, dashboard snapshots, records browser, exports, and continuous improvement queue for the VPS control panel.",
    tunnel: [
      ["Monitor", "Check configured bots, logs, records, and status exports.", "active"],
      ["Record", "Write JSON, Markdown, CSV, and dashboard summaries for each bot lane.", "active"],
      ["Improve", "Use the improvement manager queue to refresh stale safe records.", "active"],
      ["Gate", "Keep human approval gates visible for publishing, betting, and surplus outreach.", "watch"]
    ],
    scope: [
      ["Panel", "Bot control route, service, app directory, records, and runtime logs"],
      ["Bots", "YouTube, sports, dashboard recorder, surplus, status reporter, and improvement manager"],
      ["Output", "Health status, records browser, exports, and improvement queue"]
    ],
    analytics: [
      ["Bots enabled", 9, 9, "#16865a"],
      ["Reports present", 1, 1, "#2596a6"],
      ["Human gates", 3, 3, "#b7791f"],
      ["Record lanes", 9, 9, "#2563eb"]
    ],
    charts: ["Live Activity", "Priority Follow-Ups"],
    next: ["Watch warning lanes", "Review improvement queue", "Keep dashboard source versioned"]
  },
  {
    id: "sports-arbitrage",
    name: "Sports Arbitrage Monitor",
    category: "Automation",
    status: "Read-only",
    tone: "hold",
    owner: "Compliance",
    metric: "No wager alerts",
    meta: "configuration required",
    freshness: "Operations hub",
    summary: "Read-only public-view monitor for source coverage and readiness checks. It does not place bets, bypass access controls, or send active wagering alerts.",
    tunnel: [
      ["Observe", "Check public sportsbook visibility without login, scraping bypass, or geolocation bypass.", "active"],
      ["Normalize", "Only emit odds rows when event, market, outcome, line, and price are parseable.", "watch"],
      ["Approve", "Wait for approved source, jurisdiction, operators, markets, margin, and alert channel.", "hold"],
      ["Alert", "Future alerts must be operational signals, not financial advice.", "hold"]
    ],
    scope: [
      ["Mode", "Read-only public-view monitoring"],
      ["Gate", "No active betting readiness until required configuration is approved"],
      ["Output", "Source coverage CSVs, public odds rows, and opportunity sheets when valid"]
    ],
    analytics: [
      ["Pages checked", 73, 73, "#2596a6"],
      ["Reachable pages", 44, 73, "#2563eb"],
      ["Parseable sources", 0, 2, "#d04f3f"],
      ["Compliance gate", 25, 100, "#b7791f"]
    ],
    charts: ["Live Activity", "Priority Follow-Ups"],
    next: ["Approve a compliant odds source", "Add a second parseable source", "Define an approved alert channel"]
  },
  {
    id: "surplus-funds",
    name: "Surplus Funds Research",
    category: "Research",
    status: "Research",
    tone: "watch",
    owner: "Boyle",
    metric: "Source sweeps",
    meta: "use gate open",
    freshness: "Operations hub",
    summary: "Official-source discovery and evidence notes before any lead handling or outreach.",
    tunnel: [
      ["Find", "Identify official surplus sources and evidence records.", "active"],
      ["Confirm", "Check holding office, permitted use, freshness, and source governance.", "watch"],
      ["Rank", "Improve amount parsing and source-quality scoring before lead handling.", "watch"],
      ["Outreach", "Stay blocked until permitted use and office confirmation are complete.", "hold"]
    ],
    scope: [
      ["Source", "Official public records and holding-office confirmation"],
      ["Gate", "No lead handling or outreach until permitted use is documented"],
      ["Output", "Research candidates, source evidence, and freshness notes"]
    ],
    analytics: [
      ["Source discovery", 68, 100, "#2596a6"],
      ["Amount parsing", 54, 100, "#2563eb"],
      ["Use approval", 25, 100, "#b7791f"]
    ],
    charts: ["Live Activity", "Priority Follow-Ups"],
    next: ["Record permitted use", "Keep source evidence", "Block outreach until approved"]
  },
  {
    id: "trezor-referrals",
    name: "Trezor Referrals",
    category: "Affiliate",
    status: "Blocked",
    tone: "hold",
    owner: "Owner needed",
    metric: "Launch gate blocked",
    meta: "terms checked 2026-05-23",
    freshness: "Official sources",
    summary: "VPS-staged referral or affiliate lane with compliant copy, tracker, and launch gate ready once the official link/account and channel permissions are confirmed.",
    tunnel: [
      ["Confirm", "Get the actual referral link or affiliate dashboard account.", "hold"],
      ["Route", "Use Affiliate Program for public, commercial, SEO, newsletter, paid-ad, or repeatable campaign use.", "hold"],
      ["Disclose", "Use disclosure-first copy and official link destinations.", "watch"],
      ["Publish", "Use only approved owned channels and avoid coupon-style public spam.", "hold"],
      ["Track", "Record links, channels, voucher status, and follow-up dates.", "watch"]
    ],
    scope: [
      ["Files", "Setup runbook, copy bank, referral tracker, and landing-page notes"],
      ["Gate", "No publication until the official link/account, route choice, and channel rules are confirmed"],
      ["Output", "Compliant referral posts and weekly tracking"]
    ],
    analytics: [
      ["Setup packet", 80, 100, "#2596a6"],
      ["Official terms", 100, 100, "#16865a"],
      ["Copy bank", 100, 100, "#16865a"],
      ["Referral link", 0, 1, "#d04f3f"],
      ["Channel approval", 0, 100, "#d04f3f"]
    ],
    charts: ["Live Activity", "Priority Follow-Ups"],
    next: ["Find the official referral or affiliate link", "Choose personal referral vs affiliate route", "Confirm owned channels before publishing"]
  },
  {
    id: "channel-updates",
    name: "Channel Updates",
    category: "Marketing",
    status: "Ready",
    tone: "support",
    owner: "PSE",
    metric: "Assets staged",
    meta: "owned channels first",
    freshness: "Operations hub",
    summary: "Announcement calendars, channel copy, WhatsApp promotion assets, and cross-posting checklists for owned-channel publishing.",
    tunnel: [
      ["Prepare", "Use announcement copy, social posts, and channel assets.", "active"],
      ["Approve", "Confirm account access, billing, and permissions before paid traffic.", "watch"],
      ["Publish", "Start owned-channel posts before Meta paid tests.", "active"],
      ["Measure", "Track engagement, replies, and next publishing slots.", "watch"]
    ],
    scope: [
      ["Assets", "WhatsApp banner, social card, social calendar, email draft, and ad setup notes"],
      ["Gate", "Website CMS, social account, Meta Business, and payment access"],
      ["Output", "Owned-channel posts and paid-test readiness"]
    ],
    analytics: [
      ["Owned assets", 90, 100, "#16865a"],
      ["Paid setup", 35, 100, "#b7791f"],
      ["Calendar", 70, 100, "#2596a6"],
      ["Account access", 30, 100, "#d04f3f"]
    ],
    charts: ["Live Activity", "Priority Follow-Ups"],
    next: ["Publish owned-channel assets first", "Confirm Meta billing and permissions", "Log post performance"]
  },
  {
    id: "documents-handoffs",
    name: "Documents and Handoffs",
    category: "Support",
    status: "Support",
    tone: "support",
    owner: "Docs",
    metric: "Templates lane",
    meta: "packets and records",
    freshness: "Operations hub",
    summary: "Reusable operating documents, checklists, handoff packets, route profiles, trackers, and safety notes that support the mapped lanes.",
    tunnel: [
      ["Template", "Create reusable operating docs and checklists.", "active"],
      ["Attach", "Connect docs to the operation that uses them.", "watch"],
      ["Version", "Keep source snapshots, backups, and exports traceable.", "watch"],
      ["Hand Off", "Package instructions so a lane can be resumed quickly.", "active"]
    ],
    scope: [
      ["Content", "Runbooks, contractor profiles, trackers, packets, and checklists"],
      ["Control", "Keep source and backup locations clear"],
      ["Output", "Reusable handoff packets for each operation"]
    ],
    analytics: [
      ["Templates", 45, 100, "#2596a6"],
      ["Lane links", 55, 100, "#2563eb"],
      ["Backups", 80, 100, "#16865a"],
      ["Open packets", 65, 100, "#b7791f"]
    ],
    charts: ["Live Activity", "Priority Follow-Ups"],
    next: ["Add reusable templates", "Tie each packet to a tunnel", "Keep backup notes current"]
  }
];

const truthOverrides = {
  "command-dashboard": {
    status: "Mapped",
    owner: "PSE",
    metric: "Static index",
    meta: "no live feed",
    freshness: "Local file",
    summary:
      "This is a visual index of operation tunnels. It is not a live sales, recruiting, or finance system until verified data feeds are connected.",
    tunnel: [
      ["Map", "Show each known tunnel without inventing performance numbers.", "active"],
      ["Source", "Use local files, runbooks, reports, or approved systems as the source of truth.", "watch"],
      ["Gate", "Leave approval-required work visibly gated before outreach, publishing, or regulated activity.", "watch"],
      ["Connect", "Only display live metrics after a verified feed exists.", "hold"],
    ],
    scope: [
      ["Truth Rule", "No revenue, deal, applicant, or owner claim without a verified source"],
      ["Current State", "Static dashboard index with visual tunnels"],
      ["Missing", "Live business data feed"],
    ],
    analytics: [
      ["Mapped", 1, 1, "#16865a"],
      ["Source noted", 1, 1, "#2596a6"],
      ["Live feed", 0, 1, "#d04f3f"],
    ],
    charts: ["Source Coverage", "Tunnel Mix", "Activity Notes"],
    next: ["Keep false metrics out", "Attach source paths to every tunnel", "Connect live feeds only when verified"],
  },
  "website-sales": {
    status: "Needs Source",
    tone: "watch",
    owner: "Unverified",
    metric: "No revenue feed",
    meta: "public site exists",
    freshness: "Needs verification",
    summary:
      "Website sales is mapped as a business lane, but this dashboard does not currently have verified revenue, deal, proposal, or customer data.",
    tunnel: [
      ["Source", "Identify the approved sales record or CRM before showing totals.", "hold"],
      ["Verify", "Confirm real owners, accounts, and deal stages from that system.", "watch"],
      ["Display", "Show only source-backed metrics once connected.", "hold"],
      ["Audit", "Keep the source path visible for every sales claim.", "watch"],
    ],
    scope: [
      ["Known", "Public website and sales-lane idea are present"],
      ["Not Shown", "Revenue, closed deals, close rate, and customer names"],
      ["Reason", "No verified sales data feed is connected"],
    ],
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Revenue feed", 0, 1, "#d04f3f"],
      ["Owner verified", 0, 1, "#b7791f"],
    ],
    charts: ["Source Coverage", "Tunnel Mix"],
    next: ["Choose a sales source of truth", "Connect it before showing numbers", "Remove placeholder owner names"],
  },
  "sales-recruiting": {
    status: "Needs Source",
    tone: "watch",
    owner: "Unverified",
    metric: "No applicant feed",
    meta: "worker intake exists",
    freshness: "Needs verification",
    summary:
      "Recruiting is mapped, but applicant counts and interview counts are not shown because no verified recruiting feed is connected to this dashboard.",
    tunnel: [
      ["Source", "Use worker registration storage or an approved recruiting tracker.", "hold"],
      ["Verify", "Confirm totals before showing applicant or interview counts.", "watch"],
      ["Protect", "Keep private contact details out of the public dashboard.", "active"],
      ["Report", "Display only aggregate, approved recruiting status.", "watch"],
    ],
    scope: [
      ["Known", "Worker registration route exists in the site server"],
      ["Not Shown", "Applicant totals, interview counts, candidate names"],
      ["Reason", "Recruiting data needs a verified source and privacy review"],
    ],
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Applicant feed", 0, 1, "#d04f3f"],
      ["Privacy gate", 1, 1, "#b7791f"],
    ],
    charts: ["Truth Funnel", "Activity Notes", "Priority Follow-Ups"],
    next: ["Point the dashboard to verified aggregate data", "Keep applicant PII private", "Confirm who owns recruiting"],
  },
  "medical-supply-delivery": {
    status: "Gated",
    owner: "Unverified",
    metric: "Training first",
    meta: "transport-only scope",
    freshness: "Local files",
    summary:
      "Medical supply delivery remains a gated setup lane. The dashboard should keep certification, scope, and regulated-load limits visible before any operations expand.",
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Training gate", 1, 1, "#b7791f"],
      ["Live ops feed", 0, 1, "#d04f3f"],
    ],
    charts: ["Priority Follow-Ups", "Activity Notes"],
    next: ["Complete required training", "Keep transport-only limits visible", "Verify any route source before posting"],
  },
  "health-insurance": {
    status: "Compliance Gate",
    tone: "hold",
    owner: "Unverified",
    metric: "Approval needed",
    meta: "no live lead feed",
    freshness: "Draft",
    summary:
      "Health insurance work must stay gated until approved language, source rules, routing, and compliance ownership are confirmed.",
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Compliance approval", 0, 1, "#d04f3f"],
      ["Lead feed", 0, 1, "#d04f3f"],
    ],
    charts: ["Priority Follow-Ups", "Activity Notes"],
    next: ["Confirm approved wording", "Document source rules", "Do not show lead counts without a verified feed"],
  },
  "barnacle-removal": {
    status: "Planning",
    owner: "Unverified",
    metric: "Partner checks",
    meta: "no job feed",
    freshness: "Local files",
    summary:
      "Barnacle removal is a planning lane until service areas, partner capacity, environmental checks, and job records are verified.",
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Partner verified", 0, 1, "#b7791f"],
      ["Job feed", 0, 1, "#d04f3f"],
    ],
    charts: ["Tunnel Mix", "Priority Follow-Ups"],
    next: ["Verify service partners", "Confirm allowed service areas", "Do not imply booked jobs without records"],
  },
  "solar-bird-proofing": {
    status: "Planning",
    tone: "watch",
    owner: "Unverified",
    metric: "Demand check",
    meta: "no lead feed",
    freshness: "Needs source",
    summary:
      "Solar bird proofing is mapped as a possible service lane, but market count, lead quality, and handoff metrics need verified records before display.",
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Market source", 0, 1, "#b7791f"],
      ["Lead feed", 0, 1, "#d04f3f"],
    ],
    charts: ["Tunnel Mix", "Priority Follow-Ups"],
    next: ["Verify market demand source", "Confirm partner handoff process", "Keep lead counts hidden until sourced"],
  },
  "youtube-media": {
    status: "Approval Gate",
    owner: "Unverified",
    metric: "Owner approval",
    meta: "no publishing claim",
    freshness: "Local reports",
    summary:
      "YouTube media remains gated. The dashboard should show prep and approval status only, not account access, publishing, or performance claims.",
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Owner approval", 0, 1, "#d04f3f"],
      ["Publish feed", 0, 1, "#d04f3f"],
    ],
    charts: ["Activity Notes", "Priority Follow-Ups"],
    next: ["Confirm channel-owner authorization", "Keep publishing blocked until approved", "Record source files for media packages"],
  },
  "vps-bot-ops": {
    status: "Reports",
    owner: "Unverified",
    metric: "Reports staged",
    meta: "verify service state",
    freshness: "Local reports",
    summary:
      "VPS bot operations has local report material, but service health should be verified from the running system before showing live bot counts.",
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Reports present", 1, 1, "#2596a6"],
      ["Live service feed", 0, 1, "#d04f3f"],
    ],
    charts: ["Activity Notes", "Priority Follow-Ups"],
    next: ["Verify service status from the VPS", "Connect logs before showing live counts", "Keep human approval gates visible"],
  },
  "sports-arbitrage": {
    status: "Read-Only Gate",
    owner: "Compliance",
    metric: "No wager alerts",
    meta: "configuration required",
    freshness: "Local reports",
    summary:
      "Sports arbitrage stays read-only. The dashboard must not imply betting readiness, financial advice, or active alerting without approved configuration.",
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Compliance gate", 1, 1, "#b7791f"],
      ["Active alerts", 0, 1, "#d04f3f"],
    ],
    charts: ["Activity Notes", "Priority Follow-Ups"],
    next: ["Keep read-only language", "Approve sources before alerts", "Do not show opportunities as advice"],
  },
  "surplus-funds": {
    status: "Research Only",
    owner: "Unverified",
    metric: "No outreach",
    meta: "use approval needed",
    freshness: "Local reports",
    summary:
      "Surplus funds is research-only until official sources, permitted use, and outreach rules are confirmed.",
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Official source", 0, 1, "#b7791f"],
      ["Outreach allowed", 0, 1, "#d04f3f"],
    ],
    charts: ["Activity Notes", "Priority Follow-Ups"],
    next: ["Record official source evidence", "Confirm permitted use", "Block outreach until approved"],
  },
  "trezor-referrals": {
    status: "Blocked",
    owner: "Owner needed",
    metric: "Launch gate blocked",
    meta: "do not publish",
    freshness: "Verified 2026-05-23",
    summary:
      "Trezor referrals stay blocked until the official referral or affiliate link/account, route choice, and owned-channel rules are verified.",
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Official terms", 1, 1, "#16865a"],
      ["Official link", 0, 1, "#d04f3f"],
      ["Publication allowed", 0, 1, "#d04f3f"],
    ],
    charts: ["Activity Notes", "Priority Follow-Ups"],
    next: ["Get the official link", "Confirm channel rules", "Keep campaign unpublished until sourced"],
  },
  "channel-updates": {
    status: "Guarded",
    owner: "Unverified",
    metric: "Assets staged",
    meta: "owned channels first",
    freshness: "Local files",
    summary:
      "Channel updates can use staged owned-channel assets, while paid traffic and account claims remain gated until permissions and billing are verified.",
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Assets present", 1, 1, "#2596a6"],
      ["Paid access", 0, 1, "#d04f3f"],
    ],
    charts: ["Activity Notes", "Priority Follow-Ups"],
    next: ["Use owned-channel copy first", "Confirm account access", "Do not imply paid ads are live"],
  },
  "documents-handoffs": {
    status: "Support",
    owner: "Docs",
    metric: "Templates staged",
    meta: "source paths needed",
    freshness: "Local files",
    summary:
      "Documents and handoffs support the operation tunnels. They should make source paths and resume instructions clearer, not invent progress.",
    analytics: [
      ["Tunnel mapped", 1, 1, "#16865a"],
      ["Templates present", 1, 1, "#2596a6"],
      ["Source paths complete", 0, 1, "#b7791f"],
    ],
    charts: ["Activity Notes", "Priority Follow-Ups"],
    next: ["Attach source paths", "Keep packets tied to tunnels", "Use handoffs to preserve context"],
  },
};

operations.forEach((operation) => {
  Object.assign(operation, truthOverrides[operation.id] || {});
});

const state = {
  range: "today",
  market: "all",
  recruitingFocus: true,
  query: "",
  view: "overview",
  operation: operations[0].id,
};

const completedFollowUps = new Set();

const elements = {
  revenueValue: document.querySelector("#revenue-value"),
  dealsValue: document.querySelector("#deals-value"),
  conversionValue: document.querySelector("#conversion-value"),
  applicantsValue: document.querySelector("#applicants-value"),
  revenueTrend: document.querySelector("#revenue-trend"),
  dealsTrend: document.querySelector("#deals-trend"),
  conversionTrend: document.querySelector("#conversion-trend"),
  applicantsTrend: document.querySelector("#applicants-trend"),
  revenueGoalLabel: document.querySelector("#revenue-goal-label"),
  dealGoalLabel: document.querySelector("#deal-goal-label"),
  applicantGoalLabel: document.querySelector("#applicant-goal-label"),
  revenueGoalBar: document.querySelector("#revenue-goal-bar"),
  dealGoalBar: document.querySelector("#deal-goal-bar"),
  applicantGoalBar: document.querySelector("#applicant-goal-bar"),
  pulseChart: document.querySelector("#pulse-chart"),
  mixChart: document.querySelector("#mix-chart"),
  repChart: document.querySelector("#rep-chart"),
  mixLegend: document.querySelector("#mix-legend"),
  stageList: document.querySelector("#stage-list"),
  funnelList: document.querySelector("#funnel-list"),
  activityList: document.querySelector("#activity-list"),
  alertTable: document.querySelector("#alert-table"),
  pulseBadge: document.querySelector("#pulse-badge"),
  pulseCaption: document.querySelector("#pulse-caption"),
  alertCaption: document.querySelector("#alert-caption"),
  activityCaption: document.querySelector("#activity-caption"),
  hiringCaption: document.querySelector("#hiring-caption"),
  operationSummary: document.querySelector("#operation-summary"),
  operationGrid: document.querySelector("#operation-grid"),
  operationDetail: document.querySelector("#operation-detail"),
  toast: document.querySelector("#toast"),
};

function money(value) {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${Math.round(value)}`;
}

function marketLabel(market) {
  const labels = {
    all: "all sources",
    public: "public-site sources",
    operations: "operation-file sources",
    vps: "VPS report sources",
    gates: "approval-gate sources",
  };
  return labels[market] || "selected sources";
}

function selectedOperation(source = operations) {
  return source.find((operation) => operation.id === state.operation) || source[0] || operations[0];
}

function operationVisual(operation) {
  return operationVisuals[operation.id] || defaultOperationVisual;
}

function operationMatchesQuery(operation) {
  if (!state.query) return true;
  const searchableText = [
    operation.name,
    operation.category,
    operation.status,
    operation.owner,
    operation.metric,
    operation.meta,
    operation.summary,
    ...(operation.next || []),
    ...(operation.scope || []).flat(),
    ...(operation.tunnel || []).flat(),
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(state.query);
}

function getViewData() {
  const range = ranges[state.range];
  const multiplier = marketMultipliers[state.market];

  const revenue = Math.round(range.metrics.revenue * multiplier.revenue);
  const deals = Math.round(range.metrics.deals * multiplier.deals);
  const conversion = Math.max(0, Math.min(99, range.metrics.conversion * multiplier.conversion));
  const applicants = Math.round(range.metrics.applicants * multiplier.applicants);
  const goals = {
    revenue: Math.round(range.goals.revenue * multiplier.revenue),
    deals: Math.round(range.goals.deals * multiplier.deals),
    applicants: Math.round(range.goals.applicants * multiplier.applicants),
  };

  const momentum = {
    labels: range.momentum.labels,
    revenue: range.momentum.revenue.map((value) => value * multiplier.revenue),
    target: range.momentum.target,
  };

  const pipeline = range.pipeline.map(([label, value, color], index) => {
    const stageShift = 1 + (multiplier.revenue - 1) * (0.7 - index * 0.1);
    return [label, Math.round(value * stageShift), color];
  });

  const reps = range.reps.map(([rep, value], index) => {
    const marketShift = state.market === "all" ? 1 : multiplier.deals - index * 0.018;
    return [rep, Math.max(0, Math.round(value * marketShift))];
  });

  const maxFunnel = Math.max(...range.funnel.map(([, value]) => value * multiplier.applicants));
  const funnel = range.funnel.map(([label, value, color]) => {
    const adjusted = Math.round(value * multiplier.applicants);
    const percent = maxFunnel ? Math.round((adjusted / maxFunnel) * 100) : 0;
    return [label, adjusted, adjusted === 0 ? 0 : Math.max(8, percent), color];
  });

  const followUps = range.followUps
    .map((row) => [...row])
    .filter((row) => {
      if (!state.recruitingFocus && row[5] === "recruiting") return false;
      if (!state.query) return true;
      return row.join(" ").toLowerCase().includes(state.query);
    });

  const activities = range.activities.filter((activity) => {
    if (state.view === "overview") return true;
    if (state.view === "pipeline") return ["Source", "Truth", "Metric"].includes(activity[0]);
    if (state.view === "recruiting") return ["Source", "Truth", "Metric"].includes(activity[0]);
    if (state.view === "team") return ["Owner", "Source", "Scope"].includes(activity[0]);
    return true;
  });

  return { range, revenue, deals, conversion, applicants, goals, momentum, pipeline, reps, funnel, followUps, activities };
}

function fitCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, width: rect.width, height: rect.height };
}

function drawLineChart(canvas, momentum) {
  const { ctx, width, height } = fitCanvas(canvas);
  const pad = { top: 28, right: 22, bottom: 38, left: 54 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const max = Math.ceil(Math.max(...momentum.revenue, ...momentum.target) / 10) * 10;
  const series = [
    ["Current", momentum.revenue, colors.revenue],
    ["Target", momentum.target, colors.target],
  ];

  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = colors.grid;
  ctx.fillStyle = colors.muted;
  ctx.font = "12px system-ui, sans-serif";

  for (let i = 0; i <= 4; i += 1) {
    const value = max - (max / 4) * i;
    const y = pad.top + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    ctx.fillText(String(Math.round(value)), 15, y + 4);
  }

  momentum.labels.forEach((label, index) => {
    const x = pad.left + (chartW / (momentum.labels.length - 1 || 1)) * index;
    ctx.fillText(label, x - 12, height - 14);
  });

  series.forEach(([, values, color], seriesIndex) => {
    ctx.beginPath();
    values.forEach((value, index) => {
      const x = pad.left + (chartW / (values.length - 1 || 1)) * index;
      const y = pad.top + chartH - (value / max) * chartH;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = seriesIndex === 0 ? 3 : 2;
    ctx.setLineDash(seriesIndex === 0 ? [] : [8, 7]);
    ctx.stroke();
    ctx.setLineDash([]);

    values.forEach((value, index) => {
      const x = pad.left + (chartW / (values.length - 1 || 1)) * index;
      const y = pad.top + chartH - (value / max) * chartH;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    });
  });

  series.forEach(([label, , color], index) => {
    const x = pad.left + index * 96;
    ctx.fillStyle = color;
    ctx.fillRect(x, 8, 10, 10);
    ctx.fillStyle = colors.ink;
    ctx.fillText(label, x + 16, 17);
  });
}

function drawDonutChart(canvas, pipeline) {
  const { ctx, width, height } = fitCanvas(canvas);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.32;
  const thickness = Math.max(22, radius * 0.32);
  const total = pipeline.reduce((sum, [, value]) => sum + value, 0);
  let start = -Math.PI / 2;

  ctx.clearRect(0, 0, width, height);
  pipeline.forEach(([, value, color]) => {
    const angle = (value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, start, start + angle);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = color;
    ctx.stroke();
    start += angle;
  });

  ctx.fillStyle = colors.ink;
  ctx.font = "800 34px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(String(total), centerX, centerY + 8);
  ctx.font = "700 12px system-ui, sans-serif";
  ctx.fillStyle = colors.muted;
  ctx.fillText("TUNNELS", centerX, centerY + 30);
  ctx.textAlign = "left";

  elements.mixLegend.innerHTML = pipeline
    .map(
      ([label, value, color]) =>
        `<span class="legend-item"><span class="legend-swatch" style="background:${color}"></span>${label} ${value}</span>`,
    )
    .join("");
}

function renderStageList(pipeline) {
  const total = pipeline.reduce((sum, [, value]) => sum + value, 0);
  elements.stageList.innerHTML = pipeline
    .map(([label, value]) => {
      const share = Math.round((value / total) * 100);
      return `<div class="stage-item"><span>${label}</span><strong>${share}%</strong></div>`;
    })
    .join("");
}

function drawBarChart(canvas, reps) {
  const { ctx, width, height } = fitCanvas(canvas);
  const pad = { top: 18, right: 18, bottom: 34, left: 62 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const max = Math.max(...reps.map(([, value]) => value));
  const palette = ["#2596a6", "#2563eb", "#b7791f", "#d04f3f", "#7157d9"];

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = colors.muted;
  ctx.font = "12px system-ui, sans-serif";
  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 1;

  for (let i = 0; i <= 3; i += 1) {
    const x = pad.left + (chartW / 3) * i;
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, height - pad.bottom);
    ctx.stroke();
  }

  const barGap = 10;
  const barH = (chartH - barGap * (reps.length - 1)) / reps.length;
  reps.forEach(([label, value], index) => {
    const y = pad.top + index * (barH + barGap);
    const barW = (value / max) * chartW;
    ctx.fillStyle = colors.muted;
    ctx.fillText(label, 10, y + barH / 2 + 4);
    ctx.fillStyle = palette[index % palette.length];
    roundRect(ctx, pad.left, y, barW, barH, 6);
    ctx.fill();
    ctx.fillStyle = colors.ink;
    ctx.font = "700 12px system-ui, sans-serif";
    ctx.fillText(String(value), pad.left + Math.min(barW + 8, chartW - 30), y + barH / 2 + 4);
    ctx.font = "12px system-ui, sans-serif";
  });
}

function roundRect(ctx, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
}

function renderFunnel(funnel) {
  elements.funnelList.innerHTML = funnel
    .map(
      ([label, count, percent, color]) => `
        <div class="funnel-item">
          <div class="funnel-meta">
            <span>${label}</span>
            <span>${count}</span>
          </div>
          <div class="progress" aria-label="${label} ${count}">
            <span style="--value:${percent}%; --color:${color}"></span>
          </div>
        </div>
      `,
    )
    .join("");
}

function followUpId(row) {
  return `${row[0]}|${row[1]}|${row[2]}`;
}

function renderActivities(activities) {
  const visibleActivities = activities.length
    ? activities
    : [["Quiet", "No recent movement for this view", "Try Overview for the full feed"]];

  elements.activityList.innerHTML = visibleActivities
    .map(
      ([type, title, detail]) => `
        <div class="activity-item">
          <span class="activity-type">${type}</span>
          <strong>${title}</strong>
          <span>${detail}</span>
        </div>
      `,
    )
    .join("");
}

function renderFollowUps(followUps) {
  const visibleRows = followUps.length
    ? followUps
    : [["No matches", "Current filters returned no follow-ups", "-", "Low", "Clear", "sales"]];

  elements.alertTable.innerHTML = visibleRows
    .map(
      ([account, signal, owner, priority, status, kind]) => {
        const id = followUpId([account, signal, owner, priority, status, kind]);
        const done = completedFollowUps.has(id);
        return `
        <tr>
          <td>${account}</td>
          <td>${signal}</td>
          <td>${owner}</td>
          <td><span class="priority ${priority.toLowerCase()}">${priority}</span></td>
          <td class="status-cell">${done ? "Done" : status}</td>
          <td><button class="row-action ${done ? "done" : ""}" type="button" data-followup="${encodeURIComponent(
            id,
          )}">${done ? "Undo" : "Done"}</button></td>
        </tr>
      `;
      },
    )
    .join("");
}

function renderOperationHub() {
  const visibleOperations = operations.filter(operationMatchesQuery);
  const operation = selectedOperation(visibleOperations.length ? visibleOperations : operations);
  const activeCount = operations.filter((item) => item.tone === "active").length;
  const watchCount = operations.length - activeCount;

  if (visibleOperations.length && operation.id !== state.operation) {
    state.operation = operation.id;
  }

  elements.operationSummary.textContent = `${visibleOperations.length}/${operations.length} tunnels - ${activeCount} active - ${watchCount} gated or pending`;

  elements.operationGrid.innerHTML = visibleOperations.length
    ? visibleOperations
        .map((item) => {
          const visual = operationVisual(item);
          return `
        <button class="operation-card ${item.tone}${item.id === operation.id ? " selected" : ""}" type="button" data-operation="${item.id}" aria-pressed="${item.id === operation.id}" aria-label="${item.name}, ${item.status}, ${item.metric}, owner ${item.owner}" style="--operation-color:${visual.color}; --operation-soft:${visual.soft}">
          <span class="operation-icon" aria-hidden="true"><svg><use href="#${visual.icon}"></use></svg></span>
          <span class="operation-copy">
            <strong>${visual.label}</strong>
            <small>${item.metric}</small>
            <span class="operation-chip">${item.status}</span>
          </span>
        </button>
      `;
        })
        .join("")
    : `<div class="operation-empty">No tunnel matches the current search.</div>`;

  const analytics = operation.analytics
    .map(([label, value, total, color]) => {
      const percent = Math.max(4, Math.min(100, Math.round((value / total) * 100)));
      return `
        <div class="operation-analytic">
          <div>
            <span>${label}</span>
            <strong>${value}/${total}</strong>
          </div>
          <span class="operation-bar" style="--value:${percent}%; --color:${color}"><span></span></span>
        </div>
      `;
    })
    .join("");

  const tunnel = operation.tunnel
    .map(
      ([label, detail, tone]) => `
        <div class="tunnel-stage ${tone || ""}">
          <span class="tunnel-node"></span>
          <strong>${label}</strong>
          <p>${detail}</p>
        </div>
      `,
    )
    .join("");

  const scope = operation.scope
    .map(
      ([label, detail]) => `
        <div class="scope-item">
          <span>${label}</span>
          <strong>${detail}</strong>
        </div>
      `,
    )
    .join("");

  const selectedVisual = operationVisual(operation);
  elements.operationDetail.style.setProperty("--operation-color", selectedVisual.color);
  elements.operationDetail.style.setProperty("--operation-soft", selectedVisual.soft);

  elements.operationDetail.innerHTML = `
    <div class="operation-detail-head">
      <div class="operation-hero" aria-hidden="true">
        <svg><use href="#${selectedVisual.icon}"></use></svg>
        <span class="operation-status ${operation.tone}">${operation.status}</span>
      </div>
      <div class="operation-detail-copy">
        <p class="eyebrow">Selected tunnel / ${operation.category}</p>
        <h3>${operation.name}</h3>
        <p>${operation.summary}</p>
      </div>
    </div>
    <div class="operation-facts">
      <span><strong>Owner</strong>${operation.owner}</span>
      <span><strong>Signal</strong>${operation.metric}</span>
      <span><strong>Updated</strong>${operation.freshness}</span>
    </div>
    <div class="operation-tunnel" aria-label="${operation.name} tunnel">${tunnel}</div>
    <div class="operation-scope">${scope}</div>
    <div class="operation-analytics">${analytics}</div>
    <div class="operation-chart-list">
      <span>Connected views</span>
      <strong>${operation.charts.join(" / ")}</strong>
    </div>
    <div class="operation-next-wrap">
      <span>Next moves</span>
      <ul class="operation-next">
        ${operation.next.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;

  return operation;
}

function setGoalBar(bar, value, colorClass = "") {
  const percent = Math.max(4, Math.min(100, Math.round(value)));
  bar.style.setProperty("--value", `${percent}%`);
  bar.style.setProperty("--color", "var(--teal)");
  bar.parentElement.classList.toggle("warning", colorClass === "warning");
  bar.parentElement.classList.toggle("strong", colorClass === "strong");
}

function renderGoals(data) {
  const revenuePercent = (data.revenue / data.goals.revenue) * 100;
  const dealPercent = (data.deals / data.goals.deals) * 100;
  const applicantPercent = (data.applicants / data.goals.applicants) * 100;

  elements.revenueGoalLabel.textContent = `${data.revenue} / ${data.goals.revenue} mapped`;
  elements.dealGoalLabel.textContent = `${data.deals} / ${data.goals.deals} source checked`;
  elements.applicantGoalLabel.textContent = `${data.applicants} / ${data.goals.applicants} gated`;
  setGoalBar(elements.revenueGoalBar, revenuePercent, revenuePercent >= 100 ? "strong" : revenuePercent < 94 ? "warning" : "");
  setGoalBar(elements.dealGoalBar, dealPercent, dealPercent >= 100 ? "strong" : dealPercent < 88 ? "warning" : "");
  setGoalBar(
    elements.applicantGoalBar,
    applicantPercent,
    applicantPercent >= 100 ? "strong" : applicantPercent < 90 ? "warning" : "",
  );
}

function applyView() {
  document.body.dataset.view = state.view;
  document.querySelectorAll("[data-groups]").forEach((panel) => {
    const groups = panel.dataset.groups.split(" ");
    panel.classList.toggle("is-hidden", state.view !== "overview" && !groups.includes(state.view));
  });
}

function render() {
  const data = getViewData();

  applyView();
  const operation = renderOperationHub();

  elements.revenueValue.textContent = String(data.revenue);
  elements.dealsValue.textContent = String(data.deals);
  elements.conversionValue.textContent = String(Math.round(data.conversion));
  elements.applicantsValue.textContent = String(data.applicants);
  elements.revenueTrend.textContent = data.range.metrics.revenueTrend;
  elements.dealsTrend.textContent = data.range.metrics.dealsTrend;
  elements.conversionTrend.textContent = data.range.metrics.conversionTrend;
  elements.applicantsTrend.textContent = data.range.metrics.applicantsTrend;
  elements.pulseBadge.textContent = data.conversion > 0 ? "Connected" : "No Live Feed";
  elements.pulseBadge.style.color = data.conversion > 0 ? "#0d5d46" : "#a2342a";
  elements.pulseBadge.style.background = data.conversion > 0 ? "#dcf7ed" : "#ffe3df";
  elements.pulseCaption.textContent = `${data.range.label} view across ${marketLabel(state.market)}`;
  const openFollowUps = data.followUps.filter((row) => !completedFollowUps.has(followUpId(row))).length;
  elements.alertCaption.textContent = `${openFollowUps} open follow-up${openFollowUps === 1 ? "" : "s"} in current view`;
  elements.activityCaption.textContent = `${data.activities.length || "No"} recent update${
    data.activities.length === 1 ? "" : "s"
  } for ${operation.name}`;
  elements.hiringCaption.textContent =
    "Applicant totals stay hidden until a verified recruiting source is connected and privacy-reviewed.";

  renderGoals(data);
  drawLineChart(elements.pulseChart, data.momentum);
  drawDonutChart(elements.mixChart, data.pipeline);
  renderStageList(data.pipeline);
  drawBarChart(elements.repChart, data.reps);
  renderFunnel(data.funnel);
  renderActivities(data.activities);
  renderFollowUps(data.followUps);
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2200);
}

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segment").forEach((segment) => {
      segment.classList.remove("active");
      segment.setAttribute("aria-selected", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    state.range = button.dataset.range;
    render();
  });
});

document.querySelector("#market-select").addEventListener("change", (event) => {
  state.market = event.target.value;
  render();
});

document.querySelector("#recruiting-toggle").addEventListener("change", (event) => {
  state.recruitingFocus = event.target.checked;
  render();
});

document.querySelector("#global-search").addEventListener("input", (event) => {
  state.query = event.target.value.trim().toLowerCase();
  render();
});

elements.operationGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-operation]");
  if (!button) return;
  state.operation = button.dataset.operation;
  render();
  showToast(`${selectedOperation().name} tunnel opened`);
});

elements.alertTable.addEventListener("click", (event) => {
  const button = event.target.closest(".row-action");
  if (!button) return;
  const id = decodeURIComponent(button.dataset.followup);
  if (completedFollowUps.has(id)) completedFollowUps.delete(id);
  else completedFollowUps.add(id);
  render();
});

document.querySelector("#refresh-button").addEventListener("click", () => {
  render();
  showToast("Dashboard refreshed");
});

document.querySelector("#export-button").addEventListener("click", () => {
  const data = getViewData();
  const summary = `Pilot Sales Enterprise ${data.range.label} | ${marketLabel(
    state.market,
  )} | Mapped tunnels ${data.revenue}/${data.goals.revenue} | Source checked ${data.deals}/${data.goals.deals} | Live data feeds ${data.conversion}`;
  navigator.clipboard
    ?.writeText(summary)
    .then(() => showToast("Summary copied"))
    .catch(() => showToast(summary));
});

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    state.view = button.dataset.view;
    render();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    showToast(`${button.textContent.trim()} view selected`);
  });
});

window.addEventListener("resize", render);
render();
