/* Scene library — every scene the presentation can use (EN / IT).
   A client picks and orders scenes in clients/<id>/client.json → "scenes", can override any field
   ("overrides") and add its own scenes in clients/<id>/scenes.js. {client} is replaced with the client name.
   core: focus = phase id | "core" | "ring" | "demand" · spots = nodes highlighted on the constellation
         trail = connect the spots · agents = agent sparks on · level = autonomy view 0..2 */

window.SCENE_LIBRARY = [
  /* ================= OPENING ================= */
  {
    id: "cover", sec: "why", layout: "cover", type: "cover",
    core: { agents: true, level: 2 },
    k: ["{brand} for {client} · Content Supply Chain", "{brand} per {client} · Content Supply Chain"],
    h: ["AI-Powered Experience Supply Chain", "AI-Powered Experience Supply Chain"],
    p: ["How content is planned, created, managed, delivered and measured when brand, data and AI work as one system.", "Come si pianificano, creano, gestiscono, distribuiscono e misurano i contenuti quando brand, dati e AI lavorano come un unico sistema."],
    n: ["Open on the living core behind the title. One line: “Today we look at content not as files, but as a supply chain — and at what AI changes in it.” Press C at any time to show the core.", "Apri con il core vivo dietro al titolo. Una frase: “Oggi guardiamo ai contenuti non come file, ma come a una supply chain, e a cosa cambia l'AI.” Premi C in qualsiasi momento per mostrare il core."]
  },

  /* ================= WHY NOW ================= */
  {
    id: "expectation", sec: "why", layout: "full", type: "bigstat",
    core: { focus: "act", spots: [{ id: "act::job::personalization", l: ["Personalization", "Personalizzazione"] }] },
    k: ["Personalization", "Personalizzazione"],
    h: ["Personalization is no longer a bonus. It is the baseline.", "La personalizzazione non è più un plus. È il punto di partenza."],
    d: {
      stats: [
        { v: 80, suf: "%", t: ["of consumers are more likely to purchase from brands that offer personalized experiences", "dei consumatori è più propenso ad acquistare da brand che offrono esperienze personalizzate"] },
        { v: 70, pre: ">", suf: "%", t: ["now expect personalization as a standard across channels and touchpoints", "si aspetta ormai la personalizzazione come standard su tutti i canali e i touchpoint"] }
      ],
      src: "BrandXR, AI-Powered Personalization: Personalized Customer Experiences at Scale (2025)"
    },
    n: ["Let the numbers land. The point: expectations are set by the best experience people had anywhere, not by the category.", "Lascia che i numeri arrivino. Il punto: le aspettative le fissa la migliore esperienza vissuta ovunque, non la categoria."]
  },
  {
    id: "needs", sec: "why", layout: "split", type: "needs",
    core: { focus: "act", trail: false, spots: [
      { id: "act::job::personalization", l: ["Personalized content", "Contenuti personalizzati"] },
      { id: "act::job::site-seo", l: ["Relevant navigation", "Navigazione rilevante"] },
      { id: "act::job::journeys", l: ["Onboarding journeys", "Journey di onboarding"] },
      { id: "act::job::email-crm", l: ["Frequency control", "Controllo della frequenza"] }
    ] },
    k: ["Personalization · company needs", "Personalizzazione · bisogni delle aziende"],
    h: ["What companies need to deliver", "Cosa le aziende devono offrire"],
    d: {
      items: [
        [["Continue to inspire with personalized content", "Continuare a ispirare con contenuti personalizzati"], ["Use a robust, data-driven approach to serve personalized content and show a comprehensive understanding of customers.", "Usare un approccio solido e basato sui dati per servire contenuti personalizzati e dimostrare una conoscenza approfondita dei clienti."]],
        [["Help them find the most relevant content", "Aiutarli a trovare i contenuti più rilevanti"], ["Help customers quickly find what they are looking for, adapt to their behaviour and make purchase paths seamless.", "Aiutare i clienti a trovare subito ciò che cercano, adattarsi ai loro comportamenti e rendere fluidi i percorsi d'acquisto."]],
        [["Craft onboarding journeys for loyalty", "Progettare journey di onboarding per la fedeltà"], ["Design onboarding journeys that learn the most about the customer and encourage repeat transactions.", "Progettare percorsi di onboarding che conoscano meglio il cliente e incentivino acquisti ricorrenti."]],
        [["Minimize the spam", "Ridurre lo spam"], ["Personalize frequency, or let people choose fewer messages instead of a simple unsubscribe.", "Personalizzare la frequenza, o permettere di ricevere meno messaggi invece della sola disiscrizione."]]
      ],
      stat: { v: 76, suf: "%", t: ["of consumers prefer customized content in their interaction with brands", "dei consumatori preferisce contenuti personalizzati nelle interazioni con i brand"] }
    },
    n: ["Hover each need: the matching job lights up in the core on the right. Ask which of the four is hardest for them today.", "Passa su ogni bisogno: a destra si illumina il job corrispondente nel core. Chiedi quale dei quattro è oggi il più difficile per loro."]
  },
  {
    id: "hyper", sec: "why", layout: "full", type: "hyper",
    core: { focus: "act", agents: true, level: 2 },
    k: ["Personalization", "Personalizzazione"],
    h: ["Hyper-personalization at scale", "Hyper-personalizzazione su scala"],
    d: {
      one: [["Hyper-personalization", "Hyper-personalizzazione"], ["A customized experience for the right customer, in the right moment, on the right channel — using data, interactions and past and future behaviour.", "Un'esperienza su misura per il cliente giusto, nel momento giusto, sul canale giusto, usando dati, interazioni e comportamenti passati e futuri."]],
      scale: [["…at scale", "…su scala"], ["Doing that for every customer, across all touchpoints, in real time.", "Farlo per ogni cliente, su tutti i touchpoint, in tempo reale."]]
    },
    n: ["Toggle One customer / At scale. The jump from one to many is exactly where content volume explodes — that is why we need a supply chain.", "Alterna Un cliente / Su scala. Il salto da uno a tanti è proprio dove esplode il volume dei contenuti: per questo serve una supply chain."]
  },
  {
    id: "maturity", sec: "why", layout: "full", type: "maturity",
    core: { focus: "learn" },
    k: ["Personalization", "Personalizzazione"],
    h: ["The hyper-personalization maturity scale", "La scala di maturità della hyper-personalizzazione"],
    d: {
      axisY: ["Business value", "Valore di business"], axisX: ["Maturity adoption", "Adozione e maturità"],
      band: ["AI & GenAI support the adoption", "AI e GenAI accelerano l'adozione"],
      steps: [
        { t: ["Digital Analytics", "Digital Analytics"], f: "learn", spot: "learn::job::kpi-dictionary", b: [["Analytics framework", "Framework di analytics"], ["Tag management", "Tag management"], ["Reporting", "Reporting"], ["Basic segmentation", "Segmentazione di base"]] },
        { t: ["Testing", "Testing"], f: "learn", spot: "learn::job::incrementality", b: [["Testing strategy", "Strategia di test"], ["A/B testing", "A/B testing"], ["MV testing", "Test multivariati"], ["Monitor test metrics", "Monitoraggio delle metriche di test"]] },
        { t: ["Web Personalization", "Web Personalization"], f: "act", spot: "act::job::site-seo", b: [["Segmentation of anonymous visitors", "Segmentazione dei visitatori anonimi"], ["Web personalization", "Personalizzazione web"], ["Experience optimization", "Ottimizzazione dell'esperienza"], ["Customized recommendations", "Raccomandazioni personalizzate"], ["Personalized search", "Ricerca personalizzata"]] },
        { t: ["360° Customer Profile", "Profilo cliente a 360°"], f: "core", spot: "intel::job::segment-evidence", b: [["Integrate data from all sources", "Integrare i dati da tutte le fonti"], ["Combine anonymous and known customer data", "Unire dati anonimi e dati dei clienti noti"], ["Real-time customer profile", "Profilo cliente in tempo reale"], ["Real-time segmentation", "Segmentazione in tempo reale"]] },
        { t: ["Omni-channel Personalization", "Personalizzazione omnicanale"], f: "act", spot: "act::job::journeys", b: [["Personalization on every channel (email, web, mobile, store, WhatsApp…)", "Personalizzazione su ogni canale (email, web, mobile, negozio, WhatsApp…)"], ["Orchestrate personalized experiences across channels and devices", "Orchestrare esperienze personalizzate tra canali e dispositivi"], ["Content velocity and agility must grow as personalization gets hyper", "Velocità e agilità dei contenuti devono crescere con la hyper-personalizzazione"]] },
        { t: ["Hyper-personalized Experiences", "Esperienze hyper-personalizzate"], f: "make", spot: "make::job::series-extensions", b: [["AI-based targeting", "Targeting basato sull'AI"], ["AI-based content creation", "Creazione di contenuti con l'AI"], ["Automated offer decisioning", "Offer decisioning automatico"], ["Dynamic experience generation", "Generazione dinamica delle esperienze"]] }
      ]
    },
    n: ["Click each step. Then use “We are here” to place {client} on the scale together with the client — it is a good moment to open the conversation.", "Clicca ogni gradino. Poi usa “Siamo qui” per posizionare {client} sulla scala insieme al cliente: è un buon momento per aprire la conversazione."]
  },
  {
    id: "demand", sec: "why", layout: "full", type: "demand",
    core: { focus: "make", agents: true, level: 2 },
    k: ["Content demand", "Domanda di contenuti"],
    h: ["Content demand is growing faster than any team", "La domanda di contenuti cresce più in fretta di qualsiasi team"],
    d: {
      stats: [
        { v: 71, suf: "%", t: ["of marketers expect content demand to grow more than 5× by 2027", "dei marketer si aspetta che la domanda di contenuti cresca più di 5 volte entro il 2027"] },
        { v: 84, suf: "%", t: ["plan to use generative AI to support content workflows in the next year", "prevede di usare l'AI generativa nei workflow dei contenuti entro un anno"] }
      ],
      src: "Adobe, 2025 Adobe Content Supply Chain Benchmark Report",
      bars: [["Today", "Oggi"], ["2027", "2027"]]
    },
    n: ["The 5× bar is the core argument: you cannot hire your way to five times the content. You need a different system.", "La barra 5× è l'argomento centrale: non si arriva a cinque volte i contenuti assumendo. Serve un sistema diverso."]
  },

  /* ================= THE MODEL ================= */
  {
    id: "csc", sec: "what", layout: "split", type: "csc5",
    core: { focus: "intel" },
    k: ["Content Supply Chain", "Content Supply Chain"],
    h: ["Five steps, one continuous loop", "Cinque fasi, un unico ciclo continuo"],
    p: ["The Content Supply Chain is the end-to-end process that lets an organization plan, create, manage, deliver and measure content in a coordinated, efficient way. Its purpose: personalization at scale — the right content, to the right audience, at the right time, on the right channel.", "La Content Supply Chain è il processo end-to-end che permette di pianificare, creare, gestire, distribuire e misurare i contenuti in modo coordinato ed efficiente. Lo scopo: la personalizzazione su scala, cioè il contenuto giusto al pubblico giusto, nel momento giusto, sul canale giusto."],
    d: {
      steps: [
        { k: "plan", t: ["Plan", "Pianificare"], f: "intel", d: ["Define goals, audiences, channels and customer journeys.", "Definire obiettivi, pubblici, canali e customer journey."] },
        { k: "create", t: ["Create", "Creare"], f: "make", d: ["Produce engaging, personalized content — text, images, video.", "Produrre contenuti coinvolgenti e personalizzati: testi, immagini, video."] },
        { k: "manage", t: ["Manage", "Gestire"], f: "core", d: ["Centralize, organize, approve and version content efficiently.", "Centralizzare, organizzare, approvare e versionare i contenuti in modo efficiente."] },
        { k: "deliver", t: ["Deliver", "Distribuire"], f: "act", d: ["Publish across touchpoints, adapting dynamically to each user.", "Pubblicare su tutti i touchpoint, adattandosi in modo dinamico a ogni utente."] },
        { k: "measure", t: ["Measure", "Misurare"], f: "learn", d: ["Track performance, collect feedback and optimize continuously.", "Misurare le performance, raccogliere feedback e ottimizzare di continuo."] }
      ]
    },
    n: ["The steps cycle by themselves; click one to stop on it. Each step lights its part of the core: Plan = Strategic Intelligence, Create = Creative Production, Manage = the Brain, Deliver = Activation, Measure = Predictive Analytics.", "Le fasi scorrono da sole; clicca per fermarti su una. Ogni fase illumina la sua parte del core: Pianificare = Strategic Intelligence, Creare = Creative Production, Gestire = il Brain, Distribuire = Activation, Misurare = Predictive Analytics."]
  },
  {
    id: "core", sec: "what", layout: "core", type: "coreIntro",
    core: { agents: true, level: 2 },
    k: ["The core", "Il core"],
    h: ["Behind the five steps: one operating model", "Dietro le cinque fasi: un unico modello operativo"],
    p: ["4 phases, 27 functions and 81 jobs around a Company Brain, governed by named people. Every job says who does it — a person, or AI with a person in control.", "4 fasi, 27 funzioni e 81 job attorno a un Company Brain, governati da persone con nome e cognome. Ogni job dice chi lo fa: una persona, oppure l'AI con una persona al controllo."],
    d: {
      chips: [
        { id: "core", t: ["Company Brain", "Company Brain"] }, { id: "ring", t: ["Governance", "Governance"] }, { id: "demand", t: ["Demand", "Demand"] },
        { id: "intel", t: ["Plan · Strategic Intelligence", "Pianificare · Strategic Intelligence"] }, { id: "make", t: ["Create · Creative Production", "Creare · Creative Production"] },
        { id: "act", t: ["Deliver · Intelligent Activation", "Distribuire · Intelligent Activation"] }, { id: "learn", t: ["Measure · Predictive Analytics", "Misurare · Predictive Analytics"] }
      ]
    },
    n: ["This is the core you can open at any time with C. Click the Brain first, then one phase. Every card is in both languages.", "È il core che puoi aprire in ogni momento con C. Clicca prima il Brain, poi una fase. Ogni scheda è in due lingue."]
  },
  {
    id: "framework", sec: "what", layout: "full", type: "framework",
    core: { level: 0 },
    k: ["CSC implementation strategy", "Strategia di implementazione della CSC"],
    h: ["Baseline, scale, then agentic", "Prima la base, poi la scala, poi l'AI agentica"],
    d: {
      steps: [
        { t: ["Baseline", "Baseline"], d: ["Define the CSC baseline: integrate the essential tools for design, governance and delivery — the cornerstone of the operating ecosystem.", "Definire la baseline della CSC: integrare gli strumenti essenziali per design, governance e delivery, la pietra angolare dell'ecosistema operativo."] },
        { t: ["Scale", "Scale"], d: ["A modular approach with replaceable, upgradeable components, integrating new tools and adapting to technology and AI advances.", "Un approccio modulare con componenti sostituibili e aggiornabili, che integra nuovi strumenti e si adatta all'evoluzione della tecnologia e dell'AI."] },
        { t: ["Agentic AI", "AI agentica"], d: ["Key impact: autonomous task performance, end-to-end interactions, proactive engagement.", "Impatto chiave: esecuzione autonoma dei task, interazioni end-to-end, ingaggio proattivo."] }
      ],
      centre: ["(AI-enabled) process orchestration", "Orchestrazione dei processi (abilitata dall'AI)"],
      ring: [
        { p: ["Strategy", "Strategia"], a: "Brief Enhancer" }, { p: ["Creation", "Creazione"], a: "Creative Genius" }, { p: ["Review", "Revisione"], a: "Quality Guardian" },
        { p: ["Storage", "Archiviazione"], a: "Content Vault" }, { p: ["Distribution", "Distribuzione"], a: "Social Mate" }, { p: ["Promotion", "Promozione"], a: "Ad Optimizer" },
        { p: ["Monitoring", "Monitoraggio"], a: "Insight Explorer" }
      ]
    },
    n: ["Click the three steps in order. Behind, the core changes too: at Baseline everything is manual, at Scale AI assists, at Agentic AI the agents start working inside the jobs.", "Clicca i tre passi in ordine. Anche il core dietro cambia: in Baseline tutto è manuale, in Scale l'AI assiste, con l'AI agentica gli agenti iniziano a lavorare dentro i job."]
  },

  /* ================= HOW ================= */
  {
    id: "roads", sec: "how", layout: "full", type: "roads",
    core: { focus: "ring" },
    k: ["Two roads to the same supply chain", "Due strade per la stessa supply chain"],
    h: ["Product-driven or integration-first?", "Product-driven o integration-first?"],
    d: {
      roads: [
        { id: "product", t: ["Product-driven approach", "Approccio product-driven"], tag: "CSC · Adobe", for: ["Enterprises seeking standardized, compliant AI content generation. Large organizations with complex governance needs, multiple teams and heavy compliance requirements.", "Aziende che cercano una generazione di contenuti AI standardizzata e conforme. Grandi organizzazioni con governance complessa, molti team e forti requisiti di compliance."], want: ["If you want everything managed, integrated and ready to go.", "Se volete tutto gestito, integrato e pronto all'uso."], go: "adobe" },
        { id: "integration", t: ["Integration-first approach", "Approccio integration-first"], tag: "n8n", for: ["Tech teams and innovators building tailored, controllable AI pipelines. Mid-market companies, agile teams and organizations that want to own their processes, integrate existing tools and experiment with cutting-edge AI models.", "Team tecnici e innovatori che costruiscono pipeline AI su misura e controllabili. Aziende mid-market, team agili e organizzazioni che vogliono possedere i propri processi, integrare gli strumenti esistenti e sperimentare i modelli AI più avanzati."], want: ["If you want flexibility and control.", "Se volete flessibilità e controllo."], go: "n8n" }
      ],
      fit: [
        { s: "p", t: ["Complex governance and compliance", "Governance e compliance complesse"] },
        { s: "p", t: ["Many teams and markets on one standard", "Molti team e mercati su un unico standard"] },
        { s: "p", t: ["Managed, integrated, ready to go", "Gestito, integrato, pronto all'uso"] },
        { s: "i", t: ["Own our processes", "Possedere i nostri processi"] },
        { s: "i", t: ["Integrate tools we already have", "Integrare gli strumenti che abbiamo già"] },
        { s: "i", t: ["Experiment with the newest AI models", "Sperimentare i modelli AI più recenti"] }
      ],
      verdict: {
        p: ["Product-driven fits best — see the Leading Italian Banking Group case.", "Il product-driven è il più adatto: vedi il caso del gruppo bancario."],
        i: ["Integration-first fits best — see the Costa Crociere case.", "L'integration-first è il più adatto: vedi il caso Costa Crociere."],
        m: ["A mixed approach fits best — see Reply Xchange ’26.", "Un approccio misto è il più adatto: vedi Reply Xchange ’26."],
        none: ["Tick what matters to you.", "Seleziona ciò che conta per voi."]
      }
    },
    n: ["Run the fit check live with the client: tick the statements together. The verdict links to the case that matches.", "Fai il fit check dal vivo con il cliente: spuntate insieme le affermazioni. Il risultato porta al caso corrispondente."]
  },
  {
    id: "adobe", sec: "how", layout: "full", type: "adobe",
    core: { focus: null },
    k: ["Product-driven", "Product-driven"],
    h: ["The Adobe product-driven Content Supply Chain", "La Content Supply Chain product-driven di Adobe"],
    d: {
      cols: [
        { t: ["Workflow & planning", "Workflow e pianificazione"], f: "ring", tools: ["Workfront"] },
        { t: ["Creation & production", "Creazione e produzione"], f: "make", tools: ["Creative Cloud", "Express", "Firefly Services", "Frame.io"] },
        { t: ["Asset management", "Gestione degli asset"], f: "core", tools: ["Experience Manager"] },
        { t: ["Delivery & activation", "Delivery e attivazione"], f: "act", tools: [["Native connectivity", "Connettività nativa"]] },
        { t: ["Reporting & insights", "Reporting e insight"], f: "learn", tools: ["Content Analytics"] }
      ],
      base: "Adobe GenStudio Foundation",
      benefits: [
        ["End-to-end integrated platform", "Piattaforma integrata end-to-end"],
        ["Single system of record for workflows and assets", "Un unico sistema di riferimento per workflow e asset"],
        ["Native integrations within the Adobe ecosystem", "Integrazioni native nell'ecosistema Adobe"],
        ["Built-in governance and brand consistency", "Governance e coerenza di brand integrate"],
        ["AI embedded in content creation workflows", "AI integrata nei workflow di creazione"]
      ]
    },
    n: ["Hover each column: the matching part of the core lights up behind. GenStudio Foundation is the layer that ties the five together.", "Passa su ogni colonna: dietro si illumina la parte del core corrispondente. GenStudio Foundation è il livello che tiene insieme le cinque."]
  },
  {
    id: "firefly", sec: "how", layout: "full", type: "firefly",
    core: { focus: "make", trail: true, spots: [
      { id: "make::job::art-direction", l: ["Brand style → custom model", "Stile di brand → modello custom"] },
      { id: "make::job::series-extensions", l: ["On-brand variants", "Varianti on-brand"] },
      { id: "act::job::sizes-crops", l: ["Channel formats", "Formati per canale"] }
    ] },
    k: ["Product-driven · Adobe Firefly", "Product-driven · Adobe Firefly"],
    h: ["Firefly Custom Models", "Firefly Custom Models"],
    p: ["The generative engine for scalable, brand-consistent content in high-volume production.", "Il motore generativo per contenuti scalabili e coerenti con il brand nella produzione ad alto volume."],
    d: {
      cols: [
        { t: ["What it is", "Cos'è"], b: [["Private generative models trained on your own brand assets", "Modelli generativi privati addestrati sui vostri asset di brand"], ["Scalable creation of brand-consistent content", "Creazione scalabile di contenuti coerenti con il brand"]] },
        { t: ["Key capabilities", "Capacità chiave"], b: [["Brand consistency across campaigns", "Coerenza di brand tra le campagne"], ["Localized and channel-specific content", "Contenuti localizzati e specifici per canale"], ["Faster production of campaign variants", "Produzione più rapida delle varianti"], ["Private, commercially safe training", "Addestramento privato e sicuro per l'uso commerciale"]] },
        { t: ["Typical use cases", "Casi d'uso tipici"], b: [["Multi-country campaign adaptation", "Adattamento di campagne multi-paese"], ["Promotional assets for retail", "Asset promozionali per il retail"], ["Creative for performance marketing", "Creatività per il performance marketing"], ["Content for regulated industries", "Contenuti per settori regolamentati"]] }
      ],
      videos: [
        { src: "assets/video/firefly-custom-model.mp4", poster: "assets/img/firefly-models.jpg", t: ["Model customization", "Personalizzazione del modello"], d: ["Train a custom model on a consistent set of reference images, so Firefly generates visuals aligned with a specific style, subject or brand.", "Si addestra un modello custom su un set coerente di immagini di riferimento, così Firefly genera visual allineati a uno stile, a un soggetto o a un brand."] },
        { src: "assets/video/firefly-asset-production.mp4", poster: "assets/img/firefly-generate.jpg", t: ["Asset production", "Produzione degli asset"], d: ["Generate images from text prompts, then refine and customize them for a specific style, subject or creative direction.", "Si generano immagini da prompt testuali, poi si rifiniscono e personalizzano per uno stile, un soggetto o una direzione creativa."] }
      ]
    },
    n: ["Play the two short demos. Stress “private” and “commercially safe”: the model is trained on the brand's own assets.", "Fai partire le due brevi demo. Sottolinea “privato” e “sicuro per l'uso commerciale”: il modello è addestrato sugli asset del brand."]
  },
  {
    id: "genstudio", sec: "how", layout: "full", type: "genstudio",
    core: { trail: true, agents: true, level: 2, spots: [
      { id: "intel::job::creative-brief", l: ["Plan", "Pianificare"] },
      { id: "make::job::series-extensions", l: ["Produce", "Produrre"] },
      { id: "make::job::brand-qa", l: ["Approve", "Approvare"] },
      { id: "act::job::paid-social", l: ["Activate", "Attivare"] },
      { id: "learn::job::content-scores", l: ["Insights", "Insight"] }
    ] },
    k: ["Product-driven · Adobe GenStudio", "Product-driven · Adobe GenStudio"],
    h: ["GenStudio: the orchestration layer of the whole supply chain", "GenStudio: il livello di orchestrazione di tutta la supply chain"],
    d: {
      flow: [["Planning", "Pianificazione"], ["Production", "Produzione"], ["Approval", "Approvazione"], ["Activation", "Attivazione"], ["Insights", "Insight"]],
      cols: [
        { t: ["What it is", "Cos'è"], b: [["Connects planning, production, approval, activation and insights", "Collega pianificazione, produzione, approvazione, attivazione e insight"], ["End-to-end orchestration of content operations", "Orchestrazione end-to-end delle content operations"]] },
        { t: ["Key capabilities", "Capacità chiave"], b: [["AI-assisted content production", "Produzione di contenuti assistita dall'AI"], ["Workflow and approval automation", "Automazione di workflow e approvazioni"], ["Integrated activation across marketing platforms", "Attivazione integrata sulle piattaforme di marketing"], ["Automated brand governance and compliance checks", "Controlli automatici di brand governance e compliance"]] },
        { t: ["Typical outcomes", "Risultati tipici"], b: [["Reduced time to market", "Time to market ridotto"], ["Higher content throughput", "Più contenuti prodotti"], ["Improved operational efficiency", "Maggiore efficienza operativa"], ["Personalization at scale", "Personalizzazione su scala"]] }
      ]
    },
    n: ["The flow animates left to right; in the core the same five moments are linked by a trail across the phases.", "Il flusso si anima da sinistra a destra; nel core gli stessi cinque momenti sono collegati da una traccia tra le fasi."]
  },
  {
    id: "n8n", sec: "how", layout: "full", type: "n8n",
    core: { focus: "ring" },
    k: ["Integration-first · n8n", "Integration-first · n8n"],
    h: ["n8n — think it, build it, extend it", "n8n: pensalo, costruiscilo, estendilo"],
    p: ["n8n automates and connects repetitive processes, ensuring consistency, speed and control across every stage.", "n8n automatizza e collega i processi ripetitivi, garantendo coerenza, velocità e controllo in ogni fase."],
    d: {
      b: [["Open-source, low-code platform", "Piattaforma open source e low-code"], ["Complex workflows", "Workflow complessi"], ["API-based integrations", "Integrazioni via API"], ["Visibility, traceability and governance", "Visibilità, tracciabilità e governance"]],
      img: "assets/img/n8n-integrations.png"
    },
    n: ["Position n8n as the glue: it orchestrates tools the client already owns, under the same governance ring of the core.", "Presenta n8n come il collante: orchestra strumenti che il cliente ha già, sotto lo stesso anello di governance del core."]
  },
  {
    id: "waver", sec: "how", layout: "full", type: "waver",
    core: { trail: true, agents: true, level: 2, spots: [
      { id: "intel::job::creative-brief", l: ["Input: brief & strategy", "Input: brief e strategia"] },
      { id: "intel::job::constraints-pack", l: ["Agents: tasks & plan", "Agenti: task e piano"] },
      { id: "make::job::headlines-lines", l: ["Agents: content", "Agenti: contenuti"] },
      { id: "act::job::organic-calendar", l: ["Output: campaign plan", "Output: piano di campagna"] }
    ] },
    k: ["Reply accelerator", "Acceleratore Reply"],
    h: ["Reply Content Waver", "Reply Content Waver"],
    p: ["An AI platform where specialized agents run the content workflow — turning briefs and brand guidelines into actionable campaign plans, while supporting planning and creativity.", "Una piattaforma AI in cui agenti specializzati gestiscono il workflow dei contenuti, trasformando brief e linee guida di brand in piani di campagna pronti all'uso e supportando pianificazione e creatività."],
    d: {
      pillars: [
        { t: ["Technology-agnostic", "Indipendente dalla tecnologia"], d: ["Integrates with n8n, Adobe and many existing stacks — use the tools you already have.", "Si integra con n8n, Adobe e molti stack esistenti: usate gli strumenti che avete già."] },
        { t: ["Streamlines the content lifecycle", "Semplifica il ciclo di vita dei contenuti"], d: ["Coordinates the whole workflow from strategy and planning to execution and delivery.", "Coordina l'intero workflow, dalla strategia e pianificazione fino all'esecuzione e alla delivery."] },
        { t: ["Enables personalization at scale", "Abilita la personalizzazione su scala"], d: ["Orchestrates workflows so the right message reaches the right audience at the right time.", "Orchestra i workflow perché il messaggio giusto raggiunga il pubblico giusto al momento giusto."] }
      ],
      how: [
        { t: ["Input", "Input"], d: ["The campaign brief and strategy documents give all the context, brand guidelines and objectives.", "Il brief di campagna e i documenti di strategia danno tutto il contesto, le linee guida e gli obiettivi."], img: "assets/img/waver-dashboard.jpg" },
        { t: ["Agents", "Agenti"], d: ["Specialized AI agents analyze the input, break it into tasks, plan the campaign structure and generate content aligned with the brief.", "Agenti AI specializzati analizzano l'input, lo scompongono in task, pianificano la struttura della campagna e generano contenuti allineati al brief."], img: "assets/img/waver-plan.jpg" },
        { t: ["Output", "Output"], d: ["A coherent campaign plan with ready-to-use content, aligned with the brand strategy and optimized for every channel.", "Un piano di campagna coerente con contenuti pronti all'uso, allineato alla strategia di brand e ottimizzato per ogni canale."], img: "assets/img/waver-task.jpg" }
      ],
      logo: "assets/img/content-waver-logo.png"
    },
    n: ["Walk through Input → Agents → Output. The core traces the same path: from the brief to the published plan.", "Percorri Input → Agenti → Output. Il core traccia lo stesso percorso: dal brief al piano pubblicato."]
  },

  /* ================= USE CASES ================= */
  {
    id: "cases", sec: "proof", layout: "full", type: "cases",
    core: { agents: true, level: 2 },
    k: ["Use cases", "Casi d'uso"],
    h: ["Approaches and results, proven in the field", "Approcci e risultati, provati sul campo"],
    d: {
      cards: [
        { go: "xchange", t: ["Reply Xchange ’26", "Reply Xchange ’26"], tag: ["Mixed approach", "Approccio misto"], d: ["One photo becomes a full multichannel campaign, live at the booth.", "Una foto diventa una campagna multicanale completa, dal vivo allo stand."] },
        { go: "costa", t: ["Costa Crociere", "Costa Crociere"], tag: ["Integration-first", "Integration-first"], d: ["Excursion and port content at scale, orchestrated with n8n.", "Contenuti di escursioni e porti su scala, orchestrati con n8n."], img: "assets/img/costa-ship.jpg" },
        { go: "bank", t: ["Leading Italian Banking Group", "Primario gruppo bancario italiano"], tag: ["Product-driven", "Product-driven"], d: ["Firefly Custom Models for commercially safe campaign visuals.", "Firefly Custom Models per visual di campagna sicuri per l'uso commerciale."], img: "assets/img/bank-objective.jpg", conf: true },
        { go: "gambling", t: ["Gambling customer", "Cliente del gaming"], tag: ["Hyper-personalization", "Hyper-personalizzazione"], d: ["Real-time, 1-to-1 campaigns with GenAI creatives.", "Campagne 1-to-1 in tempo reale con creatività GenAI."], nda: true },
        { go: "hga", t: ["HGA", "HGA"], tag: ["CRM-to-content automation", "Automazione CRM → contenuti"], d: ["Sales opportunities become structured content projects, automatically.", "Le opportunità di vendita diventano progetti di contenuto strutturati, in automatico."], img: "assets/img/hga.jpg" },
        { go: "skoda", t: ["Skoda", "Skoda"], tag: ["Multichannel content ops", "Content ops multicanale"], d: ["AEM Guides and Workfront for app, infotainment and PDF outputs.", "AEM Guides e Workfront per output app, infotainment e PDF."], img: "assets/img/skoda.jpg" },
        { go: "luxury", t: ["Luxury fashion", "Luxury fashion"], tag: ["Global DAM + campaign workflow", "DAM globale + workflow di campagna"], d: ["AEM, Workfront, Frame.io and Firefly for performance marketing.", "AEM, Workfront, Frame.io e Firefly per il performance marketing."], img: "assets/img/luxury-fashion.jpg" },
        { go: "rainvented", t: ["Content Supply Chain rAInvented", "Content Supply Chain rAInvented"], tag: ["AI agents + human review", "Agenti AI + revisione umana"], d: ["Generation, renditions and translation, with a person checking each step.", "Generazione, rendition e traduzioni, con una persona che controlla ogni passo."] },
        { go: "avatars", t: ["Training content with AI avatars", "Training con avatar AI"], tag: ["Content automation", "Automazione dei contenuti"], d: ["From screen recording to multilingual training video.", "Dalla registrazione dello schermo al video di training multilingua."], img: "assets/img/avatar-training.jpg" }
      ]
    },
    n: ["Pick the case that matches the fit check, or let the client choose.", "Scegli il caso che corrisponde al fit check, oppure lascia scegliere al cliente."]
  },
  {
    id: "xchange", sec: "proof", layout: "full", type: "xchange",
    core: { trail: true, agents: true, level: 2, spots: [] },
    k: ["Use case · Reply Xchange ’26 · mixed approach", "Caso d'uso · Reply Xchange ’26 · approccio misto"],
    h: ["From one photo to an omnichannel campaign — in minutes", "Da una foto a una campagna omnicanale, in pochi minuti"],
    d: {
      claims: [["AI-powered end-to-end content supply chain", "Content supply chain end-to-end con l'AI"], ["One asset, many campaign formats", "Un asset, tanti formati di campagna"], ["Orchestrated in Adobe Workfront", "Orchestrato in Adobe Workfront"], ["Brand omnichannel-ready within minutes", "Brand pronto per l'omnicanale in pochi minuti"]],
      booth: [
        { t: ["Scan the badge", "Scansione del badge"], d: ["First name, last name and e-mail are picked up.", "Si acquisiscono nome, cognome ed e-mail."], ai: false },
        { t: ["Choose a style", "Scelta dello stile"], d: ["The visitor picks the theme of the marketing campaign.", "Il visitatore sceglie il tema della campagna."], ai: false },
        { t: ["Take a photo", "Scatto della foto"], d: ["The image is submitted to Workfront, which starts the orchestration.", "L'immagine arriva in Workfront, che avvia l'orchestrazione."], ai: false },
        { t: ["Clean-up agent", "Agente di pulizia"], d: ["Analyzes the image and removes background noise.", "Analizza l'immagine e rimuove il rumore di fondo."], ai: true },
        { t: ["Avatar agent", "Agente avatar"], d: ["Turns the refined asset into a stylized avatar.", "Trasforma l'asset in un avatar stilizzato."], ai: true },
        { t: ["Scene agent", "Agente scena"], d: ["Places the avatar in an environment that matches the theme.", "Inserisce l'avatar in un ambiente coerente con il tema."], ai: true },
        { t: ["Motion agent", "Agente motion"], d: ["Brings the avatar to life with movement.", "Dà vita all'avatar con il movimento."], ai: true },
        { t: ["Video agent", "Agente video"], d: ["Renders a video optimized for distribution on every channel.", "Produce un video ottimizzato per la distribuzione su ogni canale."], ai: true }
      ],
      steps: [
        { t: ["Spark the idea", "Accendere l'idea"], d: ["Campaign intent initiated, audience goals enriched.", "Si avvia l'intento di campagna e si arricchiscono gli obiettivi di pubblico."], spot: "intel::job::request-intake", a: ["Workfront — intake and initial brief", "Customer Journey Analytics — audience insights", "Real-Time CDP — audience segmentation"], alt: ["n8n"] },
        { t: ["Smart brief", "Smart brief"], d: ["Brief generated with AI, messaging refined with deeper audience insights.", "Brief generato con l'AI, messaggi rifiniti con insight di pubblico più profondi."], spot: "intel::job::creative-brief", a: ["Firefly (+ OpenAI) — text and ideas"], alt: ["OpenAI ChatGPT", "Jasper AI", "Copy.ai"] },
        { t: ["Hero visual", "Hero visual"], d: ["Key visual generated, then edited and refined.", "Key visual generato, poi modificato e rifinito."], spot: "make::job::hero-still", a: ["Firefly — image generation", "Photoshop — editing", "Express — fast content"], alt: ["Midjourney", "Stable Diffusion", "Canva"] },
        { t: ["Scale variants", "Scalare le varianti"], d: ["Variants auto-generated (16:9, 9:16, 1:1), managed and versioned.", "Varianti generate in automatico (16:9, 9:16, 1:1), gestite e versionate."], spot: "act::job::sizes-crops", a: ["Firefly — variants", "AEM Assets — versioning", "Dynamic Media — renditions"], alt: ["AdCreative.ai", "Bannerbear", "Cloudinary"] },
        { t: ["Video & rich media", "Video e rich media"], d: ["Campaign video generated.", "Generazione del video di campagna."], spot: "make::job::series-extensions", a: ["Firefly — video generation (emerging)"], alt: ["Runway ML", "Descript", "Synthesia"] },
        { t: ["Package for activation", "Pacchetto per l'attivazione"], d: ["Activation kits assembled, content structured for reuse.", "Kit di attivazione assemblati, contenuti strutturati per il riuso."], spot: "make::job::master-pack", a: ["AEM Assets — single source of truth, approvals"], alt: [["External DAM", "DAM esterno"]] },
        { t: ["Activate across channels", "Attivare su tutti i canali"], d: ["Website, social, e-mail and customer journey.", "Sito, social, e-mail e customer journey."], spot: "act::job::journeys", a: ["AEM Sites — website", "Journey Optimizer — e-mail & journey", "Campaign — marketing campaigns", "Target — personalization"], alt: [] },
        { t: ["Measure, learn, optimize", "Misurare, imparare, ottimizzare"], d: ["Performance and deep journey insights feed the next cycle.", "Performance e insight sui journey alimentano il ciclo successivo."], spot: "learn::job::content-scores", a: ["Analytics — performance", "Customer Journey Analytics — journeys", "Journey Optimizer — feedback loop", "Target — A/B testing"], alt: ["Google Analytics", "Mixpanel", "Matomo"] }
      ]
    },
    n: ["Start with the booth tab — it is the story people remember. Then press Play on the eight steps: the core follows each step, and the stack switch shows the Adobe and the alternative tools.", "Parti dalla scheda dello stand: è la storia che resta in mente. Poi premi Avvia sugli otto passi: il core segue ogni passo e lo switch mostra gli strumenti Adobe e quelli alternativi."]
  },
  {
    id: "costa", sec: "proof", layout: "full", type: "costa",
    core: { trail: true, spots: [
      { id: "intel::job::product-truth", l: ["Technical datasheets (TOG)", "Schede tecniche (TOG)"] },
      { id: "make::job::page-copy", l: ["Excursion content", "Contenuti delle escursioni"] },
      { id: "act::job::languages", l: ["Translations", "Traduzioni"] },
      { id: "act::job::site-seo", l: ["Port content & SEO", "Contenuti porti e SEO"] }
    ] },
    k: ["Use case · Costa Crociere · integration-first", "Caso d'uso · Costa Crociere · integration-first"],
    h: ["Elevating content quality and scalability", "Più qualità e più scala per i contenuti"],
    d: {
      tabs: [["Challenge", "Esigenza"], ["Solution", "Soluzione"], ["Workflow", "Workflow"]],
      needs: [
        [["New high-quality excursions", "Nuove escursioni di qualità"], ["Turn technical inputs (TOG) into engaging, customer-oriented content.", "Trasformare input tecnici (TOG) in contenuti coinvolgenti e orientati al cliente."]],
        [["Optimize existing content", "Ottimizzare i contenuti esistenti"], ["Improve titles and descriptions in line with content clusters and tone of voice, for clarity and conversion.", "Migliorare titoli e descrizioni in linea con cluster e tone of voice, per chiarezza e conversione."]],
        [["Port content for SEO", "Contenuti dei porti per la SEO"], ["Improve readability and optimize long descriptions for search visibility.", "Migliorare la leggibilità e ottimizzare le descrizioni lunghe per la visibilità nei motori di ricerca."]],
        [["Multilingual expansion", "Espansione multilingua"], ["High-quality translations of key FAQs: English, French, German, Spanish, Portuguese.", "Traduzioni di qualità delle FAQ principali: inglese, francese, tedesco, spagnolo, portoghese."]]
      ],
      solution: {
        intro: ["A workflow-based content generation framework orchestrated with n8n, for consistency, speed and control. Next: a dedicated marketing interface to manage content autonomously.", "Un framework di generazione dei contenuti basato su workflow e orchestrato con n8n, per coerenza, velocità e controllo. Prossimo passo: un'interfaccia dedicata al marketing per gestire i contenuti in autonomia."],
        objective: ["Turn technical excursion datasheets (TOG) into high-quality, customer-ready content for multiple channels and markets.", "Trasformare le schede tecniche delle escursioni (TOG) in contenuti di qualità, pronti per i clienti, per più canali e mercati."],
        workflow: [["Structured ingestion of datasheets, with bulk uploads", "Acquisizione strutturata delle schede, anche in blocco"], ["Brand guidelines and predefined prompts built in", "Linee guida di brand e prompt predefiniti integrati"], ["Content generated per excursion cluster", "Contenuti generati per cluster di escursione"]],
        framework: [["Human-in-the-loop validation at key stages", "Validazione human-in-the-loop nei passaggi chiave"], ["Central control of tone of voice and language", "Controllo centralizzato di tone of voice e lingua"], ["Multi-level approval across teams", "Approvazione multilivello tra i team"], ["Integrated multilingual generation and translation", "Generazione multilingua e traduzioni integrate"]]
      },
      detail: ["An end-to-end production engine: it gathers technical content, structures and enriches it, and creates content ready to upload to the website — from preconfigured prompts and brand guidelines, with human review before publishing, plus metadata updates and translations.", "Un motore di produzione end-to-end: raccoglie i contenuti tecnici, li struttura e arricchisce e crea contenuti pronti per il sito, partendo da prompt preconfigurati e linee guida di brand, con revisione umana prima della pubblicazione, aggiornamento dei metadati e traduzioni."],
      imgs: ["assets/img/costa-ship.jpg", "assets/img/costa-kayak.jpg", "assets/img/costa-workflow.jpg"]
    },
    n: ["Three tabs: what they needed, how we solved it with n8n, and the real workflow. Note the human-in-the-loop checkpoints.", "Tre schede: l'esigenza, la soluzione con n8n e il workflow reale. Sottolinea i punti di controllo human-in-the-loop."]
  },
  {
    id: "bank", sec: "proof", layout: "full", type: "story3",
    core: { trail: true, spots: [
      { id: "make::job::art-direction", l: ["Three custom models", "Tre modelli custom"] },
      { id: "make::job::series-extensions", l: ["Campaign visuals", "Visual di campagna"] },
      { id: "make::job::brand-qa", l: ["Joint quality review", "Revisione congiunta"] }
    ] },
    conf: true,
    k: ["Use case · Leading Italian Banking Group · product-driven", "Caso d'uso · Primario gruppo bancario italiano · product-driven"],
    h: ["Firefly Custom Model", "Firefly Custom Model"],
    d: {
      steps: [
        { t: ["Objective", "Obiettivo"], img: "assets/img/bank-objective.jpg", b: [["Assess whether Adobe Firefly can generate commercially safe, high-quality images fit for production across three communication segments.", "Valutare se Adobe Firefly possa generare immagini di alta qualità, sicure per l'uso commerciale e adatte alla produzione, in tre ambiti di comunicazione."], ["Validate the outputs with business stakeholders and define a scalable approach for future campaigns.", "Validare i risultati con gli stakeholder di business e definire un approccio scalabile per le campagne future."]] },
        { t: ["Context", "Contesto"], img: "assets/img/bank-context.jpg", b: [["A leading Italian banking group wants to scale the production of campaign visuals with generative AI.", "Un primario gruppo bancario italiano vuole aumentare la produzione di visual di campagna con l'AI generativa."], ["The goal: faster creation, with brand consistency and compliance with banking requirements.", "L'obiettivo: creare più in fretta, con coerenza di brand e conformità ai requisiti del settore bancario."]] },
        { t: ["Solution", "Soluzione"], img: "assets/img/bank-solution.jpg", b: [["A proof of concept with three custom Firefly models, one per communication segment.", "Un proof of concept con tre modelli Firefly custom, uno per ambito di comunicazione."], ["A joint evaluation of image quality, brand alignment and commercial safety.", "Una valutazione congiunta di qualità delle immagini, allineamento al brand e sicurezza commerciale."], ["The PoC proved the fit for the use cases — and the customer adopted the solution.", "Il PoC ha dimostrato l'idoneità per i casi d'uso e il cliente ha adottato la soluzione."]] }
      ]
    },
    n: ["Confidential case: keep the client unnamed. The story is short — objective, context, solution — and ends with adoption.", "Caso riservato: non nominare il cliente. La storia è breve (obiettivo, contesto, soluzione) e si chiude con l'adozione."]
  },
  {
    id: "gambling", sec: "proof", layout: "split", type: "gambling",
    core: { trail: true, agents: true, level: 2, spots: [
      { id: "learn::job::segments", l: ["Dynamic audiences", "Pubblici dinamici"] },
      { id: "make::job::series-extensions", l: ["GenAI creatives", "Creatività GenAI"] },
      { id: "act::job::personalization", l: ["1-to-1 delivery", "Delivery 1-to-1"] },
      { id: "act::job::in-flight", l: ["Optimization loop", "Ciclo di ottimizzazione"] }
    ] },
    nda: true,
    k: ["Use case · gambling customer under NDA", "Caso d'uso · cliente del gaming sotto NDA"],
    h: ["Real-time hyper-personalized campaigns with GenAI", "Campagne hyper-personalizzate in tempo reale con la GenAI"],
    d: {
      blocks: [
        { t: ["Challenge", "Esigenza"], d: ["Hyper-personalized 1-to-1 campaigns at scale, with strong quality control and real-time orchestration across channels. In markets where product mechanics converge, performance depends on theme, narrative and context.", "Campagne 1-to-1 hyper-personalizzate su scala, con forte controllo di qualità e orchestrazione in tempo reale su più canali. Nei mercati in cui i prodotti si somigliano, la differenza la fanno tema, narrazione e contesto."] },
        { t: ["Approach", "Approccio"], d: ["Dynamic audiences from consolidated customer data and real-time signals; GenAI-powered dynamic creative production for inbound and outbound — fast experiments, near real-time variation, performance-driven loops.", "Pubblici dinamici da dati cliente consolidati e segnali in tempo reale; produzione dinamica delle creatività con la GenAI per inbound e outbound: esperimenti rapidi, variazioni quasi in tempo reale, cicli guidati dalle performance."] },
        { t: ["Results", "Risultati"], d: ["Context-aware creatives for each segment — potentially each person — improving engagement and conversion, while governance and brand consistency stay under control.", "Creatività contestuali per ogni segmento, potenzialmente per ogni persona, con più engagement e conversione e governance e coerenza di brand sotto controllo."] }
      ],
      tech: ["Adobe Experience Platform", "Adobe Journey Optimizer", "Adobe Target", "Adobe Experience Manager", ["GenAI tooling (e.g. Midjourney)", "Strumenti GenAI (es. Midjourney)"]]
    },
    n: ["Client under NDA: do not name the company or the market beyond “online gaming”.", "Cliente sotto NDA: non nominare l'azienda né il mercato oltre a “online gaming”."]
  },
  {
    id: "avatars", sec: "proof", layout: "full", type: "avatars",
    core: { trail: true, agents: true, level: 2, spots: [
      { id: "make::job::scripts-vo", l: ["AI narration", "Narrazione AI"] },
      { id: "act::job::languages", l: ["Multilingual", "Multilingua"] },
      { id: "make::job::document-copy", l: ["Training content", "Contenuti di training"] }
    ] },
    k: ["Use case · content automation", "Caso d'uso · automazione dei contenuti"],
    h: ["Training content automation with AI avatars", "Automazione del training con avatar AI"],
    p: ["Short video pills that explain product features or custom developments. From a screen recording, AI generates the narration, a customizable avatar and the complete training video.", "Brevi pillole video che spiegano funzionalità di prodotto o sviluppi custom. Da una registrazione dello schermo, l'AI genera la narrazione, un avatar personalizzabile e il video di training completo."],
    d: {
      img: "assets/img/avatar-training.jpg",
      cap: [["Automatic voice-over from the recording", "Voice-over automatico dalla registrazione"], ["AI avatar presenting in overlay", "Avatar AI che presenta in overlay"], ["Multilingual narration", "Narrazione multilingua"], ["Automatic subtitles", "Sottotitoli automatici"], ["One consistent format", "Un formato coerente"], ["Fast updates when features change", "Aggiornamenti rapidi quando cambiano le funzionalità"]],
      val: [["From days to hours of production", "Dalla produzione in giorni a quella in ore"], ["Training that scales across regions and languages", "Training che scala su paesi e lingue"], ["Better adoption of new features", "Migliore adozione delle novità"], ["Less dependency on live sessions", "Meno dipendenza dalle sessioni dal vivo"], ["Consistent messaging and quality", "Messaggi e qualità coerenti"], ["Support for onboarding and continuous learning", "Supporto a onboarding e formazione continua"]]
    },
    n: ["A quick, concrete case — good if the audience includes training or internal comms.", "Un caso rapido e concreto, utile se in sala c'è chi si occupa di formazione o comunicazione interna."]
  },

  /* ================= NEXT ================= */
  {
    id: "benefits", sec: "next", layout: "full", type: "benefits",
    core: { agents: true, level: 2 },
    k: ["Key benefits", "Benefici chiave"],
    h: ["What a Content Supply Chain gives you", "Cosa vi dà una Content Supply Chain"],
    d: {
      items: [
        { i: "speed", t: ["Speed", "Velocità"], d: ["Content creation from weeks to days — faster time to market.", "La creazione dei contenuti passa da settimane a giorni: time to market più rapido."] },
        { i: "consistency", t: ["Consistency", "Coerenza"], d: ["Every piece always aligned with brand guidelines.", "Ogni contenuto sempre allineato alle linee guida di brand."] },
        { i: "scale", t: ["Scalability", "Scalabilità"], d: ["Many productions in parallel, without losing control.", "Tante produzioni in parallelo, senza perdere il controllo."] },
        { i: "spark", t: ["Creativity assist", "Supporto creativo"], d: ["AI-generated content to spark ideas and speed production.", "Contenuti generati con l'AI per stimolare le idee e accelerare la produzione."] },
        { i: "tailor", t: ["Tailor-made approach", "Approccio su misura"], d: ["Adapts to your tools and your organization.", "Si adatta ai vostri strumenti e alla vostra organizzazione."] },
        { i: "collab", t: ["Collaboration-friendly", "Collaborazione"], d: ["Teams and stakeholders aligned on one workflow.", "Team e stakeholder allineati su un unico workflow."] },
        { i: "quality", t: ["Quality assurance", "Qualità garantita"], d: ["High quality for every content type.", "Alta qualità per ogni tipo di contenuto."] },
        { i: "cost", t: ["Cost efficiency", "Efficienza dei costi"], d: ["Less manual effort and waste, more return on content.", "Meno lavoro manuale e sprechi, più ritorno dai contenuti."] }
      ]
    },
    n: ["Let the client pick the two benefits that matter most to {client} — that is the hook for the next step.", "Fai scegliere al cliente i due benefici che contano di più per {client}: è l'aggancio per il passo successivo."]
  },
  {
    id: "close", sec: "next", layout: "cover", type: "close",
    core: { agents: true, level: 2 },
    k: ["Next steps", "Prossimi passi"],
    h: ["From baseline to agentic — together", "Dalla baseline all'AI agentica, insieme"],
    p: ["Start from a solid baseline, scale with modular components, then let agents take on the repetitive work — with people always in control.", "Partire da una baseline solida, scalare con componenti modulari, poi lasciare agli agenti il lavoro ripetitivo, con le persone sempre al controllo."],
    d: { thanks: ["Thank you", "Grazie"] },
    n: ["Close on the core: open it (C) and leave it running while you take questions.", "Chiudi sul core: aprilo (C) e lascialo girare mentre rispondi alle domande."]
  }
];
