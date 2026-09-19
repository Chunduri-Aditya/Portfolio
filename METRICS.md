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
| jarvis | 124 tests | `./.venv/bin/python -m pytest --collect-only -q` | `Projects/jarvis` | - | `6ab9c10` |
| Company Agents | 42 of 42 steps | `node scripts/verify.mjs`, exit 0 | `Projects/Company_Agents_skeleton` | - | `dc781ad` |

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

`public/Docs/Aditya_Chunduri.pdf` is the **ML Engineer lane base** from
`Desktop/I_got_the_job/work/jobright-2026-09-17/`, chosen because this site
positions as ML / AI engineer and its title tag says the same.

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
