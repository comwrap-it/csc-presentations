---
name: csc-qa
description: The QA toolkit of the CSC presentations — static validation, layout regression across viewports/languages/brands/tabs, brand-leak detection, encrypted login test, contact sheets — and how to read and act on the results. Use before declaring any change done.
---

# QA

Setup once: `npm install && npx playwright install chromium`. Every browser tool builds the dev preview first (`--no-build` to skip). Output files go to `qa-out/` (git-ignored).

## Tools

| Command | Time | Checks |
|---|---|---|
| `node tools/validate.mjs` | 1 s | client.json ↔ scenes, unique ids, types, sections, EN/IT pairs, core spot ids, assets exist, cases cards, `tools/policy.json` terms |
| `node tools/qa/layout.mjs [--scenes=a,b] [--tabs] [--viewports=all\|quick\|WxH,…] [--langs] [--brands] [--shots]` | 1–10 min | OVERLAP, OUT-X, UNDER-BRAND/TOOLS/NAV, SCROLL-X, JS errors — per scene, and per tab with `--tabs` |
| `node tools/qa/brand-leak.mjs --brand=comwrap [--tabs]` | 1–3 min | other brand's accent in UI (ERROR) or images (WARN); overview and menu too |
| `CSC_TEST_PASSWORD=… node tools/qa/login.mjs` (PowerShell: `$env:CSC_TEST_PASSWORD="…"; node tools/qa/login.mjs`) | 30 s | encrypted page: wrong password, brand picker, remember-me, deep link, key B, lock, JS errors |
| `node tools/qa/sheets.mjs [--scenes] [--tabs] [--brand] [--lang] [--viewport]` | 1 min | contact sheets PNG (12 tiles each) to LOOK at |
| `npm run qa:quick` | ~3–5 min | validate + layout on 3 viewports |
| `npm run qa` | ~30 min | validate + layout all viewports with tabs + brand leak with tabs |

Viewports "all": 1920×1080, 1440×900, 1366×768, 1280×720, 1024×768, 768×1024, 390×844.

## Reading results

- **OVERLAP "a" × "b"**: two texts on top of each other. Usual causes: a grid track too narrow (use `minmax(0,1fr)` + wrap), absolute positioning, a block that shrank in the flex column, a fixed height.
- **OUT-X / SCROLL-X**: something wider than the viewport, typically a non-wrapping chip, a `1fr` grid holding a long word, an image without `max-width:100%`. Find it: elements whose `getBoundingClientRect().right > innerWidth`.
- **UNDER-BRAND / UNDER-TOOLS**: text under the top bar at scroll 0 → the scene starts too high (check the scene's top padding/margins). If it only appears after scrolling, it is normal (the bar has a scrim) — the probe resets scroll to 0 first.
- **UNDER-NAV**: last content hidden by the bottom navigation when scrolled to the end → missing bottom padding (`body.has-ret` adds more when the return button shows).
- **JS**: any page error is a failure.
- Brand **ERROR** = a hard-coded colour in CSS/JS; replace with `var(--green)`/`rgba(var(--accent-rgb),…)`/`THEME.*`. Image **WARN**: open the image; only a logo or brand graphic is a real leak.
- The probe cannot judge beauty: always look at a contact sheet for changed scenes (Read the PNG), in both brands and on a phone viewport (`--viewport=390x844`).

## Definition of done for a change

1. validate: 0 errors (warnings understood).
2. layout on the changed scenes with `--tabs --viewports=all`: TOTAL 0.
3. brand-leak `--brand=comwrap` on the changed scenes: 0 errors.
4. Contact sheet looked at (desktop + phone).
5. Before a release: full `npm run qa` + `qa:login`.

Report results as numbers ("layout: 0 issues on 7 viewports × 2 languages × 2 brands, tabs included"), list anything skipped.
