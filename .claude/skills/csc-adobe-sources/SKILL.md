---
name: csc-adobe-sources
description: Where to verify Adobe product facts (official sources only), how to cite them in scenes, and the log of product renames and announcements used in the deck. Use before writing or approving any claim about an Adobe product.
---

# Adobe facts: sources and rename log

## Source hierarchy (use the highest available)

1. **Experience League** — experienceleague.adobe.com (product docs, release notes, "what's new")
2. **Adobe Help Center** — helpx.adobe.com (feature pages, FAQs)
3. **Adobe Developer** — developer.adobe.com (APIs: Firefly Services, Workflow Builder API, AEM)
4. **Adobe newsroom** — news.adobe.com (announcements, availability dates) and **business.adobe.com** (product pages)
5. Adobe blog (blog.adobe.com) — context only, never the only source for a feature claim
Never: third-party blogs, partner marketing, AI summaries, memory. If only the newsroom says it, write it as an announcement ("annunciato ad Adobe Summit 2026"), not as available.

## How to research

- Search with the exact product name + "site:experienceleague.adobe.com" / "site:helpx.adobe.com"; open the page and read it; record title, URL, date accessed.
- Separate: **GA** (generally available) · **beta / early access** · **announced** ("in the coming months"). Say which in the scene.
- Numbers (customers, % improvements) only with their source and scope.
- Prefer Adobe's own wording for capability names; paraphrase descriptions.

## How to cite in a scene

In the notes `n`: `Fonte: <page title> (<domain>), consultata <date>.` For announced features add `verifica la disponibilità prima di promettere date`.
If a screenshot shows an old UI or name, say so in the notes ("gli screenshot mostrano l'interfaccia LLM Optimizer").
Return to the user a **Sources** list with links.

## Rename and announcement log (keep updated, newest first)

| Date seen | Old / new | Status in the deck | Source |
|---|---|---|---|
| 2026-10 | LLM Optimizer → **Adobe Brand Visibility** ("LLM Optimizer has evolved into Adobe Brand Visibility") | Renamed in scenes `llmo` and offering; screenshots still old UI | Experience League, Brand Visibility what's new |
| 2026-04-20 | **Adobe CX Enterprise Coworker** announced at Adobe Summit 2026 (agentic layer on AEP apps; MCP/A2A; GA "in the coming months") | Scene `coworker`, timeline 2026 | Adobe newsroom press release |
| 2026 | **Firefly Creative Production for Enterprise — Workflow Builder** (build/integrate/deploy/run; templates, guided experiences, API; batch with per-asset results) | Scene `fireflywb` | Experience League, Help Center, Adobe Developer |
| 2026 | Adobe award: 2026 Adobe CXO Emerging Partner of the Year — Western Europe (Comwrap Reply) | Scene `adobecc` | Partnership slide from the team |

Add a row for every rename or new product you put in the deck, and update `tools/policy.json` when an old name must no longer appear alone.
