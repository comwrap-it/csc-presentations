# Backup scenes

Scenes kept aside: complete and valid, but **not shown** unless the presenter switches them on in the
**Regia** (key `D`, ⋯ menu, or `?regia` in the URL). Use this folder for slides we may still want in a meeting
(e.g. the old "why" story, data governance) without keeping them in the main flow.

## File format

One or more `*.js` files; each one appends to `window.SCENE_BACKUP`:

```js
/* Backup: <what these scenes are> */
window.SCENE_BACKUP = (window.SCENE_BACKUP || []).concat([
  { id: "my-scene", sec: "why", layout: "full", type: "case", k: [EN, IT], h: [EN, IT], d: { … }, n: [EN, IT] }
]);
```

- Same scene object as in `core/scenes/library.js` (see the `csc-scene-authoring` skill); ids must be unique
  across the libraries, the backup files and the client scenes (`node tools/validate.mjs` checks it).
- The build loads every `core/scenes/backup/*.js`, sorted by file name, **after** the scene libraries and
  **before** the client `scenes.js`; the tools (`tools/lib.mjs`) do the same.
- Backup scenes are part of the scene pool, so their ids stay valid for lookups (e.g. the `close` scene reads
  the `framework` steps from the pool) and for `client.json` `overrides`.

## How a backup scene is shown

- **Regia** → group "Slide di backup" → switch it on → **Applica**: it is inserted at the end of its section
  (`sec`), or at the end of the deck if that section is not in the presentation. The choice is saved in this
  browser only.
- To make it permanent for a client, use **Esporta configurazione** (or **Salva nel progetto** with
  `npm run dashboard`): the id is added to `client.json` `scenes`. A backup id listed in `scenes` is treated as
  a normal scene ("restored"); `validate` prints a WARN to make that visible.
