# Portfolio

Source for [chunduri-aditya.github.io/Portfolio](https://chunduri-aditya.github.io/Portfolio/).

Single page, React 18 + TypeScript + Vite + Tailwind, with Framer Motion for
motion and a lazily loaded React Three Fiber scene in the hero. No router: the
nav scrolls between labelled landmark sections.

## Commands

```bash
npm install
npm run dev        # vite dev server
npm run verify     # typecheck + lint + tests, the same gate CI runs
npm run build      # production build into dist/
npm run preview    # serve the built output
```

`verify` chains `typecheck`, `lint` and `test:run`. Run it before pushing;
the deploy workflow runs the same three steps before `build`, so anything red
locally is red in CI.

## Layout

| Path | What lives there |
|---|---|
| `src/data/content.ts` | Every string on the site. One source of truth. |
| `src/components/` | Composition, sections, cards, the modal and the command palette. |
| `src/lib/` | Icon map, depth context, FAQ intent matcher, focus trap, scroll lock. |
| `METRICS.md` | Provenance for every number printed on a project card. |

Content is data, not markup. If you are changing copy, a metric, a project or a
role, it is in `content.ts` and nowhere else. The two places that used to hold
strings outside it, the hero's availability line and the FAQ's restatement of
every project metric, were the two that drifted.

## Numbers on this site

Every count and metric on a project card traces to a row in
[`METRICS.md`](METRICS.md): the exact command that produced it, the repo commit
it ran against, and the date. Test counts in particular go stale fast, so the
rule is that you re-run the collector and update the row rather than editing
the number on the card.

Two things learned building that file, both worth repeating:

- A number that greps to nothing is not necessarily false. Sourcewarden's
  "2,256 row index" was flagged as unsupported by two separate audits because
  the string appears nowhere in that repo. It is real, and derives from the
  data: 195 + 2,061 rows across the processed chunk files.
- A red suite is not necessarily a regression. Sourcewarden's `make test` runs
  bare `python3`, which picks up system Python with no `fastapi` and exits 2.
  With the venv interpreter all 71 tests pass. Confirm the interpreter before
  believing a baseline.

## Accessibility

The a11y rules in `eslint.config.js` are load bearing rather than decorative.
Before they were added, the site shipped h1 straight to h3 with no h2, four nav
links pointing at anonymous divs, two overlays declaring `aria-modal="true"`
while Tab escaped behind them, and CTA labels at 1.67:1 contrast. The linter,
the focus trap tests and computed contrast ratios are what keep those closed.

`jsx-a11y` and `react-hooks` run as errors. `react-hooks/set-state-in-effect`
is a warning: it fires on three legitimate patterns here and each would be a
behavioural refactor rather than a bug fix.

## Deploy

Push to `main`. `.github/workflows/deploy-pages.yml` runs typecheck, lint and
tests, then builds and publishes to GitHub Pages. The Pages source is set to
"GitHub Actions"; `origin/gh-pages` is a dead branch from an older manual
deploy and nothing writes to it.

`vite.config.ts` hard codes `base: '/Portfolio/'`, so the build only works
under that path. A root domain deploy would need that made conditional.
