# CSC Presentations · Reply

Interactive **Content Supply Chain** presentations built around the Human–AI marketing operating model (*the core*).
One shared core, one package per client, one password-protected link per client.

| Client | Link (after publishing) | Password secret |
|---|---|---|
| Lavazza | `https://<pages-url>/lavazza/` | `PASSWORD_LAVAZZA` |

> **Confidential.** This repository contains client material and confidential case studies. Keep it **private**. Only the encrypted pages are published.

---

## How it works

```
core/                 shared by every client
  engine/             constellation (canvas) + effects
  model/              the operating model: 4 phases, 27 functions, 81 jobs (EN/IT cards)
  scenes/library.js   Content Supply Chain scenes (EN/IT)
  scenes/library-trends.js  Digital Experience Trends 2026 scenes: intro, method, growth matrix, 3 clusters (EN/IT)
  shell/              presentation UI (deck.js), extra scene types (scene-types.js), styles (csc.css, scenes.css),
                      page template, login page template
  assets/             shared images and videos (Reply cases, Firefly demos, …)
clients/
  _template/          starting point for a new client
  lavazza/            client.json (+ optional scenes.js, theme.css, assets/)
scripts/
  build.mjs           builds one self-contained HTML per client and encrypts it
  new-client.mjs      creates a new client from the template
ci/github-workflows/  copy of the workflows + optional public-site workflow (.example)
.github/workflows/pages.yml  on every push to main: build, encrypt, publish to GitHub Pages
```

* **Build**: every presentation becomes **one single HTML file**. CSS, JS, images and videos are all inlined.
* **Protection**: the file is encrypted with **AES-256-GCM**. The key is derived from the password with PBKDF2-SHA256 at 600,000 iterations. What is published is only a login page carrying the encrypted content, so without the password nothing can be read, not even the images.
* **Login page**: it is bilingual and offers a *Remember on this device* option. Inside the presentation, **⋯ → Lock** forgets the password on that device.
* **No dependencies**: only Node 18+. Nothing to install (`npm install` is not needed).

---

## Preview locally (not encrypted)

```bash
node scripts/build.mjs lavazza --dev        # → dist-dev/lavazza/index.html (double-click to open)
node scripts/build.mjs --all --dev          # every client
```
`dist-dev/` is git-ignored: **never share or upload it**, it is not encrypted.

To test the encrypted version locally:
```bash
node scripts/build.mjs lavazza --password='a-long-test-password'   # → dist/lavazza/index.html
```

---

## Publish on GitHub (first time)

The workflow is in `.github/workflows/pages.yml` (a copy and the optional `publish-public-repo.yml.example` are in `ci/github-workflows`).

1. **Create the repository** `comwrap-it/csc-presentations` as **Private** (no README, no .gitignore).
2. **Push** this folder:
   ```bash
   git remote add origin https://github.com/comwrap-it/csc-presentations.git
   git push -u origin main
   ```
3. **Passwords**: go to Settings → Secrets and variables → Actions → *New repository secret* and add `PASSWORD_LAVAZZA` with a strong password of at least 12 characters.
4. **Pages**: go to Settings → Pages → *Build and deployment* → Source: **GitHub Actions**.
5. **Run it**: Actions → *Build and publish (GitHub Pages)* → *Run workflow*, or push any change. The link appears in Settings → Pages: `https://<pages-url>/lavazza/`.

**If step 4 is not available:** GitHub Pages from a *private* repository needs the organization to be on GitHub Team or Enterprise (on the Free plan the repository must be public — but then the source, including the confidential cases, is readable without password). In that case use the **public site repository** option:
* create `comwrap-it/csc-presentations-site` (public; it will only ever contain encrypted files);
* follow the instructions in `publish-public-repo.yml.example` (in the workflows folder).

> On a GitHub Pages site the *link* is public; the *content* is protected by the password. Share the password through a different channel from the link (e.g. link by e-mail, password by Teams).

---

## Brands (Reply / Comwrap Reply)

The same presentation exists in two looks, defined in `core/shell/brands.js`:

| Brand | Accent | Background | Logo |
|---|---|---|---|
| `reply` | Reply green `#01EB51` | black | Reply running man |
| `comwrap` | Comwrap heart red `#F91351` | nocturnal blue | Reply · Comwrap lockup |

* The viewer chooses the version on the **login page**, under the password. The choice is kept for the session (and on the device with *Remember on this device*).
* In the presentation: **⋯ → Switch brand** or the **B** key; or open the link with `?brand=comwrap`.
* Per client in `client.json`: `"brand": "comwrap"` sets the default, `"brands": ["reply"]` shows only one version (no selector).
* `{brand}` in any text is replaced with the brand name (e.g. "Comwrap Reply per Lavazza").

## Add a client

```bash
node scripts/new-client.mjs acme "ACME S.p.A."
```
Then:
1. Edit `clients/acme/client.json`:
   * `scenes`: which scenes to show, in which order (ids from `core/scenes/library.js` and from the client's own `scenes.js`);
   * `overrides`: change any field of a scene for this client, e.g. `"cover": { "k": ["…EN…", "…IT…"] }`;
   * `theme`: optional colours `accent`, `intel`, `make`, `act`, `learn`;
   * `ui`: optional overrides of interface strings;
   * `defaultLang`: `it` or `en`; `publish`: `false` keeps it out of the online build.
   * `headline`: optional title shown on the login page.
2. Optional:
   * `clients/acme/scenes.js` for client-specific scenes (there is an example in the template);
   * `clients/acme/assets/img/…` for client images; a file with the same name as a shared one replaces it for this client only;
   * `clients/acme/theme.css` for extra CSS.
3. Preview: `node scripts/build.mjs acme --dev`
4. Add the secret `PASSWORD_ACME` and push. The link will be `https://<pages-url>/acme/`.

`{client}` and `{CLIENT}` in any text are replaced with the client name.

---

## Edit the content

| What | Where |
|---|---|
| Scene texts, speaker notes, links to the core | `core/scenes/library.js`, `core/scenes/library-trends.js` (shared) · `clients/<id>/client.json → overrides` (one client) |
| Growth matrix data and the 3 trend clusters | `core/scenes/library-trends.js` → `TREND_MATRIX`, `TREND_CLUSTERS` |
| Reusable scene types (trend deep dive, product, case, timeline, pillars, `agentloop` (Sense→Decide→Act→Learn, e.g. Adobe Coworker), `wfcanvas` (animated workflow canvas, e.g. Firefly Workflow Builder), `tabcards` (tabbed capability cards, e.g. AEM Guides), `hubchan` (hub + channels, e.g. Škoda CX), `versus` (side-by-side comparison, e.g. Reply GEO Compass vs Adobe Brand Visibility)…) | `core/shell/scene-types.js` + `core/shell/scenes.css` |
| Client-only scenes (e.g. the Reply GEO Compass live demo for Lavazza) | `clients/<id>/scenes.js` + `clients/<id>/assets/html/` (embedded HTML apps, type `embed`) |
| Interface strings (EN/IT) | `core/shell/i18n.js` |
| Operating-model cards (functions, jobs, *AI in action*) | `core/model/cards.js`, `core/model/content-*.js` |
| Layout and styles | `core/shell/csc.css`, `core/shell/index.template.html` |
| Login page | `core/shell/login.template.html` |

---

## Using the presentation

| Key | Action |
|---|---|
| → / Space · ← | Next / previous scene |
| C | Open / close the core (always available) |
| G | Overview of all scenes |
| L | Language EN / IT |
| N · P | Speaker notes · presenter window with timer |
| H | Printable handout (save as PDF) |
| F | Full screen |
| B | Brand: Reply ⇄ Comwrap Reply |

Useful URL options: `?lang=it|en`, `?brand=reply|comwrap`, `#<scene-id>` (e.g. `#xchange`), `?lite=1` for slow machines.

**Jumps and return:** shortcuts (offering accelerators, cluster hub, use-case cards…) show a *Back to …* button bottom-left to return where you were.

**Use cases in the core:** every use case has a *Show in the core* button (or press C on it): the core lights up all the points the case touches, with a list on the right — hover to highlight, click to open the card.

---

## Security notes

* Use a different password for each client, and change it if it leaks. To change it, update the secret and re-run the workflow; old links keep working with the new password only.
* The encryption protects the content; it does not track who opened the link. If you later need per-person access and revocation, put the same `dist/` behind an identity-aware proxy (e.g. Cloudflare Access) without changing the code.
* The confidential cases (banking group, gaming customer under NDA) and the Firefly demo videos are included. They are protected by the password, but check before sharing any link outside Reply.
