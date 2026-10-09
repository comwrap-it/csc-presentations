---
name: csc-scene-authoring
description: Scene schema, the catalogue of scene types (what each one is for), how to pick one for a slide, and the checklist for adding, moving, replacing or removing a scene in a client presentation. Use whenever scene content is written or changed.
---

# Authoring scenes

## The scene object

```js
{
  id: "costa",                 // unique across core + client scenes; lowercase, no spaces
  sec: "proof",                // section: intro · trends · c1 · c2 · why · what · how · proof · c3 · next (client.json may define its own)
  layout: "full",              // full · split (core on the right) · cover · core
  type: "case",                // see the catalogue below
  core: { trail: true, spots: [{ id: "make::job::page-copy", l: ["Excursion content", "Contenuti delle escursioni"] }] },
  k: ["Use case · Costa Crociere", "Caso d'uso · Costa Crociere"],      // kicker
  h: ["From manual content production to an AI-powered CSC", "Dalla produzione manuale a una CSC potenziata dall'AI"], // title
  p: ["…", "…"],               // optional lede
  d: { … },                    // type-specific data — copy the shape from a real scene: node tools/catalog.mjs --type=<type>
  n: ["Speaker notes EN", "Note per chi presenta IT"]                    // what to say, what to click, sources
}
```

Every visible string is `[EN, IT]`. Tokens: `{client}`, `{CLIENT}`, `{brand}`. Asset paths: `assets/img/<file>` (client folder first, then core).

## Where scenes live

- Reusable across clients → `core/scenes/library.js` (CSC story) or `core/scenes/library-trends.js` (trends deck, products, cases).
- One client only (demos, client data) → `clients/<id>/scenes.js` (`window.CLIENT_SCENES`).
- Order and selection → `clients/<id>/client.json` `scenes`. Client wording tweaks → `overrides` (don't fork a core scene for a word).
- Use-case cards grid → the `cases` scene `d.cards` (`{ go, t, tag, d, img, conf?, nda? }`); a card whose scene is not in client.json is hidden.
- Offering chips linking to scenes → `offering` scene (`go` ids).

## Catalogue of types

Run `node tools/catalog.mjs --types` for the live list with the scenes that use each type, and `--type=<type>` for a full example.

| Type | What it is | Good for |
|---|---|---|
| cover | Title with the canvas | Opening, closing |
| about | Who we are, tabs; `t.map` draws the offices map | Company intro |
| offering | Practices + accelerator chips that jump to scenes | Offer overview |
| timeline | Partnership timeline, award badge, KPIs, lists | Partnership history |
| method · matrix · clusters | Research method, trend bubble matrix, cluster overview | Trend research |
| chapter | Big number divider for a cluster | Section openers |
| trend | Definition / sub-trends / why it matters | A trend deep dive |
| bigstat | 1–2 huge numbers counting up, with source | A market statistic |
| geo | Before/after toggle of a search result | GEO explainer |
| shots | Product screenshots in tabs | Product walkthrough from screenshots |
| product | Text + stats + lists + image/video, logo/badge | A product or accelerator page |
| orchestrator | Agents around an orchestrator | Multi-agent architecture |
| pillars | One Brain + four pillars (split layout) | Operating model |
| case | Tabs (paragraphs, bullets, animated flow), image, tech chips, core spots | **Default for a use case** |
| agentflow | Agents with human review steps, animated | Agentic production pipeline |
| agentloop | Sense → Decide → Act → Learn loop with apps | Agentic platform (e.g. Coworker) |
| wfcanvas | Workflow canvas: pick a workflow, run a batch, lifecycle | Workflow builders (e.g. Firefly Workflow Builder) |
| tabcards | Tabbed capability cards with image | A platform with several capability areas |
| hubchan | One source → many channels | Omnichannel/structured content |
| cja · sources | Person/hub with data sources; many sources → one analysis | Data and analytics |
| embed | Live HTML app in the slide (client scenes) | Demos (Reply GEO Compass) |
| costa · xchange · story3 · gambling · avatars · waver · n8n · firefly · genstudio · adobe · roads · csc5 · coreIntro · framework · needs · hyper · maturity · demand · benefits · close | Built-in one-off types in deck.js, tied to one scene each | Reuse only when the content has exactly that shape |

**Choosing:** prefer an existing type whose data shape fits the content. A slide with "Need / Solution / Results" → `case`. Before/after or process → `case` with `flow`, or `agentflow`. A product with numbers → `product`. Only ask `csc-scene-engineer` for a new type when the content's *interaction* is genuinely new (and then make it reusable, in scene-types.js).

## Interactivity standard

Each scene should give the presenter one thing to *do*: tabs, Play (animated flow), a toggle, a count-up, a hover. Notes (`n`) say what to click and the message to land.

## Checklist — add or change a scene

1. Content ready in both languages (see csc-brand-and-copy); numbers and Adobe claims sourced (csc-adobe-sources).
2. Write the scene in the right file; copy `d` from `node tools/catalog.mjs --type=<type>`.
3. `core.spots`: 1–4 real node ids (`node tools/catalog.mjs --spots --phase=make`) with short labels.
4. Images: `node tools/img/optimize.mjs <src> --out=core/assets/img/<name>.webp` (≤1600 px, ideally <300 KB).
5. Place the id in `client.json` `scenes` (and in `cases`/`offering` if it should be reachable from there).
6. `node tools/validate.mjs` → 0 errors.
7. `node tools/qa/layout.mjs --scenes=<id> --tabs --viewports=all` → TOTAL 0; `node tools/qa/sheets.mjs --scenes=<id> --tabs` and look at the result in both brands.
8. Update `CHANGELOG.md` (Unreleased).

## Replace / move / remove

- **Replace** a use case: keep the id the cards point to (or update the card's `go`), delete the old scene object, remove ids no longer used from client.json, update the card text/tag/image.
- **Move** to another section: change `sec` and the position in client.json; check notes that say "first of three…" etc.
- **Remove**: from client.json first; delete the object only if no other client uses it (`grep -r '"<id>"' clients/`).
