# wsollers.dev — Design system

## Principles

Simple, readable, and understated. Content takes priority over decoration. Avoid slogan-driven headlines, glowing gradients, marketing badges, elaborate diagrams, and performance claims.

## Reusable files

- `assets/css/site.css`: tokens, containers, header/navigation, typography, project cards, activity list, responsive layout, light/dark themes.
- `assets/js/site.js`: light/dark toggle and year.
- `assets/js/github-activity.js`: public GitHub activity feed (unchanged).
- `index.html`: homepage.
- `AdventuresInMath/index.html`, `appsec-review/index.html`, `explorer/index.html`: project pages.

## Content conventions

- One ordinary page title, one short introductory paragraph.
- Project descriptions say what exists without aspirational or self-promotional claims.
- Use simple action links, not multiple competing calls to action.
- Project pages use the same `project-card` component for links and resources.
- The Explorer remains independently deployed. The central site links to it, rather than copying its generated dataset.

## Visual tokens

The color tokens `--bg`, `--surface`, `--text`, `--muted`, `--line`, and `--accent` are defined for both themes in `assets/css/site.css`. Default is light. Typography uses system fonts, no third-party dependency.

## Accessibility

Semantic headings, skip link, keyboard focus outlines, responsive one-column mobile layout, and motion reduction. GitHub activity is optional enhancement, with a fallback link.

The generated GitHub Pages workflow is unchanged. Only central website source files are modified by the visual refresh.
