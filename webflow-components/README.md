# Forest — Webflow Code Components

React components for the Forest Webflow site as native
[Code Components](https://developers.webflow.com/code-components/introduction)
(DevLink). Library id `forest-tools`, group **Forest**. Same scaffold as the
Shrink (`shrink-tools`) and Adfin (`Adfin Tools`) libraries.

## Components

### Common Sense Quiz (`src/CommonSenseQuiz`)

1:1 rebuild of the live safety quiz at
`forest-latest.webflow.io/common-sense-quiz/safety-quiz` (scraped 2026-09-11).
Flow: sticker intro -> 14 questions with instant right/wrong feedback modals
-> pass screen -> embedded Typeform claim step.

- `quiz.ts` — all 14 questions, answers, feedback copy and asset URLs.
  Assets currently point at the forest-latest Webflow CDN
  (site `6707bcb65af64c7288ddba74`); re-host when the new version ships.
- `styles.ts` — scoped CSS ported from the live site's classes
  (`question-card`, `qs-btn-circle`, `quiz-btn`, `feedback-modal`, ...) with
  the forest-latest tokens inlined (green-pine `#046c4c`, green-leaf `#00a372`,
  green-forest `#002a24`, black `#1d1c1a`).
- `CommonSenseQuiz.tsx` — the UI. Three answer layouts: circle YES/NO, A/B
  image cards (with optional caption pill), full-width text pills. The claim
  step loads Typeform's embed lib and mounts `createWidget` into the shadow
  root (Typeform's own CSS can't reach in there, so the widget is sized in
  `styles.ts`). Live-embed id `01K860JTDATHTFNCE6JR0A6ZM9` resolves to form
  `UyV9UM8b`, which is the prop default.
- `CommonSenseQuiz.webflow.tsx` — Webflow declaration. Editable props:
  claim Typeform id, blog + T&Cs links, pass-screen copy.

Fonts (`Gt Haptik`, `Mohr`, `Mohr Alt`) must exist on the host page — they do
on the Forest site; the preview harness @font-face's them from the CDN.

Deliberate fixes vs the live embed script: correct progress-bar math (the live
one never advances past a sliver), no `alert()` at quiz end, no fragile
`cards.length - 4` index offsets.

## Develop

```bash
npm install
npm run check       # tsc --noEmit
npm run preview     # esbuild bundle into .preview/
python3 -m http.server 8796   # serve from webflow-components/ (assets/ + .preview/)
```

Then open http://localhost:8796 — the harness renders the component into a
real shadow root, as Webflow does.

## Publish to Webflow

Needs `WEBFLOW_API_TOKEN` for the target site's workspace in the environment.
Note the current quiz lives on the old `forest-latest` site, NOT the 2026
merger site (`6a2299e27d54c9478223ea48`) — confirm the destination workspace
before importing.

```bash
npm run import      # webflow devlink import -> pushes the library
```
