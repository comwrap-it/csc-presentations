---
name: csc-release
description: Git workflow, merge-conflict policy, commit/changelog conventions and publishing rules (GitHub Pages, encryption, secrets) for the CSC presentations repo. Use for pull, merge, commit, release checks and anything touching .github or the build output.
---

# Release and git

## Repository

`github.com/comwrap-it/csc-presentations`, branch `main`. Every push to `main` triggers `.github/workflows/pages.yml`: build with `SECRETS_JSON` (`PASSWORD_<CLIENT>`), safety check (no `window.CLIENT_CONFIG` in clear), deploy to Pages (`https://comwrap-it.github.io/csc-presentations/<client>/`). Others work on feature branches and open PRs.

## Never

- commit `dist/`, `dist-dev/`, `qa-out/`, `node_modules/` (all in .gitignore — check `git status` anyway);
- write a password into any file, command history in docs, or commit message; test passwords only in env vars;
- `git push --force`, `git reset --hard` on shared history, or push at all without the user's explicit OK;
- edit `.github/workflows` without the user's OK (it publishes).

## Pull and merge

1. `git status` must be clean (commit or stash the user's work first — ask which).
2. `git fetch origin` · `git log --oneline --graph --all -15` to see what came in.
3. `git pull --no-rebase origin main` (a merge commit keeps both histories readable; the team does not rebase shared work).
4. Conflicts — resolve by meaning, not by side:
   - `client.json` `scenes`: keep **every** scene id from both sides, in the order that respects both edits; then `validate`.
   - scene arrays in `library*.js`: keep both scene objects; if the same scene was edited on both sides, merge field by field and keep both intents; never duplicate an id.
   - CSS: keep both rules; if they target the same selector, the later file/rule wins — make the intended one explicit.
   - generated/large assets: take the newer file deliberately, never a mix.
   - After resolving: no `<<<<<<<`/`>>>>>>>` left (`git diff --check`), `node tools/validate.mjs`, `npm run qa:quick`, then commit the merge.
5. Tell the user what came in (commits, authors, scenes added) and how conflicts were resolved.

## Commit

- Small, meaningful commits; message in Italian, imperative/summary style like the history: `Costa da deck EPTA, Škoda caso DAM, landing Comwrap`.
- Update `CHANGELOG.md` → "Unreleased" (what changed for the audience, not the code).
- README when commands, tools, types or structure change.

## Pre-push gate (all must pass)

1. `node tools/validate.mjs` → 0 errors
2. `npm run qa` (or at least `qa:quick` + layout `--tabs` on changed scenes) → 0
3. `CSC_TEST_PASSWORD=<any> node tools/qa/login.mjs` → all pass (local encrypted build, then delete nothing: dist/ is ignored)
4. `git status` clean except intended files; no secrets (`git diff --cached | grep -i -E "password|secret|token"` reviewed)
5. User OK to push → `git push origin main`; then watch the Actions run and open the Pages URL.

## Repo visibility

The repo is public "as a test" (sources readable; only the built page is encrypted). Keep confidential names out of sources (see csc-brand-and-copy). Before adding a new client, remind the team of this.
