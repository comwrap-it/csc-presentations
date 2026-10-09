# Changelog

Changes for the audience of the presentations (what a presenter or a client sees), newest first.
The `csc-release` agent keeps the "Unreleased" section up to date before each commit.

## Unreleased
- Regia: ora si possono anche **ordinare le slide**. Si trascinano dalla maniglia ⠿ (mouse o touch) o con i pulsanti ↑ ↓ (da tastiera Alt+↑/↓), dentro la propria sezione; si spostano anche le sezioni intere. "Applica" aggiorna l'ordine di navigazione, panoramica, relatore e handout; l'ordine resta nel browser, si esporta e con la dashboard si salva in `client.json`; "Ripristina predefiniti" torna all'ordine originale.
- Lavazza: le sezioni "Perché ora" (5 slide) e "Il modello" (cinque fasi, core, framework) passano nel backup (`core/scenes/backup/why-and-model.js`); si riattivano dalla Regia. La slide di chiusura mostra ancora Baseline → Scale → AI agentica.
- Lavazza, capitolo 3 "Dati": "AI Monitoring" e "Shadow AI" passano nel backup (`data-governance.js`); il capitolo parte da "Data Intelligence" (ex "La democratizzazione dei dati"), poi CJA e data strategy.
- Lavazza, capitolo 2 "Supply Chain": nuova slide "Da un brief a ogni canale e mercato, come una linea di produzione" con "Esegui un batch" su tre flussi (varianti di campagna, localizzazione per mercato, immagini prodotto per l'e-commerce); "Un Brain, quattro pilastri" chiude il capitolo come approccio che proponiamo.
- Lavazza: AEM Guides si sposta nel "Come", prima di n8n; dal manuale Škoda tolti i riferimenti ai contenuti specifici per VIN.
- Regia (tasto D, menu ⋯, pulsante "⚙ Regia" in copertina, `?regia`): si scelgono le slide da mostrare o nascondere per sezione, con le slide di backup; "Applica" aggiorna subito la presentazione, la scelta resta nel browser; "Esporta configurazione" e, con `npm run dashboard`, "Salva nel progetto" la rendono predefinita in `client.json`.
- `client.json` accetta `hidden` (slide nascoste per default) e nasce la cartella `core/scenes/backup/` per le slide tenute da parte. Lavazza: Reply AEM Digital Assistant e Design to Content nascoste per default.
- Firefly Workflow Builder: niente più "Esegui un batch", la slide mostra i workflow e il ciclo di vita (il batch resta disponibile per altre slide di tipo workflow).
- La fase "Predictive Analytics" del modello operativo si chiama ora "Data Insight" (core, pilastri Marketing Ops, schede).
- Barra di navigazione in basso: le sezioni dei cluster senza numero ("AI-Omnimodal", "Supply Chain", "Dati e governance").
- Agenti AI specializzati e skill per gestire la presentazione (`.claude/`), con gli strumenti di controllo: validazione, layout su tutte le viewport e le schede, verifica del brand, test del login, contact sheet, estrazione da PowerPoint, ottimizzazione immagini (`tools/`).
- Xchange: sui telefoni la scheda "Gli 8 passi della CSC" non scorre più in orizzontale.

## 2026-10-09
- Reply GEO Compass: una slide presenta il prodotto prima della demo; la demo si carica dopo l'entrata della scena (Michele Pasetto).
- Škoda: il caso d'uso diventa l'automazione dell'asset management (Workfront, Fusion, AEM Assets, Content Hub).
- Costa Crociere: caso riscritto sulle slide del deck Digital Experience Trends 2026, con il confronto interattivo prima → dopo (-70% di tempo, -67% di passaggi manuali).
- Pagina radice del sito con il marchio Comwrap Reply.

## 2026-10-08
- Nuova referenza "Luxury fashion" al posto di rAInvented; Adobe CX Enterprise Coworker; Adobe Firefly Workflow Builder; rinomina in Reply GEO Compass e Adobe Brand Visibility; Škoda e AEM Guides nel cluster AI-Omnimodal.

## 2026-10-07
- Partnership Adobe 2026 e badge; demo GEO Compass; Marketing Ops (Brain e quattro pilastri); mappa delle sedi Comwrap Reply; navigazione con ritorno; versione Comwrap Reply selezionabile al login; responsive; "Mostra nel core" su tutti i casi d'uso.

## 2026-10-06
- Prima versione: presentazione Lavazza con tutte le slide, build cifrata e pubblicazione su GitHub Pages.
