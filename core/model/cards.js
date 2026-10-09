/* Original card content (Content Supply Chain). Enriched at runtime by content-*.js. */
function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const DRAFT = "Draft — content later.";
function card(partial) {
  return Object.assign({
    kicker: "Content Supply Chain",
    title: "Untitled",
    badge: "Draft",
    lede: "",
    body: DRAFT,
    lives: [],
    systems: [],
    skills: [],
    tools: [],
    writes: [],
    replaces: DRAFT,
    ladder: { human: DRAFT, assist: DRAFT, auto: DRAFT },
    human: DRAFT,
    notes: DRAFT
  }, partial);
}

const CARDS = {
  core: card({
    kicker: "Grounded",
    title: "Company Brain",
    badge: "Memory",
    lede: "Brand, briefs, packs, decisions.",
    body: "Brand Intelligence for codes and claims. Microsoft Graph for people, files and conversations. Copilot, GenStudio and the agents retrieve from here. Other memory stacks work the same way.",
    labels: {
      lives: "Structured memory contains",
      skills: "Knowledge layers",
      writes: "Memory is updated with",
      human: "Memory stewardship",
      notes: "Architecture principle"
    },
    lives: [
      "identity & brand constraints", "customer and market context", "mandates & briefs",
      "creative & activation packs", "live state", "validated results",
      "decision records", "learnings & next-cycle recommendations"
    ],
    skills: ["knowledge graph", "source documents", "marketing and experiment records"],
    systems: ["Adobe Brand Intelligence", "Microsoft Graph", "AEM Assets"],
    writes: ["validated evidence", "decision records", "state changes", "learning records", "next-cycle recommendations", "source links"],
    replaces: "Disconnected evidence, repeated re-briefing and results that cannot constrain the next marketing decision.",
    ladder: {
      human: "Context lives in heads and disconnected source systems. Every new session starts at zero.",
      assist: "Source records are linked and structured; humans still assemble context manually.",
      auto: "People and LLM workflows retrieve relevant, traceable context and update governed memory objects through defined gates."
    },
    human: "A Memory Steward owns schema, provenance, access and retention. Domain owners remain accountable for evidence, decisions and policy.",
    notes: "Brand Intelligence: brand. Microsoft Graph: M365. Or the client's current sources."
  }),
  ring: card({
    kicker: "Governed",
    title: "Work Management & Governance",
    badge: "Always on",
    lede: "Countries, agencies, legal, brand — named humans decide.",
    body: "Queue, owners, approvals. Example: Workfront. Workflows and agents run against that record, or against the work management you already have.",
    labels: {
      lives: "Uses context from the Company Brain",
      systems: "Exemplary Solutions",
      skills: "Invokes control capabilities",
      writes: "Records validated workflow events",
      human: "Decision rights",
      notes: "Architecture principle"
    },
    lives: ["decision rationale", "precedents", "linked evidence", "policy interpretation"],
    systems: ["Adobe Workfront", "Adobe Workfront Fusion"],
    skills: ["policy evaluation", "approval routing", "authority validation", "exception management", "release orchestration", "audit logging"],
    writes: ["state changes", "handoffs", "evidence references", "approval decisions", "exception outcomes", "gate results", "release authorisations"],
    replaces: "Unofficial project status, policy that cannot be applied, approvals hidden in private messages, and exceptions without scope, authority, expiry or audit trail.",
    ladder: {
      human: "Work status is reconstructed in meetings; authority, approvals and exceptions live in messages.",
      assist: "Workflow routes work, surfaces evidence and captures decisions; humans retain decision rights.",
      auto: "Policy-backed controls evaluate evidence and block invalid transitions; only explicitly delegated decisions automate."
    },
    human: "Policy owners define rules. Operating-model owners define accountability. Authorised approvers, exception authorities and release owners make accountable decisions; the layer coordinates, validates and records them.",
    notes: "Countries, functions and agencies stay in the work-management layer."
  }),

  demand: card({
    kicker: "The door",
    title: "Demand access & work companion",
    badge: "Always on",
    lede: "A request becomes one work record.",
    body: "Example: Copilot opens it, Workfront keeps it. Same pattern on the tools you already use.",
    labels: {
      lives: "Context from the Company Brain",
      systems: "Exemplary Solutions",
      skills: "Intake and feedback capabilities",
      writes: "Demand events",
      human: "Demand decision rights",
      notes: "View model",
    },
    lives: ["related mandates", "stakeholders", "calendar", "market context", "brand and offer context"],
    systems: ["Microsoft Copilot", "Adobe Workfront"],
    skills: ["conversation handling", "context retrieval", "field completion", "role resolution", "status updates"],
    writes: ["draft demand", "mandate", "queue decision", "requester update", "approval request"],
    replaces: "Disconnected forms, messages and status updates.",
    ladder: {
      human: "Requests arrive by email, meeting or message and are reconstructed later.",
      assist: "Copilot structures the request; the demand owner sets priority.",
      auto: "Known fields fill and the record is routed. Decision rights stay with named owners.",
    },
    human: "The demand owner, usually MarOps or the campaign lead, accepts, returns, combines, defers or prioritises the request.",
    notes: "Copilot is one door. Workfront is one record. Same jobs on the client's stack.",
  }),
  "intel::fn::demand": card({
    kicker: "Strategic Intelligence · function",
    title: "Demand",
    badge: "Start here",
    lede: "A campaign request becomes one record.",
    body: "Requester, market, timing, objective. Copilot is one way to start it. Priority sits in work-management — Workfront or what you already run.",
    lives: ["mandates", "stakeholders", "calendar", "STATE"],
    systems: ["Microsoft Copilot", "Adobe Workfront"],
    skills: ["work management", "collaboration", "email"],
    writes: ["mandate", "stakeholder map", "queue status"],
    replaces: "A shared inbox, a standing meeting, and three versions of the same request.",
    ladder: {
      human: "Someone forwards an email. The brief is the email.",
      assist: "Requests land in a queue. A human still ranks them.",
      auto: "Intake structures the request. A human only decides priority."
    },
    human: "The demand owner, usually MarOps or the campaign lead, sets priority.",
    notes: "Unlocks Brand codes, Audiences, Markets, Proof, Plan, Brief."
  }),
  "intel::job::request-intake": card({
    kicker: "Demand · agent",
    title: "Request intake",
    badge: "More autonomous",
    lede: "Record request intake for this cycle.",
    body: "Adds request intake to the strategy record.",
    lives: ["mandates", "calendar", "stakeholders"],
    skills: ["work management", "collaboration", "email"],
    writes: ["mandate stub"],
    replaces: "Copy-pasting the last brief and changing the date.",
    ladder: {
      human: "Someone retypes the request into a template.",
      assist: "The agent drafts the stub. A human confirms fields.",
      auto: "Structured requests appear without a human touching the form."
    },
    human: "MarOps reviews exceptions and junk.",
    notes: "Refuse to open downstream agents until the stub has a requester and a market."
  }),
  "intel::job::stakeholder-map": card({
    kicker: "Demand · agent",
    title: "Stakeholder map",
    badge: "Human-assisted",
    lede: "Record stakeholder map for this cycle.",
    body: "Adds stakeholder map to the strategy record.",
    lives: ["stakeholders", "identity", "mandates"],
    skills: ["identity directory", "work management"],
    writes: ["RACI", "approver list"],
    replaces: "Asking around for who signed last year.",
    ladder: {
      human: "The lead keeps names in their head.",
      assist: "The agent proposes the map from last similar mandate. A human confirms.",
      auto: "Role-based routing fills the map. Humans only add exceptions."
    },
    human: "Campaign lead confirms the map before Brief may run.",
    notes: "Reads the brain's stakeholder objects. Never invents a new approver role."
  }),
  "intel::job::priority-vs-calendar": card({
    kicker: "Demand · agent",
    title: "Priority vs calendar",
    badge: "Human-led",
    lede: "Record priority vs calendar for this cycle.",
    body: "Adds priority vs calendar to the strategy record.",
    lives: ["calendar", "mandates", "STATE"],
    skills: ["work management", "resource calendar"],
    writes: ["queue decision"],
    replaces: "Everything is P1 until something ships late.",
    ladder: {
      human: "Priority is whoever shouted last.",
      assist: "Collisions are visible. A human still ranks.",
      auto: "Policy can auto-defer obvious conflicts. Launch still needs a human."
    },
    human: "Head of Campaign or MarOps sets the final Demand priority.",
    notes: "Start here on the tree. Nothing else in Strategy runs on an unprioritised mandate."
  }),

  "intel::fn::brand-codes": card({
    kicker: "Strategic Intelligence · function",
    title: "Brand codes",
    badge: "Function",
    lede: "Brand rules for this brief.",
    body: "Platform, voice, claims and do-nots. Example: Adobe Brand Intelligence. Or the brand system you already have.",
    lives: ["brand platform", "voice", "visual codes", "claim library", "do-nots"],
    systems: ["Adobe Brand Intelligence"],
    skills: ["digital asset library", "brand portal"],
    writes: ["code pack"],
    replaces: "Sending the 80-page brand book and hoping.",
    ladder: {
      human: "A brand manager attaches a PDF.",
      assist: "The agent compiles the pack. Brand reviews deltas.",
      auto: "Every brief gets a current, scoped code pack."
    },
    human: "Brand lead owns the source files in the brain.",
    notes: "Reads Company brain. Writes a scoped pack onto the mandate."
  }),
  "intel::job::platform-voice": card({
    kicker: "Brand codes · agent",
    title: "Platform & voice",
    badge: "Human-assisted",
    lede: "Record platform & voice for this cycle.",
    body: "Adds platform & voice to the strategy record.",
    lives: ["brand platform", "voice", "identity"],
    skills: ["brand portal", "document store"],
    writes: ["voice pack"],
    replaces: "“Make it on brand” as the entire creative direction.",
    ladder: {
      human: "Someone pastes last year's lines.",
      assist: "Agent drafts the scoped pack. Brand edits.",
      auto: "Pack is assembled from current files. Human only on new territory."
    },
    human: "Brand manager signs the pack when the mandate enters a new category.",
    notes: "Never invents a new line. If the brain has no platform, it stops."
  }),
  "intel::job::claim-library": card({
    kicker: "Brand codes · agent",
    title: "Claim library",
    badge: "More autonomous",
    lede: "Record claim library for this cycle.",
    body: "Adds claim library to the strategy record.",
    lives: ["claim library", "proof", "do-nots"],
    skills: ["claims register", "document store"],
    writes: ["allowed claims"],
    replaces: "A spreadsheet on someone's desktop.",
    ladder: {
      human: "Legal is asked after the concept is loved.",
      assist: "Agent proposes allowed claims. Legal confirms new ones.",
      auto: "Cleared claims are attached automatically. New claims raise a gate."
    },
    human: "Legal or brand reviews claims outside the current library.",
    notes: "Writes only references. The claim itself lives in the brain."
  }),
  "intel::job::do-nots": card({
    kicker: "Brand codes · agent",
    title: "Do-nots",
    badge: "Human-led",
    lede: "Record do-nots for this cycle.",
    body: "Adds do-nots to the strategy record.",
    lives: ["do-nots", "brand policy", "legal"],
    skills: ["policy engine", "collaboration"],
    writes: ["red-line pack"],
    replaces: "A hallway conversation after the first review.",
    ladder: {
      human: "Do-nots live in people's nerves.",
      assist: "Agent lists known red lines. Comms / legal tick.",
      auto: "Known red lines attach themselves. New ones stay human."
    },
    human: "Corporate comms and legal. They own the line.",
    notes: "Approvals enforce this pack. This agent only writes it."
  }),

  "intel::fn::audiences": card({
    kicker: "Strategic Intelligence · function",
    title: "Audiences",
    badge: "Function",
    lede: "Define who the work is for.",
    body: "Set the audience, tension and relevant personas from current evidence.",
    lives: ["audiences", "personas", "learnings"],
    systems: ["Adobe Real-Time CDP"],
    skills: ["customer data platform", "web analytics", "research repository"],
    writes: ["audience page"],
    replaces: "A persona workshop disconnected from behaviour.",
    ladder: {
      human: "We think they are 25–45 and urban.",
      assist: "Evidence is pulled. A human names the tension.",
      auto: "Segments refresh from data. Tension still needs a human sentence."
    },
    human: "Strategist or insights lead writes the tension.",
    notes: "When insights sit outside marketing, this function assembles them alongside the research function."
  }),
  "intel::job::segment-evidence": card({
    kicker: "Audiences · agent",
    title: "Segment evidence",
    badge: "More autonomous",
    lede: "Record segment evidence for this cycle.",
    body: "Adds segment evidence to the strategy record.",
    lives: ["audiences", "learnings", "STATE"],
    skills: ["customer data platform", "web analytics", "media analytics"],
    writes: ["segment evidence"],
    replaces: "Last year's deck with a new cover.",
    ladder: {
      human: "A research PDF is attached.",
      assist: "Agent compiles current numbers. Human picks the cut.",
      auto: "Evidence refreshes on every mandate."
    },
    human: "Insights or analytics confirms the cut when data conflicts.",
    notes: "Uses the segments already held in the Company Brain."
  }),
  "intel::job::tension-jtbd": card({
    kicker: "Audiences · agent",
    title: "Tension / JTBD",
    badge: "Human-assisted",
    lede: "Record tension / jtbd for this cycle.",
    body: "Adds tension / jtbd to the strategy record.",
    lives: ["audiences", "personas", "signals"],
    skills: ["research repository", "survey / brand tracking"],
    writes: ["tension line"],
    replaces: "A list of benefits pretending to be insight.",
    ladder: {
      human: "The strategist invents the line in a workshop.",
      assist: "Agent drafts three tensions from evidence. Human picks one.",
      auto: "Drafts land. A human still signs the sentence."
    },
    human: "Strategist. The sentence is the job.",
    notes: "Will not write a tension if segment evidence is empty."
  }),
  "intel::job::persona-depth": card({
    kicker: "Audiences · agent",
    title: "Persona depth",
    badge: "Human-led",
    lede: "Record persona depth for this cycle.",
    body: "Adds persona depth to the strategy record.",
    lives: ["personas", "audiences"],
    skills: ["research repository", "crm"],
    writes: ["persona card"],
    replaces: "A 20-persona catalogue nobody opens.",
    ladder: {
      human: "A designer is told “our target group.”",
      assist: "Agent proposes two cards. Strategist edits.",
      auto: "Cards attach. New audiences stay human."
    },
    human: "Strategist owns the card.",
    notes: "Depth is a creative tool. Evidence stays in Segment evidence."
  }),

  "intel::fn::markets": card({
    kicker: "Strategic Intelligence · function",
    title: "Markets",
    badge: "Function",
    lede: "Set the market and competitor context.",
    body: "Record the category signals, competitor activity and market scope for the mandate.",
    lives: ["market matrix", "competitors", "signals"],
    skills: ["competitive intelligence", "social listening", "location master"],
    writes: ["market page"],
    replaces: "A competitive slide from last pitch.",
    ladder: {
      human: "Someone remembers a competitor ad.",
      assist: "Scans land. A human names the implication.",
      auto: "Scans refresh. Implication still needs a human."
    },
    human: "Strategist writes the so-what.",
    notes: "Feeds Plan and Brief. Does not pick media."
  }),
  "intel::job::category-signals": card({
    kicker: "Markets · agent",
    title: "Category signals",
    badge: "More autonomous",
    lede: "Record category signals for this cycle.",
    body: "Adds category signals to the strategy record.",
    lives: ["signals", "learnings", "calendar"],
    skills: ["news / research feeds", "social listening", "web analytics"],
    writes: ["signal log"],
    replaces: "A weekly clip reel nobody reads.",
    ladder: {
      human: "An intern pastes links.",
      assist: "Agent ranks signals against the mandate. Human trims.",
      auto: "Relevant signals attach themselves."
    },
    human: "Strategist kills noise.",
    notes: "Each signal carries a date before it enters a brief."
  }),
  "intel::job::competitive-scan": card({
    kicker: "Markets · agent",
    title: "Competitive scan",
    badge: "More autonomous",
    lede: "Record competitive scan for this cycle.",
    body: "Adds competitive scan to the strategy record.",
    lives: ["competitors", "claim library", "signals"],
    skills: ["competitive intelligence", "media analytics", "social listening"],
    writes: ["competitive note"],
    replaces: "A screenshot in a Slack thread.",
    ladder: {
      human: "Someone saw an ad on the way to work.",
      assist: "Agent compiles the scan. Strategist marks the gap.",
      auto: "Scan refreshes. Gap still needs a human sentence."
    },
    human: "Strategist owns the gap.",
    notes: "Never names a competitor in outgoing copy unless Do-nots allow it."
  }),
  "intel::job::market-matrix": card({
    kicker: "Markets · agent",
    title: "Market matrix",
    badge: "Human-assisted",
    lede: "Record market matrix for this cycle.",
    body: "Adds market matrix to the strategy record.",
    lives: ["market matrix", "mandates", "calendar"],
    skills: ["location master", "work management", "localization memory"],
    writes: ["rollout matrix"],
    replaces: "“All markets” written on a brief.",
    ladder: {
      human: "Regions are added in review two.",
      assist: "Agent proposes the matrix from the mandate and the brain. Regional leads confirm.",
      auto: "Standard rollouts fill themselves. Exceptions stay human."
    },
    human: "Regional marketing confirms local in/out.",
    notes: "A missing matrix is why Production invents work."
  }),

  "intel::fn::proof": card({
    kicker: "Strategic Intelligence · function",
    title: "Proof",
    badge: "Function",
    lede: "Verify the offer and claims.",
    body: "Confirm product facts, evidence and the offer before the team develops the work.",
    lives: ["product truth", "offers", "proof", "claim library"],
    skills: ["product catalog", "claims register", "document store"],
    writes: ["proof pack"],
    replaces: "A feature list plus optimism.",
    ladder: {
      human: "Product sends a one-pager after the concept is done.",
      assist: "Agent assembles truth and sources. Human locks the offer.",
      auto: "Known SKUs fill themselves. New claims raise a gate."
    },
    human: "Product plus legal lock the offer.",
    notes: "Brief will not emit without a locked offer."
  }),
  "intel::job::product-truth": card({
    kicker: "Proof · agent",
    title: "Product truth",
    badge: "Human-assisted",
    lede: "Record product truth for this cycle.",
    body: "Adds product truth to the strategy record.",
    lives: ["product truth", "offers"],
    skills: ["product catalog", "document store"],
    writes: ["truth sheet"],
    replaces: "A sales one-pager from last year.",
    ladder: {
      human: "Someone asks product in a chat.",
      assist: "Agent pulls current facts. Product confirms.",
      auto: "Known products fill. New products stay human."
    },
    human: "Product owner confirms facts outside the current Company Brain.",
    notes: "If the catalogue is empty, stop. Do not guess."
  }),
  "intel::job::substantiation": card({
    kicker: "Proof · agent",
    title: "Substantiation",
    badge: "Human-assisted",
    lede: "Record substantiation for this cycle.",
    body: "Adds substantiation to the strategy record.",
    lives: ["proof", "claim library", "do-nots"],
    skills: ["claims register", "document store"],
    writes: ["source map"],
    replaces: "Legal finding out in the last review.",
    ladder: {
      human: "Legal is a surprise at the end.",
      assist: "Agent maps sources. Legal clears gaps.",
      auto: "Cleared pairs attach. New claims stop the compiler."
    },
    human: "Legal signs unpaired claims.",
    notes: "Works with Claim library. Does not invent evidence."
  }),
  "intel::job::offer-lock": card({
    kicker: "Proof · agent",
    title: "Offer lock",
    badge: "Human-led",
    lede: "Record offer lock for this cycle.",
    body: "Adds offer lock to the strategy record.",
    lives: ["offers", "product truth", "mandates"],
    skills: ["work management"],
    writes: ["locked offer"],
    replaces: "Three offers, none committed.",
    ladder: {
      human: "The offer changes in every review.",
      assist: "Agent lists eligible offers. Human locks one.",
      auto: "Standard offers can pre-fill. Lock stays human."
    },
    human: "Demand owner plus brand. The lock is the job.",
    notes: "Brief compiler will not run without this lock."
  }),

  "intel::fn::plan": card({
    kicker: "Strategic Intelligence · function",
    title: "Plan",
    badge: "Function",
    lede: "Set channels, moments and constraints.",
    body: "Define where the work appears, when it matters and the limits production needs.",
    lives: ["routes", "learnings", "calendar", "KPI dictionary"],
    skills: ["web analytics", "media analytics", "journey map"],
    writes: ["route pack"],
    replaces: "A channel list written after the hero is shot.",
    ladder: {
      human: "Media is briefed separately, later.",
      assist: "Agent proposes routes from learnings. Human confirms.",
      auto: "Predicted routes attach. Human still sets the envelope."
    },
    human: "Channel / media lead confirms the envelope.",
    notes: "Predicted routes come from the Learn phase of the last cycle."
  }),
  "intel::job::channel-hypothesis": card({
    kicker: "Plan · agent",
    title: "Channel hypothesis",
    badge: "More autonomous",
    lede: "Record channel hypothesis for this cycle.",
    body: "Adds channel hypothesis to the strategy record.",
    lives: ["routes", "learnings", "audiences"],
    skills: ["media analytics", "web analytics", "bi / dashboard"],
    writes: ["channel hypothesis"],
    replaces: "Defaulting to last year's mix.",
    ladder: {
      human: "The mix is habit.",
      assist: "Agent ranks routes. Media lead confirms.",
      auto: "Hypothesis pre-fills from last similar mandate."
    },
    human: "Media / digital lead.",
    notes: "Does not buy media. Does not open an ad account."
  }),
  "intel::job::journey-moments": card({
    kicker: "Plan · agent",
    title: "Journey moments",
    badge: "Human-assisted",
    lede: "Record journey moments for this cycle.",
    body: "Adds journey moments to the strategy record.",
    lives: ["routes", "audiences", "offers"],
    skills: ["journey map", "crm", "web analytics"],
    writes: ["moment map"],
    replaces: "One hero asked to do every job.",
    ladder: {
      human: "Everything is a hero film.",
      assist: "Agent drafts moments. Experience lead edits.",
      auto: "Standard journeys pre-fill. New journeys stay human."
    },
    human: "Experience or CRM lead.",
    notes: "This is the handoff Production's system node will explode."
  }),
  "intel::job::constraints-pack": card({
    kicker: "Plan · agent",
    title: "Constraints pack",
    badge: "More autonomous",
    lede: "Record constraints pack for this cycle.",
    body: "Adds constraints pack to the strategy record.",
    lives: ["calendar", "market matrix", "mandates"],
    skills: ["work management", "resource calendar", "localization memory"],
    writes: ["constraints pack"],
    replaces: "Finding out the go-live is Tuesday.",
    ladder: {
      human: "Constraints appear in the kickoff, verbally.",
      assist: "Agent compiles from mandate and calendar. Human confirms.",
      auto: "Standard constraints attach. Dates still need a human."
    },
    human: "MarOps confirms dates and money.",
    notes: "If the pack is empty, Brief compiler stops."
  }),

  "intel::fn::brief": card({
    kicker: "Strategic Intelligence · function",
    title: "Brief",
    badge: "Handoff",
    lede: "One page production can use.",
    body: "Copilot and GenStudio can assemble mandate, audience, codes and plan. A named owner signs in work-management.",
    lives: ["briefs", "mandates", "STATE"],
    systems: ["Microsoft Copilot", "Adobe GenStudio for Performance Marketing", "Adobe Workfront"],
    skills: ["work management", "document store"],
    writes: ["creative brief", "comms pack", "learn slots"],
    replaces: "A 12-page deck and a kickoff that restarts the thinking.",
    ladder: {
      human: "The brief is a meeting.",
      assist: "Compiler drafts. Human signs.",
      auto: "Complete pages compile themselves. Sign-off stays human."
    },
    human: "Demand owner signs the brief. That signature is the job.",
    notes: "The brief compiler assembles the approved strategy material and flags incomplete inputs."
  }),
  "intel::job::creative-brief": card({
    kicker: "Brief · agent",
    title: "Creative brief",
    badge: "Human-assisted",
    lede: "Record creative brief for this cycle.",
    body: "Adds creative brief to the strategy record.",
    lives: ["briefs", "mandates", "audiences", "brand platform", "offers", "routes"],
    skills: ["work management", "document store", "collaboration"],
    writes: ["creative brief"],
    replaces: "A kickoff workshop that is actually strategy, billed as production.",
    ladder: {
      human: "A strategist writes the brief from scratch.",
      assist: "Compiler assembles. Strategist edits and signs.",
      auto: "Assembly is automatic. Signature is not."
    },
    human: "Strategist plus demand owner.",
    notes: "This is the handoff object. Production reads only this plus the brain."
  }),
  "intel::job::comms-legal-pack": card({
    kicker: "Brief · agent",
    title: "Comms / legal pack",
    badge: "Human-assisted",
    lede: "Record comms / legal pack for this cycle.",
    body: "Adds comms / legal pack to the strategy record.",
    lives: ["do-nots", "claim library", "proof", "stakeholders"],
    skills: ["approval workflow", "collaboration", "document store"],
    writes: ["comms pack"],
    replaces: "Forwarding the whole brief to Legal with “fyI”.",
    ladder: {
      human: "Legal is copied on everything.",
      assist: "Agent builds the pack. Comms / legal comment in one place.",
      auto: "Pack attaches. Exceptions still need a human."
    },
    human: "Corporate comms and legal.",
    notes: "Approvals will use this pack as a gate."
  }),
  "intel::job::next-cycle-intake": card({
    kicker: "Brief · agent",
    title: "Next-cycle intake",
    badge: "More autonomous",
    lede: "Record next-cycle intake for this cycle.",
    body: "Adds next-cycle intake to the strategy record.",
    lives: ["briefs", "learnings", "STATE", "KPI dictionary"],
    skills: ["bi / dashboard", "work management"],
    writes: ["learn slots"],
    replaces: "A report that goes in a drawer.",
    ladder: {
      human: "Learnings are a slide at the wash-up.",
      assist: "Slots are named up front. Humans still write answers later.",
      auto: "Slots pre-fill from the KPI dictionary. Answers come from Learn."
    },
    human: "Analytics lead owns answering the slots after flight.",
    notes: "This is why the sphere compounds. Without slots, nothing writes back."
  }),

  "make::fn::routes": card({
    kicker: "Creative Production · function",
    title: "Routes",
    badge: "Start here",
    lede: "Develop the creative routes.",
    body: "The client’s creative agency develops routes from the signed brief. The Content Supply Chain carries the selected route through production, activation and learning.",
    lives: ["briefs", "brand platform", "voice", "offers", "audiences"],
    skills: ["review / proofing", "brand portal", "collaboration"],
    writes: ["routes", "territory"],
    replaces: "A kickoff that restarts strategy, billed as production.",
    ladder: {
      human: "The agency presents. The client picks in the room.",
      assist: "Scamps are assembled from the brief. A human still locks.",
      auto: "Never. A locked territory is a decision."
    },
    human: "ECD and brand approve the territory lock.",
    notes: "Input is the signed Strategy brief. Nothing else in Production runs without a lock."
  }),
  "make::job::route-scamps": card({
    kicker: "Routes · agent",
    title: "Route scamps",
    badge: "Human-assisted",
    lede: "Routes from the signed brief.",
    body: "The creative agency develops route scamps from the brief, codes and locked offer. The pack gives the decision meeting a clear basis.",
    lives: ["briefs", "voice", "offers", "routes"],
    skills: ["review / proofing", "collaboration"],
    writes: ["route scamps"],
    replaces: "Twelve territories and a three-hour presentation.",
    ladder: {
      human: "The team invents on a wall.",
      assist: "The agent lays out the options. Craft stays human.",
      auto: "Route generation stays with the creative agency."
    },
    human: "Lead agency creative owns route generation.",
    notes: "If the brief is missing, stop. Do not invent a route."
  }),
  "make::job::territory-lock": card({
    kicker: "Routes · agent",
    title: "Territory lock",
    badge: "Human-led",
    lede: "Select the route for production.",
    body: "The creative and brand leads approve one route. Hero, Copy, Hub and QA use that decision.",
    lives: ["routes", "briefs", "mandates"],
    skills: ["work management", "approval workflow"],
    writes: ["locked territory"],
    replaces: "Mashing two routes in the lift after the meeting.",
    ladder: {
      human: "Brand and the ECD lock it.",
      assist: "The options are visible. The lock is a person.",
      auto: "Never."
    },
    human: "Brand and lead creative approve the production lock.",
    notes: "Work management records the signed territory lock."
  }),
  "make::job::art-direction": card({
    kicker: "Routes · agent",
    title: "Art direction",
    badge: "Human-assisted",
    lede: "Set the visual rules for the route.",
    body: "Record colour, type, image rules and references for the approved territory.",
    lives: ["visual codes", "brand platform", "routes"],
    skills: ["brand portal", "digital asset library"],
    writes: ["art direction pack"],
    replaces: "“Make it premium.”",
    ladder: {
      human: "The art director writes it on a napkin.",
      assist: "The agent compiles references. Craft still directs.",
      auto: "The system assembles the pack; creative judgement remains with the team."
    },
    human: "Art director at the client's existing creative agency.",
    notes: "Hygiene may use this pack. It may not invent a new one."
  }),

  "make::fn::hero": card({
    kicker: "Creative Production · function",
    title: "Hero",
    badge: "Human-led",
    lede: "Still, film, master line.",
    body: "The client's creative agency makes Hero. Brief, territory and pack come from the operating model.",
    lives: ["routes", "art direction pack", "offers", "visual codes"],
    systems: [],
    skills: ["studio / camera", "edit suite", "review / proofing"],
    writes: ["hero still", "hero film", "master line"],
    replaces: "Asking a generator for the campaign idea.",
    ladder: {
      human: "A director, a photographer, a writer.",
      assist: "References and constraints are ready. Making is human.",
      auto: "Hero work stays with the creative agency."
    },
    human: "The client's existing creative agency and production partners own Hero work.",
    notes: "The farther we get from these files, the more automation is allowed. Not here."
  }),
  "make::job::hero-still": card({
    kicker: "Hero · agent",
    title: "Hero still",
    badge: "Human-led",
    lede: "Create the Hero still.",
    body: "The creative agency shoots or commissions the approved Hero image.",
    lives: ["art direction pack", "routes", "visual codes"],
    skills: ["studio / camera", "digital asset library", "review / proofing"],
    writes: ["hero still"],
    replaces: "A stock image we will 'swap later'.",
    ladder: {
      human: "Photographer / art director.",
      assist: "Casting, refs, call sheet.",
      auto: "Never the picture itself."
    },
    human: "Art director owns Hero direction.",
    notes: "Hub and up-format may crop this. They may not replace it."
  }),
  "make::job::hero-film": card({
    kicker: "Hero · agent",
    title: "Hero film",
    badge: "Human-led",
    lede: "Create the Hero film.",
    body: "The creative agency and production partners develop the approved film treatment, shoot and finish.",
    lives: ["routes", "scripts", "art direction pack"],
    skills: ["studio / camera", "edit suite", "review / proofing"],
    writes: ["hero film"],
    replaces: "A 15-second cut made before anyone agreed the idea.",
    ladder: {
      human: "Director and producer.",
      assist: "Boards, specs, claim pack.",
      auto: "Never the film. Cutdowns come later, in Activation."
    },
    human: "Lead agency / production company.",
    notes: "Activation may cut this down. It may not invent a new hero."
  }),
  "make::job::master-line": card({
    kicker: "Hero · agent",
    title: "Master line",
    badge: "Human-led",
    lede: "Set the master line.",
    body: "A writer develops the master line from the approved offer and claims.",
    lives: ["offers", "claim library", "voice", "routes"],
    skills: ["claims register", "brand portal"],
    writes: ["master line"],
    replaces: "Five headlines and no campaign.",
    ladder: {
      human: "A copywriter at the client's existing creative agency.",
      assist: "Allowed claims and tensions are on the page.",
      auto: "No."
    },
    human: "Copywriter. Signed with the territory.",
    notes: "If this line moves, Hub and up-format stop until it is locked again."
  }),

  "make::fn::copy": card({
    kicker: "Creative Production · function",
    title: "Copy",
    badge: "Function",
    lede: "Write the campaign language.",
    body: "Headlines, support, calls to action, scripts and disclaimers draw on the approved claims and master line.",
    lives: ["master line", "claim library", "voice", "do-nots"],
    skills: ["claims register", "review / proofing", "brand portal"],
    writes: ["copy deck"],
    replaces: "A headline brainstorm with no claims.",
    ladder: {
      human: "Every line is a workshop.",
      assist: "The agent drafts against the library. A writer edits.",
      auto: "Only cleared disclaimers."
    },
    human: "Copywriter. New claims still go to legal.",
    notes: "Long copy is a different function. Different owner, different length."
  }),
  "make::job::headlines-lines": card({
    kicker: "Copy · agent",
    title: "Headlines & lines",
    badge: "Human-assisted",
    lede: "Record headlines & lines for this cycle.",
    body: "Adds headlines & lines to the approved production pack.",
    lives: ["master line", "claim library", "voice"],
    skills: ["claims register", "review / proofing"],
    writes: ["headline set"],
    replaces: "A spreadsheet of puns.",
    ladder: {
      human: "The writer starts from zero.",
      assist: "Drafts from the line and the library. Writer locks.",
      auto: "Only once a line is locked and the claim is old."
    },
    human: "Copywriter.",
    notes: "Hub may reuse these. Up-format may shorten. Neither may rewrite the promise."
  }),
  "make::job::scripts-vo": card({
    kicker: "Copy · agent",
    title: "Scripts / VO",
    badge: "Human-assisted",
    lede: "Record scripts / vo for this cycle.",
    body: "Adds scripts / vo to the approved production pack.",
    lives: ["master line", "copy deck", "routes"],
    skills: ["review / proofing", "edit suite"],
    writes: ["scripts"],
    replaces: "A VO written on the shoot day.",
    ladder: {
      human: "A writer in a booth.",
      assist: "Timed drafts from the line. Writer edits.",
      auto: "No new script from a prompt."
    },
    human: "Copywriter / agency.",
    notes: "Hero film uses this. Cutdowns in Activation only shorten."
  }),
  "make::job::disclaimers": card({
    kicker: "Copy · agent",
    title: "Disclaimers",
    badge: "More autonomous",
    lede: "Record disclaimers for this cycle.",
    body: "Adds disclaimers to the approved production pack.",
    lives: ["do-nots", "claim library", "proof"],
    skills: ["claims register", "policy engine"],
    writes: ["disclaimer set"],
    replaces: "Legal finding the missing asterisk in the last review.",
    ladder: {
      human: "Legal writes them each time.",
      assist: "Known lines attach. New ones raise a gate.",
      auto: "Cleared lines attach themselves."
    },
    human: "Legal reviews claims outside the current library.",
    notes: "Hygiene and up-format must carry these. They may not hide them."
  }),

  "make::fn::long-copy": card({
    kicker: "Creative Production · function",
    title: "Long copy",
    badge: "Function",
    lede: "Extend the campaign into longer formats.",
    body: "Pages, journeys, brochures and FAQs carry the same territory into content, CRM and CMS work.",
    lives: ["master line", "offers", "copy deck", "product truth"],
    skills: ["cms", "document store", "review / proofing"],
    writes: ["page copy", "journey copy", "document copy"],
    replaces: "The website team briefing themselves from a banner.",
    ladder: {
      human: "A separate agency writes a second campaign.",
      assist: "Drafts from the route and the offer. A human edits.",
      auto: "Only utility blocks already approved."
    },
    human: "Content or CRM lead owns this work.",
    notes: "This is hub-adjacent. More automation than Hero. Less than up-format."
  }),
  "make::job::page-copy": card({
    kicker: "Long copy · agent",
    title: "Page copy",
    badge: "Human-assisted",
    lede: "Record page copy for this cycle.",
    body: "Adds page copy to the approved production pack.",
    lives: ["master line", "offers", "proof", "copy deck"],
    skills: ["cms", "review / proofing"],
    writes: ["page copy"],
    replaces: "Lorem and a hero crop.",
    ladder: {
      human: "Web writes from scratch.",
      assist: "Draft from the brief pack. Editor locks.",
      auto: "Only after the page pattern is proven."
    },
    human: "Content editor.",
    notes: "Activation may personalise modules. It may not change the promise."
  }),
  "make::job::journey-copy": card({
    kicker: "Long copy · agent",
    title: "Journey copy",
    badge: "Human-assisted",
    lede: "Record journey copy for this cycle.",
    body: "Adds journey copy to the approved production pack.",
    lives: ["master line", "copy deck", "routes", "audiences"],
    skills: ["crm", "cms", "review / proofing"],
    writes: ["journey copy"],
    replaces: "A lifecycle mail that ignores the campaign.",
    ladder: {
      human: "CRM writes in another tone.",
      assist: "Drafts from the line. CRM lead edits.",
      auto: "Utility steps only."
    },
    human: "CRM / journey lead.",
    notes: "Orchestration lives in Activation. The copy is made here."
  }),
  "make::job::document-copy": card({
    kicker: "Long copy · agent",
    title: "Document copy",
    badge: "Human-led",
    lede: "Record document copy for this cycle.",
    body: "Adds document copy to the approved production pack.",
    lives: ["product truth", "proof", "do-nots", "master line"],
    skills: ["document store", "claims register"],
    writes: ["document copy"],
    replaces: "A PDF from last year with a new cover.",
    ladder: {
      human: "Legal and content write it.",
      assist: "Sources are gathered. Humans write.",
      auto: "No."
    },
    human: "Content plus legal.",
    notes: "Closer to hero than a crop. Farther than a film. Still not hygiene."
  }),

  "make::fn::hub": card({
    kicker: "Creative Production · function",
    title: "Hub",
    badge: "Function",
    lede: "Repeatable work from the locked territory.",
    body: "Series and always-on extensions from the locked territory. Stored in the DAM.",
    lives: ["hero still", "hero film", "art direction pack", "copy deck"],
    systems: ["Adobe Firefly", "Adobe GenStudio for Performance Marketing", "Adobe Experience Manager Assets"],
    skills: ["digital asset library", "edit suite", "review / proofing", "template studio", "production orchestration", "governed variant generation"],
    writes: ["hub pack"],
    replaces: "A second campaign because someone needed 'more content'.",
    ladder: {
      human: "Every social is a new concept.",
      assist: "Extensions from the hero pack. A creative edits.",
      auto: "Only once the pattern is proven."
    },
    human: "In-house or agency studio — craft, not concept.",
    notes: "Hero is the parent. Hygiene / up-format is the child. Hub is the middle. Connects to a template studio, production orchestration or governed variant stack — pick one spine."
  }),
  "make::job::series-extensions": card({
    kicker: "Hub · agent",
    title: "Series extensions",
    badge: "Human-assisted",
    lede: "Record series extensions for this cycle.",
    body: "Adds series extensions to the approved production pack.",
    lives: ["hero film", "hero still", "copy deck", "routes"],
    skills: ["edit suite", "digital asset library", "template studio", "governed variant generation"],
    writes: ["series set"],
    replaces: "A new route every Thursday.",
    ladder: {
      human: "Each piece is a new brief.",
      assist: "Set proposed from the hero. Studio makes.",
      auto: "Only cut-pattern work."
    },
    human: "Studio lead.",
    notes: "If it needs a new idea, it is not Hub. Send it back to Routes."
  }),
  "make::job::always-on": card({
    kicker: "Hub · agent",
    title: "Always-on",
    badge: "Human-assisted",
    lede: "Record always-on for this cycle.",
    body: "Adds always-on to the approved production pack.",
    lives: ["art direction pack", "copy deck", "product truth"],
    skills: ["digital asset library", "brand portal", "template studio", "production orchestration"],
    writes: ["always-on set"],
    replaces: "A side-of-desk banner in the wrong typeface.",
    ladder: {
      human: "Someone 'just knocks it up'.",
      assist: "Templates from the pack. A human checks.",
      auto: "Once the template is signed."
    },
    human: "In-house studio.",
    notes: "Closer to hygiene than hero. Still made here, not in Activation."
  }),
  "make::job::dam-pull": card({
    kicker: "Hub · agent",
    title: "DAM pull",
    badge: "More autonomous",
    lede: "Find assets that fit the territory.",
    body: "Search the DAM against the approved art direction. Example: AEM Assets.",
    lives: ["visual codes", "art direction pack"],
    systems: ["Adobe Experience Manager Assets"],
    skills: ["digital asset library", "brand portal", "production orchestration"],
    writes: ["asset shortlist"],
    replaces: "A designer hunting folders named FINAL_v7.",
    ladder: {
      human: "Someone remembers a shoot.",
      assist: "Ranked pull. Human picks.",
      auto: "Cleared assets attach themselves."
    },
    human: "Studio / DAM owner for anything untagged.",
    notes: "The farthest Production goes toward automation before Activation."
  }),

  "make::fn::qa": card({
    kicker: "Creative Production · function",
    title: "QA",
    badge: "Handoff",
    lede: "Brand, claims, specs. Then a signature.",
    body: "Brand and claim checks. Example: Brand Intelligence flags, work-management holds the gate.",
    lives: ["hero still", "hero film", "copy deck", "hub pack", "do-nots"],
    systems: ["Adobe Brand Intelligence", "Adobe Workfront"],
    skills: ["review / proofing", "approval workflow", "claims register"],
    writes: ["master pack"],
    replaces: "Shipping because the date won.",
    ladder: {
      human: "A room of opinions.",
      assist: "Checklists run. A human still signs the pack.",
      auto: "Spec only."
    },
    human: "Brand plus producer. The pack signature is the job.",
    notes: "Activation reads only this pack plus the brief."
  }),
  "make::job::brand-qa": card({
    kicker: "QA · agent",
    title: "Brand QA",
    badge: "Human-assisted",
    lede: "Record brand qa for this cycle.",
    body: "Adds brand qa to the approved production pack.",
    lives: ["visual codes", "master line", "claim library", "do-nots"],
    skills: ["review / proofing", "brand portal"],
    writes: ["brand QA"],
    replaces: "A like on a preview link.",
    ladder: {
      human: "Someone 'has a look'.",
      assist: "Flags against the pack. Brand signs.",
      auto: "Only known code breaks."
    },
    human: "Brand.",
    notes: "Broken codes trigger a flag; taste remains a creative judgement."
  }),
  "make::job::spec-qa": card({
    kicker: "QA · agent",
    title: "Spec QA",
    badge: "More autonomous",
    lede: "Record spec qa for this cycle.",
    body: "Adds spec qa to the approved production pack.",
    lives: ["master pack"],
    skills: ["review / proofing"],
    writes: ["spec QA"],
    replaces: "Media rejecting the file on Friday night.",
    ladder: {
      human: "Someone opens the file.",
      assist: "Checks run. Failures are listed.",
      auto: "The checklist runs itself."
    },
    human: "Producer only on failures.",
    notes: "Activation will run this again on up-formats."
  }),
  "make::job::master-pack": card({
    kicker: "QA · agent",
    title: "Master pack",
    badge: "Human-led",
    lede: "Record master pack for this cycle.",
    body: "Adds master pack to the approved production pack.",
    lives: ["hero still", "hero film", "hub pack", "copy deck", "art direction pack"],
    skills: ["digital asset library", "work management", "approval workflow"],
    writes: ["master pack"],
    replaces: "A zip called FINAL_USE_THIS.",
    ladder: {
      human: "A producer emails a folder.",
      assist: "The pack is assembled. A human signs.",
      auto: "Assembly only. Signature is human."
    },
    human: "Producer plus brand.",
    notes: "The compiler. It will not emit if Routes, Hero or QA is open."
  }),

  "act::fn::up-format": card({
    kicker: "Intelligent Activation · function",
    title: "Up-format",
    badge: "Hygiene",
    lede: "Prepare approved content for each placement.",
    body: "Create sizes, crops, languages and placement specifications from the approved master pack.",
    lives: ["master pack", "market matrix", "routes"],
    systems: ["Adobe Firefly", "Adobe GenStudio for Performance Marketing"],
    skills: ["digital asset library", "localization memory", "review / proofing", "template studio", "governed variant generation", "production orchestration"],
    writes: ["placement set"],
    replaces: "A studio weekend making 400 sizes by hand.",
    ladder: {
      human: "Every crop is a ticket.",
      assist: "The set is proposed. A human spot-checks.",
      auto: "Known specs run themselves after the pack is signed."
    },
    human: "Activation lead spot-checks. Brand only on exceptions.",
    notes: "This is why Hero stays human. Volume lives here."
  }),
  "act::job::sizes-crops": card({
    kicker: "Up-format · agent",
    title: "Sizes & crops",
    badge: "More autonomous",
    lede: "Prepare approved crops and sizes.",
    body: "Create placement-ready versions from the Hero and Hub assets within the art direction.",
    lives: ["hero still", "hub pack", "art direction pack"],
    skills: ["digital asset library", "review / proofing", "template studio", "governed variant generation"],
    writes: ["crop set"],
    replaces: "A designer per format.",
    ladder: {
      human: "Each size is redrawn.",
      assist: "Crops proposed. Human checks faces and type.",
      auto: "Signed templates run."
    },
    human: "Studio only when a crop breaks the route.",
    notes: "If the crop needs a new shot, that is Hero, not this."
  }),
  "act::job::languages": card({
    kicker: "Up-format · agent",
    title: "Languages",
    badge: "More autonomous",
    lede: "Prepare market versions.",
    body: "Localise approved claims and copy within the market matrix. New tone or messaging returns to Copy.",
    lives: ["copy deck", "master line", "market matrix"],
    skills: ["localization memory", "claims register", "governed variant generation"],
    writes: ["language set"],
    replaces: "A freelance rewrite that becomes a second campaign.",
    ladder: {
      human: "Every language is a new writer.",
      assist: "Memory drafts. A native editor checks.",
      auto: "Known pairs run."
    },
    human: "Native editor on first use of a pair.",
    notes: "Do-nots still apply. A translation can break a claim."
  }),
  "act::job::placement-specs": card({
    kicker: "Up-format · agent",
    title: "Placement specs",
    badge: "More autonomous",
    lede: "Set the placement requirements.",
    body: "Record the channel lengths, weights, ratios and companion assets.",
    lives: ["master pack", "routes"],
    skills: ["review / proofing", "work management", "production orchestration"],
    writes: ["spec set"],
    replaces: "Media rejecting the file after the campaign is booked.",
    ladder: {
      human: "Someone reads the spec sheet.",
      assist: "Checks against the pack.",
      auto: "Known placements fill."
    },
    human: "Activation ops on new placements.",
    notes: "Personalization may pick from this set. It may not invent a new master."
  }),

  "act::fn::spend": card({
    kicker: "Intelligent Activation · function",
    title: "Spend",
    badge: "Start here",
    lede: "Allocate, book and pace the budget.",
    body: "Use the approved recommendation to set channel allocation, bookings and pacing.",
    lives: ["routes", "master pack", "learnings", "KPI dictionary", "calendar"],
    skills: ["media planning", "media buying", "bi / dashboard"],
    writes: ["channel mix", "bookings", "pacing"],
    replaces: "A recycled plan that bypassed the buying team.",
    ladder: {
      human: "A media agency presents a deck. Finance cuts it.",
      assist: "Last-cycle curves propose a split. A human locks money.",
      auto: "Pacing only. Allocation stays a decision."
    },
    human: "Media lead plus finance. The lock is the job.",
    notes: "Mix models, incrementality and content scores stay in Learn. This function only acts."
  }),
  "act::job::allocate": card({
    kicker: "Spend · agent",
    title: "Allocate",
    badge: "Human-led",
    lede: "Record allocate for this cycle.",
    body: "Applies the approved plan to allocate.",
    lives: ["learnings", "KPI dictionary", "routes", "calendar"],
    skills: ["media planning", "bi / dashboard"],
    writes: ["channel mix"],
    replaces: "Equal slices, or whoever shouted.",
    ladder: {
      human: "A planning deck.",
      assist: "Curves propose. Human locks.",
      auto: "Never the lock."
    },
    human: "Media lead.",
    notes: "If Learn has no recommendation, stop and say so."
  }),
  "act::job::book-channels": card({
    kicker: "Spend · agent",
    title: "Book channels",
    badge: "Human-assisted",
    lede: "Record book channels for this cycle.",
    body: "Applies the approved plan to book channels.",
    lives: ["channel mix", "calendar", "master pack"],
    skills: ["media buying", "ad serving", "affiliate network"],
    writes: ["bookings"],
    replaces: "A late insertion order and a missed flight.",
    ladder: {
      human: "Buyers email IOs.",
      assist: "The agent drafts the book. Buyer confirms.",
      auto: "Always-on lines only, after a human template."
    },
    human: "Buyer / trading.",
    notes: "No booking without a signed master pack and a mix lock."
  }),
  "act::job::pacing": card({
    kicker: "Spend · agent",
    title: "Pacing",
    badge: "More autonomous",
    lede: "Record pacing for this cycle.",
    body: "Applies the approved plan to pacing.",
    lives: ["bookings", "channel mix", "STATE"],
    skills: ["ad serving", "bi / dashboard"],
    writes: ["pacing log"],
    replaces: "A delivery issue discovered after launch.",
    ladder: {
      human: "A weekly spreadsheet.",
      assist: "Drift is flagged. Human decides.",
      auto: "Alerts run. Moves wait."
    },
    human: "Media lead on any move.",
    notes: "In-flight creative changes sit in Orchestrate. This is money only."
  }),

  "act::fn::social": card({
    kicker: "Intelligent Activation · function",
    title: "Social",
    badge: "Function",
    lede: "Run organic and paid social as one system.",
    body: "Use one approved content kit. Organic response informs paid amplification.",
    lives: ["master pack", "copy deck", "hub pack", "channel mix"],
    systems: ["Adobe GenStudio for Performance Marketing"],
    skills: ["social publishing", "social listening", "ad serving", "community"],
    writes: ["social calendar", "paid social set", "amplify list"],
    replaces: "Separate community and media teams working from different files.",
    ladder: {
      human: "Two calendars, two agencies.",
      assist: "One kit. Organic posts. Paid boosts winners.",
      auto: "Boosts run on a rule. Calendar stays human."
    },
    human: "Social lead owns the calendar. Media owns the boost budget.",
    notes: "Social uses the Hero still and the approved territory from Production."
  }),
  "act::job::organic-calendar": card({
    kicker: "Social · agent",
    title: "Organic calendar",
    badge: "Human-assisted",
    lede: "Record organic calendar for this cycle.",
    body: "Applies the approved plan to organic calendar.",
    lives: ["hub pack", "copy deck", "market matrix", "do-nots"],
    skills: ["social publishing", "community", "review / proofing"],
    writes: ["social calendar"],
    replaces: "A last-minute post that breaks the claim.",
    ladder: {
      human: "Someone posts from their phone.",
      assist: "Kit proposes slots. Social lead locks.",
      auto: "Low-risk slots only, after a pattern is proven."
    },
    human: "Social lead owns the calendar; local teams adapt it within the approved pack.",
    notes: "Paid social uses the approved calendar and content pack."
  }),
  "act::job::paid-social": card({
    kicker: "Social · agent",
    title: "Paid social",
    badge: "More autonomous",
    lede: "Record paid social for this cycle.",
    body: "Applies the approved plan to paid social.",
    lives: ["master pack", "channel mix", "social calendar"],
    skills: ["ad serving", "social publishing", "media buying"],
    writes: ["paid social set"],
    replaces: "Paid social content without brand approval.",
    ladder: {
      human: "Every ad is a new concept.",
      assist: "Up-formats fill the set. Buyer sets the bid.",
      auto: "Known placements run from the pack."
    },
    human: "Social / performance buyer.",
    notes: "If the ad needs a new idea, send it back to Routes."
  }),
  "act::job::amplify-winners": card({
    kicker: "Social · agent",
    title: "Amplify winners",
    badge: "More autonomous",
    lede: "Record amplify winners for this cycle.",
    body: "Applies the approved plan to amplify winners.",
    lives: ["social calendar", "learnings", "channel mix"],
    skills: ["social listening", "ad serving", "bi / dashboard"],
    writes: ["amplify list"],
    replaces: "Boosting whatever shipped on Monday.",
    ladder: {
      human: "A hunch.",
      assist: "Winners are ranked. Human confirms spend.",
      auto: "A rule boosts above a bar."
    },
    human: "Social lead sets the bar.",
    notes: "Learnings still write back to Learn. This only spends."
  }),

  "act::fn::paid": card({
    kicker: "Intelligent Activation · function",
    title: "Paid",
    badge: "Function",
    lede: "Activate paid channels.",
    body: "Use the approved pack across search, programmatic, retail media and affiliate activity.",
    lives: ["channel mix", "bookings", "master pack"],
    skills: ["media buying", "ad serving", "affiliate network", "retail media"],
    writes: ["paid set"],
    replaces: "Four specialist agencies with four briefs.",
    ladder: {
      human: "Each channel is a fief.",
      assist: "One mix, channel buyers execute.",
      auto: "Always-on lines after a human template."
    },
    human: "Performance / trading lead.",
    notes: "Social paid sits in Social on purpose. The kit is shared."
  }),
  "act::job::search": card({
    kicker: "Paid · agent",
    title: "Search",
    badge: "More autonomous",
    lede: "Record search for this cycle.",
    body: "Applies the approved plan to search.",
    lives: ["copy deck", "claim library", "channel mix"],
    skills: ["search buying", "ad serving"],
    writes: ["search set"],
    replaces: "A freelance rewrite in the account.",
    ladder: {
      human: "Every RSA is invented.",
      assist: "Lines from the pack. Buyer sets match.",
      auto: "Known queries run."
    },
    human: "Search buyer on new themes.",
    notes: "SEO sits in Owned. This is paid intent only."
  }),
  "act::job::programmatic": card({
    kicker: "Paid · agent",
    title: "Programmatic",
    badge: "More autonomous",
    lede: "Record programmatic for this cycle.",
    body: "Applies the approved plan to programmatic.",
    lives: ["bookings", "placement set", "channel mix"],
    skills: ["ad serving", "media buying"],
    writes: ["programmatic set"],
    replaces: "A DSP campaign built from last year's tags.",
    ladder: {
      human: "A trader rebuilds every line.",
      assist: "Lines from the book. Trader confirms.",
      auto: "Always-on after a template."
    },
    human: "Trader.",
    notes: "Retail media is next door. Do not hide it inside display."
  }),
  "act::job::retail-affiliate": card({
    kicker: "Paid · agent",
    title: "Retail & affiliate",
    badge: "Human-assisted",
    lede: "Record retail & affiliate for this cycle.",
    body: "Applies the approved plan to retail & affiliate.",
    lives: ["master pack", "claim library", "channel mix", "do-nots"],
    skills: ["affiliate network", "retail media", "partner portal"],
    writes: ["partner set"],
    replaces: "An affiliate who writes their own offer.",
    ladder: {
      human: "Every partner is a one-off.",
      assist: "Kit plus rules. Partner lead approves.",
      auto: "Known partners pull the pack."
    },
    human: "Partnership / affiliate lead.",
    notes: "Creators who need a new idea go to Routes. Amplifiers stay here."
  }),

  "act::fn::owned": card({
    kicker: "Intelligent Activation · function",
    title: "Owned",
    badge: "Function",
    lede: "Run owned channels.",
    body: "Publish the campaign through site, search, CRM and the approved mid-flight refreshes.",
    lives: ["page copy", "master pack", "journeys"],
    systems: ["Adobe Experience Manager Sites", "Adobe Sites Optimizer", "Adobe LLM Optimizer"],
    skills: ["cms", "seo", "email / journey"],
    writes: ["owned set", "facelift"],
    replaces: "The site team briefing themselves from a banner.",
    ladder: {
      human: "Web ships something else.",
      assist: "Page and mail from the pack. Editor locks.",
      auto: "Utility modules only."
    },
    human: "Digital / CRM lead.",
    notes: "Speak Brand Visibility here. Pills are LLM Optimizer and Sites Optimizer. AEM Sites is the CMS. Long copy was made in Production. Owned publishes it.",
  }),
  "act::job::site-seo": card({
    kicker: "Owned · agent",
    title: "Site & SEO",
    badge: "Human-assisted",
    lede: "Record site & seo for this cycle.",
    body: "Applies the approved plan to site & seo.",
    lives: ["page copy", "master line", "product truth"],
    skills: ["cms", "seo"],
    writes: ["live page"],
    replaces: "A landing page in another tone.",
    ladder: {
      human: "Web invents a title.",
      assist: "Pack publishes. SEO checks.",
      auto: "Known page patterns."
    },
    human: "Web / SEO lead.",
    notes: "Paid search sits in Paid. This is earned."
  }),
  "act::job::email-crm": card({
    kicker: "Owned · agent",
    title: "Email & CRM",
    badge: "More autonomous",
    lede: "Record email & crm for this cycle.",
    body: "Applies the approved plan to email & crm.",
    lives: ["journey copy", "audiences", "master pack"],
    skills: ["email / journey", "crm"],
    writes: ["live journeys"],
    replaces: "A lifecycle mail that ignores the flight.",
    ladder: {
      human: "CRM writes from scratch.",
      assist: "Copy from the pack. CRM lead sequences.",
      auto: "Utility steps after a template."
    },
    human: "CRM lead.",
    notes: "Orchestrate owns cross-channel timing. This owns the inbox."
  }),
  "act::job::facelift": card({
    kicker: "Owned · agent",
    title: "Facelift",
    badge: "Human-assisted",
    lede: "Record facelift for this cycle.",
    body: "Applies the approved plan to facelift.",
    lives: ["master pack", "hub pack", "learnings"],
    skills: ["cms", "template studio", "review / proofing"],
    writes: ["facelift"],
    replaces: "Quietly launching campaign two in week three.",
    ladder: {
      human: "Someone 'just updates the banner'.",
      assist: "Hub offers a swap. Brand checks.",
      auto: "Only a signed swap list."
    },
    human: "Brand plus digital lead.",
    notes: "Hygiene can supply the file. Facelift decides it goes live."
  }),

  "act::fn::orchestrate": card({
    kicker: "Intelligent Activation · function",
    title: "Orchestrate",
    badge: "Function",
    lede: "Coordinate journeys and in-flight delivery.",
    body: "Set timing, audience and approved variants across the live journey.",
    lives: ["live journeys", "audiences", "channel mix", "master pack"],
    systems: ["Adobe Journey Optimizer", "Adobe Real-Time CDP", "Adobe Target"],
    skills: ["email / journey", "personalization", "cms"],
    writes: ["orchestration", "in-flight log"],
    replaces: "Each channel running its own campaign.",
    ladder: {
      human: "A war room every morning.",
      assist: "Rules propose. Human confirms material moves.",
      auto: "Known rules run."
    },
    human: "Journey / activation lead.",
    notes: "GEO and brand gates sit in Launch. This moves people, not policy."
  }),
  "act::job::journeys": card({
    kicker: "Orchestrate · agent",
    title: "Journeys",
    badge: "Human-assisted",
    lede: "Record journeys for this cycle.",
    body: "Applies the approved plan to journeys.",
    lives: ["journey copy", "bookings", "audiences"],
    skills: ["email / journey", "cms"],
    writes: ["journey map"],
    replaces: "Hope that the channels notice each other.",
    ladder: {
      human: "A slide.",
      assist: "A map from the pack. Lead edits.",
      auto: "Standard journeys only."
    },
    human: "Journey lead.",
    notes: "Personalization sits next. This is the spine."
  }),
  "act::job::personalization": card({
    kicker: "Orchestrate · agent",
    title: "Personalization",
    badge: "More autonomous",
    lede: "Select approved variants by audience.",
    body: "Use the signed modules, offers and language for the defined audience.",
    lives: ["master pack", "audiences", "offers"],
    skills: ["personalization", "cms", "customer data platform"],
    writes: ["personalization set"],
    replaces: "A one-to-one message that bypassed legal review.",
    ladder: {
      human: "Every user is a workshop.",
      assist: "Rules pick modules. Human sets the rule.",
      auto: "Known rules run."
    },
    human: "Activation lead sets the rule book.",
    notes: "New modules are created in Hub before they enter personalization."
  }),
  "act::job::in-flight": card({
    kicker: "Orchestrate · agent",
    title: "In-flight",
    badge: "More autonomous",
    lede: "Record in-flight for this cycle.",
    body: "Applies the approved plan to in-flight.",
    lives: ["pacing log", "amplify list", "facelift", "STATE"],
    skills: ["ad serving", "cms", "bi / dashboard"],
    writes: ["in-flight log"],
    replaces: "A silent rebuild in week two.",
    ladder: {
      human: "Panic edits.",
      assist: "Signals propose. Human confirms.",
      auto: "Rules inside a signed envelope."
    },
    human: "Activation lead on anything that changes spend or claim.",
    notes: "Activation updates the Learn handoff throughout the flight."
  }),

  "act::fn::launch": card({
    kicker: "Intelligent Activation · function",
    title: "Launch",
    badge: "Handoff",
    lede: "Go live, then hand to Learn.",
    body: "Workflows run the path. Work-management records the go. Named humans sign the gates.",
    lives: ["paid set", "owned set", "social calendar", "do-nots"],
    systems: ["Adobe Workfront", "Adobe Experience Manager Sites"],
    skills: ["approval workflow", "policy engine", "work management"],
    writes: ["go-live", "learn packet"],
    replaces: "Going live because the date won.",
    ladder: {
      human: "An unstructured, recurring meeting.",
      assist: "Gates are listed. Humans sign.",
      auto: "The packet to Learn assembles itself."
    },
    human: "Brand plus activation lead.",
    notes: "Work management records the go. Learn owns what happens next."
  }),
  "act::job::launch-gates": card({
    kicker: "Launch · agent",
    title: "Launch gates",
    badge: "Human-led",
    lede: "Record launch gates for this cycle.",
    body: "Applies the approved plan to launch gates.",
    lives: ["stakeholders", "master pack", "do-nots"],
    skills: ["approval workflow", "work management"],
    writes: ["gate log"],
    replaces: "A thumbs-up in a chat.",
    ladder: {
      human: "Whoever is online.",
      assist: "The map from Demand. Humans sign.",
      auto: "Never the signature."
    },
    human: "Each named approver.",
    notes: "Demand already named them. This function only collects the yes."
  }),
  "act::job::brand-control": card({
    kicker: "Launch · agent",
    title: "Brand control",
    badge: "Human-assisted",
    lede: "Record brand control for this cycle.",
    body: "Applies the approved plan to brand control.",
    lives: ["paid set", "owned set", "partner set", "claim library"],
    skills: ["review / proofing", "brand portal", "policy engine"],
    writes: ["live QA"],
    replaces: "A partner going live with the wrong offer.",
    ladder: {
      human: "Someone 'has a look'.",
      assist: "Flags against the pack. Brand signs.",
      auto: "Known breaks only."
    },
    human: "Brand.",
    notes: "Production QA signed the masters. This signs the live set."
  }),
  "act::job::handoff-to-learn": card({
    kicker: "Launch · agent",
    title: "Handoff to Learn",
    badge: "More autonomous",
    lede: "Record handoff to learn for this cycle.",
    body: "Applies the approved plan to handoff to learn.",
    lives: ["channel mix", "bookings", "in-flight log", "learn slots"],
    skills: ["bi / dashboard", "work management"],
    writes: ["learn packet"],
    replaces: "A wash-up slide.",
    ladder: {
      human: "Someone forwards a folder.",
      assist: "The packet assembles. Analyst confirms.",
      auto: "The packet writes itself at go-live and every in-flight change."
    },
    human: "Analytics lead confirms completeness.",
    notes: "Activation records its delivery data so Learn works from the same record."
  }),

  "learn::fn::ingest": card({
    kicker: "Data Insight · function",
    title: "Ingest",
    badge: "Start here",
    lede: "Build a usable learning set.",
    body: "Join the live delivery data, agreed KPIs and in-flight changes before analysis starts.",
    lives: ["learn packet", "learn slots", "KPI dictionary", "bookings"],
    skills: ["data join", "marketing insight dashboard", "work management"],
    writes: ["trusted set", "KPI dictionary"],
    replaces: "Three teams, three numbers, one wash-up.",
    ladder: {
      human: "Someone pastes a CSV.",
      assist: "The packet joins. An analyst confirms the dictionary.",
      auto: "Known sources land themselves."
    },
    human: "Analytics lead owns the dictionary.",
    notes: "Nothing else in Learn runs on an untrusted set."
  }),
  "learn::job::learn-packet": card({
    kicker: "Ingest · agent",
    title: "Learn packet",
    badge: "More autonomous",
    lede: "Record learn packet for this cycle.",
    body: "Records learn packet in the learning set for the next cycle.",
    lives: ["learn packet", "learn slots", "in-flight log"],
    skills: ["work management", "data join"],
    writes: ["packet status"],
    replaces: "Asking media for the file in week six.",
    ladder: {
      human: "A chase email.",
      assist: "Holes are listed. Human chases only those.",
      auto: "The packet arrives as the flight runs."
    },
    human: "Analyst on missing slots.",
    notes: "If the packet is empty, stop. Do not model a memory."
  }),
  "learn::job::join-clean": card({
    kicker: "Ingest · agent",
    title: "Join & clean",
    badge: "More autonomous",
    lede: "Record join & clean for this cycle.",
    body: "Records join & clean in the learning set for the next cycle.",
    lives: ["learn packet", "market matrix", "calendar"],
    skills: ["data join", "marketing insight dashboard"],
    writes: ["trusted set"],
    replaces: "A late export that no longer matches the current data.",
    ladder: {
      human: "VLOOKUP as a lifestyle.",
      assist: "Joins run. Analyst signs the grain.",
      auto: "Known pipes land nightly."
    },
    human: "Analytics engineer on new sources.",
    notes: "Location analytics and journey analytics both drink from this set."
  }),
  "learn::job::kpi-dictionary": card({
    kicker: "Ingest · agent",
    title: "KPI dictionary",
    badge: "Human-led",
    lede: "Record kpi dictionary for this cycle.",
    body: "Records kpi dictionary in the learning set for the next cycle.",
    lives: ["KPI dictionary", "STATE"],
    skills: ["marketing insight dashboard"],
    writes: ["KPI dictionary"],
    replaces: "A slide with fourteen greens.",
    ladder: {
      human: "Each team invents a north star.",
      assist: "A draft dictionary. The lead locks.",
      auto: "Never the lock."
    },
    human: "Analytics lead plus the CMO's designate.",
    notes: "Strategy's next-cycle slots point at these names."
  }),

  "learn::fn::models": card({
    kicker: "Data Insight · function",
    title: "Models",
    badge: "Function",
    lede: "Measure contribution and scenarios.",
    body: "Use incrementality, mix models and scenarios to produce the next allocation recommendation.",
    lives: ["trusted set", "bookings", "channel mix", "KPI dictionary"],
    systems: ["Adobe Mix Modeler", "Adobe Customer Journey Analytics"],
    skills: ["mix modeling", "incrementality testing", "scenario planning"],
    writes: ["mix recommendation", "response curves"],
    replaces: "Last-click and a vendor ranking their own ads.",
    ladder: {
      human: "A yearly model nobody uses.",
      assist: "The model runs. A human signs the recommendation.",
      auto: "Scenarios refresh. The lock stays human."
    },
    human: "Analytics lead. Finance sits in on the lock.",
    notes: "Activation Allocate uses this recommendation."
  }),
  "learn::job::incrementality": card({
    kicker: "Models · agent",
    title: "Incrementality",
    badge: "Human-assisted",
    lede: "Record incrementality for this cycle.",
    body: "Records incrementality in the learning set for the next cycle.",
    lives: ["trusted set", "bookings", "channel mix"],
    skills: ["incrementality testing", "experiment design"],
    writes: ["incrementality"],
    replaces: "Platform ROAS as causality.",
    ladder: {
      human: "A test no one designed.",
      assist: "Design from the last model. Human runs the holdout.",
      auto: "Always-on holdouts after a pattern is proven."
    },
    human: "Measurement lead.",
    notes: "Results update the mix model."
  }),
  "learn::job::mix-models": card({
    kicker: "Models · agent",
    title: "Mix models",
    badge: "More autonomous",
    lede: "Record mix models for this cycle.",
    body: "Records mix models in the learning set for the next cycle.",
    lives: ["trusted set", "incrementality", "KPI dictionary"],
    systems: ["Adobe Mix Modeler"],
    skills: ["mix modeling", "marketing insight dashboard"],
    writes: ["mix model", "response curves"],
    replaces: "A media mix from last year's share of voice.",
    ladder: {
      human: "A black-box vendor once a year.",
      assist: "The model refreshes. Analyst signs.",
      auto: "Known specs re-estimate on a clock."
    },
    human: "Analyst signs each refresh.",
    notes: "Media mix (paid only) is not enough. Marketing mix includes brand, price, distribution."
  }),
  "learn::job::scenarios": card({
    kicker: "Models · agent",
    title: "Scenarios",
    badge: "More autonomous",
    lede: "Record scenarios for this cycle.",
    body: "Records scenarios in the learning set for the next cycle.",
    lives: ["mix model", "response curves", "calendar"],
    skills: ["scenario planning", "marketing insight dashboard"],
    writes: ["mix recommendation"],
    replaces: "A planning workshop with no curves.",
    ladder: {
      human: "Gut plus last year.",
      assist: "Scenarios ranked. Human picks.",
      auto: "Drafts refresh. Pick stays human."
    },
    human: "Media lead picks. Analytics prepares.",
    notes: "This is the file Activation Spend is waiting for."
  }),

  "learn::fn::brand": card({
    kicker: "Data Insight · function",
    title: "Brand",
    badge: "Function",
    lede: "Measure brand and content effects.",
    body: "Combine tracking and content analysis to show which work moved attention, brand or action.",
    lives: ["trusted set", "claim library", "master pack"],
    systems: ["Adobe Brand Intelligence"],
    skills: ["brand tracking", "content analytics", "marketing insight dashboard"],
    writes: ["brand health", "content scores"],
    replaces: "A tracker deck disconnected from the media plan.",
    ladder: {
      human: "Two agencies, two truths.",
      assist: "Waves plus digital. Human reads the so-what.",
      auto: "Digital facets refresh between waves."
    },
    human: "Brand plus insights.",
    notes: "Content scores inform Hub and Up-format; creative leadership sets the next Hero."
  }),
  "learn::job::brand-tracking": card({
    kicker: "Brand · agent",
    title: "Brand tracking",
    badge: "Human-assisted",
    lede: "Record brand tracking for this cycle.",
    body: "Records brand tracking in the learning set for the next cycle.",
    lives: ["trusted set", "signals"],
    skills: ["brand tracking", "consumer listening"],
    writes: ["brand tracking"],
    replaces: "A six-month blind spot.",
    ladder: {
      human: "A survey only.",
      assist: "Waves plus digital fill. Insights edits.",
      auto: "Digital fill runs between waves."
    },
    human: "Insights lead.",
    notes: "Do not let digital replace the wave. Use it to see between waves."
  }),
  "learn::job::equity-model": card({
    kicker: "Brand · agent",
    title: "Equity model",
    badge: "More autonomous",
    lede: "Record equity model for this cycle.",
    body: "Records equity model in the learning set for the next cycle.",
    lives: ["brand tracking", "trusted set", "KPI dictionary"],
    skills: ["brand equity modeling", "mix modeling"],
    writes: ["equity model"],
    replaces: "Awareness as the only brand KPI.",
    ladder: {
      human: "A framework on a poster.",
      assist: "Drivers ranked. Brand signs the north star.",
      auto: "Refresh on a clock. Lock stays human."
    },
    human: "Brand lead signs the north star.",
    notes: "Models use equity constraints alongside the other planning inputs."
  }),
  "learn::job::content-scores": card({
    kicker: "Brand · agent",
    title: "Content scores",
    badge: "More autonomous",
    lede: "Record content scores for this cycle.",
    body: "Records content scores in the learning set for the next cycle.",
    lives: ["master pack", "trusted set", "hub pack"],
    skills: ["content analytics", "marketing insight dashboard"],
    writes: ["content scores"],
    replaces: "Views as quality.",
    ladder: {
      human: "A creative award.",
      assist: "Scores land. Creative reads the so-what.",
      auto: "Known packs score themselves."
    },
    human: "Creative and brand on what to retire.",
    notes: "Activation amplify-winners is spend. This is learning."
  }),

  "learn::fn::journeys": card({
    kicker: "Data Insight · function",
    title: "Journeys",
    badge: "Function",
    lede: "Read customer paths.",
    body: "Map how people move across owned, paid and physical touchpoints.",
    lives: ["trusted set", "live journeys", "audiences"],
    systems: ["Adobe Customer Journey Analytics"],
    skills: ["journey analytics", "customer data platform", "marketing insight dashboard"],
    writes: ["journey insight"],
    replaces: "A funnel that starts at the last ad.",
    ladder: {
      human: "A slide of steps.",
      assist: "Paths ranked. Journey lead reads.",
      auto: "Known paths refresh."
    },
    human: "Journey / CRM lead.",
    notes: "Personalization in Activation picks from the pack. This says which moments matter."
  }),
  "learn::job::pathing": card({
    kicker: "Journeys · agent",
    title: "Pathing",
    badge: "More autonomous",
    lede: "Record pathing for this cycle.",
    body: "Records pathing in the learning set for the next cycle.",
    lives: ["trusted set", "live journeys"],
    skills: ["journey analytics", "customer data platform"],
    writes: ["path set"],
    replaces: "A last-click story.",
    ladder: {
      human: "A guess.",
      assist: "Paths listed. Human names the one we care about.",
      auto: "Known grains refresh."
    },
    human: "Journey lead names the valuable path.",
    notes: "Feeds next-cycle journey copy within the approved territory."
  }),
  "learn::job::friction": card({
    kicker: "Journeys · agent",
    title: "Friction",
    badge: "Human-assisted",
    lede: "Record friction for this cycle.",
    body: "Records friction in the learning set for the next cycle.",
    lives: ["path set", "trusted set"],
    skills: ["journey analytics", "web analytics"],
    writes: ["friction log"],
    replaces: "A bounce rate with no owner.",
    ladder: {
      human: "A complaint.",
      assist: "Frictions ranked. Human picks the fight.",
      auto: "Known leaks alert."
    },
    human: "Experience or journey lead.",
    notes: "A new idea is Routes. A broken step is a facelift or AEO."
  }),
  "learn::job::increment-paths": card({
    kicker: "Journeys · agent",
    title: "Increment paths",
    badge: "Human-assisted",
    lede: "Record increment paths for this cycle.",
    body: "Records increment paths in the learning set for the next cycle.",
    lives: ["path set", "incrementality"],
    skills: ["journey analytics", "incrementality testing"],
    writes: ["path increment"],
    replaces: "Opening the mail caused the sale.",
    ladder: {
      human: "Correlation as strategy.",
      assist: "A test on the path. Human reads.",
      auto: "After the design is proven."
    },
    human: "Measurement lead.",
    notes: "Calibrates Orchestrate. Does not rewrite the hero."
  }),

  "learn::fn::behavior": card({
    kicker: "Data Insight · function",
    title: "Behavior",
    badge: "Function",
    lede: "Read segments, places and commercial response.",
    body: "Connect audience, location and sales evidence to the next planning cycle.",
    lives: ["trusted set", "audiences", "market matrix"],
    systems: ["Adobe Real-Time CDP", "Adobe Customer Journey Analytics"],
    skills: ["segmentation", "location analytics", "sales intelligence"],
    writes: ["segments", "location insight", "commercial insight"],
    replaces: "A persona poster and a store list.",
    ladder: {
      human: "A workshop.",
      assist: "Clusters from the set. Human names them.",
      auto: "Known clusters refresh."
    },
    human: "Insights plus commercial.",
    notes: "Strategy Audiences uses these segments in the next cycle."
  }),
  "learn::job::segments": card({
    kicker: "Behavior · agent",
    title: "Segments",
    badge: "More autonomous",
    lede: "Record segments for this cycle.",
    body: "Records segments in the learning set for the next cycle.",
    lives: ["trusted set", "audiences"],
    skills: ["segmentation", "customer data platform"],
    writes: ["segments"],
    replaces: "25–45 urban.",
    ladder: {
      human: "A persona workshop.",
      assist: "Clusters proposed. Insights names.",
      auto: "Known cuts refresh."
    },
    human: "Insights names the cut.",
    notes: "Persona depth stays in Strategy. This is evidence."
  }),
  "learn::job::location-analytics": card({
    kicker: "Behavior · agent",
    title: "Location analytics",
    badge: "More autonomous",
    lede: "Record location analytics for this cycle.",
    body: "Records location analytics in the learning set for the next cycle.",
    lives: ["trusted set", "market matrix", "bookings"],
    skills: ["location analytics", "segmentation"],
    writes: ["location insight"],
    replaces: "All markets, equally.",
    ladder: {
      human: "A heat map in a deck.",
      assist: "Places ranked. Local lead reads.",
      auto: "Known estates refresh."
    },
    human: "Local / commercial lead on the so-what.",
    notes: "Feeds next-cycle market matrix. Does not book media."
  }),
  "learn::job::sales-intelligence": card({
    kicker: "Behavior · agent",
    title: "Sales intelligence",
    badge: "Human-assisted",
    lede: "Record sales intelligence for this cycle.",
    body: "Records sales intelligence in the learning set for the next cycle.",
    lives: ["trusted set", "location insight", "offers"],
    skills: ["sales intelligence", "marketing insight dashboard"],
    writes: ["commercial insight"],
    replaces: "A marketing report disconnected from the commercial team.",
    ladder: {
      human: "A separate sales BI.",
      assist: "Insights drafted. Commercial edits.",
      auto: "Known views refresh."
    },
    human: "Commercial / RGM lead.",
    notes: "One trusted set shared across the team."
  }),

  "learn::fn::signals": card({
    kicker: "Data Insight · function",
    title: "Signals",
    badge: "Function",
    lede: "Track what changes between campaigns.",
    body: "Keep dated market, trend and competitor evidence available for the next brief.",
    lives: ["signals", "competitors", "calendar"],
    systems: ["Adobe LLM Optimizer"],
    skills: ["trend radar", "consumer listening", "competitive intelligence"],
    writes: ["signal log", "trend map"],
    replaces: "A weekly PDF nobody reads.",
    ladder: {
      human: "An intern pastes links.",
      assist: "Signals ranked against the last brief. Human trims.",
      auto: "The radar runs. The so-what stays human."
    },
    human: "Strategist kills noise.",
    notes: "Strategy Category Signals uses dated entries from this log."
  }),
  "learn::job::trend-radar": card({
    kicker: "Signals · agent",
    title: "Trend radar",
    badge: "More autonomous",
    lede: "Record trend radar for this cycle.",
    body: "Records trend radar in the learning set for the next cycle.",
    lives: ["signals", "learnings"],
    skills: ["trend radar"],
    writes: ["trend map"],
    replaces: "A keynote trend slide.",
    ladder: {
      human: "A yearly workshop.",
      assist: "The radar proposes. Human clusters.",
      auto: "The scan runs. Clusters stay human."
    },
    human: "Strategist / innovation lead.",
    notes: "Feeds Strategy Planning and the next-cycle brief as market context."
  }),
  "learn::job::market-listening": card({
    kicker: "Signals · agent",
    title: "Market listening",
    badge: "More autonomous",
    lede: "Record market listening for this cycle.",
    body: "Records market listening in the learning set for the next cycle.",
    lives: ["signals", "market matrix"],
    skills: ["consumer listening", "web analytics"],
    writes: ["listening log"],
    replaces: "A clip from the home market only.",
    ladder: {
      human: "Awards and anecdotes.",
      assist: "Listening ranked. Human cites.",
      auto: "Known sources run."
    },
    human: "Insights on citation.",
    notes: "Must date every note."
  }),
  "learn::job::competitive-watch": card({
    kicker: "Signals · agent",
    title: "Competitive watch",
    badge: "More autonomous",
    lede: "Record competitive watch for this cycle.",
    body: "Records competitive watch in the learning set for the next cycle.",
    lives: ["competitors", "claim library", "signals"],
    skills: ["competitive intelligence", "consumer listening"],
    writes: ["competitive note"],
    replaces: "Someone saw an ad on the way in.",
    ladder: {
      human: "A screenshot.",
      assist: "Scan compiled. Strategist marks the gap.",
      auto: "Known sets refresh."
    },
    human: "Strategist owns the gap.",
    notes: "Same object family as Strategy. This one is after the flight."
  }),

  "learn::fn::write-back": card({
    kicker: "Data Insight · function",
    title: "Write back",
    badge: "Handoff",
    lede: "Next brief starts from what we learned.",
    body: "Forecast, recommendation and next-cycle brief go into Company Brain.",
    lives: ["mix recommendation", "content scores", "journey insight", "segments", "trend map"],
    systems: ["Adobe Brand Intelligence", "Adobe Workfront"],
    skills: ["brief compiler", "scenario planning", "marketing insight dashboard"],
    writes: ["forecast", "next-cycle brief", "STATE"],
    replaces: "A report in a drawer.",
    ladder: {
      human: "A wash-up nobody attends.",
      assist: "The brief assembles. Human signs.",
      auto: "Slots fill. Signature stays human."
    },
    human: "Analytics lead plus the demand owner.",
    notes: "Strategy next-cycle intake is the empty form. This is the filled one."
  }),
  "learn::job::forecast": card({
    kicker: "Write back · agent",
    title: "Forecast",
    badge: "More autonomous",
    lede: "Record forecast for this cycle.",
    body: "Records forecast in the learning set for the next cycle.",
    lives: ["mix model", "equity model", "calendar"],
    skills: ["scenario planning", "mix modeling"],
    writes: ["forecast"],
    replaces: "A target from finance with no curve.",
    ladder: {
      human: "A round number.",
      assist: "A range. Human picks the plan.",
      auto: "The range refreshes."
    },
    human: "Analytics plus finance.",
    notes: "Accuracy is allowed to compound. That is the Phase 4 promise."
  }),
  "learn::job::next-cycle-brief": card({
    kicker: "Write back · agent",
    title: "Next-cycle brief",
    badge: "More autonomous",
    lede: "Draft the next brief from the evidence.",
    body: "Fill the planned learning slots with the route, claim, segment and market evidence from the completed cycle.",
    lives: ["learn slots", "content scores", "segments", "location insight", "trend map"],
    skills: ["brief compiler", "marketing insight dashboard"],
    writes: ["next-cycle brief"],
    replaces: "Starting Strategy from a blank page.",
    ladder: {
      human: "A kickoff with no file.",
      assist: "The compiler drafts. Strategist edits.",
      auto: "The system fills the slots; the owner signs the brief."
    },
    human: "Strategist plus demand owner.",
    notes: "This is the object Demand and Brief have been waiting for."
  }),
  "learn::job::recommendation": card({
    kicker: "Write back · agent",
    title: "Recommendation",
    badge: "Human-led",
    lede: "What Activation should buy next.",
    body: "The signed so-what. Allocate may not run without it. One page: keep, cut, add, and why.",
    lives: ["mix recommendation", "forecast", "next-cycle brief"],
    skills: ["marketing insight dashboard"],
    writes: ["recommendation", "STATE"],
    replaces: "A 60-page appendix.",
    ladder: {
      human: "A hallway opinion.",
      assist: "The page is drafted. Human signs.",
      auto: "Never the signature."
    },
    human: "Analytics lead. Media and brand countersign.",
    notes: "The Learn owner approves the final recommendation."
  })
};
