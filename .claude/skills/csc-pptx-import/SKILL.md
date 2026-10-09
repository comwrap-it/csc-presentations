---
name: csc-pptx-import
description: Pipeline to bring slides from a PowerPoint (or PDF/brief) into the interactive presentation — list, extract text/notes/images, see the slide, map to a scene type, write EN/IT, optimise images, place and verify. Use when the user points at a .pptx and slide numbers.
---

# Importing slides

## 1. Find the slides

```
node tools/pptx/extract.mjs "<deck.pptx>" --list
```
One line per slide with its title. Decks are big (100–250 MB) but the tool only reads what it needs. The user may give slide numbers ("12, 13 e 14") — trust the numbers, confirm with the titles.

## 2. Extract

```
node tools/pptx/extract.mjs "<deck.pptx>" --slides=12-14
```
Writes `qa-out/pptx/<deck>/slide-<n>.md` and the slide images. The markdown lists each shape in reading order with position/size (cm), tables as rows, **SmartArt text in order** (process diagrams), and speaker notes.
Warnings:
- Speaker notes are often copy-pasted from other slides: use them only if they match the slide.
- SVG icons (people, arrows) are decoration; position tells you which step they belong to.

## 3. See it

Text is not enough for diagrams, before/after flows or layouts:
```
node tools/pptx/render.mjs "<deck.pptx>"      # PDF via LibreOffice (cached) → Read pages "12-14"
```
No LibreOffice → ask the user for a PDF export of those slides. Look before you design.

## 4. Map to a scene

Read csc-scene-authoring. Typical mappings:

| Slide pattern | Scene |
|---|---|
| Title slide "Client · approach" | No scene: becomes the kicker `Caso d'uso · Client · approach` |
| Need / Solution / Results text | `case` tabs (or the existing case of that client) |
| Process A → B, manual vs automated, with icons for who does what | `case` with `flow`, or an interactive before/after (see the Costa scene) |
| Product page with screenshots | `product` or `shots` |
| Big KPI ("-70%") | count-up numbers inside the scene (or `bigstat`) |
| Several capability boxes | `tabcards` |
| One source to many channels | `hubchan` |

When the slide **updates an existing scene** (same client/case), edit that scene rather than adding a new one; keep what the slide does not contradict as secondary content and say so.

## 5. Write

- Both languages; the deck is usually EN: translate to natural Italian (csc-brand-and-copy).
- Keep the client's own terms (e.g. "Shorex", "TOG") and explain them once if needed.
- Numbers exactly as in the slide, with their unit and scope ("from 30–45 min to ≤10 min per piece of content").
- Anonymised decks stay anonymised; named clients that are confidential → `tools/policy.json`.
- Notes `n`: source deck + slide numbers, what to click, the message.

## 6. Images

Use the extracted files, or crop from the rendered page. Optimise every image:
```
node tools/img/optimize.mjs qa-out/pptx/<deck>/slide-13_image62.png --out=core/assets/img/<client>-<topic>.webp
```
Logos of third parties only when they are the subject. No EMF/WMF (render instead).

## 7. Verify

`node tools/validate.mjs` · `node tools/qa/layout.mjs --scenes=<ids> --tabs` · `node tools/qa/sheets.mjs --scenes=<ids> --tabs` and look at the sheet, both brands (`--brand=reply`).
Report to the user: which slides became which scenes, what was kept from the old content, what was left out and why.
