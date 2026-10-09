---
name: csc-architecture
description: How the CSC presentations repo works — build, bundling, encryption, the scene pipeline, brands, i18n, the core canvas and the deck runtime. Read before changing anything in core/, scripts/ or clients/.
---

# CSC presentations — architecture

## Layout of the repo

```
core/
  engine/engine.js, engine-fx.js   canvas "core": the Content Supply Chain constellation (phases, functions, jobs, agents)
  model/cards.js, content-*.js     data of the core: every node id ("make::job::page-copy", "act::fn::paid", "core", "ring"…) with EN/IT texts
  scenes/library.js                scenes of the CSC story (cover, csc, core, roads, adobe, cases, xchange, costa, …)
  scenes/library-trends.js         scenes of the Digital Experience Trends deck (intro, trends, clusters, products, cases)
  scenes/backup/*.js               backup scenes (window.SCENE_BACKUP): in the pool, shown only if switched on in the Regia
  shell/deck.js                    runtime: scene list, navigation, render switch for the built-in types, overlays, presenter, handout
  shell/scene-types.js             extra scene types as plug-ins: SCENE_TYPES.<type> = { render, mount, handout }
  shell/brands.js                  BRANDS (reply, comwrap), logos, pickBrand()
  shell/i18n.js                    UI strings T(key), SECTIONS, KEYS (shortcuts)
  shell/csc.css + scenes.css       styles (scenes.css loads last and wins)
  shell/index.template.html        page skeleton · login.template.html: password page
  assets/img|video                 shared assets
clients/<id>/
  client.json                      name, title, headline, defaultLang, publish, theme, brand?, scenes[] (order), overrides{}
  scenes.js                        client-only scenes (window.CLIENT_SCENES), e.g. embedded demos
  assets/img|video|html            client assets (looked up before core/assets)
scripts/build.mjs                  bundler + encryption · scripts/new-client.mjs: scaffold a client
tools/                             validate, catalog, qa/*, pptx/*, img/* (see the csc-qa and csc-pptx-import skills)
```

## Build

`node scripts/build.mjs <client> [--dev]` concatenates the scripts in this order: model (cards, content-*) → i18n → scene libraries → `core/scenes/backup/*.js` (by name) → client scenes.js → brands → engine → scene-types → deck, the CSS, and **inlines every `assets/(img|video|html)/<file>` path as a base64 data URI** (client folder first, then core). Result: one self-contained HTML file.
- `--dev` → `dist-dev/<id>/index.html`, **unencrypted, local only**.
- Without `--dev` → `dist/<id>/index.html`: AES-256-GCM, key from PBKDF2-SHA256 (600k iterations), login page from `login.template.html`. Password: `--password=` · env `CSC_PASSWORD_<ID>` · `SECRETS_JSON` (GitHub Actions, secret `PASSWORD_<ID>`).
- `dist/index.html` and `404.html` are a neutral Comwrap Reply landing (no client data).
- Size: everything is inlined, so the page weighs what its assets weigh ×1.33 (today ~16 MB). Keep images small (tools/img/optimize.mjs).
- CI: `.github/workflows/pages.yml` builds with the secrets and refuses to publish anything containing `window.CLIENT_CONFIG` in clear.

## Scene pipeline (deck.js `buildScenes`)

1. Pool = `SCENE_LIBRARY` (core) + `SCENE_BACKUP` (core/scenes/backup) + `CLIENT_SCENES` (client). Same id twice → the last one wins silently (validate flags it). `sceneSrc(id)` reads a pool scene (e.g. `close` reads `framework`).
2. Order = `client.json.scenes` minus `client.json.hidden`, plus the backup scenes switched on in the Regia (inserted at the end of their `sec`). The Regia state (`UI.regia = { hidden, backupOn }`, localStorage `csc-regia-<id>`) replaces the `hidden` default when present. Unknown ids are dropped with a console warning. Hidden/backup scenes are simply absent from `SCENES`.
3. `client.json.overrides[id]` replaces top-level keys; `d` and `core` are shallow-merged.
4. `fmt()` replaces tokens in every string: `{client}` (name), `{CLIENT}` (upper case), `{brand}` (brand label, e.g. "Comwrap Reply").
5. Rendering: `render(s)` in deck.js handles the built-in types with a `switch (s.type)`; otherwise `SCENE_TYPES[s.type].render(s, d)`. After insertion `mount(s, el, d)` wires behaviour. `handout(s, d)` returns lists of lines for the printable handout (key H).

Scene object: `{ id, sec, layout, type, core?, k, h, p?, d, n }` — see the csc-scene-authoring skill.

## Layouts and the core

`layout`: `cover` (full-bleed cover with the canvas), `full` (content only), `split` (content left, core canvas right), `core` (the canvas is the scene).
`core` block on a scene: `{ focus?: "intel"|"make"|"act"|"learn"|"core"|"ring", trail?, agents?, level?, spots: [{ id, l:[EN,IT] }] }`. Spot ids must exist in `core/model/content-*.js` (`node tools/catalog.mjs --spots`). Scenes in section `proof` (use cases) get the "Show in the core" button automatically when they have spots; `STATE.spotActive = i` highlights a spot from a scene's own interaction.

## Brands

`BRANDS.reply` (accent `#01EB51`, black) and `BRANDS.comwrap` (heart red `#F91351` on nocturnal `#212A35`), chosen on the login page, with `?brand=`, key B or the menu; remembered per client in session/local storage.
`setThemeVars()` writes CSS variables: `--green` (**the active accent, whatever the brand**), `--accent-rgb`, `--core`, `--intel|make|act|learn`, `--bg`, `--bg-rgb`, `--bg-2`, `--panel`, `--panel-rgb`, `--panel-2`, `--ink`, `--ink-2`, `--muted`, `--on-accent`. Canvas code reads `THEME.*` (engine.js merges the brand palette). `applyBrand()` rebuilds scenes and canvas. Logos: `brandLogo()`, `COMWRAP_LOCKUP()`, `REPLY_MAN` in brands.js only.

## Language

`STATE.lang` is "it" or "en"; `tr([en, it])` picks the text; `T(key)` reads UI strings from i18n.js (add both languages there for any new UI label); `L()` is 0/1. Switching language re-renders the scene.

## Runtime helpers available to scene types (from deck.js)

`head(s)` (kicker, title, lede, core button) · `r(extraStyle)` reveal-animation attribute — put it on each top-level block · `esc` · `tr` · `T` · `ul(items)` · `incore(target)` button · `showInCore(id)` · `setFocus(f)` · `goId(id)` (jump with "↩ back" support) · `later(fn, ms)` / `every(fn, ms)` (timers cleared automatically on scene change — never use raw setTimeout/setInterval for scene logic) · `countUp(el)` animates `[data-count]` (with `data-dec`) · `STATE`, `UI`, `SCENES`, `THEME`.

## Navigation details worth knowing

- Fast clicks on Next: every old `.scene` is removed or set to leave; a scene must not rely on global ids being unique for long (scope queries to `el`).
- Jumps (`goId`) push a return stack; the "↩ Torna a …" button appears (`body.has-ret` adds bottom padding).
- Keys: → Space ← C (core) G (overview) L N P H F B D (Regia) Esc. While the Regia is open, keys only close it (Esc/D).

## Known traps (each one cost a bug before)

- `@keyframes` names are global across csc.css and scenes.css: prefix new ones (a `grow` collision once flattened the maturity stairs).
- Flex column scenes: children must not shrink (`.scene > * { flex-shrink: 0 }` exists) — don't add fixed heights.
- Grids with long words or chips: use `minmax(0, 1fr)` and let chips wrap, or phones get horizontal scroll.
- Some global rules add margins to `span`/`svg` inside cards: set explicit sizes/margins on new inline icons.
- Embedded HTML apps (`embed` type) load via `iframe.srcdoc` after the scene has risen (they block the main thread while booting).
- Don't put two `style=` attributes on one element: use `r("extra:css")`.
