# Claude Resume Engine — Master Session Loader
## Version: v1 | Framework Version: 1.0

---

## HOW TO USE THIS FILE

Load this file at the start of every Claude Code session:

```
read SKILL.md
```

Then load the candidate personal file:

```
read personal/candidate.md
```

Then you are ready. Do not ask clarifying questions about format, fonts, or ground rules.
Everything you need is in these two files.

---

## GROUND RULES — NEVER VIOLATE

1. NEVER use em dashes anywhere. Ever. Not in bullets, summaries, taglines, chat, or any output. Use periods, commas, or rewrite the sentence. This rule applies across all dimensions, timelines, and wormholes into everlasting infinity.
2. Never use first person (no "I") in resume bullets
3. Never bold metric prefix format (e.g. "40% improvement --") — AI smell trigger
4. Never exceed 2 sentences in summary
5. Never add "Omnichannel" — removed intentionally, not defensible
6. Never use "Proven" for SiClarity content — use "Owned" or "Record of architecting"
7. Never use x symbol for multiplication — always use plain x
8. Never change any locked metric
9. Always keep $122M in both tagline and summary
10. Context lines are always italic prose, never bullets
11. Two sentence bullets acceptable when each sentence owns a distinct idea
12. Always run validation after every build: python3 scripts/office/validate.py outputs/[file].docx

---

## PROJECT STRUCTURE

```
resume-generator/
├── SKILL.md                          ← This file. Load first every session.
├── README.md                         ← Setup instructions for new users
├── personal/
│   └── candidate.md                  ← ALL personal data lives here. Swap this file to use for a different person.
├── framework/
│   ├── resume_format_v9.md           ← Format spec, locked content, build rules
│   ├── cover_letter_engine.md        ← Cover letter role-alignment framework
│   └── scoring_rubric.md            ← Stress test scoring methodology
├── scripts/
│   ├── resume_base_v9.js             ← Base resume build script (single column)
│   ├── resume_defense_v9.js          ← Defense PM variant (build on demand)
│   └── office/                       ← Validation and docx utilities
├── outputs/
│   └── [Company]/[Role]/             ← All outputs organized by company and role
└── templates/
    └── cover_letter_template.md      ← Cover letter writing template
```

---

## SLASH COMMANDS

### /build-base
Rebuild the base resume from current script.
```
node scripts/resume_base_template.js
python3 scripts/office/validate.py outputs/[CandidateName]_Base_v[N].docx
```
After successful validation, generate content snapshot: outputs/[CandidateName]_Base_v[N]_content.md

### /tailor [Company] [Role]
Generate a tailored resume for a specific JD.

Steps:
1. Read personal/candidate.md — source of truth, nothing changes without approval
2. Read framework/resume_format_v9.md — follow format exactly
3. Determine audience pool before touching anything:
   - Base / Broad TPM: use Base / Broad Audience Table
   - Defense: use Defense Table
   - Semiconductor (KLA, Lam, AMAT, Synopsys, Micron, foundry): use Semiconductor Competency Pool
   - TPM + Semiconductor hybrid (Tesla Terafab, NPI + Debug roles): use TPM + Semiconductor Combined Pool
   - When no JD exists: ask user which pool to start from before proceeding
4. Check outputs/[Company]/[Role]/JD.md — use if exists, otherwise ask user to paste JD
   Save pasted JD to outputs/[Company]/[Role]/JD.md for future use
   If no JD exists, proceed with archetype build using selected pool
5. Run PHASE 1 — Gap Analysis (show before touching anything):
   Output alignment table: Strong / Partial / Gap ratings per JD requirement
   Flag honest gaps — do not hide weaknesses
6. Run PHASE 2 — JD Keyword Audit (show as decision table):

   For every skill/keyword extracted from the JD, determine status:

   | JD Keyword | In Bullets? | In Master Pool? | In Skills Line? | Recommended Action |
   |---|---|---|---|---|
   | [keyword] | YES / WEAK / NO | YES / NO | YES / NO | see below |

   Status definitions:
   - IN BULLETS: keyword appears in 2+ bullets with proof. No action needed.
   - WEAK: keyword appears once or in passing. Flag for strengthening.
   - IN POOL: keyword matches an item in the selected competency pool. Pull into competency block.
   - ORPHANED: keyword only in skills line, no bullet coverage. Ask user.
   - MISSING: keyword not in resume or master pool at all. Ask user.

   For each WEAK / ORPHANED / MISSING keyword, ask user:
   "Add [keyword] to an achievement bullet with proof, or add to keyword line only (ATS seed)?"
   Wait for response before proceeding. Do not auto-decide.

   Competency block selection rules:
   - Start from the selected audience pool in candidate.md
   - Match JD keywords to pool items — pull matches first
   - Fill remaining slots with highest-priority items from pool
   - Never exceed 20 items total in the competency block
   - Always maintain the three-category structure (Program Mgmt, Operations, Leadership)
   - For TPM+Semiconductor pool: use four categories (add Silicon Debug & Technical Depth)

7. Run PHASE 3 — Proposed Changes (show as diff, do not build yet):
   - Tagline: swap Role Title and Focus Area only. Keep $122M. Keep structure exactly.
   - Summary S1: reframe context to JD domain. Never change S2.
   - Competency block: populated from pool based on Phase 2 audit
   - Tech line: base / defense / semiconductor / TPM+semiconductor version per audience
   - Bullet ORDER within each job block — reorder by JD relevance, never rewrite, never drop
   - Context lines: reframe language to JD audience, never change underlying facts

8. Show complete diff to user. Wait for explicit approval — do not auto-build.

9. Build to outputs/[Company]/[Role]/[Name]_[Company]_[Role]_v1.docx

10. Validate: python3 scripts/office/validate.py [output file]

11. Generate content snapshot: outputs/[Company]/[Role]/[Name]_[Company]_[Role]_v1_content.md
    The snapshot records exact resume text in scan-zone order for use by /scan in future sessions.
    See SNAPSHOT FORMAT below.

12. Append to outputs/build_log.md

13. Present file

Hard rules for /tailor:
- NEVER rewrite bullets from scratch — reorder only, unless user explicitly approves a rewrite
- NEVER drop bullets silently — if a bullet is weak for this JD, flag it, do not remove it
- NEVER change locked metrics
- NEVER restructure the tagline format
- NEVER build without explicit user approval of the diff
- ALWAYS save the JD to outputs/[Company]/[Role]/JD.md
- ALWAYS generate the content snapshot after every successful build

### /build-archetype [Company] [Role] [Pool]
Build a resume without a JD using a pre-defined audience pool.
Pool options: base | defense | semiconductor | tpm-semiconductor

Steps:
1. Read personal/candidate.md
2. Read framework/resume_format_v9.md
3. Select the specified pool from candidate.md
4. Select 17-20 competency items from the pool following the selection rules defined in the pool
5. Show proposed competency block and tagline to user before building
6. Wait for explicit approval
7. Build to outputs/[Company]/[Role]/[Name]_[Company]_[Role]_archetype_v1.docx
8. Validate and present

### /cover [Company] [Role]
Generate a cover letter for a specific role.
Steps:
1. Read personal/candidate.md for proof bank
2. Read framework/cover_letter_engine.md for methodology
3. Ask user to paste the JD if not already provided
4. Run full 11-phase cover letter engine
5. Show alignment table before writing
6. Write draft, run quality checks
7. Output full letter plus short email version
8. Save to outputs/[Company]/[Role]/[Name]_CoverLetter_[Company]_v1.md

### /stress-test
Run scoring rubric against current resume block.
Scores every bullet on: Impact, Readability, Believability, AI%, Business Value, Keyword Value, Recruiter Comprehension.
Target overall: 9.0+. AI smell target: under 15%.

### /update-bullet [section] [number]
Replace a specific bullet and rebuild.
Sections: use the abbreviated job block name you defined in your build script
Example: /update-bullet role1 3  (where role1 is the abbreviated name of your most recent role)

### /update-summary
Rewrite the summary for a specific audience or JD. Always keeps $122M and 100% on-time delivery in sentence 2.

### /gap-analysis
Run JD gap analysis against candidate profile.
Output: alignment table with Strong/Partial/Gap ratings and honest positioning recommendation.

### /scan [Company] [Role] [reader: recruiter|technical]
Run a 6-second scan simulation against a tailored resume and JD. Evaluates three layers:
- Layer 1 (claim validation): does the scan zone deliver proof of what the intro promises?
- Layer 2 (JD alignment): are Tier 1 JD requirements visible in the scan zone?
- Layer 3 (problem fit): does the scan zone signal the candidate solves the REAL problem behind the JD?

The sidebar competency block is NOT part of the scan. It is a legend — reference material for people who decide to read. The scan evaluates main-column content only.

**Scan zone model (main column, top to bottom):**
- Zone 1 (0-2 sec): Name, tagline, summary
- Zone 2 (2-4 sec): Most recent job — company + title + dates + context line + bullets 1-2
- Zone 3 (4-6 sec): Second job — company + title + dates + bullet 1

Anything below Zone 3 is read-on territory. The scan either passes or fails before the reader reaches it.

**Reader modes and Layer weights:**
- recruiter:  L1 50% / L2 50%
- technical:  L1 30% / L2 70%
- Default to technical if omitted

Layer 3 is NEVER scored numerically. Its confidence is variable — inferred from JD language, not stated. Scoring an inference contaminates the numeric result. Layer 3 always runs as a qualitative read with a confidence marker.

**Layer 3 confidence levels:**
- HIGH: multiple specific operational phrases that could not be boilerplate ("plan of record," "drive functional teams," named customer type). Strong inferred problem.
- MEDIUM: some specific phrases, some generic. Reasonable inference but could be wrong.
- LOW: mostly boilerplate. Treat as directional only.

**Steps:**
1. Read outputs/[Company]/[Role]/JD.md — must exist
2. Load resume content in this priority order:
   a. Look for outputs/[Company]/[Role]/[filename]_content.md — use if exists (exact text, scan zones labeled)
   b. If no snapshot, read the corresponding .js build script and extract bullet/context text from the script strings
   c. If neither exists, ask user which version to scan and where to find it
3. Extract the 3 intro claims (tagline + summary sentences) — these are what Layer 1 tests
4. Extract Tier 1 JD requirements (non-negotiable must-haves, max 5) — these are what Layer 2 tests
5. Infer the real problem behind the JD from specific operational language — this is Layer 3
6. Map scan zone content (Zones 1-3) against all three layers
7. Produce the simulation showing exact text in each zone with signals
8. Score Layer 1 and Layer 2 separately, then combine with reader-mode weights
9. Pass threshold: 7.0 / 10.0 combined score. Under 7.0 = reorder needed.
10. Run Layer 3 qualitative read with confidence marker
11. One action only: the single reorder that most improves the score, or confirmation if passing

**Output format:**

```
=== 6-SECOND SCAN: [Company] / [Role] / [reader mode] ===

ZONE 1 — Name / Tagline / Summary  (0-2 sec)
[exact text]
Signals: [what this reader registers in Zone 1]

ZONE 2 — [Company / Title / Dates]  (2-4 sec)
[exact text: context line + bullets 1-2]
Signals: [what this reader registers in Zone 2]

ZONE 3 — [Company / Title / Dates]  (4-6 sec)
[exact text: context line + bullet 1]
Signals: [what this reader registers in Zone 3]

--- LAYER 1: CLAIM VALIDATION ---
Intro claim          | Proof in scan zone?        | Zone
[claim 1]            | YES / PARTIAL / NO         | [zone]
[claim 2]            | YES / PARTIAL / NO         | [zone]
[claim 3]            | YES / PARTIAL / NO         | [zone]
L1 Score: X.X / 10

--- LAYER 2: JD ALIGNMENT ---
Tier 1 requirement   | Visible in scan zone?      | Zone
[req 1]              | YES / PARTIAL / NO         | [zone]
[req 2]              | YES / PARTIAL / NO         | [zone]
[req 3]              | YES / PARTIAL / NO         | [zone]
[req 4]              | YES / PARTIAL / NO         | [zone]
[req 5]              | YES / PARTIAL / NO         | [zone]
L2 Score: X.X / 10

--- COMBINED SCAN SCORE ---
[L1 x weight] + [L2 x weight] = X.X / 10
RESULT: PASS / REORDER NEEDED

ACTION: [one sentence only]

--- LAYER 3: PROBLEM FIT READ  [HIGH / MEDIUM / LOW confidence] ---
Inferred problem: [one sentence — what is actually broken or scaling at this company]
Scan zone signal: [does the scan zone address it, and how directly]
Consider:         [one observation — not a required action, never a rewrite instruction]
```

Hard rules:
- Never score the sidebar
- Never score Layer 3 numerically
- Never recommend adding content — only reorder existing bullets
- One action maximum in the scored section
- Layer 3 consider line is an observation only — never frame it as a required fix

### /new-version
Increment version number on current script and rebuild.

### /build-log
Show all outputs generated, organized by company and role.

### /evidence [Company] [Role]
Generate an Evidence of Excellence positioning document for a specific role.
This is NOT a cover letter. It is a pre-letter alignment document that answers:
"Why is this candidate a strong and credible fit for this specific problem?"

Steps:
1. Read personal/candidate.md for proof bank
2. Read framework/cover_letter_engine.md for methodology
3. Use the JD already provided or ask user to paste it
4. Run all 8 analysis phases before writing anything:
   - Phase 2: JD decomposition — explicit requirements + hidden needs
   - Phase 3: Tier 1 / Tier 2 / Tier 3 prioritization
   - Phase 4: Requirement to mirror/proving/outcome mapping table
   - Phase 5: Repeatable strength pattern detection
   - Phase 6: Bridge construction
   - Phase 7: Identity hook — one sentence the reader keeps
   - Phase 8: Select 2-4 proof points only
5. Show the alignment table and identity hook to user before writing
6. Write the Evidence of Excellence — 4 paragraphs, 300-400 words
7. Run quality checks — must score 4.0+ average, no Tier 1 need unaddressed
8. Output full document plus:
   - Short email version (5-7 sentences)
   - "Why should we hire you?" interview answer
   - "Why this role?" interview answer
9. Save to outputs/[Company]/[Role]/[Name]_Evidence_[Company]_v1.md

Hard rules:
- Never rehash the resume — interpret, don't list
- Add information NOT in the resume that I have in my candidate.md
- Lead with relevance, not enthusiasm
- Not to exceed 2200 characters in length
- No "I am passionate about" or equivalent
- No em dashes
- Every paragraph must advance the fit argument
- Identity hook must appear or be implied in P1 and P4
- Use 2-4 proof points maximum — never a fact dump
- Always name the hidden need, not just the explicit JD bullet
- Answer the questions of the JDs pain point

---

## CONTENT SNAPSHOT FORMAT

Every build generates a plain-text snapshot of resume content in scan-zone order.
File naming: `[output_filename]_content.md` in the same output directory.
Purpose: allows /scan to read exact resume content in any future session without parsing a .js script.

```markdown
# Resume Content Snapshot
## [output filename]
## Built: [date]

### ZONE 1 — Tagline / Summary
Tagline: [exact tagline text]
Summary: [exact summary text]

### ZONE 2 — [Company] / [Title] / [Dates]
Context: [exact context line text]
Bullet 1: [exact text]
Bullet 2: [exact text]

### ZONE 3 — [Company] / [Title] / [Dates]
Context: [exact context line text]
Bullet 1: [exact text]

### READ-ON CONTENT — [Company] / [Title] (remaining bullets)
Bullet 3: [exact text]
Bullet 4: [exact text]
...

### READ-ON CONTENT — [Company] / [Title] (all bullets)
...

[repeat for all remaining job blocks]
```

The snapshot must reflect the BUILT resume exactly — bullet order, context lines, and text as they appear in the .docx, not as they appear in candidate.md.

---

## STRESS TEST SCORING METHODOLOGY

Every bullet scored on:

| Category | Weight | Notes |
|---|---|---|
| Impact | /10 | Does the outcome matter to any audience? |
| Readability | /10 | One read, understood immediately? |
| Believability | /10 | Would a hiring manager trust this? |
| AI Generated % | % | Lower is better. Target under 15% |
| Business Value | /10 | Revenue, cost, time, or risk? |
| Keyword Value | /10 | TPM-relevant keywords present? |
| Recruiter Comprehension | /10 | Clear to non-semiconductor audience? |

Target overall score: 9.0+
Block average below 8.5 requires rewrite before locking.

---

## RESUME FORMAT SPEC — QUICK REFERENCE

Full spec lives in framework/resume_format_v9.md. Key rules:

| Property | Value |
|---|---|
| Paper | US Letter 12240 x 15840 DXA |
| Margins | Left/Right 936 DXA, Top/Bottom 720 DXA |
| Font | Calibri ONLY. Never Arial. Never anything else. |
| Layout | Single column. No sidebar. No two-column. |
| Target length | 2 pages |
| Submit format | .docx always. Never PDF unless required. |

### Color palette
| Name | Hex | Usage |
|---|---|---|
| Dark Blue | 1F4E79 | Name only |
| Mid Blue | 2E75B6 | Section headers, job titles, tagline, tech line label |
| Pale Blue | EBF3FB | Retired — no longer used for competency rows |
| Dark | 1A1A1A | Body text, bullets, keyword line skills |
| Mid Gray | 555555 | Context lines, tech items, keyword line dots |
| Date Gray | 888888 | Dates only |
| White | FFFFFF | Page background |

### Header alignment
Name, contact, tagline, summary: CENTER ALIGNED
Everything else: LEFT ALIGNED

### Section order (never change)
1. Name
2. Contact line
3. Tagline
4. Summary
5. CORE COMPETENCIES (keyword line + technology line — no table)
6. PROFESSIONAL EXPERIENCE
7. EDUCATION
8. PATENTS & PUBLICATIONS
9. LEADERSHIP, DEVELOPMENT & MEMBERSHIPS

---

## COVER LETTER ENGINE — QUICK REFERENCE

Full engine lives in framework/cover_letter_engine.md.

### 11-Phase Process
1. Intake — collect JD, role, company, resume, optional angle
2. JD Decomposition — extract responsibilities, qualifications, soft skills, tools, hidden needs
3. Prioritization — Tier 1 critical, Tier 2 important, Tier 3 supporting
4. Experience Matching — mirror, proving, outcome statements per Tier 1 requirement
5. Pattern Detection — identify repeatable strength patterns
6. Bridge Construction — connect role needs to candidate strength pattern
7. Identity Hook — one memorable sentence the reader keeps
8. Selective Proof Injection — 2 to 4 proof points only
9. Letter Assembly — 4 paragraphs, 250-400 words
10. Quality Control — 7 checks, average 4.0+ required to pass
11. Output Variants — full letter, short email, application box, interview talking points

### Hard rules
- Never rehash the resume
- Lead with relevance not enthusiasm
- Use 2-4 proof points not 10
- Every paragraph must advance the fit argument
- One page discipline always

### 4-paragraph structure
- P1: Positioning intro — state role, fit theme, problem you solve
- P2: Bridge paragraph — interpret what role really needs, connect to experience pattern
- P3: Selected proof — 2-4 high-value proof points
- P4: Close — restate fit forward-looking, invite discussion, end clean

---

## BUILD LOG FORMAT

Every time a file is generated, append to outputs/build_log.md:

```
| Date | Company | Role | File | Version | Notes |
|---|---|---|---|---|---|
| YYYY-MM-DD | Company | Role | CandidateName_Company_Role_v1.docx | v1 | Notes on what changed from base |
```

---

## HOW TO ADAPT FOR A NEW PERSON

1. Copy personal/candidate.md to personal/candidate_backup.md
2. Replace all content in personal/candidate.md with new candidate data
3. Keep all framework files unchanged
4. Run /build-base to verify output
5. All slash commands will automatically use the new candidate data

The framework, format spec, cover letter engine, and scoring rubric are fully portable.
Only personal/candidate.md needs to change.
