# Resume Scoring Rubric
## Version: 1.0

---

## Bullet-level scoring

Score every bullet on 7 dimensions:

| Category | Weight | What to evaluate |
|---|---|---|
| Impact | /10 | Does the outcome matter to any audience? |
| Readability | /10 | One read, understood immediately? |
| Believability | /10 | Would a hiring manager trust this? |
| AI Generated % | % | Lower is better. Target under 15% |
| Business Value | /10 | Revenue, cost, time, or risk impact? |
| Keyword Value | /10 | TPM-relevant keywords present? |
| Recruiter Comprehension | /10 | Clear to non-semiconductor audience? |

**Target overall score per bullet: 9.0+**
**Block average below 8.5 requires rewrite before locking.**
**AI smell target: under 15% per bullet, under 12% block average.**

---

## Block-level scoring

After scoring individual bullets, score the full block:

| Dimension | Score | Notes |
|---|---|---|
| Block average | /10 | Average of all bullet scores |
| Weakest bullet | Identify | Flag for review or drop |
| AI smell average | % | Flag if any bullet over 20% |
| Drop candidates | List | Bullets scoring under 8.0 |

---

## Resume-level scoring

| Section | What to score |
|---|---|
| Summary | Message clarity, metric inclusion, 8-second read |
| Competency table | ATS viability, recruiter value, AI smell, meaningfulness |
| SiClarity block | Credibility, jargon level, audience comprehension |
| Intel TPM block | Metric density, believability, keyword coverage |
| Ops Manager block | Budget, people, process signals |
| Sr Product Engineer | Business impact, outcome clarity |
| SW Eng Manager | Relevance for age of role |
| Education | Credential completeness, gap risk |
| Patents/Publications | Signal value vs clutter |
| Leadership | Audience recognition of memberships |

**Target overall resume score: 9.0+**
**Realistic ceiling without degree: 9.1**

---

## Competency table cell scoring

Score every cell on 4 dimensions:

| Dimension | Scale | Notes |
|---|---|---|
| ATS viability | /10 | Will ATS find this keyword? |
| Recruiter value | /10 | Does a TPM screener recognize this? |
| Meaningfulness | /10 | Is this specific and defensible? |
| AI smell | /10 | Lower = more human. Flag if over 7. |

**Drop candidates: any cell scoring under 7 on recruiter value or AI smell over 8.**

---

## Cover letter quality rubric

Score 1-5 on each:

| Category | 1 = Weak | 3 = Adequate | 5 = Strong |
|---|---|---|---|
| Role alignment | Generic | Some fit shown | Clearly aligned to role's real needs |
| Bridge logic | Missing | Present but thin | Strong connection between need and expertise |
| Proof quality | Vague | Some specifics | High-value, relevant proof |
| Memorability | Forgettable | Some distinctiveness | Clear identity hook remains |
| Resume duplication control | Rehash | Mixed | Selective, interpretive, non-redundant |
| One-page discipline | Bloated | Slightly crowded | Tight and focused |
| Tone | Generic/eager | Serviceable | Direct, credible, professional |

**Passing target: average 4.0+ with no score below 3 in Role alignment, Bridge logic, or Proof quality.**

---

## AI smell detection — what triggers it

High AI smell indicators:
- Bullet leads with gerund + abstract noun ("Driving organizational excellence...")
- Excessive adjectives without evidence ("highly complex", "deeply impactful")
- Passive construction without agent ("was responsible for")
- Generic management phrases ("stakeholder engagement", "cross-functional collaboration")
- Metric prefix bold format ("40% improvement --")
- Three-part lists that feel formulaic
- "Leveraged" as a verb
- "Ensured" without specifics
- Any use of em dashes

Low AI smell indicators:
- Specific named tools, products, nodes, or organizations
- Before/after metrics with context
- Named decisions with consequences
- Action verbs that imply judgment (championed, killed, redirected, proved)
- Two-sentence bullets where each sentence owns a distinct idea
- Outcomes that include "why it mattered" not just "what happened"
