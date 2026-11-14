# Knowledge Explorer — visual integration plan

The live app at `wsollers/lra-knowledge-explorer` already runs independently under GitHub Pages. Its `knowledge-explorer.html` contains a substantial three-pane UI with custom interactive graph nodes, proof/verification panels, inspectors, KaTeX, and generated JSON data. Treat the data pipeline and interaction model as critical, not visual assets to copy blindly.

## Phased rollout

1. **Now:** feature `/explorer/` on the central website, linking to the deployed standalone app. Keep its primary publication URL functional.
2. **Next:** extract the Explorer's existing inline style rules into `assets/css/explorer.css` *within its own repository*. Add token aliases referencing the central design system. Preserve node-type semantic colors (axiom/definition/theorem/proof status) and contrast.
3. **Then:** restyle navigation, sidebar, filter controls, graph panels, cards, detail tabs, modal layers, and loading/empty states, without changing graph/data behavior. Keep visible proof/verification status distinctions.
4. **Finally:** run responsive, keyboard-navigation, proof-rendering, and source-link regression checks. If desirable, deploy the Explorer under `/lra-knowledge-explorer/` as its existing project site and retain `/explorer/` as a stable branded entry point.

## Non-goals

No copying the 20 MB+ knowledge graph into this central repository; no rewriting the extractor, no labeling pending Lean proofs verified, and no public runtime scanning endpoint.
