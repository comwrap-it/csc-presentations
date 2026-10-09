# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# CSC Presentations — instructions for Claude

Interactive, bilingual (EN/IT) client presentations on the Content Supply Chain, by Comwrap Reply.
Shared core in `core/`, one package per client in `clients/<id>/`, encrypted build published on GitHub Pages.
Talk to the team in **Italian**; code, comments and file names stay in English.

## Specialised agents (`.claude/agents/`)

Delegate to the right agent; for a multi-step request use the `/presentazione` skill, which plans and routes the work.

| Agent | Use it for |
|---|---|
| `csc-slide-importer` | Bringing slides from a PowerPoint (or PDF, web page, brief) into scenes: extract, choose the scene type, write EN/IT, place it in `client.json` |
| `csc-adobe-researcher` | Checking Adobe product names, features, availability and numbers on official sources; renames; source notes |
| `csc-scene-engineer` | New scene types, interactions, renderer/CSS changes, bugs in `core/shell` and `core/engine` |
| `csc-copy-guardian` | Review of copy and compliance: EN/IT parity, tone, terminology, brand names, confidential clients |
| `csc-qa` | Layout, brand, login and visual regression across viewports, languages, brands and tabs |
| `csc-release` | Git (pull, merge, conflicts), commit, changelog/README, encrypted build check, pre-push gate |

## Skills (`.claude/skills/`)

`csc-architecture` (how the code works) · `csc-scene-authoring` (scene schema and the type catalogue) ·
`csc-pptx-import` (extraction pipeline) · `csc-brand-and-copy` (brands, style guide, terminology, confidentiality) ·
`csc-adobe-sources` (official sources and the rename log) · `csc-qa` (tools and how to read them) ·
`csc-release` (git, build, publishing rules) · `presentazione` (the orchestrator).

## Golden rules

1. Every visible text is an `[EN, IT]` pair; both filled; Italian is the default language.
2. Never hard-code brand colours: use the CSS variables (`--green` = the active brand accent) and `THEME` in canvas code.
3. Never publish or commit `dist/` or `dist-dev/` (unencrypted). Passwords only in GitHub secrets (`PASSWORD_<CLIENT>`); never write one into a file.
4. Confidential clients stay anonymous (names to block in the git-ignored `tools/policy.local.json`) until the team says otherwise.
5. Facts about Adobe products come from official Adobe sources, cited in the scene notes (`n`).
6. Before saying "done": `npm run validate` and `npm run qa:quick` must be clean (full `npm run qa` before a release).
7. Never push, force-push or rewrite history without an explicit OK from the user.

## Commands

```
npm install && npx playwright install chromium   # once, for the QA tools (the build itself needs only Node 18+)
node scripts/build.mjs lavazza --dev             # unencrypted preview → dist-dev/lavazza/index.html (local only)
node scripts/build.mjs lavazza --password='…'    # encrypted build → dist/ (test password only, never a real one)
node scripts/new-client.mjs acme "ACME S.p.A."   # scaffold a client from clients/_template
node tools/catalog.mjs                            # scenes in order · --types · --type=case · --scene=id · --spots
node tools/validate.mjs                           # static checks (seconds)
npm run qa:quick | npm run qa                     # browser checks (minutes)
node tools/qa/layout.mjs --scenes=costa --viewports=quick --tabs   # one scene only; --no-build reuses dist-dev
node tools/qa/sheets.mjs --scenes=costa          # contact sheet to look at
```
QA output goes to `qa-out/` (git-ignored).

## Architecture in brief (details: `csc-architecture` skill)

- **No framework, no bundler dependency.** `scripts/build.mjs` concatenates plain scripts in a fixed order
  (model → i18n → scene libraries → client `scenes.js` → brands → engine → scene-types → deck), inlines the CSS and
  every `assets/(img|video|html)/<file>` as base64 (client folder first, then `core/assets`) into **one HTML file**,
  then encrypts it (AES-256-GCM, PBKDF2) behind `core/shell/login.template.html`. Asset weight matters: optimise with
  `tools/img/optimize.mjs`.
- **Scene pipeline** (`buildScenes` in `core/shell/deck.js`): pool = `SCENE_LIBRARY` (`core/scenes/*.js`) +
  `CLIENT_SCENES` → ordered and filtered by `client.json.scenes` → `client.json.overrides[id]` applied → tokens
  `{client}` `{CLIENT}` `{brand}` replaced. Built-in types render in deck.js's `switch`; plug-in types live in
  `core/shell/scene-types.js` as `SCENE_TYPES.<type> = { render, mount, handout }`, styled in `scenes.css`.
- **The core** is the canvas constellation (`core/engine/`) driven by node ids from `core/model/content-*.js`
  (e.g. `make::job::page-copy`); scenes point at it through `core.spots`, which must match those ids.
- **Brands** (`reply`, `comwrap`) are defined only in `core/shell/brands.js`; switching brand rewrites the CSS
  variables and rebuilds scenes and canvas — hence golden rule 2.
- In scene code use the deck helpers `later()` / `every()` instead of raw timers, and scope DOM queries to the scene
  element: scenes overlap during transitions. Prefix new `@keyframes` names (they are global across both CSS files).
