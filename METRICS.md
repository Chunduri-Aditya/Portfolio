# Metrics provenance

Every number printed on a project card traces to a row here: a truth.md line
ID (`~/career-ops/truth.md` Section 1), or the command that produced it, the
repo commit it ran against, and the date it ran.

Numbers drift. **Do not edit a number on a card without adding or updating its
row here, and do not trust a row older than the repo commit it names.** A row
here never overrides a truth.md Limits clause.

Collected **2026-11-19** (portfolio-refresh WP2). Rows that carry an earlier
date say why they were not rerun.

## Test counts

| Card | Value | Truth ID | Command | Repo | SHA | Date |
|---|---|---|---|---|---|---|
| Agent Shield | 1,478 tests passing in CI | A2 | CI run 43510131767, step "Run tests" (`uv run --frozen pytest -q`) | `Projects/agent-shield-complete/agent-shield` | `c283b93` | 2026-11-13 |
| Agent Shield | mutations 31 of 31, 13 of 13 red | A9 | `docs/paper_v2/mutation/` | `agent-shield` | n/a | per truth.md |
| twin | 1,938 passed, 11 deselected | T13 | `uv run pytest -q` | `Desktop/twin` (private, no remote) | `06bfb4f` | 2026-10-07, not rerun (T13 Limits) |
| twin | 878 mutations, 0 survived (875 on target, 3 off) | T12 | `docs/mutation-run.tsv` recount | `Desktop/twin` | run at `f6290f0` | 2026-10-03, not repeated (T12 Limits) |
| AI RemixMate | 1,976 Python, 138 frontend | RM1 | pytest and vitest, per truth.md | `Projects/ai-remixmate` (private) | `a046fc9` | per truth.md |
| AI Health Journal | 408 passed | H4 | pytest | `Projects/journal-agent` | `77403dd` | 2026-10-07, not rerun (H4 Limits) |
| MetaLearnML | 116 collected | none | `./.venv/bin/python -m pytest --collect-only -q -p no:cacheprovider` | `Projects/MetaLearnML` | `ca03bd6` (= origin/main) | 2026-11-19 |
| AkashicTree | 84 test functions | AK1 | per truth.md | `Projects/AkashicTree` | n/a | per truth.md |
| Attention Drift Detector | 52 test functions, 5 test modules | AD1 | `grep -c 'def test_' -r tests` (52), `ls tests` (5 `test_*.py`) | `Projects/attention-drift-detector` | `532531e` | 2026-11-19 |
| Sourcewarden | 71 tests (20, 34, 17) | SW2 | `pytest --collect-only` at the commit, per truth.md | `Projects/sourcewarden` | `1486e71` | per truth.md |
| profile-rag | 19 collected | none | `./.venv/bin/python -m pytest --collect-only -q -p no:cacheprovider` | `Projects/profile-rag` | `28ec33e` | 2026-11-19 |
| taintgate | 525 collected | none | `./.venv/bin/python -m pytest --collect-only -q -p no:cacheprovider` | `Projects/taintgate` | `bf80270` | 2026-11-19 |

### Traps found while collecting these

- **Collect on the commit you cite.** MetaLearnML moved from 86 tests at
  `2fca9e3` to 116 at `ca03bd6`, profile-rag from 14 to 19, and taintgate from
  124 to 525. The old figures are retired below.
- **journal-agent's `pytest --collect-only -q` prints no total line**, only a
  per file breakdown. Sum the per file counts.
- **Sourcewarden's `make test` runs bare `python3`**, which has no `fastapi`
  on this machine and exits 2. Use the repo's `.venv`.

## Derived and domain numbers

| Card | Value | Truth ID | How it was derived | Repo / SHA | Date |
|---|---|---|---|---|---|
| Agent Shield | 24 attacks, six modules (5, 1, 6, 1, 5, 6) | A4, A24 | Paper Table 1 | `agent-shield` | per truth.md |
| Agent Shield | 55 and 494 characters, fix `920c397` | A26 | `docs/ERRATUM.md:15` | `agent-shield` | 2026-11-10 |
| Agent Shield | erratum withdraws 13 claims | A11 | `docs/ERRATUM.md` | `agent-shield` | per truth.md |
| Agent Shield | n=5 results: 5 of 5, ASR 1.000; 3 of 20 over 5 prompts; 0 of 5 to 4 of 5 | A16, A17, A18 | Erratum "What stands" | `agent-shield` | per truth.md |
| Agent Shield | preprint DOI 10.5281/zenodo.20789431 | A1 | Zenodo record | n/a | 2026-10-29 |
| twin | 86 tools, 43 read, 43 write | T9 | per truth.md | `Desktop/twin` | 2026-10-07 |
| twin | 600 s card expiry | T2 | `approval.py:31` | `Desktop/twin` | 2026-10-29 |
| twin | 217 runs, 1,586 events, 14 cards, 12 approved, 2 rejected | T7 | script count over `~/.twin/runs` | local | 2026-11-09 |
| twin | 12,000 characters | T8 | `routing.toml` roles | `Desktop/twin` | 2026-10-07 |
| twin | 20 of 20, 12 of 20, 16 of 20 | T10 | `uv run twin memory eval synthetic` | `Desktop/twin` | 2026-10-07 |
| twin | four MCP tools, 28.3 s | T11 | `docs/SHOWCASE.md` | `Desktop/twin` | 2026-09-28, one live run, not rerun (T11 Limits) |
| AI RemixMate | -14 LUFS master target | none | `git grep -n -E '\-14(\.0)? ?LUFS' a046fc9` hits `scripts/api/task_modules/remix.py:93` (`target_lufs = -14.0`) | `ai-remixmate` `a046fc9` | 2026-11-19 |
| AI RemixMate | ITU-R BS.1770-4 | RM2 | grep, per truth.md | `ai-remixmate` | 2026-11-10 |
| AI Health Journal | crisis 1.00 (27 of 27), 0.905 (38 of 42), 69 cases | H1 | rerun TP 27, FN 0, FP 4, TN 38 | `journal-agent` `77403dd` | 2026-11-10 |
| AI Health Journal | Recall@3 0.855 to 0.968, 31 queries | H2 | `evals/rag_ablation.py --cases rag_retrieval_cases_v2.json` | `journal-agent` `77403dd` | 2026-11-10 |
| AI Health Journal | case study figures: valence_flip 0.667 to 1.000; GoEmotions 0.551, 0.260, 0.575; detector disable 1.000 to 0.800; aggregate 0.875; eight models, best case pass 0.500, default 23.8 s average, worst 66.6 s | none | `git -C Projects/journal-agent show 77403dd:docs/IMPROVEMENTS.md`, lines 158 to 199, 353 to 365, 477 to 538, 591 to 595, 975 to 996 | `journal-agent` `77403dd` | 2026-11-19 (read) |
| AI Health Journal | crisis mutation 0.852 (TP 23, FN 4) | none | `make crisis-eval` on a `git archive` copy with one euphemistic pattern deleted from `_CRISIS_PATTERNS` | `journal-agent` `77403dd` | 2026-09-30. Not rerun on 2026-11-19; H1 reran the unmutated eval at the same commit on 2026-11-10 |
| MetaLearnML | median Spearman 0.5676 vs 0.0216 (0.57 vs 0.02) | M1 | `benchmarks/reports/benchmark.md` ranking table (0.567568, 0.021622) | `MetaLearnML` `ca03bd6` | 2026-11-19 (read) |
| MetaLearnML | Recall@5 0.40 vs 0.20; proxy 0.0288, proxy+meta 0.407; 0.0% reduction, CI 0.0% to 50.0%, 10,000 resamples; 100% retention at budget 10; micro-mass 0.154; 18 failed runs; 15 datasets; seeds 13, 42, 97; 28 to 36 pipelines; cold start 20 rows | M1 (Limits) | `benchmarks/reports/benchmark.md` lines 11, 35, 43 to 47; `README.md` lines 255 to 262 | `MetaLearnML` `ca03bd6` | 2026-11-19 (read) |
| Attention Drift Detector | 478 landmarks | AD2 | `README.md:17` | `attention-drift-detector` | 2026-11-10 |
| Attention Drift Detector | 5 s drift threshold, 1 s smoothing window | none | `attention_drift_detector/config/settings.py:15-16` | `attention-drift-detector` `532531e` | 2026-11-19 |
| AkashicTree | 6 commits; 9:16 video; Playground v2.5 | AK1 | per truth.md | `AkashicTree` | per truth.md |
| Sourcewarden | 2,256 rows (195 + 2,061) | none | `cat n8n_rag_system/data/processed/*.jsonl \| wc -l` | `sourcewarden` HEAD `1486e71`; the jsonl files are untracked, so the commit does not pin them | 2026-11-19 |
| Sourcewarden | authorization lifetime 15 minutes | none | `git grep -n '15 minutes' 1486e71` hits `README.md:142`, `.codex/hooks/n8n-mutation-gate.mjs:138` | `sourcewarden` `1486e71` | 2026-11-19 |
| Sourcewarden | 7 commits | SW2 | `git log --oneline \| wc -l` (7) | `sourcewarden` `1486e71` | 2026-11-19 |
| profile-rag | recall@3 0.979 on 48 self written questions | P1 | per truth.md | `profile-rag` | per truth.md |
| profile-rag | live, /health 200 | P2 | `curl /health` | Render | 2026-10-29 |
| profile-rag | recall@1 0.833; FAQ cosine 0.88; 500 characters; 30 a minute; floor 0.97; hybrid alone 0.958 | P3 | `STATE.md:6`, `retrieve.py:27`, `README.md:44`, `tests/test_retrieval.py:56` | `profile-rag` `bd9795b` | 2026-11-10 |
| taintgate | 66,156 decisions, median 0.07 ms, p95 0.12 ms, 2026-09-18 to 2026-10-22; 3 denies, all screener outages | G1 | script over `runs/trace.jsonl` | `taintgate` | read 2026-10-29 |
| taintgate | ran 2026-10-31 to 2026-11-09 | G5 | `runs/trace.jsonl` | `taintgate` | 2026-11-10 |
| taintgate | recall gap of 2026-09-17 | G4 | `README.md:11-12` | `taintgate` | 2026-11-10 |
| Company Agents | 238 handoffs, 13 predicates, 283 checks, 159 job records | CAS2 | `node scripts/preflight.mjs --list`, exit 0 | `Company_Agents_skeleton` `c7f2e3d` | 2026-11-13 |
| Persona RAG | k=5, 3 sources, 0.6 containment (60%), +0.05 decide offset | none | `gh api -H 'Accept: application/vnd.github.raw' repos/Chunduri-Aditya/twin/contents/twin/index.py?ref=b8716ea`: `SOURCES` L28, `CONTAINMENT_THRESHOLD = 0.6` L31, `k: int = 5` L365; `twin/pipelines/ask.py:53` `DECIDE_BOOST = {"Decisions": 0.05}` | `github.com/Chunduri-Aditya/twin` `b8716ea` (the repo is now named `Personal-persona-chatbot`; `twin` redirects) | 2026-11-19 |
| racket-vision | test F1 0.793 [0.765, 0.818] on 3,536 frames; baseline 0.037 [0.021, 0.056]; paired gain +0.756 [0.726, 0.784]; precision 0.665; 1,171 false positives, 41 false negatives; 2 px at 512x288; 9 channel stem, three frames, IMAGENET1K_V2 | RV1 | `results/test.json` (prereg sha 3bd999dc, tp 2322, fp 1171, fn 41), `src/racket_vision/model.py:3` | `racket-vision` | per truth.md (read 2026-11-09) |
| SpectraGuard | floor 12.380 dB for both detectors, engine 12.4 dB, `match=True`; 12 levels x 20 seeds; pass at detect 0.9 or more and false positive 0.1 or less; phase_slip false positive 0.65 at -11.070 dB and 1.00 at -14.310 dB; stego_burst 0.90 at the floor; floor between 8.377 and 12.380 dB | none (no Section 1 line) | `.venv/bin/python scripts/snr_sweep.py --check`, exit 0, read only (working tree unchanged after the run) | `spectraguard` `61b9e5d` (tag v0.1.0) | 2026-11-19 |
| SpectraGuard | 4 dB grid; 8 maximum size requests reached 1.1 GB; slip bias +12 to +31 samples, 64 sample tolerance; stego band 0.75 Nyquist, tone 0.85 Nyquist; 422 on NaN, Inf, oversized and malformed payloads; binds 127.0.0.1 | none | `git show v0.1.0:PHASES.md` lines 25 and 26, `git show v0.1.0:docs/PLAN.md` lines 458 to 466, `git show v0.1.0:PRD.md` Features | `spectraguard` `61b9e5d` | 2026-11-19 |
| SpectraGuard | all commits by Aditya | none | `git shortlog -sne --all`: 36, one author | `spectraguard` `61b9e5d` | 2026-11-19 |
| traderbot | 132 test functions, 15 commits on main, all by Aditya; paper=True; `backtest.py` and `live_gate.py` stubs on main | TB1 | `git show origin/main:src/traderbot/backtest.py` and `live_gate.py` raise `NotImplementedError` (checked 2026-11-19) | `traderbot` | per truth.md |
| traderbot | fourteen reason codes, each with a deny and an allow test; 21 attack cases, 16 confirmed, all fixed; `mutate.py` 27 of 27 red; macOS Keychain | TB2 | `PHASES.md:16` and `:19`, `ARCHITECTURE.md:6` and `:23`; the repo's own record, not rerun | `traderbot` | per truth.md (read 2026-11-10) |
| Freeze Gate | undefended ASR q8_0 5/5, q4_K_M 4/5, q3_K_M 5/5; TR 0/5 each; n=5 per build, one run, M3 Pro, temperature 0 | FG1 | `results/security_retention.md:3` | `freeze_gate` | per truth.md (checked 2026-11-10) |
| Freeze Gate | 210 mutation rows; 14 of 14 commits by Aditya | FG2 | `tests/mutation_rows.py` `ROWS`, counted not rerun | `freeze_gate` `46d2680` | per truth.md (read 2026-11-02) |
| Easley Dunn | Aug 2026 to Oct 2026 | E15 | offer letter and SEVP dates | n/a | 2026-11-10 |
| Easley Dunn | YOLO11; 8 to 27 tests; four clips, six approaches; 14.29 not 3.23 degrees; frame 15 | E5, E5b, E5c, E5d, E15 | per truth.md | not named here (E15 Limits) | per truth.md |
| Research | IJRASET Vol 11, Issue VIII, Aug 2023, second of four, DOI 10.22214/ijraset.2023.52452 | E10 | DOI and PDF first page | n/a | 2026-11-10 |
| Yashoda | Nov 2022 to May 2023 | E2c | user statement | n/a | 2026-11-10 |
| RB Associates | Aug 2021 to Sep 2022, four processes | E13 | user statement | n/a | 2026-11-10 |
| SSN College | May 2021 to Jun 2021, YOLOv5 | SC1, SC2 | user statement | n/a | 2026-11-10 |
| USC | Jun 2024 to Dec 2024, two PyTorch models, RITE and FIVES | E3a, E3b | user statement | n/a | 2026-11-10 |

## Repo visibility

Checked **2026-11-19** with `gh repo view Chunduri-Aditya/<name> --json visibility,url` and
`git -C <path> remote -v`. A card links GitHub only when the repo is PUBLIC and its remote
history passed the exposure gate: `git log --remotes --format='%an <%ae>%n%b' | grep -icE
'co-authored-by|claude|anthropic'` prints 0 (positive control on a known trailer printed 1).

| Card | Repo | Visibility | Remote | Gate | Card link |
|---|---|---|---|---|---|
| agent-shield | agent-shield | PUBLIC | origin | not rerun (link predates WP3) | github |
| twin | none on GitHub for `~/Desktop/twin` | n/a | none | n/a | request access (T1) |
| ai-remixmate | ai-remixmate | PUBLIC | origin | not run | request access; RM1 wording says private, finding for Aditya |
| akashic-tree | AkashicTree | PRIVATE | origin | n/a | request access |
| ai-health-journal | journal-agent (a separate ai-health-journal repo is also PUBLIC) | PUBLIC | origin | not rerun | github |
| attention-drift-detector | attention-drift-detector | PUBLIC | origin | not rerun | github |
| sourcewarden | sourcewarden | PUBLIC | origin | not rerun | github |
| metalearnml | MetaLearnML | PUBLIC | origin | not rerun | github |
| profile-rag | profile-rag | PUBLIC | origin | not rerun | github |
| chatdb | ChatDB | PUBLIC | origin | not rerun | github |
| taintgate | none (`gh` cannot resolve taintgate) | n/a | none | n/a | request access |
| company-agents | Company_Agents_skeleton | PRIVATE | origin | n/a | request access |
| persona-rag | Personal-persona-chatbot (`twin` redirects) | PUBLIC | no local clone; bare clone in scratchpad | PASS: 0 hits over all branches; 7 commits, all by Aditya under two author names | github, new |
| racket-vision | racket-vision | PRIVATE | origin | n/a (private) | request access |
| spectraguard | spectraguard | PRIVATE | origin | n/a (private) | request access |
| traderbot | traderbot | PUBLIC | origin | FAIL: 14 hits (`Claude-Session:` trailers on 9 commits, branches `origin/claude/*`) | request access |
| freeze-gate | none (`gh` cannot resolve freeze_gate or freeze-gate) | n/a | none | n/a | request access |
| model-behavior-lab (removed) | Model-Behavior-Lab | PUBLIC | origin | n/a | card removed |

## Claim map

One row per card: the numbers it prints, and where each one comes from.

| Card | Printed numbers | Truth ID or row |
|---|---|---|
| agent-shield | 24, six modules, 5/1/6/1/5/6; 1,478; 31 of 31, 13 of 13; 13 claims; 55 and 494 characters, `920c397`; n=5, 5 of 5, ASR 1.000, 3 of 20, 0 of 5 to 4 of 5; DOI | A1, A2, A3, A4, A9, A11, A16, A17, A18, A24, A25, A26 |
| twin | 12,000; 86, 43, 43; SHA256, 600 s; 217, 1,586, 2026-09-27 to 2026-10-04, 14, 12, 2; 1,938, 11, 2026-10-07; 878, 875, 3; 20 of 20, 12 of 20, 16 of 20; four tools, 28.3 s | T2, T7, T8, T9, T10, T11, T12, T13 |
| ai-remixmate | 1,976, 138; -14 LUFS; BS.1770-4; 8/16/32 bar grid; citation years 2015, 2016 | RM1, RM2, -14 LUFS row; bar grid and years are non metric |
| akashic-tree | 9:16; Playground v2.5; 6 commits; 84 test functions | AK1 |
| ai-health-journal | 1.00 (27 of 27), 0.905 (38 of 42), 69; 0.855 to 0.968, 31 queries, `77403dd`; 408; case study figures | H1, H2, H4, IMPROVEMENTS.md row, crisis mutation row |
| attention-drift-detector | 478; 52, 5 modules; 6 commits; 5 s, 1 s | AD1, AD2, settings row |
| sourcewarden | 2,256; 71 (20, 34, 17); 7 commits; 15 minutes; Ed25519 | SW2, 2,256 row, 15 minutes row |
| metalearnml | 0.5676 vs 0.0216, 0.57 vs 0.02; benchmark figures; 116 tests at `ca03bd6` | M1, benchmark row, test count row |
| profile-rag | 0.979, 0.833, 48; 0.97, 0.958; 0.88; 500, 30; /health 200 on 2026-10-29; 19 tests at `28ec33e` | P1, P2, P3, test count row |
| chatdb | none | CD1 |
| taintgate | 66,156, 0.07 ms, 0.12 ms, 3 denies, read dates; 2026-10-31 to 2026-11-09; 2026-09-17; 525 at `bf80270` | G1, G4, G5, test count row |
| company-agents | 238, 13, 283, 159 | CAS2 |
| persona-rag | k=5, 3 sources, 0.6 (60%), +0.05 | Persona RAG row |
| racket-vision | 0.793 [0.765, 0.818]; 3,536; 0.037 [0.021, 0.056]; +0.756 [0.726, 0.784]; 0.665, 1 in 3; 1,171, 41; 2 px, 512x288; 9 channel, three frames, IMAGENET1K_V2 | RV1 |
| spectraguard | 12.380 dB, 12.4 dB; 12 levels, 20 seeds; 0.9, 0.1; 0.65 at -11.070 dB; 1.00 at -14.310 dB; 0.90; 8.377; 4 dB; 8 requests, 1.1 GB; +12 to +31, 64 samples; 0.75 and 0.85 Nyquist; 422; 127.0.0.1; v0.1.0 | SpectraGuard rows |
| traderbot | 14 (fourteen); 21, 16; 27 of 27; 132; 15 commits; sha256 | TB1, TB2 |
| freeze-gate | n=5; 5/5, 4/5, 5/5; 0/5; 210; 14 of 14; temperature 0 | FG1, FG2 |

## Non metric numerals

These digits print and are not measurements: years and dates in periods and
read dates; version and model names (Sonnet 4.5, Llama 3.1 8B, Llama 3.3 70B,
Gemini 3.5 Flash, YOLO11, YOLOv5, Playground v2.5, Python 3.12, FTS5, TR-v1,
TR-v2, gemma); quantization names (q8_0, q4_K_M, q3_K_M); model names MobileNetV3 and IMAGENET1K_V2; hardware (Apple M3 Pro); identifiers (127.0.0.1, v0.1.0, HTTP 413 and 422, DOI parts 10.5281, 20789431, 10.22214,
2023.52452; commit SHAs; SHA256 and sha256; Ed25519; ITU-R BS.1770-4); ratios
and grid sizes (9:16, 8/16/32 bar); CLI flags (`--cpus=0.1`); citation years
(Bernardes et al. 2016, Hafezi and Reiss 2015); Tailwind class names in the
data (`text-rose-400` and similar).

## Numbers deliberately not printed

- **904, 1,880, 774, 520+** (AI RemixMate tests): RM1 bans them. 1,976 and 138 replace them.
- **0.971** (AI Health Journal crisis sensitivity on the older 56 case set): H1 bans it.
- **42 of 42** (Company Agents verify gate): CAS1 is superseded, and the gate now reads 41 of 42 (CAS2). Never "all checks pass".
- **1,477** (twin tests) and **646** (twin mutation rows): replaced by T13 (1,938) and T12 (878). Never 979, 980 or "619 of 620" (T12 Limits).
- **28** (Agent Shield attack IDs): A4 says print "24 implemented attacks across six modules". Never 28 or 33 beside the paper's results.
- **47 / 48** as the profile-rag headline: P1 prints 0.979. The BM25 figure 40 / 48 is retired: P3 gives 0.833 as hybrid plus rerank recall@1.
- **508** (AI Health Journal tests): H4 gives 408 at `77403dd`. Never 326 or 393.
- **86** (MetaLearnML), **14** (profile-rag) and **124** (taintgate) tests: superseded by the 2026-11-19 collections above.
- **318** (profile-rag corpus chunks): the corpus changes with every export, so the card prints no chunk count.
- **Twin voice latency and WER** (5.3 s, 0.86 s, WER 0.00) and every other figure quoted from twin's `docs/SHOWCASE.md` with no truth.md line: T6 says the voice path never ran live, and T7 says voice latency figures in docs are claims, not logs. **T4** (0 of 20, 10 of 20) never prints.
- **Agent Shield** TR figures 0.000, 0.150, 0.161, 0.434 (A12 to A14), and the persona_attribution figures (31 of 40, 21 of 40, Wilson bounds), which have no truth.md line.
- **Kappa** as agreement with humans: never printed.
- **Attention Drift Detector 0.94 F1**: AD1 bans it. The card prints no accuracy figure.
- **Easley Dunn frame counts** (785 of 873, 313 of 873, 790, 323, 3.3 deg) and span lengths: no truth.md line, and the repo cannot be named here (E15).
- **taintgate "1 denied in 10"** and "ten mutations": no truth.md line. G2 bans "blocked attacks".
- **AI Health Journal 26.6 ms vs 58.0 ms** embedding latency: not found in `docs/IMPROVEMENTS.md` at `77403dd` on 2026-11-19.
- **Any MetaLearnML search speedup.** M1: primary criterion not met.
- **Model Behavior Lab results** (MB1).
- **Model Behavior Lab card** (removed 2026-11-19): INDEX.md verdict ARCHIVE and MB1. Its "4 eval axes" figure left with it.
- **racket-vision 1.13 px** median error (RV1 Limits), the validation F1 0.849, recall 0.983, Core ML latency (p50 2.29 ms, p95 2.34 ms) and any plan or product direction: RV1 prints the test read only.
- **traderbot 364 tests** (README of a working branch, not main) and any backtest, live trade or return figure (TB1).
- **Freeze Gate defended counts** (1/5 each stored, 0/5, 0/5, 1/5 rescored): C23 and FG1 Limits. No Wilson or bootstrap interval prints.
- **SpectraGuard CSV bounds** (1 to 8 channels, 8192 to 65536 rows): left out to keep the card short; sourced at `v0.1.0:README.md` if needed.
- **Any dollar amount** (T2, A6 caps and spend): the showcase rule bans dollar figures.

## Resume PDF

`public/Docs/Aditya_Chunduri.pdf` is the general best resume of 2026-09-28
(title "AI/ML Engineer"), built from
`Desktop/I_got_the_job/work/general-best-2026-09-28/Aditya_Chunduri_Resume.tex`,
sha256 `686eefc9…810b7`. It predates truth.md and may carry figures this
ledger retires; WP4 lists any hits for Aditya (finding D1).

## Portfolio PDF

`public/Docs/Aditya_Chunduri_Portfolio.pdf` is the upload version of this
site. `npm run export:pdf` builds it from `content.ts` alone, so it goes stale
on any `content.ts` change until rerun (WP4).
