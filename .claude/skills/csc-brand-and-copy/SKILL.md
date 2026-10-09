---
name: csc-brand-and-copy
description: Brand rules (Reply vs Comwrap Reply), bilingual EN/IT copy style guide, product terminology and confidentiality rules for the CSC presentations. Use when writing or reviewing any visible text, names, logos or colours.
---

# Brands, copy and confidentiality

## Two brands, one deck

| | Reply (holding) | Comwrap Reply (us) |
|---|---|---|
| Accent | green `#01EB51` | heart red `#F91351` |
| Background | black | nocturnal blue `#212A35` / `#141A22` |
| Secondary | — | intel `#00ADED`, act `#FF8AB0`, learn `#7CC4F0` |
| Logo | running man + REPLY | COMWRAP REPLY lockup |
| Kicker label | REPLY | COMWRAP REPLY |

The viewer chooses on the login page (or `?brand=`, key B). Nothing in a scene may assume one brand:
colours through CSS variables / `THEME`, logos only from brands.js, names through `{brand}`.
A leak (green in the Comwrap version, or the Reply logo) is a bug: `node tools/qa/brand-leak.mjs --brand=comwrap --tabs`.
Photos and third-party screenshots may contain either colour: that is fine.

Names: "Comwrap Reply" (never "Comwrap" alone in copy), "Reply" for the group, "Reply Digital Experience" for the network.
Offices of Comwrap Reply: Torino, Milano, Verona.

## Copy style (both languages)

- Short, concrete, consultative. One idea per sentence. No hype words ("rivoluzionario", "game changer"), no exclamation marks.
- Titles: sentence case, ≤ 12 words, say the point ("From a request to the right asset, automatically"), not the topic ("Asset management").
- Numbers with unit and scope; sources in `n` or the scene's source line.
- Lists: parallel structure, ≤ 6 items, ≤ 2 lines each.
- Italian: natural Italian, not calque. Keep established English terms of the domain (brand, workflow, agent/agente, asset, content supply chain, GEO, CMS, DAM) and product names; translate the rest. "Caso d'uso", "Esigenza / Soluzione / Risultati", "Mostra nel core", "Avvia".
- EN and IT must say the same thing (same facts, same numbers, same order). Italian may be slightly longer: check layouts at 1366×768.
- Speaker notes: imperative, what to click, the message, the source.

## Terminology

| Use | Not |
|---|---|
| Reply GEO Compass (our product) | GEO Compass alone at first mention |
| Adobe Brand Visibility (formerly LLM Optimizer) | LLM Optimizer alone |
| Adobe CX Enterprise Coworker | Adobe Coworker (in titles) |
| Adobe Firefly Workflow Builder (Firefly Creative Production for Enterprise) | Firefly Workflows |
| Adobe Experience Manager (AEM) Sites / Assets / Guides | — |
| Adobe Workfront, Workfront Fusion, Adobe Content Hub, Frame.io, GenStudio for Performance Marketing | — |
| Content Supply Chain (CSC) | content pipeline |

Product names and renames are kept current by `csc-adobe-researcher` (see csc-adobe-sources) and enforced by `tools/policy.json`.

## Confidentiality

- Clients under NDA or not yet approved are anonymised by sector: "Primario gruppo bancario italiano", "Cliente del gaming (NDA)", "Luxury fashion". The real name must not appear anywhere in the repo text (the repo may be public). Add the real name as a forbidden term in `tools/policy.local.json` (git-ignored: never in `policy.json`, the repo may be public) → validate fails if it slips in. Share that local file with colleagues privately.
- Named references (Costa Crociere, Škoda, HGA, Lavazza) only when the team says the client approved.
- Screenshots: no personal data, no real customer data, no internal URLs or tokens.
- Client-specific mocks (e.g. the GEO Compass Lavazza demo) stay in `clients/<id>/`.

## Review checklist (copy guardian)

1. EN/IT parity and both filled · 2. terminology table · 3. brand names and `{brand}` · 4. confidentiality (policy terms, screenshots) · 5. numbers match the source · 6. titles say the point · 7. notes useful for a presenter who did not build the deck.
