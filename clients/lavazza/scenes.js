/* Lavazza-only scenes. */
window.CLIENT_SCENES = (window.CLIENT_SCENES || []).concat([
  {
    id: "geocompass", sec: "c1", layout: "full", type: "embed",
    core: { focus: "learn", trail: true, spots: [
      { id: "learn::job::pathing", l: ["Agent traffic", "Traffico degli agenti"] },
      { id: "act::job::site-seo", l: ["Corrections", "Correzioni"] },
      { id: "learn::job::competitive-watch", l: ["AI presence & arena", "Presenza AI e arena"] },
      { id: "learn::job::brand-tracking", l: ["Sentiment", "Sentiment"] }
    ] },
    k: ["Reply accelerator · Agentic Web · GEO Compass", "Acceleratore Reply · Agentic Web · GEO Compass"],
    h: ["GEO Compass: how AI agents see {client}", "GEO Compass: come gli agenti AI vedono {client}"],
    p: ["Our tool to measure and improve the brand's presence in the Agentic Web — from AI agents crawling the site to visibility, sentiment and share of voice in AI answers.", "Il nostro strumento per misurare e migliorare la presenza del brand nell'Agentic Web: dagli agenti AI che visitano il sito fino a visibilità, sentiment e share of voice nelle risposte dell'AI."],
    d: {
      app: "assets/html/geo-compass.html",
      url: "geo-compass · lavazza",
      tag: ["Live demo · sample data", "Demo live · dati di esempio"],
      tabSel: ".agt-tabs__tab", langSel: ".agt-lang-toggle__btn",
      mods: [
        { t: "Radar", spot: 0, d: ["AI agent interactions, automated traffic patterns and agentic performance across the site.", "Interazioni degli agenti AI, pattern di traffico automatizzato e performance agentiche del sito."] },
        { t: "Deep Dive", spot: 0, d: ["URL visibility, agentic crawl activity and per-URL performance.", "Visibilità degli URL, attività di scansione degli agenti e prestazioni per singolo URL."] },
        { t: ["Corrections", "Correzioni"], spot: 1, d: ["Actionable recommendations from CDN logs — deterministic rules with verifiable evidence.", "Raccomandazioni operative dai log CDN: regole deterministiche con evidenze verificabili."] },
        { t: ["AI Presence", "Presenza AI"], spot: 2, d: ["How often and how well the brand is mentioned in AI answers to monitored prompts.", "Quanto e come il brand è citato nelle risposte degli assistenti AI ai prompt monitorati."] },
        { t: "Sentiment", spot: 3, d: ["How AI answers talk about the brand: perception, competitor tone, aspects and claims.", "Come le risposte AI parlano del brand: percezione, tono dei competitor, aspetti e claim."] },
        { t: "Arena", spot: 2, d: ["Share of voice, rank over time and top movers against tracked competitors.", "Share of voice, posizione nel tempo e principali variazioni rispetto ai competitor monitorati."] }
      ],
      note: ["The demo is fully interactive: click inside to explore, ⤢ for full screen (Esc to close). Click outside the demo to use the arrow keys again.", "La demo è completamente interattiva: clicca dentro per esplorarla, ⤢ per lo schermo intero (Esc per chiudere). Clicca fuori dalla demo per tornare a usare le frecce."]
    },
    n: ["After LLM Optimizer, show our own answer: GEO Compass on {client}. Walk Radar → Corrections → AI Presence → Arena. The data are a realistic mock prepared for this meeting — say so if asked.", "Dopo LLM Optimizer, mostra la nostra risposta: GEO Compass su {client}. Percorri Radar → Correzioni → Presenza AI → Arena. I dati sono un mock realistico preparato per questo incontro: dillo se te lo chiedono."]
  }
]);
