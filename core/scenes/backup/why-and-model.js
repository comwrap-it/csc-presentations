/* Backup: the "Why now" (sec "why") and "The model" (sec "what") sections of the CSC story —
   expectation, needs, hyper, maturity, demand (why) and csc, core, framework (what).
   Taken out of core/scenes/library.js on 9 Oct 2026 (Lavazza: "da usare in un altro momento, ma di sicuro non ora").
   The objects are unchanged. The close scene still reads the "framework" steps from the pool, backups included.
   To show them again: Regia (key D) → "Slide di backup" → switch on → Applica (this browser only),
   or add the ids back to clients/<id>/client.json "scenes" (e.g. with "Esporta configurazione" / "Salva nel progetto"). */
window.SCENE_BACKUP = (window.SCENE_BACKUP || []).concat([
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
    n: ["The steps cycle by themselves; click one to stop on it. Each step lights its part of the core: Plan = Strategic Intelligence, Create = Creative Production, Manage = the Brain, Deliver = Activation, Measure = Data Insight.", "Le fasi scorrono da sole; clicca per fermarti su una. Ogni fase illumina la sua parte del core: Pianificare = Strategic Intelligence, Creare = Creative Production, Gestire = il Brain, Distribuire = Activation, Misurare = Data Insight."]
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
        { id: "act", t: ["Deliver · Intelligent Activation", "Distribuire · Intelligent Activation"] }, { id: "learn", t: ["Measure · Data Insight", "Misurare · Data Insight"] }
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
  }
]);
