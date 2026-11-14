# wsollers.dev — central GitHub Pages website

A clean, reusable design system for the public mathematics, formal methods, and application security portfolio at **https://wsollers.dev**.

## What is included

- Responsive, accessible home, Mathematics, AppSec Review, Knowledge Explorer entry, and 404 pages.
- One shared component/theme stylesheet: `assets/css/site.css`. Includes design tokens and reusable navigation, card, button, tag, grid, and profile patterns.
- A persistent light/dark theme toggle (`assets/js/site.js`).
- A GitHub profile card with the **public** GitHub Events API (`assets/js/github-activity.js`). It makes no private-account requests and degrades to a simple profile link if rate limited or unavailable.
- An allowlisted GitHub Actions Pages deployment workflow that pulls **only two public files** from the project repositories: `output/pdf/ordered_field_reference.pdf` and `review-process.html`. It does **not** publish the AppSec codebase, data, run outputs, evidence, or targets.
- `CNAME` for the domain `wsollers.dev`.

## First-time setup

**The connected GitHub tool cannot create a repository or change Pages administration settings.** Create a new public **user Pages** repository, named **`wsollers.github.io`**, with `main` as its default branch. Upload the contents of this package to the *root* of that repository, including the hidden `.github/` folder.

1. In the existing `wsollers/AdventuresInMathematics` repository, open **Settings → Pages** and **remove** the custom domain `wsollers.dev`. Its existing root `CNAME` file should also be removed or the project’s Pages publishing should be disabled so it does not compete to claim the domain.
2. In the new `wsollers/wsollers.github.io` repository, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. In **Settings → Pages → Custom domain**, enter `wsollers.dev`, save, verify DNS, and enable **Enforce HTTPS** when available.
4. Your existing GoDaddy A records should remain pointed at GitHub’s four IPv4 addresses. Keep `www` as a CNAME to `wsollers.github.io`.
5. Run **Actions → Publish wsollers.dev → Run workflow** (or push to `main`). The deploy workflow builds `_site/` and publishes it.

### Routes

| Route | Content |
|---|---|
| `/` | Central homepage and public GitHub activity |
| `/AdventuresInMath/` | Mathematics project page; ordered-field PDF copied from its source repository |
| `/appsec-review/` | Application-security project page; public process overview copied from its source repository |
| `/explorer/` | Branded entry point linking to the existing deployed Knowledge Explorer |

### Why the Knowledge Explorer stays separate initially

`wsollers/lra-knowledge-explorer` includes a complex three-pane app and a substantial generated data pipeline. The central page promotes it without copying its large data assets or interfering with its independent rebuild process. Reskin the Explorer **in its own repo** after a visual/interaction audit. Its existing Pages project site is linked directly and remains the authority.

### Development

Open with a local static HTTP server from this directory (absolute `/assets/…` references require the server root to be the site root):

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/`. The two copied public artifacts are populated by Actions; for a complete local preview, manually place `ordered_field_reference.pdf` and `review-process.html` at their published paths.

### Future updates

This repository owns the shared design system, navigation, and presentation pages. The mathematics, AppSec, and Explorer source repositories continue to own their respective content and tools. Publish only sanitized, intentional public artifacts from project repositories. No client-side GitHub access token or personal review/progress data belongs in this repository.
