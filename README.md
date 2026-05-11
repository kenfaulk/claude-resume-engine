# Claude Resume Engine

A resume generation framework built on Claude Code. Produces ATS-clean, format-locked `.docx` resumes tailored to specific job descriptions — with a 6-second scan scoring system that measures whether your resume passes the hiring manager's first look.

Built by a Senior TPM who got tired of reformatting the same resume 40 times.

---

## What this is

A Claude Code project that turns your career data into tailored resumes through slash commands. You fill in your profile once. Every resume after that is a targeted build against a specific job description — with gap analysis, keyword audit, and a scored diff before anything is generated.

Not a template filler. Not a word replacer. A structured methodology for thinking about fit, then building the document.

---

## What it does

| Command | What it produces |
|---|---|
| `/build-base` | Your baseline resume as a `.docx` |
| `/tailor [Company] [Role]` | Full JD analysis + tailored build with approval gate |
| `/scan [Company] [Role]` | 6-second scan score across 3 layers: claim validation, JD alignment, problem fit |
| `/cover [Company] [Role]` | Cover letter via 11-phase engine |
| `/evidence [Company] [Role]` | Evidence of Excellence positioning document |
| `/stress-test` | Score every bullet on 7 dimensions |
| `/gap-analysis` | Honest fit analysis against a JD |

---

## The /scan command

The most novel piece. Based on eye-tracking research showing hiring managers spend ~6 seconds before deciding to read or reject. The scan evaluates three layers:

- **Layer 1:** Does the scan zone deliver proof of what your intro promises?
- **Layer 2:** Are the JD's Tier 1 requirements visible in the scan zone?
- **Layer 3:** Does the scan zone signal you solve the *real problem* behind the JD — not just the stated requirements?

Layer 3 is qualitative with a confidence marker. The JD always has a hidden problem behind the requirements. The scan reads for it.

---

## Setup

**Requirements:**
- [Claude Code](https://claude.ai/code) installed
- Node.js 18+
- Python 3

**Install:**
```bash
git clone https://github.com/kenfaulk/claude-resume-engine.git
cd claude-resume-engine
npm install
```

**First run:**
```bash
# Read STARTUP.md — it walks you through filling out your profile
cat STARTUP.md
```

---

## How it works

All your career data lives in one file: `personal/candidate.md`. That file is in `.gitignore` — it never leaves your machine. Every resume, cover letter, and analysis pulls from it. Change roles, change audiences, change nothing in the framework.

The build scripts generate `.docx` files via the `docx` npm package, then inject a floating competency sidebar via Python XML manipulation. Output is ATS-clean single-column with a visual reference panel — passes both automated screening and human review.

---

## Ground rules baked into the framework

- No em dashes. Ever. The rubric flags them as AI smell.
- No first person in bullets
- Never change locked metrics — if you documented $X impact, it stays $X
- Every build validates before being presented
- No build happens without explicit approval of the diff

---

## File structure

```
claude-resume-engine/
├── CLAUDE.md                     Session config — loads on every Claude Code start
├── SKILL.md                      Full framework: all commands, methodology, scoring
├── STARTUP.md                    First-run setup guide
├── personal/
│   └── candidate_template.md    Fill this in to create your candidate.md
├── framework/
│   ├── resume_format_v9.md      Format spec: fonts, colors, spacing, layout
│   ├── cover_letter_engine.md   11-phase cover letter methodology
│   └── scoring_rubric.md        Stress test scoring dimensions
├── scripts/
│   ├── resume_base_template.js  Base build script — copy and fill in
│   └── office/
│       └── validate.py          Post-build validation
└── outputs/                     Your generated files live here (gitignored)
```

---

## Philosophy

The resume is a filtering document, not a biography. The job is to pass a 6-second scan, survive ATS, and earn a 30-second read. Everything else is noise.

The framework forces you to think about audience before content, evidence before claims, and the hiring manager's real problem before the stated job requirements.

---

## License

MIT. Use it, adapt it, share it.
