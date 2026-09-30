# Metrics provenance

Every number printed on a project card traces to a row here: the command that
produced it, the repo commit it ran against, and the date it ran.

Numbers drift. Three of these moved within ten days during the 2026-09-18 audit,
and two "unverified" flags raised by that audit turned out to be measurement
errors rather than bad claims. **Do not edit a number on a card without adding or
updating its row here, and do not trust a row older than the repo commit it names.**

All figures below collected **2026-09-18**.

## Test counts

| Card | Value | Command | Repo | Branch | SHA |
|---|---|---|---|---|---|
| Agent Shield | 467 tests | `./.venv/bin/python -m pytest --collect-only -q` | `Projects/agent-shield` | main | `6c142ee` |
| AI RemixMate | 904 tests | `./.venv/bin/python -m pytest --collect-only -q` | `Projects/ai-remixmate` | **hosted-app** | `fb1a5f9` |
| AI Health Journal | 508 tests | `./venv/bin/python -m pytest --collect-only -q`, per file counts summed | `Projects/journal-agent` | main | `77403dd` |
| MetaLearnML | 86 tests | `./.venv/bin/python -m pytest --collect-only -q` | `Projects/MetaLearnML` | main | `2fca9e3` |
| AkashicTree | 82 tests | `./.venv/bin/python -m pytest --collect-only -q` | `Projects/AkashicTree` | main | `bd786d0` |
| Attention Drift Detector | 52 tests | `./.venv/bin/python -m pytest --collect-only -q` | `Projects/attention-drift-detector` | main | `532531e` |
| Sourcewarden | 71 passing | `./.venv/bin/python -B -m unittest discover -s <dir>` over `web/tests` (20), `n8n_rag_system/tests` (34), `tests/self_improvement` (17); all three exit 0 | `Projects/sourcewarden` | main | `1486e71` |
| taintgate (was jarvis; collected 2026-09-23) | 124 tests | `python3 -m pytest --collect-only -q` | `Projects/taintgate` (`Projects/jarvis` is a symlink to it) | - | `d8f437a` |
| Company Agents | 42 of 42 steps | `node scripts/verify.mjs`, exit 0 | `Projects/Company_Agents_skeleton` | - | `dc781ad` |
| twin (run 2026-09-29) | 1,477 offline tests | `uv run pytest -q` in a clean clone: 1477 passed, 9 live tests deselected by the default `-m 'not live'`, exit 0 | `Desktop/twin` (local only, no remote) | - | `df968f0` |

### Traps found while collecting these

- **Sourcewarden's `make test` runs bare `python3`**, which on this machine is
  system Python 3.14 with no `fastapi`. It exits 2 with a `ModuleNotFoundError`
  that reads as a red suite. Run the three `unittest discover` passes with
  `./.venv/bin/python` and all 71 pass. A collection run that reports fewer than
  71 is an interpreter problem, not a regression.
- **journal-agent's `pytest --collect-only -q` prints no total line**, only a per
  file breakdown. Sum the per file counts. Cross checked: 371 `def test_` plus 29
  `@pytest.mark.parametrize` markers is consistent with 508 collected.
- **ai-remixmate is checked out on `hosted-app`, not `main`.** 904 is the
  hosted-app figure. Collect on the branch you intend to cite.

## Derived and domain numbers

| Card | Value | How it was derived | Repo / SHA |
|---|---|---|---|
| Sourcewarden retrieval index | 2,256 rows | `cat n8n_rag_system/data/processed/*.jsonl \| wc -l` → 195 (`chunks.jsonl`) + 2,061 (`workflow_examples_chunks.jsonl`) | `sourcewarden` `1486e71` |
| Agent Shield attack IDs | 6 modules · 28 | Unique IDs across the six in-house modules: IN 5, PS 6, MM 1, DR 6, EX 5, TL 5. `AA-01`..`AA-05` are the external Auto_Apply benchmark mapped into the IN family and `XX-99` is a fixture in `tests/test_risk_registry.py`; neither counts. | `agent-shield` `6c142ee` |
| AI Health Journal retrieval | 0.968 Recall@3 | Full corpus figure in `docs/IMPROVEMENTS.md`. The higher 0.979 is the smaller 19 query pre noise set and must not be printed as the headline. | `journal-agent` `77403dd` |
| AI Health Journal crisis floor | 1.000 sensitivity (27/27) | `docs/IMPROVEMENTS.md` | `journal-agent` `77403dd` |
| profile-rag corpus | 318 chunks | `npm run export:corpus` at Portfolio `c92b39f`; `curl /health` on the live service reports the same count | `profile-rag` `6f93001` |
| profile-rag recall@3 | 47 / 48 (0.979) hybrid + rerank; 40 / 48 (0.833) BM25; 46 / 48 (0.958) with the rerank sort removed | `uv run python -m profile_rag.eval` on `eval/questions.jsonl`, 2026-09-22. Printed as counts because this ledger bans the string 0.979 for the AI Health Journal row above | `profile-rag` `6f93001` |
| profile-rag latency at 0.1 CPU | 4 to 9 s extraction, under 1 s FAQ (was 55 to 153 s) | `docker run --cpus=0.1` against the local image, 2026-09-22; not printed as a number on the card, described in prose | `profile-rag` `6f93001` |
| profile-rag tests | 14 | `uv run pytest`, 2026-09-22 | `profile-rag` `6f93001` |
| twin mutation rows | 646 | Entries in the `MUTATIONS` list of `scripts/mutate.py`, counted with `ast` in a clean clone, 2026-09-29. The last full run (620 rows, `c4460ca`) left 1 alive; `1de078e` added its test | `twin` `df968f0` |
| twin card text, every other number | timings, costs, counts and caps in the evidence, decisions and limits | Quoted from twin's committed docs, none computed here: `docs/SHOWCASE.md` (15.9 s, 4 calls, $0.064, planned 1 step; 1 of 3 agreed; 43 write tools, 600 s, 50 one click and 20 typed a day; 7.7 s, 8.4 s; 5.3 s, 0.86 s, WER 0.00; 20 of 20; 28.3 s; $0.16 to $0.17), `docs/DEMO.md` (1 of 1 step agreed), `docs/ARCHITECTURE.md` (TG4 128 bit nonce; CN 117 to 47 tools, $0.47 to $0.25; H5 0.58 floor, unrelated notes 0.59 to 0.66; D2 and the Gemini AI Studio key), `src/twin/routing.toml` ($1 per run, $20 per day, 24 calls, 15 minutes) | `twin` `59885a5` |
| Persona RAG context budget and leak gate | k=5 · 3 sources; 0.6 containment | `twin/index.py`: `search(..., k: int = 5, ...)` (L365), three sources profile, transcript, reflection (L5), `CONTAINMENT_THRESHOLD = 0.6` (L31) | `github.com/Chunduri-Aditya/twin` `b8716ea` |

### Numbers deliberately not printed

- **Any MetaLearnML search speedup.** The repo's own README refuses the claim:
  the bootstrap 95% CI on evaluation reduction spans 0% to 50%, which does not
  establish a reduction. The card prints the null result instead.
- **Agent Shield agentic / TL-01 anchored results.** Withdrawn pending a rerun.
- **"Frontier models red-teamed" as a count.** `RESULTS.md` logs 6 model IDs,
  2 of them frontier tier; the "8 models" figure was a planned sweep that never
  completed. Neither 8 nor 4 is supportable, so the stat was dropped rather than
  replaced.
- **Any produce-inspection-yolov8 metric.** `data/raw/` is empty and `models/`
  holds only stock `yolov8n.pt`. No trained weights, no mAP, no latency. The
  project is not on the site and should not be added until it has results.

## Resume PDF

`public/Docs/Aditya_Chunduri.pdf` is the **general best resume of 2026-09-28**
(title "AI/ML Engineer"), built from
`Desktop/I_got_the_job/work/general-best-2026-09-28/Aditya_Chunduri_Resume.tex`,
sha256 `686eefc9…810b7`. Aditya picked it for the site on 2026-09-28; it is not
one of the `live_bases` lane resumes in `active-resumes.json`. It replaced the
ML Engineer lane base from `work/jobright-2026-09-17/`. All six of its link
annotations returned HTTP 200 on 2026-09-28, and its DOIs match `content.ts`.

## Portfolio PDF

`public/Docs/Aditya_Chunduri_Portfolio.pdf` is the upload version of this site
for application forms that want a file, not a URL. `npm run export:pdf` builds
it from `content.ts` alone, so it carries no number this ledger does not
already cover, and it goes stale on any `content.ts` change until rerun. The
export fails if any page overflows its Letter box or a diagram is clipped.
Rebuilt 2026-09-29 with the current twin and Persona RAG: 12 pages; 25 of its
26 web links returned HTTP 200, and `/work/persona-rag/` returns 404 until the
next deploy.

### Correcting what this file said on 2026-09-18

An earlier version of this section claimed the resume "exists only as a PDF"
and that `RESUME_SKELETON_ONEPAGE_ATS.tex` is a placeholder template "so it
cannot be recompiled from this repo". The second half is true and the
conclusion drawn from it was wrong. `I_got_the_job` has a scripted resume
pipeline, and three live lane bases with real `.tex` sources listed under
`live_bases` in `work/job-hunt/active-resumes.json`. The skeleton is a
template because it is not the source; the lane bases are.

The three defects recorded here earlier, "Draft preprint", the retired Agent
Shield paper title, and a May 2025 to July 2026 engagement range, were
defects in the **stale root `Aditya_Chunduri.pdf` dated 2026-09-09**, which is
what this site was briefly serving. The live lane bases never had them:
checked against all three, they carry "Beyond Attack Success Rate", no
"draft", and Oct 2025 to Aug 2026.

The lesson worth keeping: a file at the obvious path is not the source of
truth. `active-resumes.json` names the live bases explicitly, and the repo's
own CLAUDE.md says to select from it "never by filename or modification
time". Reading that first would have avoided both the wrong PDF and the wrong
conclusion about it.
