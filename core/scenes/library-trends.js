/* Scene library — Digital Experience Trends 2026 (EN / IT).
   Intro (Reply), trend research, the three trend clusters and their deep dives.
   Same format as library.js; the scene types are defined in core/shell/scene-types.js. */

window.TREND_MATRIX = {
  /* x = growth over the last 6 months, y = growth over the last 12 months, s = 2025 YTD volume (all normalized 0–100).
     f = focus topic, n = new for 2026, c = cluster of the focus topic */
  quad: {
    tr: { t: ["Enduring trends", "Trend consolidati"], d: ["Continued and accelerated expert interest over the last 12 months", "Interesse degli esperti continuo e in accelerazione negli ultimi 12 mesi"] },
    br: { t: ["Accelerating trends", "Trend in accelerazione"], d: ["Gaining traction, with rapid growth in expert interest over the last 6 months", "Stanno prendendo piede, con una crescita rapida dell'interesse negli ultimi 6 mesi"] },
    tl: { t: ["Plateauing trends", "Trend in stabilizzazione"], d: ["Rapid growth throughout, but expert interest has now levelled off", "Crescita rapida nel periodo, ma ora l'interesse degli esperti si è stabilizzato"] },
    bl: { t: ["Declining trends", "Trend in calo"], d: ["Decreasing expert interest over the last 12 months", "Interesse degli esperti in calo negli ultimi 12 mesi"] }
  },
  points: [
    { t: "Enterprise Agent Ecosystem", x: 86, y: 94, s: 85, f: 1, n: 1, c: 3 },
    { t: "AI Slop", x: 91, y: 89, s: 62, n: 1 },
    { t: "Generative Engine Optimization", x: 92, y: 92, s: 34, f: 1, c: 1 },
    { t: "Auto Translation", x: 82, y: 66, s: 72 },
    { t: "Generative CMS & UI", x: 90, y: 93, s: 17, f: 1, n: 1, c: 2 },
    { t: "Digital Humans", x: 85, y: 60, s: 64 },
    { t: "Agentic Browsers", x: 83, y: 65, s: 60, f: 1, n: 1, c: 1 },
    { t: "AI Brand Voice", x: 93, y: 73, s: 22, n: 1 },
    { t: "AI Monitoring", x: 72, y: 76, s: 80, f: 1, n: 1, c: 3 },
    { t: "Agentic Commerce", x: 74, y: 72, s: 67, f: 1, n: 1, c: 1 },
    { t: "Autonomous Coworkers", x: 77, y: 81, s: 41, n: 1 },
    { t: "Agentic Marketing & Sales Intelligence", x: 75, y: 80, s: 49, f: 1, n: 1, c: 3 },
    { t: "AI Workplace Compliance", x: 70, y: 61, s: 78, f: 1, n: 1, c: 3 },
    { t: "Conversational AI & Assistants", x: 76, y: 47, s: 74 },
    { t: "Multimodal Search", x: 67, y: 48, s: 83 },
    { t: "Omnimodal Interaction", x: 59, y: 57, s: 93, f: 1, n: 1, c: 1 },
    { t: "Data Sovereignty", x: 58, y: 64, s: 82 },
    { t: "3D Content Generation", x: 64, y: 53, s: 55 },
    { t: "AI Qual Research", x: 66, y: 32, s: 56, n: 1 },
    { t: "Content Optimization & Testing", x: 56, y: 38, s: 77, f: 1, c: 2 },
    { t: "Generative UI", x: 89, y: 5, s: 6 },
    { t: "Digital Experience Platforms", x: 73, y: 36, s: 8 },
    { t: "AI-generated Campaigns & Ads", x: 39, y: 52, s: 86, f: 1, c: 2 },
    { t: "Superapps", x: 60, y: 23, s: 42 },
    { t: "Content Management Systems", x: 44, y: 18, s: 89 },
    { t: "AI Data Enrichment", x: 48, y: 83, s: 3 },
    { t: "Synthetic Data", x: 31, y: 49, s: 88, n: 1 },
    { t: "Digital User Twins", x: 41, y: 30, s: 73, n: 1 },
    { t: "AI-powered Shopping Assistant", x: 62, y: 14, s: 18 },
    { t: "Inclusive AI", x: 30, y: 78, s: 51 },
    { t: "Customer Data Platforms & Profiling", x: 45, y: 28, s: 50 },
    { t: "Data Clean Rooms", x: 52, y: 10, s: 47, n: 1 },
    { t: "Privacy-first AI", x: 27, y: 42, s: 90, n: 1 },
    { t: "Agentic Dynamic Pricing", x: 32, y: 27, s: 69 },
    { t: "Voice Search & Commerce", x: 22, y: 58, s: 68 },
    { t: "Content Personalization", x: 23, y: 44, s: 76 },
    { t: "AI-Influencers", x: 34, y: 33, s: 45 },
    { t: "Dynamic Immersive Experiences", x: 25, y: 22, s: 84, n: 1 },
    { t: "DAM & MRM", x: 38, y: 17, s: 33 },
    { t: "AI Bias Mitigation", x: 20, y: 67, s: 30 },
    { t: "Location Intelligence", x: 33, y: 26, s: 28 },
    { t: "Holographic Interfaces", x: 47, y: 7, s: 2 },
    { t: "Conversational Search", x: 18, y: 69, s: 19, n: 1 },
    { t: "Emotion AI in DX", x: 15, y: 56, s: 32 },
    { t: "Adaptive User Interfaces", x: 26, y: 35, s: 16 },
    { t: "Agentic Personalization", x: 9, y: 20, s: 75 },
    { t: "Micro-Targeting", x: 10, y: 51, s: 38 },
    { t: "Predictive Personalization", x: 3, y: 68, s: 31 },
    { t: "Live-Stream Ads & Shopping", x: 19, y: 11, s: 40 },
    { t: "Decentralised Social Media", x: 7, y: 15, s: 27 }
  ]
};

window.TREND_CLUSTERS = [
  { n: 1, id: "c1", f: "act", img: "assets/img/cluster-1.jpg", t: ["AI-Omnimodal Experiences", "AI-Omnimodal Experiences"], trends: [
    { t: ["Agentic Web", "Agentic Web"], go: "agenticweb", d: ["AI-native discovery and browsing experiences — and the optimization of content for generative engines — where journeys are conversational, synthesized and largely mediated by AI.", "Esperienze di ricerca e navigazione native per l'AI, e l'ottimizzazione dei contenuti per i motori generativi, in cui i percorsi sono conversazionali, sintetizzati e in gran parte mediati dall'AI."] },
    { t: ["Agentic Commerce", "Agentic Commerce"], d: ["Commerce where AI agents act on behalf of customers and brands to discover, decide and transact — shifting conversion from browsing to delegation.", "Un commercio in cui agenti AI agiscono per conto di clienti e brand per scoprire, decidere e acquistare: la conversione passa dalla navigazione alla delega."] },
    { t: ["Omnimodal Interactions", "Omnimodal Interactions"], d: ["AI-orchestrated experiences that interpret context, emotion and intent across text, voice, visual and physical modalities — from channel management to continuous, adaptive presence.", "Esperienze orchestrate dall'AI che interpretano contesto, emozioni e intenzioni tra testo, voce, immagini e mondo fisico: dalla gestione dei canali a una presenza continua e adattiva."] }
  ] },
  { n: 2, id: "c2", f: "make", img: "assets/img/cluster-2.jpg", t: ["AI-Powered Experience Supply Chain", "AI-Powered Experience Supply Chain"], trends: [
    { t: ["Generative CMS & UI", "Generative CMS & UI"], go: "gencms", d: ["Platforms with native generative AI that accelerate creation, personalization and governance of content and user interfaces across customer touchpoints.", "Piattaforme con AI generativa nativa che accelerano creazione, personalizzazione e governance di contenuti e interfacce su tutti i touchpoint."] },
    { t: ["AI-Generated Campaigns & Ads", "AI-Generated Campaigns & Ads"], go: "aicampaigns", d: ["End-to-end campaign engines that use generative AI to create, adapt and optimize brand-safe campaigns and ads across channels for performance outcomes.", "Motori di campagna end-to-end che usano l'AI generativa per creare, adattare e ottimizzare campagne e ads brand-safe su tutti i canali, orientati alle performance."] },
    { t: ["Content Creation & Optimization", "Content Creation & Optimization"], go: "contentopt", d: ["AI-driven experimentation that continuously tests, learns and optimizes content and journeys to maximize engagement and conversion.", "Sperimentazione guidata dall'AI che testa, impara e ottimizza di continuo contenuti e journey per massimizzare engagement e conversione."] }
  ] },
  { n: 3, id: "c3", f: "learn", img: "assets/img/cluster-3.jpg", t: ["AI Data, Growth & Governance", "AI Data, Growth & Governance"], trends: [
    { t: ["Enterprise Agent Ecosystem", "Enterprise Agent Ecosystem"], d: ["Enterprise platforms to publish, discover, govern and integrate AI agents as reusable “products” across journeys and functions, working autonomously with data and deriving insights from it.", "Piattaforme enterprise per pubblicare, trovare, governare e integrare agenti AI come “prodotti” riutilizzabili tra journey e funzioni, che lavorano in autonomia sui dati e ne ricavano insight."] },
    { t: ["Agentic Marketing & Sales Intelligence", "Agentic Marketing & Sales Intelligence"], d: ["AI that lets people interact with data and create real-time business insights and visualizations through natural-language queries.", "AI che permette di interagire con i dati e creare insight di business e visualizzazioni in tempo reale con domande in linguaggio naturale."] },
    { t: ["AI Monitoring & AI Workplace Compliance", "AI Monitoring & AI Workplace Compliance"], go: "aimonitoring", d: ["Controls and observability for AI usage that monitor models, data and workflows to enforce policy, manage risk and meet regulatory and ethical standards — without undermining employee trust.", "Controlli e osservabilità sull'uso dell'AI che monitorano modelli, dati e workflow per applicare le policy, gestire i rischi e rispettare gli standard normativi ed etici, senza minare la fiducia delle persone."] }
  ] }
];

window.SCENE_LIBRARY = (window.SCENE_LIBRARY || []).concat([
  /* ================= INTRO ================= */
  {
    id: "dxcover", sec: "intro", layout: "cover", type: "cover",
    core: { agents: true, level: 2 },
    k: ["{brand} for {client}", "{brand} per {client}"],
    h: ["Digital Experience Trends 2026", "Digital Experience Trends 2026"],
    p: ["Nine trends in three clusters — and what they change in how brands are discovered, how experiences are produced and how AI is governed.", "Nove trend in tre cluster, e cosa cambiano nel modo in cui i brand vengono trovati, le esperienze vengono prodotte e l'AI viene governata."],
    d: { bg: "assets/img/trends-cover.jpg" },
    n: ["Open on the title. The living core behind it is the operating model we will come back to throughout: press C at any time.", "Apri sul titolo. Il core vivo sullo sfondo è il modello operativo su cui torneremo per tutta la presentazione: premi C in qualsiasi momento."]
  },
  {
    id: "reply", sec: "intro", layout: "full", type: "about",
    core: { agents: true, level: 2 },
    k: ["Who we are", "Chi siamo"],
    h: ["One network of specialists, combined around your needs", "Una rete di specialisti, combinati attorno alle vostre esigenze"],
    d: {
      tabs: [
        { t: ["Reply Group", "Gruppo Reply"], lead: ["Reply is an IT and marketing consulting company with a unique business model that enables regional-scale implementations with the potential for global expansion.", "Reply è una società di consulenza IT e marketing con un modello di business unico, che permette implementazioni su scala regionale con la possibilità di espandersi a livello globale."], b: [["A decentralized network of highly specialized companies, each focused on a technology, an industry or a vertical topic.", "Una rete decentralizzata di società altamente specializzate, ognuna focalizzata su una tecnologia, un settore o un tema verticale."], ["Specialized resources from different companies can be combined, adapted and integrated flexibly, at any time, depending on the needs.", "Le risorse specializzate delle diverse società si possono combinare, adattare e integrare in modo flessibile, in qualsiasi momento, in base alle esigenze."]], img: "assets/img/reply-people.webp" },
        { t: ["Reply Digital Experience", "Reply Digital Experience"], lead: ["A network of companies and agencies focused on creating and delivering best-in-class digital solutions.", "Una rete di società e agenzie focalizzate sulla creazione e sulla delivery di soluzioni digitali best-in-class."], b: [["With the full potential of creativity, data and technology, we design holistic experiences that enable people-centric business growth.", "Con tutto il potenziale di creatività, dati e tecnologia, progettiamo esperienze olistiche che abilitano una crescita del business centrata sulle persone."], ["With enthusiasm, experience and creative commitment — from the first idea to the final delivery.", "Con entusiasmo, esperienza e impegno creativo: dalla prima idea fino alla delivery."]], img: "assets/img/reply-dx.webp" },
        { t: ["Comwrap Reply", "Comwrap Reply"], lead: ["Personalized digital experiences powered by data and AI. We design and build digital solutions for marketing operations, web and content management, with data and personalization at the core.", "Esperienze digitali personalizzate, alimentate da dati e AI. Progettiamo e realizziamo soluzioni digitali per marketing operations, web e content management, con dati e personalizzazione al centro."], b: [["AI-driven personalization across web, e-commerce and digital marketing", "Personalizzazione guidata dall'AI su web, e-commerce e digital marketing"], ["Customer experience and journey design based on data and behaviour", "Customer experience e design dei journey basati su dati e comportamenti"], ["Marketing automation and AI marketing to tailor messages at scale", "Marketing automation e AI marketing per messaggi su misura, su scala"], ["Content Supply Chain and content operations, from creation to delivery", "Content Supply Chain e content operations, dalla creazione alla delivery"], ["Conversational CMS and chatbots for personalized interactions", "CMS conversazionali e chatbot per interazioni personalizzate"], ["Enterprise web development with a strong focus on accessibility and scalability", "Sviluppo web enterprise con forte attenzione ad accessibilità e scalabilità"]], logo: true }
      ]
    },
    n: ["Three tabs, from the group to the team in the room. Keep it short: the point is that we can combine specialists around their needs.", "Tre schede, dal gruppo al team in sala. Resta breve: il punto è che possiamo combinare specialisti attorno alle loro esigenze."]
  },
  {
    id: "offering", sec: "intro", layout: "full", type: "offering",
    core: { agents: true, level: 2 },
    k: ["Comwrap Reply · offering overview", "Comwrap Reply · la nostra offerta"],
    h: ["Four practices, one layer of AI accelerators", "Quattro practice, un unico livello di acceleratori AI"],
    d: {
      pillars: [
        { t: ["Digital Experience", "Digital Experience"], f: "act", b: [["Integrated portals", "Portali integrati"], ["Headless CMS and contextual editing (Universal Editor)", "CMS headless ed editing contestuale (Universal Editor)"], ["Intelligent authoring", "Authoring intelligente"], ["Edge Delivery Services and document-based authoring", "Edge Delivery Services e authoring basato su documenti"], ["Touchpoints", "Touchpoint"], ["SaaS migration", "Migrazione SaaS"]] },
        { t: ["CSC & Workflow", "CSC e workflow"], f: "make", b: [["Optimizing content management processes (marketing ops)", "Ottimizzazione dei processi di content management (marketing ops)"], ["Asset delivery scaling (GenAI-based)", "Scalare la delivery degli asset (con la GenAI)"], ["Workflow and process integration", "Integrazione di workflow e processi"]] },
        { t: ["AI-powered Data & Decision", "Dati e decisioni con l'AI"], f: "learn", b: [["AI/ML-driven hyper-personalization and segmentation", "Hyper-personalizzazione e segmentazione con AI/ML"], ["Real-time activation", "Attivazione in tempo reale"], ["Marketing automation", "Marketing automation"], ["Powered search", "Ricerca evoluta"], ["Targeting", "Targeting"]] },
        { t: ["Accessibility & Paperless", "Accessibilità e paperless"], f: "ring", b: [["PDF accessibility", "Accessibilità dei PDF"], ["Accelerated digitalization of sales processes (paperless)", "Digitalizzazione accelerata dei processi di vendita (paperless)"], ["Adobe Sign", "Adobe Sign"], ["Low-code form creation", "Creazione di form low-code"], ["Adobe Guides (technical content and documentation)", "Adobe Guides (contenuti tecnici e documentazione)"]] }
      ],
      band: ["Agentic AI & AI-based accelerators", "AI agentica e acceleratori basati sull'AI"],
      accel: [
        { t: "AEM GPT Copilot", go: "aemcopilot" }, { t: "Design 2 Content", go: "d2c" }, { t: "Content Waver", go: "waver" },
        { t: ["n8n & custom agents for CSC", "n8n e agenti custom per la CSC"], go: "n8n" }, { t: "LLM & Site Optimizer", go: "llmo" }, { t: "GenStudio for PEM", go: "genstudio" },
        { t: "Conversational CMS", go: "aemassistant" }, { t: "Content Migration Agent" }, { t: "Edge Delivery Rapid Deployment Program" }, { t: "Experience Catalyst" }
      ],
      hint: ["Accelerators with ↗ have a scene of their own — click to jump there.", "Gli acceleratori con ↗ hanno una scena dedicata: clicca per andarci."]
    },
    n: ["Hover the four practices; then use the accelerator chips as shortcuts — each one with ↗ jumps to its scene and you can come back with ←.", "Passa sulle quattro practice; poi usa gli acceleratori come scorciatoie: quelli con ↗ portano alla loro scena e torni indietro con ←."]
  },
  {
    id: "adobecc", sec: "intro", layout: "full", type: "timeline",
    core: { agents: true, level: 2 },
    k: ["Comwrap Reply · Adobe Competence Center", "Comwrap Reply · Adobe Competence Center"],
    h: ["18+ years of partnership with Adobe", "Oltre 18 anni di partnership con Adobe"],
    d: {
      events: [
        { y: 2008, t: ["AEM (CQ5) practice started", "Nasce la practice AEM (CQ5)"] },
        { y: 2009, t: ["Adobe Commerce (Magento) practice started", "Nasce la practice Adobe Commerce (Magento)"] },
        { y: 2017, t: ["Asynchronous API partner innovation — now part of the core", "Innovazione da partner sulle API asincrone, oggi parte del core"] },
        { y: 2018, t: ["First Magento Commerce Cloud project in Europe", "Primo progetto Magento Commerce Cloud in Europa"] },
        { y: 2019, t: ["First AEM Blueprint project, live in 8 weeks", "Primo progetto AEM Blueprint, live in 8 settimane"] },
        { y: 2020, t: ["First AEM as a Cloud Service project in Europe", "Primo progetto AEM as a Cloud Service in Europa"] },
        { y: 2021, t: ["DX Partner of the Year award", "Premio DX Partner of the Year"], star: 1 },
        { y: 2022, t: ["Adobe Experience Platform practice started", "Nasce la practice Adobe Experience Platform"] },
        { y: 2023, t: ["DX Partner of the Year award", "Premio DX Partner of the Year"], star: 1 },
        { y: 2024, t: ["RDP · accredited solutions", "RDP · soluzioni accreditate"] },
        { y: 2025, t: ["AI and Edge Delivery Services competence centers", "Competence center AI ed Edge Delivery Services"] }
      ],
      kpis: [
        { v: 200, pre: ">", t: ["Experience Cloud projects concluded", "progetti Experience Cloud conclusi"] },
        { v: 70, pre: ">", t: ["active customers", "clienti attivi"] },
        { v: 90, pre: "+", t: ["Adobe Experience Cloud consultants", "consulenti Adobe Experience Cloud"] },
        { v: 90, suf: "%", t: ["certified", "certificati"] }
      ],
      facts: [["GEOs: EMEA + Americas", "Aree: EMEA + Americhe"], ["Partner of the Year 2024, 2023 and 2021", "Partner of the Year 2024, 2023 e 2021"], ["End-to-end Experience Cloud services", "Servizi Experience Cloud end-to-end"]],
      badge: "assets/img/adobe-partner.webp"
    },
    n: ["Press Play and let the timeline run, or click a year. Note: in the source deck this slide is marked UPDATE — check the figures before the meeting.", "Premi Avvia e lascia scorrere la timeline, oppure clicca un anno. Nota: nel deck originale questa slide è segnata UPDATE, verifica i numeri prima dell'incontro."]
  },

  /* ================= TRENDS 2026 ================= */
  {
    id: "method", sec: "trends", layout: "full", type: "method",
    core: { focus: "learn", trail: true, spots: [
      { id: "learn::job::market-listening", l: ["Trend discovery", "Trend discovery"] },
      { id: "learn::job::trend-radar", l: ["Quantification", "Quantificazione"] },
      { id: "intel::job::category-signals", l: ["Clustering & analysis", "Clustering e analisi"] }
    ] },
    k: ["Methodology", "Metodologia"],
    h: ["AI- and data-driven trend research", "Una ricerca sui trend guidata da AI e dati"],
    d: {
      steps: [
        { t: ["Trend discovery", "Trend discovery"], d: ["AI search finds the latest trends, reports and news on digital experience. Custom GPT knowledge bases and NotebookLM notebooks retrieve and analyze trends, sub-trends and use cases from key reports and articles.", "La ricerca con l'AI individua trend, report e notizie più recenti sulla digital experience. Knowledge base su Custom GPT e notebook NotebookLM recuperano e analizzano trend, sotto-trend e casi d'uso dai report e dagli articoli principali."], tools: ["AI Search", "Custom GPT", "NotebookLM", "Web browsing"] },
        { t: ["Trend quantification", "Quantificazione dei trend"], d: ["SONAR Reply maps and scores how relevant each trend is in expert media, analyzing the buzz across more than 50 million expert blogs, news sites, patent filings and scientific publications.", "SONAR Reply mappa e misura la rilevanza di ogni trend nei media specializzati, analizzando il buzz su oltre 50 milioni di blog di esperti, siti di news, brevetti e pubblicazioni scientifiche."], tools: ["SONAR Reply", ["Search data", "Dati di ricerca"]] },
        { t: ["Trend clustering", "Clustering dei trend"], d: ["The top 50 trends are grouped into clusters of related topics.", "I 50 trend principali vengono raggruppati in cluster di temi collegati."], tools: [["Top 50 trends", "Top 50 trend"]] },
        { t: ["Trend analysis", "Analisi dei trend"], d: ["The most relevant trends with consistent growth are prioritized and analyzed in depth — the deep dives of this report.", "I trend più rilevanti e con una crescita costante vengono messi in priorità e analizzati in profondità: sono gli approfondimenti di questo report."], tools: [["Growth matrix", "Growth matrix"], ["Deep dives", "Approfondimenti"]] }
      ],
      big: { v: 50, pre: "", suf: "M+", t: ["expert sources analyzed: blogs, news, patents and scientific publications", "fonti specializzate analizzate: blog, news, brevetti e pubblicazioni scientifiche"] }
    },
    n: ["The cycle runs by itself; click a step to stop. The message: these trends are measured, not opinions.", "Il ciclo scorre da solo; clicca un passo per fermarti. Il messaggio: questi trend sono misurati, non opinioni."]
  },
  {
    id: "matrix", sec: "trends", layout: "full", type: "matrix",
    core: { focus: "learn", spots: [{ id: "learn::job::trend-radar", l: ["Trend radar", "Trend radar"] }] },
    k: ["Digital Experience growth matrix", "Digital Experience growth matrix"],
    h: ["50 trends, prioritized by expert media mentions", "50 trend, in priorità in base alle citazioni nei media specializzati"],
    d: {
      axisX: ["Growth · last 6 months", "Crescita · ultimi 6 mesi"], axisY: ["Growth · last 12 months", "Crescita · ultimi 12 mesi"],
      score: [["Last 6 months growth", "Crescita ultimi 6 mesi", 60], ["Last 12 months growth", "Crescita ultimi 12 mesi", 20], ["2025 YTD volume", "Volume 2025 YTD", 20]],
      note: ["Volume and growth values are standardized and normalized for readability. Bubble size = volume.", "Volumi e crescite sono standardizzati e normalizzati per leggibilità. Dimensione della bolla = volume."]
    },
    n: ["Filter live: focus topics first, then one cluster at a time. Hover any bubble for its name. The scoring weights recent growth most (60%).", "Filtra dal vivo: prima i focus topic, poi un cluster alla volta. Passa su una bolla per vederne il nome. Lo scoring pesa soprattutto la crescita recente (60%)."]
  },
  {
    id: "clusters", sec: "trends", layout: "full", type: "clusters",
    core: { agents: true, level: 2 },
    k: ["Deep-dive overview", "Panoramica degli approfondimenti"],
    h: ["Nine trends, three clusters", "Nove trend, tre cluster"],
    d: { hint: ["Click a cluster to open its chapter, or a trend marked ↗ to go straight to its deep dive.", "Clicca un cluster per aprire il suo capitolo, oppure un trend con ↗ per andare dritto all'approfondimento."] },
    n: ["This is the agenda. Let the client choose where to start; every ↗ jumps to the deep dive and the overview (G) brings you back.", "Questa è l'agenda. Lascia scegliere al cliente da dove partire: ogni ↗ porta all'approfondimento e la panoramica (G) ti riporta qui."]
  },

  /* ================= CLUSTER 1 · AI-OMNIMODAL EXPERIENCES ================= */
  {
    id: "c1", sec: "c1", layout: "cover", type: "chapter",
    core: { focus: "act", agents: true, level: 2 },
    k: ["Trend cluster 1", "Cluster di trend 1"],
    h: ["AI-Omnimodal Experiences", "AI-Omnimodal Experiences"],
    p: ["How people discover, decide and interact when AI sits between the brand and the customer.", "Come le persone scoprono, scelgono e interagiscono quando tra il brand e il cliente c'è l'AI."],
    d: { n: 1, bg: "assets/img/cluster-1.jpg" },
    n: ["Chapter opener. The deep dive is on the Agentic Web; Agentic Commerce and Omnimodal Interactions are on the overview.", "Apertura del capitolo. L'approfondimento è sull'Agentic Web; Agentic Commerce e Omnimodal Interactions sono nella panoramica."]
  },
  {
    id: "agenticweb", sec: "c1", layout: "full", type: "trend",
    core: { focus: "act", trail: true, spots: [
      { id: "act::job::search", l: ["AI search & GEO", "AI search e GEO"] },
      { id: "act::job::site-seo", l: ["Agentic browsers", "Agentic browser"] }
    ] },
    k: ["Trend deep dive · Agentic Web", "Approfondimento · Agentic Web"],
    h: ["Shaping intent and execution in an AI-first journey", "Intenzione ed esecuzione in un percorso AI-first"],
    p: ["From searching and browsing to AI-orchestrated outcomes.", "Dal cercare e navigare a risultati orchestrati dall'AI."],
    d: {
      def: ["AI-native experiences where agents interpret intent, synthesize information (AI Search & GEO) and take action (Agentic Browsers) — moving users from searching and browsing to outcome-driven delegation.", "Esperienze native per l'AI in cui gli agenti interpretano l'intenzione, sintetizzano le informazioni (AI Search e GEO) e agiscono (Agentic Browser): l'utente passa dal cercare e navigare a delegare il risultato."],
      subs: [
        { t: ["AI Search & GEO · the discovery layer", "AI Search e GEO · il livello della scoperta"], b: [["Answers replace search results", "Le risposte sostituiscono i risultati di ricerca"], ["Visibility depends on citation and synthesis", "La visibilità dipende da citazioni e sintesi"], ["Content is optimized for models", "I contenuti si ottimizzano per i modelli"]] },
        { t: ["Agentic Browsers · the action layer", "Agentic Browser · il livello dell'azione"], b: [["Agents replace manual navigation", "Gli agenti sostituiscono la navigazione manuale"], ["Browsing becomes execution", "Navigare diventa eseguire"], ["Tasks complete without step-by-step human input", "I task si completano senza input umano passo per passo"]] }
      ],
      why: [["Discovery and action are no longer separate moments", "Scoperta e azione non sono più momenti separati"], ["Influence shifts upstream, to how AI interprets", "L'influenza si sposta a monte, su come l'AI interpreta"], ["Trust, authority and governance decide which outcomes are executed", "Fiducia, autorevolezza e governance decidono quali risultati vengono eseguiti"]],
      line: ["GEO determines what agents know. AI browsers determine what agents do.", "Il GEO decide cosa sanno gli agenti. Gli AI browser decidono cosa fanno."]
    },
    n: ["Two layers: discovery (what the agent knows about you) and action (what it does for the user). Everything that follows in this chapter answers one of the two.", "Due livelli: la scoperta (cosa l'agente sa di voi) e l'azione (cosa fa per l'utente). Tutto il resto del capitolo risponde a uno dei due."]
  },
  {
    id: "aishift", sec: "c1", layout: "full", type: "bigstat",
    core: { focus: "act", spots: [{ id: "act::job::search", l: ["Search", "Search"] }] },
    k: ["Agentic Web · market signals", "Agentic Web · segnali dal mercato"],
    h: ["AI search and agentic browsers signal a major shift in user behaviour", "AI search e agentic browser segnalano un cambio profondo nei comportamenti"],
    d: {
      size: "m",
      stats: [
        { lab: ["AI Search & GEO · discovery layer", "AI Search e GEO · scoperta"], v: 50, pre: "−", suf: "%", t: ["or more of brands' organic search traffic by 2028, as consumers embrace GenAI-powered search", "o più di traffico organico per i brand entro il 2028, perché i consumatori adottano la ricerca con la GenAI"], src: "Gartner, How AI Will Reshape Marketing" },
        { lab: ["Agentic browsers · action layer", "Agentic browser · azione"], v: 76.8, dec: 1, pre: "$", suf: "B", t: ["global AI browser market by 2034, up from $4.5B in 2024 (CAGR 32.8%)", "mercato globale degli AI browser al 2034, da 4,5 miliardi di dollari nel 2024 (CAGR 32,8%)"], src: "Market.us, Global AI Browser Market Report (2025–2034)" }
      ]
    },
    n: ["Half of organic traffic is at stake. The question for {client}: how visible is the brand inside AI answers today?", "È in gioco metà del traffico organico. La domanda per {client}: quanto è visibile oggi il brand dentro le risposte dell'AI?"]
  },
  {
    id: "geo", sec: "c1", layout: "full", type: "geo",
    core: { focus: "act", trail: true, spots: [
      { id: "act::job::search", l: ["Before: search engines", "Prima: motori di ricerca"] },
      { id: "act::job::site-seo", l: ["Today: AI assistants", "Oggi: assistenti AI"] }
    ] },
    k: ["Agentic Web · what is GEO", "Agentic Web · cos'è il GEO"],
    h: ["Generative Engine Optimization", "Generative Engine Optimization"],
    p: ["GEO optimizes content and websites to improve a brand's visibility and ranking in AI-powered search engines such as Copilot, ChatGPT, Gemini and Perplexity — so the site appears in AI-generated answers when users ask relevant questions.", "Il GEO ottimizza contenuti e siti per migliorare visibilità e posizionamento del brand nei motori di ricerca basati sull'AI, come Copilot, ChatGPT, Gemini e Perplexity, così che il sito compaia nelle risposte generate quando gli utenti fanno domande pertinenti."],
    d: {
      modes: [
        { t: ["Before", "Prima"], d: ["Users search for information through search engines (e.g. Google).", "Gli utenti cercano informazioni con i motori di ricerca (es. Google)."], img: "assets/img/geo-search.jpg" },
        { t: ["Today", "Oggi"], d: ["Users search for information through AI assistants (e.g. ChatGPT).", "Gli utenti cercano informazioni con gli assistenti AI (es. ChatGPT)."], img: "assets/img/geo-assistant.jpg" }
      ]
    },
    n: ["Toggle Before / Today. Same question, two very different answers: a list of links, or one synthesized reply that may or may not cite the brand.", "Alterna Prima / Oggi. Stessa domanda, due risposte molto diverse: una lista di link, oppure una risposta sintetica che può citare il brand oppure no."]
  },
  {
    id: "llmo", sec: "c1", layout: "full", type: "shots",
    core: { focus: "learn", trail: true, spots: [
      { id: "learn::job::competitive-watch", l: ["Brand presence", "Brand presence"] },
      { id: "learn::job::pathing", l: ["Agentic traffic", "Traffico degli agenti"] },
      { id: "act::job::site-seo", l: ["Optimizations", "Ottimizzazioni"] }
    ] },
    k: ["Agentic Web · Adobe LLM Optimizer", "Agentic Web · Adobe LLM Optimizer"],
    h: ["Adobe LLM Optimizer", "Adobe LLM Optimizer"],
    p: ["Adobe's enterprise solution to measure and optimize brand visibility across large language models — improving brand presence and mentions in AI-based search experiences.", "La soluzione enterprise di Adobe per misurare e ottimizzare la visibilità del brand nei large language model, migliorando presenza e citazioni nelle esperienze di ricerca basate sull'AI."],
    d: {
      tabs: [
        { t: ["Brand presence", "Brand presence"], d: ["A detailed view of how the brand is perceived in AI-generated answers, compared with competitors.", "Una vista dettagliata di come il brand viene percepito nelle risposte generate dall'AI, rispetto ai competitor."], img: "assets/img/llmo-brand.jpg" },
        { t: ["Agentic traffic", "Traffico degli agenti"], d: ["How AI agents — crawlers and chatbots — interact with the website, with general performance metrics.", "Come gli agenti AI, crawler e chatbot, interagiscono con il sito, con le metriche generali di performance."], img: "assets/img/llmo-traffic.jpg" },
        { t: ["Optimizations", "Ottimizzazioni"], d: ["Improvement opportunities that can be deployed automatically, without manual intervention.", "Opportunità di miglioramento che si possono applicare in automatico, senza interventi manuali."], img: "assets/img/llmo-optim.jpg" }
      ]
    },
    n: ["Measure → understand → fix. The third tab is the strong one: optimizations deployed automatically.", "Misurare → capire → correggere. La terza scheda è la più forte: ottimizzazioni applicate in automatico."]
  },
  {
    id: "aemassistant", sec: "c1", layout: "full", type: "product",
    core: { focus: "core", spots: [{ id: "make::job::page-copy", l: ["Editorial work", "Lavoro editoriale"] }] },
    k: ["Reply accelerator · Agentic Web", "Acceleratore Reply · Agentic Web"],
    h: ["Reply AEM Digital Assistant", "Reply AEM Digital Assistant"],
    p: ["A chatbot integrated into Adobe Experience Manager that makes editorial work faster and easier.", "Un chatbot integrato in Adobe Experience Manager che rende il lavoro editoriale più rapido e semplice."],
    d: {
      stats: [
        { v: 30, pre: "+", suf: "%", t: ["productivity, by reducing manual effort on repetitive, low-value activities", "di produttività, riducendo lo sforzo manuale sulle attività ripetitive a basso valore"] },
        { v: 70, pre: "−", suf: "%", t: ["time spent searching documentation or waiting for technical support", "di tempo speso a cercare nella documentazione o ad attendere il supporto tecnico"] }
      ],
      lists: [{ t: ["How it works", "Come funziona"], b: [["Built on LLMs and trained on user manuals and AEM documentation, it talks to editors in natural language.", "Costruito su LLM e addestrato su manuali utente e documentazione di AEM, parla con gli editor in linguaggio naturale."], ["Relevant, accurate answers: less time searching content manually, fewer requests to the support team.", "Risposte pertinenti e precise: meno tempo a cercare a mano, meno richieste al team di supporto."], ["Faster onboarding and training for editorial staff, with a shorter learning curve.", "Onboarding e formazione più rapidi per il team editoriale, con una curva di apprendimento più corta."]] }],
      img: "assets/img/aem-assistant.webp",
      note: ["Included in the proposed solution. The chatbot needs an OpenAI subscription for the LLM services (OpenAI key and pay-as-you-go costs at the customer's expense).", "Incluso nella soluzione proposta. Il chatbot richiede un abbonamento OpenAI per i servizi LLM (chiave OpenAI e costi a consumo a carico del cliente)."]
    },
    n: ["Lead with the two numbers. Mention the OpenAI subscription only if asked about costs.", "Parti dai due numeri. Cita l'abbonamento OpenAI solo se chiedono dei costi."]
  },
  {
    id: "d2c", sec: "c1", layout: "full", type: "product",
    core: { trail: true, spots: [
      { id: "make::job::page-copy", l: ["Figma content", "Contenuti da Figma"] },
      { id: "make::job::spec-qa", l: ["Quality gate", "Quality gate"] },
      { id: "act::job::site-seo", l: ["AEM Sites / EDS", "AEM Sites / EDS"] }
    ] },
    k: ["Reply accelerator · Agentic Web", "Acceleratore Reply · Agentic Web"],
    h: ["Reply Design 2 Content", "Reply Design 2 Content"],
    d: {
      lists: [
        { t: ["Need", "Esigenza"], b: [["A gap between the design system and AEM authoring", "Un divario tra design system e authoring in AEM"], ["Manual content transfer: a long, error-prone process", "Trasferimento manuale dei contenuti: un processo lungo e soggetto a errori"], ["A direct impact on time to market and team alignment", "Un impatto diretto su time to market e allineamento dei team"]] },
        { t: ["Solution", "Soluzione"], b: [["Automated injection of text and images from Figma", "Inserimento automatico di testi e immagini da Figma"], ["Deterministic mapping based on a contract", "Mappatura deterministica basata su un contratto"], ["A quality gate before import", "Un quality gate prima dell'import"], ["Compatible with AEM Sites and Edge Delivery Services", "Compatibile con AEM Sites ed Edge Delivery Services"]] }
      ],
      img: "assets/img/d2c.jpg", logo: "assets/img/d2c-logo.jpg"
    },
    n: ["From the design file straight into the page — with a quality gate in between, so speed does not cost control.", "Dal file di design direttamente nella pagina, con un quality gate in mezzo: la velocità non costa controllo."]
  },
  {
    id: "aemcopilot", sec: "c1", layout: "full", type: "product",
    core: { trail: true, spots: [
      { id: "make::job::dam-pull", l: ["Asset metadata", "Metadati degli asset"] },
      { id: "act::job::site-seo", l: ["SEO & accessibility", "SEO e accessibilità"] },
      { id: "act::job::languages", l: ["Multilingual", "Multilingua"] }
    ] },
    k: ["Reply accelerator · Agentic Web", "Acceleratore Reply · Agentic Web"],
    h: ["Reply AEM Copilot", "Reply AEM Copilot"],
    p: ["Reply's plugin for Adobe Experience Manager automates SEO and accessibility.", "Il plugin di Reply per Adobe Experience Manager che automatizza SEO e accessibilità."],
    d: {
      stats: [{ v: 10, pre: "", suf: "×", t: ["faster asset metadata and page descriptions (up to)", "più veloci metadati degli asset e descrizioni di pagina (fino a)"] }],
      lists: [{ t: ["Capabilities", "Funzionalità"], b: [["AI-generated meta titles and descriptions, based on the content of images and pages", "Meta title e description generati con l'AI, a partire dal contenuto di immagini e pagine"], ["Runs on a single image or page, or in bulk through workflow automation", "Funziona su una singola immagine o pagina, oppure in blocco con i workflow"], ["Multi-brand and multilingual, with customizable profiles and prompts configured directly in AEM", "Multi-brand e multilingua, con profili personalizzabili e prompt configurati direttamente in AEM"], ["SEO-optimized tags generated automatically from existing taxonomies", "Tag ottimizzati per la SEO generati in automatico dalle tassonomie esistenti"]] }],
      video: "assets/video/aem-copilot.mp4", badge: "assets/img/aem-rockstar.webp"
    },
    n: ["Let the demo run in the background while you read the capabilities. The “10×” is the number to remember.", "Lascia girare la demo mentre leggi le funzionalità. Il numero da ricordare è “10×”."]
  },
  {
    id: "orchestrator", sec: "c1", layout: "full", type: "orchestrator",
    core: { focus: "ring", agents: true, level: 2 },
    k: ["Agentic Web · agentic approach in AEM", "Agentic Web · l'approccio agentico in AEM"],
    h: ["The Agent Orchestrator", "L'Agent Orchestrator"],
    d: {
      centre: "Agent Orchestrator",
      agents: [["Content Advisor Agent", "Content Advisor Agent"], ["Brand Experience Agent", "Brand Experience Agent"], ["Experience Modernization Agent", "Experience Modernization Agent"], ["Governance Agent", "Governance Agent"]],
      what: [["AI agents embedded in AEM understand context and act on content.", "Gli agenti AI integrati in AEM comprendono il contesto e agiscono sui contenuti."], ["An Agent Orchestrator coordinates specialized agents — content, governance, experience — to manage workflows end to end.", "Un Agent Orchestrator coordina agenti specializzati (contenuti, governance, esperienza) per gestire i workflow end-to-end."]],
      why: [["Less manual effort in content operations", "Meno lavoro manuale nelle content operations"], ["Automated optimization and governance at scale", "Ottimizzazione e governance automatiche su scala"], ["Faster onboarding, less dependency on support", "Onboarding più rapido, meno dipendenza dal supporto"], ["Already available, with AI usage included (token-based)", "Già disponibile, con l'uso dell'AI incluso (a token)"]]
    },
    n: ["Close the chapter here: the agents are not a future roadmap, they are already in AEM. Behind, the core shows the agents working inside the jobs.", "Chiudi qui il capitolo: gli agenti non sono una roadmap futura, sono già in AEM. Dietro, il core mostra gli agenti al lavoro dentro i job."]
  },

  /* ================= CLUSTER 2 · AI-POWERED EXPERIENCE SUPPLY CHAIN ================= */
  {
    id: "c2", sec: "c2", layout: "cover", type: "chapter",
    core: { focus: "make", agents: true, level: 2 },
    k: ["Trend cluster 2", "Cluster di trend 2"],
    h: ["AI-Powered Experience Supply Chain", "AI-Powered Experience Supply Chain"],
    p: ["The engine for relevancy at scale. To deliver personalized, omnimodal experiences, brands must move beyond linear workflows: AI-powered experience supply chains are dynamic, intelligent systems that create, manage and optimize content and interfaces at the speed the market demands.", "Il motore della rilevanza su scala. Per offrire esperienze personalizzate e omnimodali, i brand devono superare i workflow lineari: le experience supply chain basate sull'AI sono sistemi dinamici e intelligenti che creano, gestiscono e ottimizzano contenuti e interfacce alla velocità che il mercato richiede."],
    d: { n: 2, bg: "assets/img/cluster-2.jpg" },
    n: ["This chapter is the heart of the meeting: three trends first, then the Content Supply Chain model, the tools and the cases.", "Questo capitolo è il cuore dell'incontro: prima i tre trend, poi il modello di Content Supply Chain, gli strumenti e i casi."]
  },
  {
    id: "gencms", sec: "c2", layout: "full", type: "trend",
    core: { focus: "make", trail: true, spots: [
      { id: "make::job::page-copy", l: ["Agentic DXP", "DXP agentica"] },
      { id: "make::job::brand-qa", l: ["Policy engines", "Policy engine"] },
      { id: "intel::job::claim-library", l: ["Grounded via RAG", "Ancorata via RAG"] }
    ] },
    k: ["Trend deep dive · Generative CMS & UI", "Approfondimento · Generative CMS & UI"],
    h: ["From manual management to autonomous experience assembly", "Dalla gestione manuale all'assemblaggio autonomo delle esperienze"],
    p: ["From publishing pages to orchestrating experiences.", "Dal pubblicare pagine all'orchestrare esperienze."],
    d: {
      def: ["A system where AI creates, adapts and governs content and user interfaces on behalf of teams — shifting work from manual production and publishing to policy-driven experience orchestration across channels.", "Un sistema in cui l'AI crea, adatta e governa contenuti e interfacce per conto dei team: il lavoro passa dalla produzione e pubblicazione manuale a un'orchestrazione delle esperienze guidata da policy, su tutti i canali."],
      subs: [
        { t: ["Transition to agentic AI", "Verso l'AI agentica"], d: ["From human-driven “copilots” to autonomous AI agents as the core engine of the DXP.", "Dai “copilot” guidati dalle persone ad agenti AI autonomi come motore centrale della DXP."] },
        { t: ["Policy-driven orchestration", "Orchestrazione guidata da policy"], d: ["Digital asset management shifts to automated “policy engines” that check brand and legal compliance (e.g. the EU AI Act) before human review.", "Il digital asset management passa a “policy engine” automatici che verificano la conformità al brand e alle norme (es. EU AI Act) prima della revisione umana."] },
        { t: ["Grounded intelligence via RAG", "Intelligenza ancorata ai dati con la RAG"], d: ["Retrieval-augmented generation keeps AI outputs based on verified data.", "La retrieval-augmented generation fa sì che l'output dell'AI si basi su dati verificati."] }
      ],
      why: [["Customers expect interactions to be context-aware and on-brand.", "I clienti si aspettano interazioni contestuali e coerenti con il brand."], ["CX teams move from producing assets to curating libraries and managing prompts.", "I team di CX passano dal produrre asset al curare librerie e gestire prompt."], ["Brand, legal and compliance are embedded in the workflow, not a downstream review.", "Brand, legal e compliance entrano nel workflow, non sono più una revisione a valle."]],
      stat: { v: 1.7, dec: 1, pre: "$", suf: "B", t: ["generative AI in UI design market by 2033 — from $138M in 2023 (CAGR 29.4%)", "mercato della GenAI nel design di interfacce al 2033, da 138 milioni di dollari nel 2023 (CAGR 29,4%)"], src: "Market Research Biz, Generative AI in UI Design Market Report" }
    },
    n: ["Click through the three subtrends: the core follows. Then point at the stat: twelve times bigger in ten years.", "Clicca i tre sotto-trend: il core li segue. Poi indica il dato: dodici volte più grande in dieci anni."]
  },
  {
    id: "aicampaigns", sec: "c2", layout: "full", type: "trend",
    core: { focus: "act", trail: true, spots: [
      { id: "make::job::series-extensions", l: ["Generative production", "Produzione generativa"] },
      { id: "act::job::in-flight", l: ["Continuous optimization", "Ottimizzazione continua"] },
      { id: "act::job::programmatic", l: ["Dynamic creative", "Creatività dinamica"] }
    ] },
    k: ["Trend deep dive · AI-Generated Campaigns & Ads", "Approfondimento · AI-Generated Campaigns & Ads"],
    h: ["Autonomous campaign engines that learn, adapt and scale", "Motori di campagna autonomi che imparano, si adattano e scalano"],
    p: ["From campaign production to autonomous performance engines.", "Dalla produzione di campagne a motori di performance autonomi."],
    d: {
      def: ["End-to-end AI marketing engines that generate and adapt brand-safe creative and targeting across channels — teams move from building campaigns by hand to setting goals, guardrails and feedback loops that drive outcomes.", "Motori di marketing AI end-to-end che generano e adattano creatività e targeting brand-safe su tutti i canali: i team passano dal costruire campagne a mano al definire obiettivi, guardrail e cicli di feedback che portano risultati."],
      subs: [
        { t: ["Generative creative production", "Produzione creativa generativa"], d: ["Many asset variants created rapidly with AI, to increase velocity and reduce fatigue.", "Tante varianti di asset create rapidamente con l'AI, per aumentare la velocità e ridurre la saturazione."] },
        { t: ["Continuous optimization & insight", "Ottimizzazione e insight continui"], d: ["AI learns from performance signals to test, predict and adjust messaging and targeting faster.", "L'AI impara dai segnali di performance per testare, prevedere e correggere più in fretta messaggi e targeting."] },
        { t: ["Dynamic creative orchestration", "Orchestrazione dinamica delle creatività"], d: ["AI assembles the “right” ad from modular elements for each user context across programmatic channels.", "L'AI compone l'annuncio “giusto” da elementi modulari per ogni contesto utente, sui canali programmatic."] }
      ],
      why: [["Audiences expect relevance; generic campaigns decay faster.", "Il pubblico si aspetta rilevanza; le campagne generiche si esauriscono prima."], ["Marketing moves from “asset production” to “variant systems + rapid learning”.", "Il marketing passa dalla “produzione di asset” a “sistemi di varianti + apprendimento rapido”."], ["Brand safety and compliance are embedded upstream (rules, approvals, audit trails), not reviewed downstream.", "Brand safety e compliance entrano a monte (regole, approvazioni, audit trail), non come revisione a valle."]]
    },
    n: ["Link to the gambling case later in the deck: it is exactly this trend, live.", "Collega al caso gaming più avanti: è esattamente questo trend, in produzione."]
  },
  {
    id: "contentopt", sec: "c2", layout: "full", type: "trend",
    core: { focus: "learn", trail: true, spots: [
      { id: "learn::job::incrementality", l: ["Always-on experiments", "Esperimenti always-on"] },
      { id: "learn::job::content-scores", l: ["Closed-loop learning", "Apprendimento a ciclo chiuso"] },
      { id: "learn::job::segments", l: ["Synthetic audiences", "Audience sintetiche"] }
    ] },
    k: ["Trend deep dive · Content Optimization & Testing", "Approfondimento · Content Optimization & Testing"],
    h: ["From A/B testing to always-on, data-led content evolution", "Dall'A/B test a un'evoluzione dei contenuti continua e guidata dai dati"],
    p: ["From episodic A/B tests to always-on, self-optimizing experiences.", "Da A/B test occasionali a esperienze che si ottimizzano da sole, sempre."],
    d: {
      def: ["AI-driven content optimization and testing uses learning systems to continuously generate and validate experience variants — teams move from occasional tests to always-on feedback loops that improve journeys in real time.", "L'ottimizzazione e il testing guidati dall'AI usano sistemi che apprendono per generare e validare di continuo varianti dell'esperienza: i team passano da test occasionali a cicli di feedback sempre attivi che migliorano i journey in tempo reale."],
      subs: [
        { t: ["Always-on experimentation", "Sperimentazione always-on"], d: ["AI scales testing volume: many concurrent tests across the journey.", "L'AI moltiplica i test: tanti esperimenti in parallelo lungo tutto il journey."] },
        { t: ["Closed-loop learning", "Apprendimento a ciclo chiuso"], d: ["Every interaction continuously updates recommendations and allocations.", "Ogni interazione aggiorna di continuo raccomandazioni e allocazioni."] },
        { t: ["Synthetic audiences", "Audience sintetiche"], d: ["Content and positioning are tested pre-launch on AI personas, to iterate faster before real traffic.", "Contenuti e posizionamento si testano prima del lancio su persona AI, per iterare più in fretta prima del traffico reale."] }
      ],
      why: [["User expectations rise as experiences get more relevant, faster.", "Le aspettative crescono man mano che le esperienze diventano più rilevanti e più rapide."], ["Optimization becomes a system capability, not a quarterly initiative.", "L'ottimizzazione diventa una capacità del sistema, non un'iniziativa trimestrale."], ["Experimentation needs guardrails — metric integrity, bias, brand risk, consent — to scale safely.", "La sperimentazione ha bisogno di guardrail (integrità delle metriche, bias, rischio di brand, consenso) per scalare in sicurezza."]]
    },
    n: ["This closes the loop of the supply chain: Measure feeds the next Plan. Next: why personalization makes this urgent.", "Questo chiude il ciclo della supply chain: Misurare alimenta il prossimo Pianificare. Dopo: perché la personalizzazione lo rende urgente."]
  },
  {
    id: "adobesuite", sec: "how", layout: "full", type: "product",
    core: { trail: true, agents: true, level: 2, spots: [
      { id: "intel::job::creative-brief", l: ["Plan", "Pianificare"] },
      { id: "make::job::series-extensions", l: ["Create", "Creare"] },
      { id: "make::job::master-pack", l: ["Manage", "Gestire"] },
      { id: "act::job::journeys", l: ["Activate", "Attivare"] },
      { id: "learn::job::content-scores", l: ["Measure", "Misurare"] }
    ] },
    k: ["Product-driven · Generative CMS", "Product-driven · Generative CMS"],
    h: ["Adobe Suite: safe, scalable content supply chains", "Adobe Suite: content supply chain sicure e scalabili"],
    d: {
      lists: [
        { t: ["What it is", "Cos'è"], p: ["An integrated content supply chain solution that uses generative AI and automation to plan, create, manage, activate and measure digital content across channels.", "Una soluzione di content supply chain integrata che usa AI generativa e automazione per pianificare, creare, gestire, attivare e misurare i contenuti digitali su tutti i canali."] },
        { t: ["What problem it solves", "Quale problema risolve"], p: ["Keeping up with the growing demand for personalized content, at speed and scale, while controlling cost and complexity.", "Stare al passo con la domanda crescente di contenuti personalizzati, con velocità e su scala, tenendo sotto controllo costi e complessità."] },
        { t: ["What is new", "Cosa c'è di nuovo"], b: [["AI-driven planning and workflow automation", "Pianificazione e automazione dei workflow guidate dall'AI"], ["Commercially safe generative AI in creative tools", "AI generativa sicura per l'uso commerciale negli strumenti creativi"], ["An integrated asset-to-activation workflow with granular performance insights", "Un workflow integrato dall'asset all'attivazione, con insight di performance granulari"]] }
      ],
      img: "assets/img/adobe-suite.webp", contain: true
    },
    n: ["The wheel on the right is the same five-step loop as our model — Plan, Create, Manage, Activate, Measure — with Adobe products in each segment.", "La ruota a destra è lo stesso ciclo in cinque fasi del nostro modello (Pianificare, Creare, Gestire, Attivare, Misurare) con i prodotti Adobe in ogni segmento."]
  },
  {
    id: "brandconcierge", sec: "how", layout: "full", type: "product",
    core: { focus: "act", trail: true, spots: [
      { id: "act::job::personalization", l: ["Intent → brand content", "Intento → contenuti del brand"] },
      { id: "act::job::journeys", l: ["Real-time journeys", "Journey in tempo reale"] }
    ] },
    k: ["Product-driven · Generative CMS", "Product-driven · Generative CMS"],
    h: ["Adobe Brand Concierge", "Adobe Brand Concierge"],
    p: ["AI-powered conversations that match customer intent with brand content.", "Conversazioni con l'AI che fanno incontrare l'intenzione del cliente con i contenuti del brand."],
    d: {
      lists: [
        { t: ["What it does", "Cosa fa"], b: [["Enhances discovery and engagement with AI conversations that match intent with content, to drive trust and action.", "Migliora scoperta ed engagement con conversazioni AI che collegano intenzioni e contenuti, per generare fiducia e azione."], ["Keeps every answer accurate, with conversations based on brand-aligned content.", "Mantiene ogni risposta accurata, con conversazioni basate su contenuti allineati al brand."], ["Surfaces existing site content and assets for natural, on-brand answers and visuals, through Adobe Experience Manager.", "Riusa contenuti e asset del sito per risposte e visual naturali e coerenti con il brand, tramite Adobe Experience Manager."], ["Adapts journeys in real time with Adobe Experience Platform agents that understand and anticipate customer needs.", "Adatta i journey in tempo reale con gli agenti di Adobe Experience Platform, che comprendono e anticipano i bisogni del cliente."]] },
        { t: ["Where it helps", "Dove aiuta"], b: [["Product discovery and consideration — guiding customers to the options that best match their needs", "Scoperta e valutazione dei prodotti: guida il cliente verso le opzioni più adatte"], ["Knowledge support — turning help centers and FAQ pages into real engagement", "Supporto e assistenza: help center e FAQ diventano spazi di vero coinvolgimento"], ["Customer lifetime value — static interactions become experiences that bring customers back", "Customer lifetime value: le interazioni statiche diventano esperienze che fanno tornare i clienti"]] }
      ],
      img: "assets/img/brand-concierge.webp", contain: true
    },
    n: ["Bridge to the Agentic Web chapter: this is the brand's own answer engine, on its own site.", "Ponte con il capitolo Agentic Web: è il motore di risposte del brand, sul suo sito."]
  },
  {
    id: "hga", sec: "proof", layout: "full", type: "case",
    core: { trail: true, agents: true, level: 1, spots: [
      { id: "intel::job::request-intake", l: ["CRM opportunity", "Opportunità dal CRM"] },
      { id: "intel::job::constraints-pack", l: ["Validated metadata", "Metadati validati"] },
      { id: "make::job::master-pack", l: ["Project per opportunity", "Un progetto per opportunità"] },
      { id: "make::job::dam-pull", l: ["CMS folder structures", "Strutture di cartelle nel CMS"] }
    ] },
    k: ["Use case · HGA", "Caso d'uso · HGA"],
    h: ["End-to-end CRM-to-content automation", "Automazione end-to-end dal CRM ai contenuti"],
    d: {
      img: "assets/img/hga.jpg",
      tabs: [
        { t: ["Context", "Contesto"], p: [["The initiative integrated CRM, project management tools and content management platforms to automate the step from business data to operational execution — turning commercial opportunities into structured content projects with fewer manual handovers, better data quality and faster delivery.", "L'iniziativa ha integrato CRM, strumenti di project management e piattaforme di content management per automatizzare il passaggio dai dati di business all'esecuzione operativa: trasformare le opportunità commerciali in progetti di contenuto strutturati, con meno passaggi manuali, dati migliori e consegne più rapide."], ["The use case covers the full conversion of sales opportunities into structured projects: metadata synchronization, information validation and automated generation of the structures and assets needed for content production.", "Il caso d'uso copre l'intera conversione delle opportunità di vendita in progetti strutturati: sincronizzazione dei metadati, validazione delle informazioni e generazione automatica delle strutture e degli asset necessari alla produzione dei contenuti."]] },
        { t: ["What we did", "Cosa abbiamo fatto"], flow: true },
        { t: ["Results", "Risultati"], stats: true, p: [["Faster operational time to market and far fewer repetitive manual activities — with better data quality and consistency across the whole process.", "Time to market operativo più rapido e molte meno attività manuali ripetitive, con dati di qualità migliore e coerenti in tutto il processo."]] }
      ],
      flow: [
        [["Retrieve", "Recuperare"], ["Optimized existing flows to reliably retrieve opportunity data from the CRM", "Ottimizzati i flussi esistenti per recuperare in modo affidabile i dati delle opportunità dal CRM"]],
        [["Validate", "Validare"], ["Validated and enriched opportunity data, for consistency and completeness before project creation", "Dati delle opportunità validati e arricchiti, per coerenza e completezza prima di creare il progetto"]],
        [["Create", "Creare"], ["A project created automatically for each opportunity, with full mapping of the CRM metadata", "Un progetto creato in automatico per ogni opportunità, con la mappatura completa dei metadati del CRM"]],
        [["Process", "Elaborare"], ["A dedicated workflow lists and processes all available opportunities end to end", "Un workflow dedicato elenca ed elabora end-to-end tutte le opportunità disponibili"]],
        [["Structure", "Strutturare"], ["CMS folder structures generated automatically via the Assets API, aligned with opportunity and project metadata", "Strutture di cartelle nel CMS generate in automatico via Assets API, allineate ai metadati di opportunità e progetto"]]
      ],
      stats: [
        { v: 50, pre: "−", suf: "%", t: ["operational time to market (up to)", "di time to market operativo (fino a)"] },
        { v: 70, pre: "−", suf: "%", t: ["repetitive manual activities (about)", "di attività manuali ripetitive (circa)"] }
      ]
    },
    n: ["Show the five-step flow with Play, then the results. It is a supply chain that starts in the CRM, before any creative work.", "Mostra il flusso in cinque passi con Avvia, poi i risultati. È una supply chain che parte dal CRM, prima di qualsiasi lavoro creativo."]
  },
  {
    id: "skoda", sec: "proof", layout: "full", type: "case",
    core: { trail: true, spots: [
      { id: "make::job::document-copy", l: ["Structured authoring", "Authoring strutturato"] },
      { id: "make::job::spec-qa", l: ["Channel templates", "Template per canale"] },
      { id: "act::job::placement-specs", l: ["Multichannel distribution", "Distribuzione multicanale"] }
    ] },
    k: ["Use case · Skoda", "Caso d'uso · Skoda"],
    h: ["Multichannel content ops with AEM Guides & Workfront", "Content ops multicanale con AEM Guides e Workfront"],
    d: {
      img: "assets/img/skoda.jpg",
      tabs: [
        { t: ["Challenge", "Esigenza"], p: [["Modernize multichannel content operations and remove the friction of a legacy tool that made maintenance slow and expensive.", "Modernizzare le content operations multicanale ed eliminare l'attrito di uno strumento legacy che rendeva la manutenzione lenta e costosa."], ["The setup was designed for static PDFs rather than app and infotainment use cases; governance across channels was missing and Adobe Experience Manager was not fully leveraged.", "Il sistema era pensato per PDF statici più che per app e infotainment; mancava una governance tra i canali e Adobe Experience Manager non era sfruttato appieno."], ["Asset uploads required too many AEM Assets users — an unsustainable licensing cost — while the business still needed reliable coverage with minimal custom development.", "Il caricamento degli asset richiedeva troppi utenti AEM Assets, con costi di licenza insostenibili, mentre il business aveva bisogno di una copertura affidabile con il minimo di sviluppo custom."]] },
        { t: ["Solution", "Soluzione"], flow: true, p: [["Workflows and UI-driven changes were standardized to reduce IT dependency while ensuring reuse and consistency across all channels.", "Workflow e modifiche da interfaccia sono stati standardizzati per ridurre la dipendenza dall'IT, garantendo riuso e coerenza su tutti i canali."]] },
        { t: ["Results", "Risultati"], b: [["Multichannel efficiency: consistent styling, shorter authoring-to-publish cycles, rapid updates propagated across outputs", "Efficienza multicanale: stile coerente, cicli più brevi dall'authoring alla pubblicazione, aggiornamenti propagati rapidamente su tutti gli output"], ["A significant reduction in AEM Assets licensing costs, with parity with the existing scenarios", "Una riduzione significativa dei costi di licenza AEM Assets, a parità di scenari esistenti"], ["More confidence in the Adobe stack and in Reply delivery", "Più fiducia nello stack Adobe e nella delivery di Reply"], ["Faster time to value, lower operational risk and a scalable foundation for future expansion", "Time to value più rapido, minore rischio operativo e una base scalabile per crescere"]] }
      ],
      flow: [
        [["AEM Guides", "AEM Guides"], ["Structured authoring activated", "Attivato l'authoring strutturato"]],
        [["PDF templates", "Template PDF"], ["Layout + CSS managed directly in the AEM UI, with channel-specific outputs", "Layout + CSS gestiti direttamente nell'interfaccia di AEM, con output specifici per canale"]],
        [["Workfront + Fusion", "Workfront + Fusion"], ["Low/no-code flow for automated ingestion", "Flusso low/no-code per l'acquisizione automatica"]],
        [["AEM Content Hub", "AEM Content Hub"], ["Streamlined distribution", "Distribuzione semplificata"]]
      ]
    },
    n: ["A content-ops case beyond marketing: technical and product content for app and infotainment, on the same Adobe stack.", "Un caso di content ops oltre il marketing: contenuti tecnici e di prodotto per app e infotainment, sullo stesso stack Adobe."]
  },
  {
    id: "rainvented", sec: "proof", layout: "full", type: "agentflow",
    core: { trail: true, agents: true, level: 1, spots: [
      { id: "make::job::hero-still", l: ["Image generation", "Generazione immagini"] },
      { id: "act::job::sizes-crops", l: ["Renditions", "Rendition"] },
      { id: "act::job::languages", l: ["Text & translation", "Testi e traduzioni"] },
      { id: "make::job::brand-qa", l: ["Human review", "Revisione umana"] }
    ] },
    k: ["Use case · Content Supply Chain rAInvented", "Caso d'uso · Content Supply Chain rAInvented"],
    h: ["Asset generation, adaptation and translation — automated", "Generazione, adattamento e traduzione degli asset, in automatico"],
    p: ["An end-to-end content production flow: three AI agents do the work, a person reviews every step.", "Un flusso di produzione dei contenuti end-to-end: tre agenti AI fanno il lavoro, una persona revisiona ogni passaggio."],
    d: {
      start: ["Marketing user", "Utente marketing"],
      steps: [
        { t: ["Image generation through prompting", "Generazione delle immagini via prompt"], tool: "Firefly" },
        { t: ["Image renditions in the agreed formats", "Rendition delle immagini nei formati concordati"], tool: "Creative Cloud" },
        { t: ["Text management and translation into the required languages", "Gestione dei testi e traduzione nelle lingue richieste"], tool: ["AI agent", "Agente AI"] }
      ],
      end: ["Result: content", "Risultato: contenuti"],
      agent: ["AI agent", "Agente AI"], review: ["Human review", "Revisione umana"]
    },
    n: ["Press Play: each agent hands over to a human review before the next step. Same principle as the core: AI runs, a person stays in the loop.", "Premi Avvia: ogni agente passa a una revisione umana prima del passo successivo. Stesso principio del core: l'AI esegue, una persona resta nel loop."]
  },

  /* ================= CLUSTER 3 · AI DATA, GROWTH & GOVERNANCE ================= */
  {
    id: "c3", sec: "c3", layout: "cover", type: "chapter",
    core: { focus: "learn", agents: true, level: 2 },
    k: ["Trend cluster 3", "Cluster di trend 3"],
    h: ["AI Data, Growth & Governance", "AI Data, Growth & Governance"],
    p: ["Data, agents and AI usage at scale — made observable, governable and useful for everyone in the organization.", "Dati, agenti e uso dell'AI su scala: osservabili, governabili e utili per tutta l'organizzazione."],
    d: { n: 3, bg: "assets/img/cluster-3.jpg" },
    n: ["Last chapter: what makes all of the above safe and measurable.", "Ultimo capitolo: ciò che rende sicuro e misurabile tutto quello visto finora."]
  },
  {
    id: "aimonitoring", sec: "c3", layout: "full", type: "trend",
    core: { focus: "ring", trail: true, spots: [
      { id: "intel::job::do-nots", l: ["Shadow AI detection", "Rilevare la shadow AI"] },
      { id: "learn::job::join-clean", l: ["Data access monitoring", "Monitoraggio degli accessi ai dati"] },
      { id: "intel::job::comms-legal-pack", l: ["AI governance", "Governance dell'AI"] }
    ] },
    k: ["Trend deep dive · AI Monitoring & AI Workplace Compliance", "Approfondimento · AI Monitoring & AI Workplace Compliance"],
    h: ["From AI bans to embedded trust systems", "Dai divieti sull'AI a sistemi di fiducia integrati"],
    p: ["From AI usage bans to observable, auditable adoption.", "Dal vietare l'AI a un'adozione osservabile e verificabile."],
    d: {
      def: ["Controls and observability layers that monitor AI tools, data access and outputs to enforce policy and meet regulatory and ethical standards — moving organizations from reactive restriction to trusted, auditable AI use at scale.", "Livelli di controllo e osservabilità che monitorano strumenti AI, accessi ai dati e output per applicare le policy e rispettare gli standard normativi ed etici: le organizzazioni passano dalla restrizione reattiva a un uso dell'AI affidabile e verificabile, su scala."],
      subs: [
        { t: ["Shadow AI detection", "Rilevare la shadow AI"], d: ["Discover and flag unauthorized AI tools and risky behaviours in real time.", "Individuare e segnalare in tempo reale strumenti AI non autorizzati e comportamenti a rischio."] },
        { t: ["Data access monitoring", "Monitoraggio degli accessi ai dati"], d: ["Track prompts, responses, lineage and sensitive flows to understand risk and root cause.", "Tracciare prompt, risposte, lineage e flussi sensibili per capire rischi e cause."] },
        { t: ["AI governance", "Governance dell'AI"], d: ["Automated guardrails, policy enforcement, audit trails and compliance reporting across models and workflows.", "Guardrail automatici, applicazione delle policy, audit trail e reportistica di compliance su modelli e workflow."] }
      ],
      why: [["AI use becomes ubiquitous — employees will use it with or without approval.", "L'uso dell'AI diventa ovunque: le persone la useranno, con o senza approvazione."], ["Security and compliance move from periodic audits to continuous observability.", "Sicurezza e compliance passano dagli audit periodici all'osservabilità continua."], ["Trust depends on embedded controls: policy plus auditability.", "La fiducia dipende da controlli integrati: policy più verificabilità."]]
    },
    n: ["The governance ring of the core lights up behind: this is the same idea, applied to AI usage across the company.", "Dietro si illumina l'anello di governance del core: è la stessa idea, applicata all'uso dell'AI in tutta l'azienda."]
  },
  {
    id: "shadowai", sec: "c3", layout: "full", type: "bigstat",
    core: { focus: "ring" },
    k: ["AI Monitoring · market signals", "AI Monitoring · segnali dal mercato"],
    h: ["Shadow AI rises, driving demand for observability", "Cresce la shadow AI, e con lei la domanda di osservabilità"],
    d: {
      size: "m",
      stats: [
        { v: 8, suf: "/10", t: ["employees use unauthorized AI tools (shadow AI), actively bypassing corporate governance", "dipendenti usano strumenti AI non autorizzati (shadow AI), aggirando la governance aziendale"], src: "UpGuard, State of Shadow AI" },
        { v: 15.98, dec: 2, pre: "$", suf: "B", t: ["employee monitoring solutions market by 2035, from $7.035B in 2025 — driven by AI and ML", "mercato delle soluzioni di employee monitoring al 2035, da 7,035 miliardi nel 2025, trainato da AI e ML"], src: "Market Research Future, Employee Monitoring Solution Market" }
      ]
    },
    n: ["Eight out of ten: the question is not whether people use AI, but whether the company can see it.", "Otto su dieci: la domanda non è se le persone usano l'AI, ma se l'azienda riesce a vederlo."]
  },
  {
    id: "datademo", sec: "c3", layout: "full", type: "product",
    core: { focus: "learn", trail: true, spots: [
      { id: "learn::job::join-clean", l: ["Unified sources", "Fonti unificate"] },
      { id: "learn::job::kpi-dictionary", l: ["Self-service dashboards", "Dashboard in autonomia"] },
      { id: "learn::job::recommendation", l: ["Immediate action", "Azione immediata"] }
    ] },
    k: ["AI Monitoring · data democratization", "AI Monitoring · democratizzazione dei dati"],
    h: ["Data democratization", "La democratizzazione dei dati"],
    p: ["Data is no longer confined to technical teams. It becomes accessible, understandable and usable across the organization — for faster, better-informed decisions.", "I dati non sono più confinati nei team tecnici. Diventano accessibili, comprensibili e utilizzabili in tutta l'organizzazione, per decisioni più rapide e più informate."],
    d: {
      lists: [
        { t: ["Key points", "Punti chiave"], b: [["Data from multiple sources unified and easy to access through intuitive interfaces", "Dati da più fonti unificati e facili da consultare con interfacce intuitive"], ["Business users create and manage dashboards on their own, without relying on IT", "Gli utenti di business creano e gestiscono le dashboard da soli, senza dipendere dall'IT"], ["Complex data models simplified for fast analysis and clear insights", "Modelli di dati complessi semplificati per analisi rapide e insight chiari"], ["Real-time visibility to monitor performance and act immediately", "Visibilità in tempo reale per monitorare le performance e agire subito"]] },
        { t: ["Business impact", "Impatto sul business"], b: [["Faster decisions across marketing and business teams", "Decisioni più rapide nei team marketing e business"], ["Less dependency on technical resources", "Meno dipendenza dalle risorse tecniche"], ["Wider adoption of data-driven processes", "Maggiore adozione di processi data-driven"], ["Better alignment between data, strategy and execution", "Migliore allineamento tra dati, strategia ed esecuzione"]] }
      ]
    },
    n: ["Short scene: the bridge to CJA, the tool that makes it real.", "Scena breve: il ponte verso CJA, lo strumento che lo rende concreto."]
  },
  {
    id: "cja", sec: "c3", layout: "full", type: "cja",
    core: { focus: "learn", trail: true, spots: [
      { id: "learn::job::join-clean", l: ["Ingest & join", "Acquisire e unire"] },
      { id: "learn::job::pathing", l: ["Journey analysis", "Analisi dei journey"] },
      { id: "learn::job::segments", l: ["Segments", "Segmenti"] }
    ] },
    k: ["AI Monitoring · Adobe Customer Journey Analytics", "AI Monitoring · Adobe Customer Journey Analytics"],
    h: ["Adobe Customer Journey Analytics (CJA)", "Adobe Customer Journey Analytics (CJA)"],
    p: ["Ingest, transform and analyze customer event data at scale from any source, with guided analyses that help analysts, product managers and marketers find answers to critical business questions quickly.", "Acquisire, trasformare e analizzare su scala i dati degli eventi dei clienti da qualsiasi fonte, con analisi guidate che aiutano analisti, product manager e marketer a trovare in fretta le risposte alle domande di business più importanti."],
    d: {
      img: "assets/img/cja-person.webp",
      views: [
        { t: ["A complete view of the customer", "Una vista completa del cliente"], left: ["Social", "Display ads", "SEO/SEM", "Web", "Mobile"], right: [["Encounter data", "Encounter data"], ["Scheduling", "Scheduling"], ["Billing", "Billing"], "EMR", ["Call centers", "Call center"]] },
        { t: ["The journey, in sequence", "Il journey, in sequenza"], left: ["Web", ["Mobile app", "App mobile"], ["Ecosystem", "Ecosistema"], "Search", "Marketing"], right: [["Service center", "Service center"], "Email", "CRM", "Marketing", ["In-branch", "In filiale"]], lt: ["Online data", "Dati online"], rt: ["Offline data", "Dati offline"] }
      ],
      caps: [["Customer-centric analysis", "Analisi centrata sul cliente"], ["On-demand data manipulation", "Manipolazione dei dati on demand"], ["AI-driven insights", "Insight guidati dall'AI"], ["Actionable intelligence", "Intelligence pronta all'azione"]]
    },
    n: ["Switch the two views: first every source around one person, then the journey as an ordered sequence across online and offline.", "Alterna le due viste: prima tutte le fonti attorno a una persona, poi il journey come sequenza ordinata tra online e offline."]
  },
  {
    id: "datastrategy", sec: "c3", layout: "full", type: "sources",
    core: { focus: "learn", trail: true, spots: [
      { id: "learn::job::friction", l: ["Agent UX", "UX degli agenti"] },
      { id: "learn::job::join-clean", l: ["Integrated in CJA", "Integrati in CJA"] },
      { id: "learn::job::kpi-dictionary", l: ["Cross-functional KPIs", "KPI trasversali"] }
    ] },
    k: ["Project case · data strategy", "Caso di progetto · data strategy"],
    h: ["Multiple sources, one integrated analysis", "Tante fonti, un'unica analisi integrata"],
    p: ["Several tools monitor how agents use the CRM (Salesforce), each from a different angle. The integrated analysis runs in the new Customer Journey Analytics, managed by DX.", "Diversi strumenti monitorano come gli agenti usano il CRM (Salesforce), ognuno da una prospettiva diversa. L'analisi integrata avviene nel nuovo Customer Journey Analytics, gestito da DX."],
    d: {
      sources: [
        { t: ["Agent UX", "UX agenti"], d: ["User interactions — e.g. UX struggle (rage clicks), depth of use, task completion time", "Interazioni degli utenti: es. UX struggle (rage click), profondità d'uso, tempo di completamento dei task"] },
        { t: ["Systems monitoring", "Monitoraggio sistemi"], d: ["System performance and errors", "Performance ed errori dei sistemi"] },
        { t: ["Agent support", "Supporto agenti"], d: ["Support tickets opened by agents", "Ticket di supporto aperti dagli agenti"] },
        { t: ["Agent operations", "Ops agenti"], d: ["Agent operations, contact center and management — e.g. platform logins, activities completed", "Operatività degli agenti, contact center e management: es. login alla piattaforma, attività completate"] }
      ],
      hub: "Adobe Customer Journey Analytics",
      outs: [["Cross-functional KPIs for change management", "KPI trasversali per il change management"], ["Analysis of specific phenomena", "Analisi di fenomeni specifici"]],
      foot: ["Integrating the sources in CJA produces monitoring dashboards and analysis reports that combine the information in a complementary way. The integrated data is available to all CIO areas, which can run detailed analyses on their own.", "Integrando le fonti in CJA si ottengono dashboard di monitoraggio e report di analisi che combinano le informazioni in modo complementare. I dati integrati sono a disposizione di tutte le aree CIO, che possono svolgere analisi dettagliate in autonomia."]
    },
    n: ["Hover each source: its flow into CJA lights up. The client is not named in the deck — keep it that way.", "Passa su ogni fonte: si illumina il suo flusso verso CJA. Il cliente non è nominato nel deck: lascialo così."]
  }
]);
