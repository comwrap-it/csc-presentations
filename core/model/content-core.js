/* Layers and functions — enrichment + Italian (EN / IT).
   Keys as in content-intel.js; plus: sys (systems override), k kicker [en,it], lab Italian labels. */
window.CONTENT = window.CONTENT || {};
Object.assign(window.CONTENT, {
  core: {
    l: ["Brand, briefs, packs, decisions — the memory every agent reads.", "Brand, brief, pack, decisioni: la memoria che ogni agente legge."],
    b: ["Every person and every agent starts from the same governed context. Brand Intelligence holds codes and claims, Microsoft Graph holds people, files and conversations, the DAM holds assets. Each cycle writes back what it learned.", "Ogni persona e ogni agente parte dallo stesso contesto governato. Brand Intelligence custodisce codici e claim, Microsoft Graph persone, file e conversazioni, il DAM gli asset. Ogni ciclo riscrive ciò che ha imparato."],
    k: ["Grounded", "Ancorato"],
    it: { r: "Evidenze scollegate, brief rifatti di continuo e risultati che non orientano la decisione successiva.", lad: ["Il contesto vive nella testa delle persone e in sistemi scollegati. Ogni sessione riparte da zero.", "I record sono collegati e strutturati; le persone assemblano ancora il contesto a mano.", "Persone e agenti recuperano un contesto pertinente e tracciabile e aggiornano la memoria governata attraverso gate definiti."], h: "Un Memory Steward è responsabile di schema, provenienza, accessi e conservazione. I responsabili di dominio restano titolari di evidenze, decisioni e policy.", n: "Brand Intelligence per il brand. Microsoft Graph per M365. Oppure le fonti che il cliente usa già." },
    lab: { lives: "La memoria strutturata contiene", skills: "Livelli di conoscenza", writes: "La memoria si aggiorna con", human: "Gestione della memoria", notes: "Principio architetturale" },
    n: "Brand Intelligence for brand. Microsoft Graph for M365. Or the client's current sources. Agents read from here and write back only through gates."
  },
  ring: {
    l: ["Countries, agencies, legal, brand — named humans decide.", "Paesi, agenzie, legale, brand: decidono persone con nome e cognome."],
    b: ["One queue, one owner per step, one audit trail. Agents can prepare, check and route, but only people with delegated authority can approve, release or grant exceptions.", "Una coda, un responsabile per ogni step, un audit trail. Gli agenti preparano, controllano e instradano; solo persone con autorità delegata approvano, rilasciano o concedono eccezioni."],
    k: ["Governed", "Governato"],
    it: { r: "Stati di avanzamento non ufficiali, policy non applicabili, approvazioni nascoste nei messaggi privati ed eccezioni senza perimetro, autorità, scadenza o traccia.", lad: ["Lo stato del lavoro si ricostruisce in riunione; autorità, approvazioni ed eccezioni vivono nei messaggi.", "Il workflow instrada il lavoro, mostra le evidenze e registra le decisioni; le persone mantengono i diritti decisionali.", "Controlli basati su policy valutano le evidenze e bloccano i passaggi non validi; si automatizzano solo le decisioni delegate esplicitamente."], h: "I policy owner definiscono le regole. I responsabili del modello operativo definiscono le responsabilità. Approvatori, autorità per le eccezioni e release owner prendono decisioni di cui rispondono; il livello coordina, verifica e registra.", n: "Paesi, funzioni e agenzie restano nel livello di work management." },
    lab: { lives: "Usa il contesto del Company Brain", systems: "Soluzioni di esempio", skills: "Capacità di controllo", writes: "Registra eventi di workflow validati", human: "Diritti decisionali", notes: "Principio architetturale" }
  },
  demand: {
    l: ["A request becomes one work record.", "Una richiesta diventa un unico record di lavoro."],
    b: ["People ask in the tools they already use. Copilot or Teams opens the request, the intake agent structures it, work management keeps it. One record from first message to last result.", "Le persone chiedono dagli strumenti che usano già. Copilot o Teams aprono la richiesta, l'agente di intake la struttura, il work management la conserva. Un unico record dal primo messaggio all'ultimo risultato."],
    k: ["The door", "L'ingresso"],
    it: { r: "Form, messaggi e aggiornamenti di stato scollegati.", lad: ["Le richieste arrivano via email, riunione o messaggio e si ricostruiscono dopo.", "Copilot struttura la richiesta; il demand owner fissa la priorità.", "I campi noti si compilano e il record viene instradato. I diritti decisionali restano ai responsabili designati."], h: "Il demand owner, di solito MarOps o il campaign lead, accetta, respinge, accorpa, rinvia o dà priorità alla richiesta.", n: "Copilot è un ingresso. Workfront è un record. Stesso lavoro sullo stack del cliente." },
    lab: { lives: "Contesto dal Company Brain", systems: "Soluzioni di esempio", skills: "Capacità di intake e feedback", writes: "Eventi di domanda", human: "Diritti decisionali sulla domanda", notes: "Modello di accesso" }
  },
  /* ---------- Strategic Intelligence functions ---------- */
  "intel::fn::demand": {
    l: ["A campaign request becomes one record.", "Una richiesta di campagna diventa un unico record."],
    b: ["Requester, market, timing, objective. Copilot is one way to start it. Priority sits in work management — Workfront or what you already run.", "Richiedente, mercato, tempi, obiettivo. Copilot è uno dei modi per avviarla. La priorità vive nel work management: Workfront o ciò che già usate."],
    it: { r: "Una casella condivisa, una riunione fissa e tre versioni della stessa richiesta.", lad: ["Qualcuno inoltra un'email. Il brief è l'email.", "Le richieste arrivano in coda. Una persona le ordina.", "L'intake struttura la richiesta. Una persona decide solo la priorità."], h: "Il demand owner, di solito MarOps o il campaign lead, fissa la priorità.", n: "Sblocca Brand codes, Audiences, Markets, Proof, Plan e Brief." }
  },
  "intel::fn::brand-codes": {
    l: ["Brand rules for this brief.", "Le regole di brand per questo brief."],
    b: ["Platform, voice, claims and do-nots. Example: Adobe Brand Intelligence. Or the brand system you already have.", "Piattaforma, tono, claim e divieti. Esempio: Adobe Brand Intelligence. Oppure il sistema di brand che avete già."],
    it: { r: "Mandare il brand book di 80 pagine e sperare.", lad: ["Un brand manager allega un PDF.", "L'agente compila il pack. Il brand rivede le differenze.", "Ogni brief riceve un pack di codici aggiornato e circoscritto."], h: "Il brand lead è responsabile dei file sorgente nel Brain.", n: "Legge il Company Brain. Scrive un pack circoscritto sul mandato." }
  },
  "intel::fn::audiences": {
    l: ["Define who the work is for.", "Definire per chi è il lavoro."],
    b: ["Set the audience, tension and relevant personas from current evidence.", "Definire pubblico, tensione e persona rilevanti a partire dalle evidenze attuali."],
    it: { r: "Un workshop sulle persona scollegato dai comportamenti.", lad: ["Pensiamo che abbiano 25–45 anni e vivano in città.", "Le evidenze vengono raccolte. Una persona nomina la tensione.", "I segmenti si aggiornano dai dati. La tensione richiede ancora una frase umana."], h: "Lo strategist o l'insights lead scrive la tensione.", n: "Quando gli insight sono fuori dal marketing, questa funzione li assembla insieme alla funzione di ricerca." }
  },
  "intel::fn::markets": {
    l: ["Set the market and competitor context.", "Definire il contesto di mercato e dei competitor."],
    b: ["Record the category signals, competitor activity and market scope for the mandate.", "Registrare segnali di categoria, attività dei competitor e perimetro di mercato del mandato."],
    sys: ["Adobe LLM Optimizer", "Adobe Customer Journey Analytics"],
    it: { r: "Una slide competitiva dall'ultima gara.", lad: ["Qualcuno si ricorda un annuncio di un competitor.", "Le analisi arrivano. Una persona ne trae le implicazioni.", "Le analisi si aggiornano. Le implicazioni richiedono ancora una persona."], h: "Lo strategist scrive le implicazioni.", n: "Alimenta Plan e Brief. Non sceglie i media." }
  },
  "intel::fn::proof": {
    l: ["Verify the offer and claims.", "Verificare offerta e claim."],
    b: ["Confirm product facts, evidence and the offer before the team develops the work.", "Confermare fatti di prodotto, evidenze e offerta prima che il team sviluppi il lavoro."],
    sys: ["Adobe Brand Intelligence", "Adobe Experience Manager Assets", "Adobe Workfront"],
    it: { r: "Un elenco di funzionalità più ottimismo.", lad: ["Il product manda un one-pager a concept finito.", "L'agente assembla fatti e fonti. Una persona blocca l'offerta.", "Gli SKU noti si compilano. I claim nuovi aprono un gate."], h: "Product e legale bloccano l'offerta.", n: "Il brief non viene emesso senza un'offerta bloccata." }
  },
  "intel::fn::plan": {
    l: ["Set channels, moments and constraints.", "Definire canali, momenti e vincoli."],
    b: ["Define where the work appears, when it matters and the limits production needs.", "Definire dove apparirà il lavoro, quando conta e i limiti di cui la produzione ha bisogno."],
    sys: ["Adobe Mix Modeler", "Adobe Customer Journey Analytics", "Adobe Journey Optimizer"],
    it: { r: "Un elenco di canali scritto dopo aver girato la hero.", lad: ["Il media viene briefato a parte, dopo.", "L'agente propone i percorsi dagli apprendimenti. Una persona conferma.", "I percorsi previsti si allegano. Una persona fissa comunque i limiti."], h: "Il channel / media lead conferma i limiti.", n: "I percorsi previsti arrivano dalla fase Learn del ciclo precedente." }
  },
  "intel::fn::brief": {
    l: ["One page production can use.", "Una pagina che la produzione può usare."],
    b: ["Copilot and GenStudio can assemble mandate, audience, codes and plan. A named owner signs in work management.", "Copilot e GenStudio possono assemblare mandato, pubblico, codici e piano. Un responsabile designato firma nel work management."],
    it: { r: "Una presentazione di 12 pagine e un kickoff che ricomincia da capo il ragionamento.", lad: ["Il brief è una riunione.", "Il compilatore prepara. Una persona firma.", "Le pagine complete si compilano da sole. La firma resta umana."], h: "Il demand owner firma il brief. Quella firma è il lavoro.", n: "Il compilatore assembla il materiale strategico approvato e segnala gli input incompleti." }
  },

  /* ---------- Creative Production functions ---------- */
  "make::fn::routes": {
    l: ["Develop the creative routes.", "Sviluppare le route creative."],
    b: ["The client's creative agency develops routes from the signed brief. The Content Supply Chain carries the selected route through production, activation and learning.", "L'agenzia creativa del cliente sviluppa le route dal brief firmato. La Content Supply Chain porta la route scelta attraverso produzione, attivazione e apprendimento."],
    sys: ["Adobe Workfront", "Adobe Experience Manager Assets"],
    it: { r: "Un kickoff che ricomincia la strategia, fatturato come produzione.", lad: ["L'agenzia presenta. Il cliente sceglie in sala.", "Gli scamp si assemblano dal brief. Una persona blocca comunque.", "Mai. Un territorio bloccato è una decisione."], h: "ECD e brand approvano il blocco del territorio.", n: "L'input è il brief strategico firmato. Nulla in produzione parte senza un blocco." }
  },
  "make::fn::hero": {
    l: ["Still, film, master line.", "Still, film, master line."],
    b: ["The client's creative agency makes the hero. Brief, territory and pack come from the operating model. AI prepares, people create.", "La hero la fa l'agenzia creativa del cliente. Brief, territorio e pack arrivano dal modello operativo. L'AI prepara, le persone creano."],
    it: { r: "Chiedere a un generatore l'idea della campagna.", lad: ["Un regista, un fotografo, un copywriter.", "Riferimenti e vincoli sono pronti. La creazione è umana.", "Il lavoro hero resta all'agenzia creativa."], h: "L'agenzia creativa del cliente e i partner di produzione sono responsabili della hero.", n: "Più ci si allontana da questi file, più automazione è ammessa. Qui no." }
  },
  "make::fn::copy": {
    l: ["Write the campaign language.", "Scrivere il linguaggio della campagna."],
    b: ["Headlines, support, calls to action, scripts and disclaimers draw on the approved claims and master line.", "Headline, testi di supporto, call to action, script e disclaimer partono da claim approvati e master line."],
    sys: ["Adobe GenStudio for Performance Marketing", "Adobe Brand Intelligence"],
    it: { r: "Un brainstorming di headline senza claim.", lad: ["Ogni frase è un workshop.", "L'agente propone sulla base della libreria. Un copywriter modifica.", "Solo disclaimer approvati."], h: "Il copywriter. I claim nuovi vanno sempre al legale.", n: "Long copy è un'altra funzione. Altro responsabile, altra lunghezza." }
  },
  "make::fn::long-copy": {
    l: ["Extend the campaign into longer formats.", "Estendere la campagna nei formati lunghi."],
    b: ["Pages, journeys, brochures and FAQs carry the same territory into content, CRM and CMS work.", "Pagine, journey, brochure e FAQ portano lo stesso territorio nei contenuti, nel CRM e nel CMS."],
    sys: ["Adobe GenStudio for Content Marketing", "Adobe Experience Manager Sites"],
    it: { r: "Il team del sito che si fa il brief da solo partendo da un banner.", lad: ["Un'altra agenzia scrive una seconda campagna.", "Bozze da route e offerta. Una persona modifica.", "Solo blocchi di servizio già approvati."], h: "Il content o CRM lead è responsabile di questo lavoro.", n: "È vicino a Hub. Più automazione della hero, meno delle declinazioni." }
  },
  "make::fn::hub": {
    l: ["Repeatable work from the locked territory.", "Lavoro ripetibile dal territorio bloccato."],
    b: ["Series and always-on extensions from the locked territory, generated within the art direction and stored in the DAM.", "Serie ed estensioni always-on dal territorio bloccato, generate entro l'art direction e archiviate nel DAM."],
    it: { r: "Una seconda campagna perché qualcuno voleva “più contenuti”.", lad: ["Ogni contenuto social è un nuovo concept.", "Estensioni dal pack hero. Un creativo modifica.", "Solo quando il pattern è collaudato."], h: "Studio interno o d'agenzia: mestiere, non concept.", n: "Hero è il genitore. Hygiene e declinazioni sono i figli. Hub sta nel mezzo. Si collega a uno studio di template, a un'orchestrazione di produzione o a uno stack di varianti governato: scegliete una sola spina dorsale." }
  },
  "make::fn::qa": {
    l: ["Brand, claims, specs. Then a signature.", "Brand, claim, specifiche. Poi una firma."],
    b: ["Brand and claim checks run on every asset. Example: Brand Intelligence flags, work management holds the gate.", "I controlli di brand e claim girano su ogni asset. Esempio: Brand Intelligence segnala, il work management tiene il gate."],
    it: { r: "Uscire perché la data ha vinto.", lad: ["Una stanza piena di opinioni.", "Le checklist girano. Una persona firma comunque il pack.", "Solo le specifiche."], h: "Brand e producer. La firma del pack è il lavoro.", n: "Activation legge solo questo pack, più il brief." }
  },

  /* ---------- Intelligent Activation functions ---------- */
  "act::fn::up-format": {
    l: ["Prepare approved content for each placement.", "Preparare i contenuti approvati per ogni placement."],
    b: ["Create sizes, crops, languages and placement specifications from the approved master pack. This is where volume lives — and where agents save the most time.", "Creare formati, ritagli, lingue e specifiche di placement dal master pack approvato. Qui vive il volume, ed è qui che gli agenti fanno risparmiare più tempo."],
    it: { r: "Un weekend in studio per fare 400 formati a mano.", lad: ["Ogni ritaglio è un ticket.", "Il set è proposto. Una persona fa controlli a campione.", "Le specifiche note girano da sole dopo la firma del pack."], h: "L'activation lead controlla a campione. Il brand solo sulle eccezioni.", n: "Per questo la hero resta umana. Il volume vive qui." }
  },
  "act::fn::spend": {
    l: ["Allocate, book and pace the budget.", "Allocare, prenotare e monitorare il budget."],
    b: ["Use the approved recommendation to set channel allocation, bookings and pacing.", "Usare la raccomandazione approvata per definire allocazione per canale, prenotazioni e pacing."],
    sys: ["Adobe Mix Modeler", "Adobe GenStudio for Performance Marketing", "Adobe Workfront"],
    it: { r: "Un piano riciclato che ha scavalcato il team di acquisto.", lad: ["Un centro media presenta una presentazione. La finance taglia.", "Le curve dell'ultimo ciclo propongono una ripartizione. Una persona blocca il budget.", "Solo il pacing. L'allocazione resta una decisione."], h: "Media lead e finance. Il blocco è il lavoro.", n: "Mix model, incrementalità e punteggi dei contenuti restano in Learn. Questa funzione agisce e basta." }
  },
  "act::fn::social": {
    l: ["Run organic and paid social as one system.", "Gestire social organico e paid come un unico sistema."],
    b: ["Use one approved content kit. Organic response informs paid amplification.", "Un unico kit di contenuti approvato. La risposta organica orienta l'amplificazione a pagamento."],
    it: { r: "Community e media in team separati che lavorano su file diversi.", lad: ["Due calendari, due agenzie.", "Un kit. I post organici escono. Il paid spinge i migliori.", "Le spinte seguono una regola. Il calendario resta umano."], h: "Il social lead è responsabile del calendario. Il media del budget di amplificazione.", n: "Social usa la hero still e il territorio approvato dalla produzione." }
  },
  "act::fn::paid": {
    l: ["Activate paid channels.", "Attivare i canali a pagamento."],
    b: ["Use the approved pack across search, programmatic, retail media and affiliate activity.", "Usare il pack approvato su search, programmatic, retail media e affiliazione."],
    sys: ["Adobe GenStudio for Performance Marketing", "Adobe Advertising", "Adobe Real-Time CDP"],
    it: { r: "Quattro agenzie specializzate con quattro brief.", lad: ["Ogni canale è un feudo.", "Un unico mix, i buyer dei canali eseguono.", "Linee always-on dopo un template umano."], h: "Performance / trading lead.", n: "Il paid social sta in Social di proposito. Il kit è condiviso." }
  },
  "act::fn::owned": {
    l: ["Run owned channels.", "Gestire i canali owned."],
    b: ["Publish the campaign through site, search, CRM and the approved mid-flight refreshes — and make sure AI assistants describe it correctly.", "Pubblicare la campagna su sito, search, CRM e con gli aggiornamenti approvati in corso, assicurandosi che gli assistenti AI la descrivano correttamente."],
    n: "Brand visibility lives here: Sites Optimizer fixes the site, LLM Optimizer tracks how AI assistants cite the brand. Long copy was made in Production; Owned publishes it.",
    it: { r: "Il team del sito che si fa il brief da solo partendo da un banner.", lad: ["Il sito pubblica qualcos'altro.", "Pagine e mail dal pack. L'editor blocca.", "Solo moduli di servizio."], h: "Digital / CRM lead.", n: "Qui vive la brand visibility: Sites Optimizer corregge il sito, LLM Optimizer misura come gli assistenti AI citano il brand. I testi lunghi si fanno in produzione; Owned li pubblica." }
  },
  "act::fn::orchestrate": {
    l: ["Coordinate journeys and in-flight delivery.", "Coordinare journey e consegna durante la campagna."],
    b: ["Set timing, audience and approved variants across the live journey.", "Definire tempi, pubblico e varianti approvate lungo il journey attivo."],
    it: { r: "Ogni canale che porta avanti la propria campagna.", lad: ["Una war room ogni mattina.", "Le regole propongono. Una persona conferma gli interventi rilevanti.", "Le regole note girano."], h: "Journey / activation lead.", n: "GEO e gate di brand stanno in Launch. Qui si muovono persone, non policy." }
  },
  "act::fn::launch": {
    l: ["Go live, then hand to Learn.", "Andare online, poi passare a Learn."],
    b: ["Workflows run the path. Work management records the go. Named humans sign the gates.", "I workflow gestiscono il percorso. Il work management registra il via. Persone designate firmano i gate."],
    it: { r: "Andare online perché la data ha vinto.", lad: ["Una riunione ricorrente e non strutturata.", "I gate sono elencati. Le persone firmano.", "Il packet per Learn si assembla da solo."], h: "Brand e activation lead.", n: "Il work management registra il via. Learn è responsabile di ciò che viene dopo." }
  },

  /* ---------- Data Insight functions ---------- */
  "learn::fn::ingest": {
    l: ["Build a usable learning set.", "Costruire un dataset di apprendimento utilizzabile."],
    b: ["Join the live delivery data, agreed KPIs and in-flight changes before analysis starts.", "Unire dati di consegna, KPI concordati e modifiche in corso prima che inizi l'analisi."],
    sys: ["Adobe Experience Platform", "Adobe Customer Journey Analytics"],
    it: { r: "Tre team, tre numeri, un solo wash-up.", lad: ["Qualcuno incolla un CSV.", "Il packet si unisce. Un analista conferma il dizionario.", "Le fonti note arrivano da sole."], h: "L'analytics lead è responsabile del dizionario.", n: "Nulla in Learn gira su un dataset non affidabile." }
  },
  "learn::fn::models": {
    l: ["Measure contribution and scenarios.", "Misurare contributo e scenari."],
    b: ["Use incrementality, mix models and scenarios to produce the next allocation recommendation.", "Usare incrementalità, mix model e scenari per produrre la prossima raccomandazione di allocazione."],
    it: { r: "Last-click e un fornitore che classifica i propri annunci.", lad: ["Un modello annuale che nessuno usa.", "Il modello gira. Una persona firma la raccomandazione.", "Gli scenari si aggiornano. Il blocco resta umano."], h: "Analytics lead. La finance partecipa al blocco.", n: "Allocate in Activation usa questa raccomandazione." }
  },
  "learn::fn::brand": {
    l: ["Measure brand and content effects.", "Misurare gli effetti su brand e contenuti."],
    b: ["Combine tracking and content analysis to show which work moved attention, brand or action.", "Combinare tracking e analisi dei contenuti per mostrare quale lavoro ha mosso attenzione, brand o azione."],
    it: { r: "Una presentazione di tracking scollegata dal piano media.", lad: ["Due agenzie, due verità.", "Ondate più dati digitali. Una persona legge le implicazioni.", "Le metriche digitali si aggiornano tra un'ondata e l'altra."], h: "Brand e insights.", n: "I punteggi dei contenuti orientano Hub e declinazioni; la leadership creativa decide la prossima hero." }
  },
  "learn::fn::journeys": {
    l: ["Read customer paths.", "Leggere i percorsi dei clienti."],
    b: ["Map how people move across owned, paid and physical touchpoints.", "Mappare come le persone si muovono tra touchpoint owned, paid e fisici."],
    it: { r: "Un funnel che inizia dall'ultimo annuncio.", lad: ["Una slide con gli step.", "Percorsi ordinati. Il journey lead legge.", "I percorsi noti si aggiornano."], h: "Journey / CRM lead.", n: "La personalizzazione in Activation sceglie dal pack. Questa funzione dice quali momenti contano." }
  },
  "learn::fn::behavior": {
    l: ["Read segments, places and commercial response.", "Leggere segmenti, luoghi e risposta commerciale."],
    b: ["Connect audience, location and sales evidence to the next planning cycle.", "Collegare evidenze su pubblico, luoghi e vendite al prossimo ciclo di pianificazione."],
    it: { r: "Un poster di persona e un elenco di negozi.", lad: ["Un workshop.", "Cluster dal dataset. Una persona dà loro un nome.", "I cluster noti si aggiornano."], h: "Insights e commerciale.", n: "Audiences in Strategy usa questi segmenti nel ciclo successivo." }
  },
  "learn::fn::signals": {
    l: ["Track what changes between campaigns.", "Seguire cosa cambia tra una campagna e l'altra."],
    b: ["Keep dated market, trend and competitor evidence available for the next brief — including how AI assistants talk about you.", "Tenere disponibili per il prossimo brief evidenze datate su mercato, trend e competitor, incluso come gli assistenti AI parlano di voi."],
    it: { r: "Un PDF settimanale che nessuno legge.", lad: ["Uno stagista incolla link.", "Segnali ordinati rispetto all'ultimo brief. Una persona taglia.", "Il radar gira. Le implicazioni restano umane."], h: "Lo strategist elimina il rumore.", n: "Category signals in Strategy usa le voci datate di questo log." }
  },
  "learn::fn::write-back": {
    l: ["Next brief starts from what we learned.", "Il prossimo brief parte da ciò che abbiamo imparato."],
    b: ["Forecast, recommendation and next-cycle brief go into the Company Brain. This is what makes the model smarter every cycle.", "Forecast, raccomandazione e brief successivo entrano nel Company Brain. È questo che rende il modello più intelligente a ogni ciclo."],
    it: { r: "Un report in un cassetto.", lad: ["Un wash-up a cui non va nessuno.", "Il brief si assembla. Una persona firma.", "Gli slot si compilano. La firma resta umana."], h: "Analytics lead e demand owner.", n: "Next-cycle intake in Strategy è il modulo vuoto. Questo è quello compilato." }
  }
});
