const ranges = {
  today: {
    label: "Today",
    metrics: {
      revenue: 42100,
      deals: 37,
      conversion: 28.4,
      applicants: 64,
      revenueTrend: "+12% vs goal",
      dealsTrend: "+8 today",
      conversionTrend: "+3.2 pts",
      applicantsTrend: "18 interviews set",
    },
    goals: { revenue: 45000, deals: 40, applicants: 70 },
    momentum: {
      labels: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM"],
      revenue: [7.8, 14.5, 22.4, 31.8, 38.2, 42.1],
      target: [8, 15, 23, 32, 39, 45],
    },
    pipeline: [
      ["New Leads", 46, "#2596a6"],
      ["Demos", 28, "#2563eb"],
      ["Proposals", 17, "#b7791f"],
      ["Closing", 9, "#d04f3f"],
    ],
    reps: [
      ["Avery", 11],
      ["Jordan", 9],
      ["Riley", 7],
      ["Morgan", 6],
      ["Casey", 4],
    ],
    funnel: [
      ["Applicants", 64, "#2596a6"],
      ["Screened", 42, "#2563eb"],
      ["Interviewing", 25, "#b7791f"],
      ["Offers", 9, "#16865a"],
    ],
    followUps: [
      ["Summit Homes", "Proposal follow-up due", "Avery", "High", "Due today", "sales"],
      ["BrightLine Solar", "Demo no-show needs rebook", "Jordan", "Medium", "Contacting", "sales"],
      ["Applicant: Taylor M.", "Interview confirmation pending", "Riley", "High", "Awaiting reply", "recruiting"],
      ["Northstar Fitness", "Decision maker opened pricing", "Morgan", "High", "Call queued", "sales"],
      ["Applicant: Chris R.", "Background packet incomplete", "Casey", "Low", "Needs docs", "recruiting"],
    ],
    activities: [
      ["Deal", "Avery closed Summit Homes", "$6.4K booked 12 minutes ago"],
      ["Recruiting", "Riley moved Taylor M. to interview", "2:30 PM slot held"],
      ["Pipeline", "Northstar opened pricing", "High-intent signal captured"],
    ],
  },
  week: {
    label: "7 Days",
    metrics: {
      revenue: 268700,
      deals: 214,
      conversion: 26.1,
      applicants: 318,
      revenueTrend: "+9% vs last week",
      dealsTrend: "+31 closed",
      conversionTrend: "+1.4 pts",
      applicantsTrend: "76 interviews set",
    },
    goals: { revenue: 270000, deals: 220, applicants: 300 },
    momentum: {
      labels: ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"],
      revenue: [33.2, 71.6, 103.4, 128.9, 181.2, 223.6, 268.7],
      target: [36, 72, 108, 144, 180, 225, 270],
    },
    pipeline: [
      ["New Leads", 214, "#2596a6"],
      ["Demos", 132, "#2563eb"],
      ["Proposals", 74, "#b7791f"],
      ["Closing", 41, "#d04f3f"],
    ],
    reps: [
      ["Avery", 58],
      ["Jordan", 46],
      ["Riley", 42],
      ["Morgan", 38],
      ["Casey", 30],
    ],
    funnel: [
      ["Applicants", 318, "#2596a6"],
      ["Screened", 204, "#2563eb"],
      ["Interviewing", 116, "#b7791f"],
      ["Offers", 38, "#16865a"],
    ],
    followUps: [
      ["Summit Homes", "Contract review still open", "Avery", "High", "Legal review", "sales"],
      ["Evergreen Dental", "Referral intro requested", "Jordan", "Medium", "Draft ready", "sales"],
      ["Applicant: Maya J.", "Second interview ready", "Riley", "High", "Scheduling", "recruiting"],
      ["Peak Roofing", "Install date blocking close", "Morgan", "Medium", "Ops check", "sales"],
      ["Applicant: Luis P.", "Offer call needed", "Casey", "High", "Queued", "recruiting"],
    ],
    activities: [
      ["Deal", "Jordan added Evergreen Dental", "Referral source marked warm"],
      ["Recruiting", "Casey prepared Luis P. offer", "Approval needed this week"],
      ["Team", "Avery led weekly closes", "58 deals across assigned book"],
    ],
  },
  month: {
    label: "30 Days",
    metrics: {
      revenue: 1124000,
      deals: 918,
      conversion: 24.8,
      applicants: 1256,
      revenueTrend: "+18% vs target",
      dealsTrend: "+142 closed",
      conversionTrend: "+2.1 pts",
      applicantsTrend: "311 interviews set",
    },
    goals: { revenue: 1100000, deals: 900, applicants: 1200 },
    momentum: {
      labels: ["W1", "W2", "W3", "W4", "W5"],
      revenue: [192, 416, 647, 884, 1124],
      target: [200, 420, 650, 900, 1100],
    },
    pipeline: [
      ["New Leads", 875, "#2596a6"],
      ["Demos", 492, "#2563eb"],
      ["Proposals", 266, "#b7791f"],
      ["Closing", 153, "#d04f3f"],
    ],
    reps: [
      ["Avery", 242],
      ["Jordan", 201],
      ["Riley", 184],
      ["Morgan", 164],
      ["Casey", 127],
    ],
    funnel: [
      ["Applicants", 1256, "#2596a6"],
      ["Screened", 824, "#2563eb"],
      ["Interviewing", 436, "#b7791f"],
      ["Offers", 148, "#16865a"],
    ],
    followUps: [
      ["Northstar Fitness", "Quarterly expansion close", "Morgan", "High", "Executive call", "sales"],
      ["BrightLine Solar", "Renewal at risk", "Jordan", "High", "Save plan", "sales"],
      ["Applicant: Taylor M.", "Training cohort placement", "Riley", "Medium", "Ready", "recruiting"],
      ["Summit Homes", "Upsell proposal draft", "Avery", "Medium", "Building", "sales"],
      ["Applicant: Priya K.", "Offer accepted, onboarding due", "Casey", "Low", "Onboarding", "recruiting"],
    ],
    activities: [
      ["Revenue", "Monthly target cleared", "$1.12M booked against $1.10M target"],
      ["Recruiting", "Priya K. accepted offer", "Onboarding checklist opened"],
      ["Pipeline", "BrightLine renewal flagged", "Save plan assigned to Jordan"],
    ],
  },
};

const marketMultipliers = {
  all: { revenue: 1, deals: 1, applicants: 1, conversion: 1 },
  phoenix: { revenue: 1.12, deals: 1.06, applicants: 0.92, conversion: 1.03 },
  dallas: { revenue: 1.04, deals: 1.12, applicants: 1.08, conversion: 1.01 },
  tampa: { revenue: 0.91, deals: 0.96, applicants: 1.18, conversion: 0.97 },
  atlanta: { revenue: 0.98, deals: 0.93, applicants: 1.1, conversion: 0.99 },
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
    owner: "Jordan",
    metric: "$42.1K booked",
    meta: "37 closed deals",
    freshness: "Live sample",
    summary: "Website offer pipeline, rep performance, proposals, and close-rate movement.",
    tunnel: [
      ["Lead", "Capture website prospects and market demand.", "active"],
      ["Qualify", "Move prospects into demos, pricing, and proposal follow-ups.", "active"],
      ["Close", "Track offers, decision-maker activity, and rep performance.", "active"],
      ["Retain", "Record upsells, referrals, and account expansion chances.", "watch"]
    ],
    scope: [
      ["Offer", "Website and sales service packages"],
      ["Team", "Rep close rate, proposal quality, and follow-up speed"],
      ["Output", "Booked revenue, closed deals, and account expansion notes"]
    ],
    analytics: [
      ["New leads", 46, 60, "#2596a6"],
      ["Demos", 28, 46, "#2563eb"],
      ["Proposals", 17, 28, "#b7791f"],
      ["Closing", 9, 17, "#d04f3f"]
    ],
    charts: ["Sales Momentum", "Pipeline Mix", "Rep Performance"],
    next: ["Work proposal follow-ups", "Review low-converting reps", "Keep offer notes current"]
  },
  {
    id: "sales-recruiting",
    name: "Sales Recruiting",
    category: "People",
    status: "Active",
    tone: "active",
    owner: "Riley",
    metric: "64 applicants",
    meta: "18 interviews set",
    freshness: "Live sample",
    summary: "Applicant intake, screening, interviews, offers, and onboarding readiness.",
    tunnel: [
      ["Attract", "Collect applicants from owned and recruiting channels.", "active"],
      ["Screen", "Check fit, availability, contact quality, and sales-readiness.", "active"],
      ["Interview", "Hold slots, confirm attendance, and route qualified candidates.", "active"],
      ["Onboard", "Move accepted reps into training and operating expectations.", "watch"]
    ],
    scope: [
      ["Pipeline", "Applicant counts, screens, interviews, offers, and onboarding"],
      ["Quality", "Contact accuracy, responsiveness, and role fit"],
      ["Output", "Ready sales bench and confirmed interview calendar"]
    ],
    analytics: [
      ["Applicants", 64, 70, "#2596a6"],
      ["Screened", 42, 64, "#2563eb"],
      ["Interviewing", 25, 42, "#b7791f"],
      ["Offers", 9, 25, "#16865a"]
    ],
    charts: ["Recruiting Funnel", "Live Activity", "Priority Follow-Ups"],
    next: ["Confirm interview slots", "Screen new applicants", "Move accepted reps into onboarding"]
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
    owner: "Casey",
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
    owner: "Morgan",
    metric: "Offer setup",
    meta: "markets needed",
    freshness: "Today",
    summary: "Local service lead flow, territory selection, partner capacity, and follow-up status.",
    tunnel: [
      ["Research", "Choose marina-heavy launch markets and partner candidates.", "active"],
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
      ["Market list", 45, 100, "#2596a6"],
      ["Partner capacity", 30, 100, "#b7791f"],
      ["Follow-up queue", 60, 100, "#2563eb"]
    ],
    charts: ["Pipeline Mix", "Priority Follow-Ups"],
    next: ["Confirm service areas", "Load partner capacity", "Tag local follow-ups"]
  },
  {
    id: "solar-bird-proofing",
    name: "Solar Bird Proofing",
    category: "Service",
    status: "Active",
    tone: "active",
    owner: "Avery",
    metric: "4 markets",
    meta: "home-service leads",
    freshness: "Live sample",
    summary: "Solar-panel bird proofing demand, city coverage, consultation pipeline, and partner handoff.",
    tunnel: [
      ["Demand", "Watch city-level homeowner demand and lead quality.", "active"],
      ["Consult", "Book inspections and consultation calls.", "active"],
      ["Handoff", "Send qualified jobs to partner installers or service teams.", "active"],
      ["Follow", "Track completion, reviews, referrals, and market expansion.", "watch"]
    ],
    scope: [
      ["Market", "Home-service lead lane across four tracked markets"],
      ["Workflow", "Demand check, consultation, partner handoff, follow-up"],
      ["Output", "Booked consultations and partner-ready jobs"]
    ],
    analytics: [
      ["Market coverage", 4, 6, "#2596a6"],
      ["Lead quality", 72, 100, "#16865a"],
      ["Partner handoff", 58, 100, "#2563eb"]
    ],
    charts: ["Sales Momentum", "Pipeline Mix", "Priority Follow-Ups"],
    next: ["Review city-level demand", "Track booked consultations", "Tighten partner handoff"]
  },
  {
    id: "youtube-media",
    name: "YouTube Shorts Media",
    category: "Media",
    status: "Gated",
    tone: "watch",
    owner: "Ada",
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
    metric: "9 bots",
    meta: "enabled and monitored",
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
      ["Live status", 9, 9, "#2596a6"],
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
    metric: "0 live alerts",
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
    owner: "PSE",
    metric: "Link needed",
    meta: "copy bank ready",
    freshness: "Operations hub",
    summary: "Referral or affiliate lane with compliant copy, tracker, and landing-page guardrails ready once the official link or affiliate account is confirmed.",
    tunnel: [
      ["Confirm", "Get the actual referral link or affiliate dashboard account.", "hold"],
      ["Disclose", "Use disclosure-first copy and official link destinations.", "active"],
      ["Publish", "Use only approved owned channels and avoid coupon-style public spam.", "watch"],
      ["Track", "Record links, channels, voucher status, and follow-up dates.", "watch"]
    ],
    scope: [
      ["Files", "Setup runbook, copy bank, referral tracker, and landing-page notes"],
      ["Gate", "No publication until the official link and channel rules are confirmed"],
      ["Output", "Compliant referral posts and weekly tracking"]
    ],
    analytics: [
      ["Setup packet", 80, 100, "#2596a6"],
      ["Copy bank", 100, 100, "#16865a"],
      ["Referral link", 0, 1, "#d04f3f"],
      ["Channel approval", 35, 100, "#b7791f"]
    ],
    charts: ["Live Activity", "Priority Follow-Ups"],
    next: ["Find the official referral or affiliate link", "Confirm owned channels", "Use the tracker before publishing"]
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
    summary: "Reusable operating documents, checklists, handoff packets, route profiles, trackers, and safety notes that support the live lanes.",
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
  if (market === "all") return "all markets";
  return `${market.charAt(0).toUpperCase()}${market.slice(1)}`;
}

function selectedOperation(source = operations) {
  return source.find((operation) => operation.id === state.operation) || source[0] || operations[0];
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
    return [rep, Math.max(1, Math.round(value * marketShift))];
  });

  const maxFunnel = Math.max(...range.funnel.map(([, value]) => value * multiplier.applicants));
  const funnel = range.funnel.map(([label, value, color]) => {
    const adjusted = Math.round(value * multiplier.applicants);
    return [label, adjusted, Math.max(8, Math.round((adjusted / maxFunnel) * 100)), color];
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
    if (state.view === "pipeline") return ["Pipeline", "Deal", "Revenue"].includes(activity[0]);
    if (state.view === "recruiting") return activity[0] === "Recruiting";
    if (state.view === "team") return ["Team", "Deal"].includes(activity[0]);
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
    ["Booked", momentum.revenue, colors.revenue],
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
    ctx.fillText(`$${Math.round(value)}K`, 9, y + 4);
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
  ctx.fillText("OPEN", centerX, centerY + 30);
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

  elements.operationSummary.textContent = `${visibleOperations.length}/${operations.length} tunnels - ${activeCount} active - ${watchCount} watch/gated`;

  elements.operationGrid.innerHTML = visibleOperations.length
    ? visibleOperations
        .map(
          (item) => `
        <button class="operation-card ${item.tone}${item.id === operation.id ? " selected" : ""}" type="button" data-operation="${item.id}" aria-pressed="${item.id === operation.id}">
          <span>${item.category} / ${item.status}</span>
          <strong>${item.name}</strong>
          <small>${item.metric} - ${item.meta}</small>
          <em>${item.owner}</em>
        </button>
      `,
        )
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

  elements.operationDetail.innerHTML = `
    <div class="operation-detail-head">
      <span class="operation-status ${operation.tone}">${operation.status}</span>
      <div>
        <p class="eyebrow">${operation.category} / ${operation.owner}</p>
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

  elements.revenueGoalLabel.textContent = `${money(data.revenue)} / ${money(data.goals.revenue)}`;
  elements.dealGoalLabel.textContent = `${data.deals} / ${data.goals.deals} closed`;
  elements.applicantGoalLabel.textContent = `${data.applicants} / ${data.goals.applicants} applicants`;
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
  const goal = data.goals.revenue;
  const pace = data.revenue / goal;

  applyView();
  const operation = renderOperationHub();

  elements.revenueValue.textContent = money(data.revenue);
  elements.dealsValue.textContent = String(data.deals);
  elements.conversionValue.textContent = `${data.conversion.toFixed(1)}%`;
  elements.applicantsValue.textContent = String(data.applicants);
  elements.revenueTrend.textContent = data.range.metrics.revenueTrend;
  elements.dealsTrend.textContent = data.range.metrics.dealsTrend;
  elements.conversionTrend.textContent = data.range.metrics.conversionTrend;
  elements.applicantsTrend.textContent = data.range.metrics.applicantsTrend;
  elements.pulseBadge.textContent = pace >= 1 ? "Ahead" : pace >= 0.94 ? "On Pace" : "Watch";
  elements.pulseBadge.style.color = pace >= 1 ? "#0d5d46" : pace >= 0.94 ? "#835100" : "#a2342a";
  elements.pulseBadge.style.background = pace >= 1 ? "#dcf7ed" : pace >= 0.94 ? "#fff0cf" : "#ffe3df";
  elements.pulseCaption.textContent = `${data.range.label} view across ${marketLabel(state.market)}`;
  const openFollowUps = data.followUps.filter((row) => !completedFollowUps.has(followUpId(row))).length;
  elements.alertCaption.textContent = `${openFollowUps} open follow-up${openFollowUps === 1 ? "" : "s"} in current view`;
  elements.activityCaption.textContent = `${data.activities.length || "No"} recent update${
    data.activities.length === 1 ? "" : "s"
  } for ${operation.name}`;
  elements.hiringCaption.textContent = `${data.applicants} applicants tracked, with recruiting focus ${
    state.recruitingFocus ? "enabled" : "filtered from follow-ups"
  }.`;

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
  const summary = `Pilot Sales Enterprise ${data.range.label} | ${marketLabel(state.market)} | Revenue ${money(
    data.revenue,
  )} | Deals ${data.deals} | Applicants ${data.applicants}`;
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
