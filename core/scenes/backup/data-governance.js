/* Backup: the AI Monitoring & AI Workplace Compliance trend of cluster 3 (sec "c3") —
   aimonitoring (trend deep dive) and shadowai (market signals).
   Taken out of core/scenes/library-trends.js on 9 Oct 2026: for Lavazza the Data chapter goes straight to Data Intelligence.
   The objects are unchanged; the trend stays in TREND_CLUSTERS (clusters/chapter chips link to it only when the scene is shown).
   To show them again: Regia (key D) → "Slide di backup" → switch on → Applica (this browser only),
   or add the ids back to clients/<id>/client.json "scenes" after "c3". */
window.SCENE_BACKUP = (window.SCENE_BACKUP || []).concat([
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
  }
]);
