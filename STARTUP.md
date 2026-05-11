# Startup Guide — Claude Resume Engine

Welcome. This guide walks you through setup from zero to your first built resume.
Estimated time: 30-45 minutes for profile setup, 5 minutes for first build.

---

## Step 1 — Install dependencies

```bash
npm install
```

Requires Node.js 18+ and Python 3. That is all.

---

## Step 2 — Create your candidate profile

Copy the template and open it:

```bash
cp personal/candidate_template.md personal/candidate.md
```

`candidate.md` is gitignored. It never leaves your machine.

Open `personal/candidate.md` and fill it in section by section. The template has instructions inline. Key things to get right:

**Locked metrics** — these are your verified, documented outcomes. Dollar amounts, percentages, counts. Only include what you can defend in an interview. Once locked, the framework will never change them. This is the most important section. Take your time.

**Experience blocks** — your bullets, written once. The framework reorders them for each JD. It never rewrites them without your approval. Write them in either narrative or XYZ (outcome-first) format — the `/stress-test` command will tell you which performs better.

**Competency tables** — the pools of skills you pull from for each audience (broad, defense, semiconductor, etc.). These populate the resume sidebar. You define the pools; the `/tailor` command selects from them based on the JD.

---

## Step 3 — Build your base resume

Open Claude Code in this directory:

```bash
claude
```

On session start, Claude loads SKILL.md and candidate.md automatically.

Then run:
```
/build-base
```

This generates your baseline `.docx` in `outputs/`. Validate it opens correctly in Word or Google Docs. Check fonts, spacing, and that nothing overflows.

---

## Step 4 — Tailor to a job description

When you have a role to apply for:

```
/tailor [Company] [Role]
```

Claude will ask you to paste the JD if it doesn't already have it. It then runs:
1. Gap analysis — honest alignment table, no sugarcoating
2. Keyword audit — what's in your bullets vs. what the JD needs
3. Proposed changes — diff shown before anything is built
4. Approval gate — you approve, then it builds

You never get a surprise resume. Every change is shown first.

---

## Step 5 — Run the 6-second scan

After a tailored build:

```
/scan [Company] [Role]
```

Three-layer analysis:
- Do your scan-zone bullets prove what your intro claims?
- Are the JD's must-have requirements visible in the first 6 seconds?
- Does the resume signal you solve the real problem behind the JD?

Pass threshold is 7.0/10. If it fails, you get one specific reorder recommendation.

---

## Other commands

```
/cover [Company] [Role]      Cover letter — 11-phase engine, approval gate
/evidence [Company] [Role]   Evidence of Excellence positioning doc
/stress-test                 Score every bullet on 7 dimensions
/gap-analysis                Fit analysis against any JD
/build-log                   All outputs generated, organized by company
```

---

## Tips

**On locked metrics:** If you are not sure a number is defensible, do not lock it. A vague but honest bullet is better than a specific number you cannot explain.

**On bullet format:** XYZ (outcome first) scans better for most audiences. Narrative (action first) carries more technical texture for domain-expert readers. The framework supports both. Use `/stress-test` to score yours.

**On the JD hidden message:** Every JD has a real problem behind the stated requirements. Phrases like "proactively identify risks," "balance schedule, quality, and cost," and "drive functional teams in debug" are written from pain, not aspiration. The `/scan` Layer 3 reads for this. Read your JDs that way too.

**On session starts:** Claude loads your profile fresh each session. If you update `candidate.md`, the next session picks it up automatically.

---

## File you will touch most

`personal/candidate.md` — your source of truth. Everything else is framework.
