/* Backup: AEM Copilot (product) and the Agent Orchestrator (orchestrator) of cluster 1 (sec "c1").
   Taken out of core/scenes/library-trends.js on 10 Oct 2026: out of the main path for Lavazza.
   The objects are unchanged.
   To show them again: Regia (key D) -> "Slide di backup" -> switch on -> Applica (this browser only),
   or add the ids back to clients/<id>/client.json "scenes" in section c1. */
window.SCENE_BACKUP = (window.SCENE_BACKUP || []).concat([
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
  }
]);
