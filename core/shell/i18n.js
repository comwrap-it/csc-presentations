/* Shared UI strings (EN / IT). {client} and {CLIENT} are replaced with the client name at boot;
   a client can override any key in clients/<id>/client.json → "ui". */
window.UI_TEXT = {
  en: {
    "brand": "REPLY", "for": "for {client}",
    "core": "Core", "coreOpen": "Open the core", "coreBack": "Back to the story",
    "coreHint": "Click a phase, then a function or a job · Esc back",
    "overview": "Overview", "notes": "Speaker notes", "presenter": "Presenter window", "handout": "Handout / PDF",
    "full": "Full screen", "keys": "Shortcuts", "next": "Next", "prev": "Back", "of": "of",
    "inCore": "Show in the core", "source": "Source",
    "sec.why": "Why now", "sec.what": "The model", "sec.how": "How", "sec.proof": "Use cases", "sec.next": "Next steps",
    "header.kicker": "REPLY · FOR {CLIENT}", "header.title": "CONTENT SUPPLY CHAIN — OPERATING MODEL", "header.sub": "Plan · Create · Manage · Deliver · Measure — around one Company Brain",
    "hint.wheel": "click the brain, the ring or a phase", "hint.phase": "click a function or a job · esc back",
    "back": "← all phases",
    "sheet.reads": "Reads from the brain", "sheet.systems": "Exemplary solutions", "sheet.skills": "Skills it may call", "sheet.writes": "Writes back",
    "sheet.replaces": "What it replaces", "sheet.ladder": "The ladder", "sheet.human": "The human", "sheet.notes": "Design principle",
    "sheet.agent": "AI in action", "sheet.trigger": "Trigger", "sheet.does": "AI agent", "sheet.output": "Output", "sheet.gate": "Human check",
    "sheet.poweredBy": "Example", "sheet.jobs": "Jobs in this function",
    "lad.human": "Human-led", "lad.assist": "Human-assisted", "lad.auto": "Agentic",
    "mode.2": "AI runs · human on the loop", "mode.1": "Human-in-the-loop", "mode.0": "Human-led · AI prepares",
    "badge.More autonomous": "AI-run", "badge.Human-assisted": "Human-in-the-loop", "badge.Human-led": "Human-led",
    "badge.Function": "Function", "badge.Start here": "Start here", "badge.Handoff": "Handoff", "badge.Always on": "Always on",
    "badge.Memory": "Memory", "badge.Hygiene": "Volume",
    "legend.title": "Who does the job", "legend.led": "Human-led · AI prepares", "legend.hitl": "Human-in-the-loop", "legend.hotl": "AI runs · human on the loop",
    "keys.title": "Keyboard shortcuts", "notes.title": "Speaker notes",
    "play": "Play", "pause": "Pause", "adobeStack": "Adobe stack", "altStack": "Alternative stack",
    "confidential": "Strictly confidential", "nda": "Customer under NDA", "markHere": "We are here", "clearMark": "Clear",
    "handout.print": "Print / save as PDF", "lock": "Lock (forget password)"
  },
  it: {
    "brand": "REPLY", "for": "per {client}",
    "core": "Core", "coreOpen": "Apri il core", "coreBack": "Torna al racconto",
    "coreHint": "Clicca una fase, poi una funzione o un job · Esc per tornare",
    "overview": "Panoramica", "notes": "Note per chi presenta", "presenter": "Finestra relatore", "handout": "Handout / PDF",
    "full": "Schermo intero", "keys": "Scorciatoie", "next": "Avanti", "prev": "Indietro", "of": "di",
    "inCore": "Mostra nel core", "source": "Fonte",
    "sec.why": "Perché ora", "sec.what": "Il modello", "sec.how": "Come", "sec.proof": "Casi d'uso", "sec.next": "Prossimi passi",
    "header.kicker": "REPLY · PER {CLIENT}", "header.title": "CONTENT SUPPLY CHAIN — MODELLO OPERATIVO", "header.sub": "Pianificare · Creare · Gestire · Distribuire · Misurare — attorno a un unico Company Brain",
    "hint.wheel": "clicca il brain, l'anello o una fase", "hint.phase": "clicca una funzione o un job · esc per tornare",
    "back": "← tutte le fasi",
    "sheet.reads": "Legge dal Brain", "sheet.systems": "Soluzioni di esempio", "sheet.skills": "Skill che può usare", "sheet.writes": "Riscrive",
    "sheet.replaces": "Cosa sostituisce", "sheet.ladder": "La scala", "sheet.human": "La persona", "sheet.notes": "Principio di design",
    "sheet.agent": "L'AI al lavoro", "sheet.trigger": "Trigger", "sheet.does": "Agente AI", "sheet.output": "Output", "sheet.gate": "Controllo umano",
    "sheet.poweredBy": "Esempio", "sheet.jobs": "Job di questa funzione",
    "lad.human": "Guidato da persone", "lad.assist": "Assistito", "lad.auto": "Agentico",
    "mode.2": "Eseguito dall'AI · persona on the loop", "mode.1": "Human-in-the-loop", "mode.0": "Guidato da persone · l'AI prepara",
    "badge.More autonomous": "Eseguito dall'AI", "badge.Human-assisted": "Human-in-the-loop", "badge.Human-led": "Guidato da persone",
    "badge.Function": "Funzione", "badge.Start here": "Si parte da qui", "badge.Handoff": "Passaggio", "badge.Always on": "Sempre attivo",
    "badge.Memory": "Memoria", "badge.Hygiene": "Volume",
    "legend.title": "Chi fa il lavoro", "legend.led": "Guidato da persone · l'AI prepara", "legend.hitl": "Human-in-the-loop", "legend.hotl": "Eseguito dall'AI · persona on the loop",
    "keys.title": "Scorciatoie da tastiera", "notes.title": "Note per chi presenta",
    "play": "Avvia", "pause": "Pausa", "adobeStack": "Stack Adobe", "altStack": "Stack alternativo",
    "confidential": "Strettamente riservato", "nda": "Cliente sotto NDA", "markHere": "Siamo qui", "clearMark": "Azzera",
    "handout.print": "Stampa / salva come PDF", "lock": "Blocca (dimentica la password)"
  }
};

window.KEYS = [
  ["→ / Space", "Next scene", "Scena successiva"],
  ["←", "Previous scene", "Scena precedente"],
  ["C", "Open / close the core", "Apri / chiudi il core"],
  ["G", "Overview of all scenes", "Panoramica delle scene"],
  ["L", "Language EN / IT", "Lingua EN / IT"],
  ["N", "Speaker notes", "Note per chi presenta"],
  ["P", "Presenter window", "Finestra relatore"],
  ["H", "Handout / PDF", "Handout / PDF"],
  ["F", "Full screen", "Schermo intero"],
  ["Esc", "Close / back", "Chiudi / indietro"]
];

window.SECTIONS = ["why", "what", "how", "proof", "next"];

