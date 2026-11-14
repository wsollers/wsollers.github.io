# wsollers.dev — central GitHub Pages site

The user Pages repository for **https://wsollers.dev/**. Source is kept in this repository; GitHub Actions assembles and deploys a static artifact on every relevant push to `main`, on manual dispatch, or on the daily artifact refresh.

## Published paths

| Public URL | Content |
|---|---|
| `/` | Home, selected projects, public GitHub activity |
| `/AdventuresInMath/` | Mathematics landing page, ordered-field PDF |
| `/AdventuresInMath/flashcards/` | Interactive mathematics flashcards and public JSON deck |
| `/appsec-review/` | AppSec landing page, public review-process graphic |
| `/explorer/` | Knowledge Explorer introduction and launch link |

The interactive Knowledge Explorer remains independently built in [lra-knowledge-explorer](https://github.com/wsollers/lra-knowledge-explorer). Its generated knowledge data are not copied into the central site.

## Reusable design system

- `assets/css/site.css`: shared dark/light design tokens, navigation, layout, cards, badges, buttons, responsive and accessibility rules.
- `assets/js/site.js`: theme toggle and progressive enhancements.
- `assets/js/github-activity.js`: public GitHub Events API feed. No access token, private events, or review history is collected.
- `index.html`, `AdventuresInMath/index.html`, `appsec-review/index.html`, `explorer/index.html`: pages using those shared assets.

The existing `.gitignore` was created from GitHub's Pages template. It is safe with this setup, and `_site/` should remain ignored because it is a generated deployment artifact.

## Deployment

`.github/workflows/deploy-pages.yml` runs on pushes to `main`, or can be dispatched manually from **Actions → Publish wsollers.dev**. It checks out the public mathematics and AppSec repositories, then copies **only** these public artifacts into the published tree:

- `AdventuresInMathematics/output/pdf/ordered_field_reference.pdf` → `/AdventuresInMath/ordered_field_reference.pdf`
- `AdventuresInMathematics/flashcards/web` (selected five runtime files) → `/AdventuresInMath/flashcards/`
- `AdventuresInMathematics/flashcards/content/ordered-fields` (selected JSON files only) → `/AdventuresInMath/flashcards/decks/ordered-fields/`
- `appsec-review/review-process.html` → `/appsec-review/review-process.html`

It does **not** publish those repositories wholesale. In particular, AppSec run outputs, targets, evidence, tools, and container configuration remain outside this site.

To confirm the deployment, inspect [GitHub Actions runs](https://github.com/wsollers/wsollers.github.io/actions/workflows/deploy-pages.yml).

## Domain handoff

The `CNAME` here owns `wsollers.dev`. The previous root `CNAME` was removed from `wsollers/AdventuresInMathematics` after the central site was committed.

In GitHub's web interface, confirm:

1. [Mathematics Pages settings](https://github.com/wsollers/AdventuresInMathematics/settings/pages): no custom domain is still assigned.
2. [Central site Pages settings](https://github.com/wsollers/wsollers.github.io/settings/pages): source is **GitHub Actions**; custom domain is `wsollers.dev`; **Enforce HTTPS** enabled when available.
3. GoDaddy DNS: four GitHub Pages A records for `@`, and `www` CNAME → `wsollers.github.io`.

No DNS or repository configuration is required for individual URL paths.

## Local development

Serve from the repository root with `python3 -m http.server 8080` and open `http://localhost:8080/`. The PDF and AppSec process artifact are copied during Actions deployment; they will not exist locally unless placed in their published paths.

## Future additions

Add project-specific landing pages and public artifacts to the central site allowlist rather than exposing entire repositories. Keep personal flashcard review state, secrets, and internal security evidence outside the public site. See `EXPLORER_RESKIN_PLAN.md` for the future Explorer visual integration.
