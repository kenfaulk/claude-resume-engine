Run the 6-second scan simulation against a tailored resume.

The user will provide: /scan [Company] [Role]

Steps:
1. Load resume content in this order:
   - First: read outputs/[Company]/[Role]/[Name]_[Company]_[Role]_v[latest]_content.md if it exists
   - Fallback: read the most recent scripts/resume_[Company]_[Role]_v*.js
   - If neither exists: ask user to paste the resume content
2. Read outputs/[Company]/[Role]/JD.md — use if exists, otherwise ask user to paste JD
3. Identify the 6-second scan zone:
   - Zone 1 (0-2s): Name, tagline, summary
   - Zone 2 (2-4s): Most recent job title, company, context line, bullets 1-2
   - Zone 3 (4-6s): Second job title, company, context line, bullet 1
   - Note: sidebar competency block is a visual reference only — not part of the scan zone
4. Run Layer 1 — Claim Validation (scored /10, weight 30%):
   - What does the intro (tagline + summary) claim the candidate is?
   - Does the scan zone deliver proof of those claims?
   - Score: 10 = every claim has scan-zone evidence. 7 = most claims proven. Below 7 = claims float unsupported.
5. Run Layer 2 — JD Alignment (scored /10, weight 70%):
   - Extract Tier 1 requirements from the JD (must-haves, repeated phrases, lead responsibilities)
   - For each Tier 1 requirement: is it visible in the scan zone?
   - Score: 10 = all Tier 1 visible. 7 = most visible. Below 7 = key requirements buried.
6. Calculate combined score: (L1 x 0.30) + (L2 x 0.70)
7. Run Layer 3 — Problem Fit (qualitative only — no numeric score, no weighting):
   - What is the real problem behind this JD? (not the stated requirements — the pain that generated them)
   - Look for operational phrases: "proactively identify risks," "drive functional teams," "balance schedule quality and cost," "plan of record" — these are written from past pain
   - Does the scan zone signal the candidate solves that real problem?
   - Output: one paragraph with a confidence marker: HIGH / MEDIUM / LOW
   - Layer 3 never contributes to the numeric score — inference confidence is variable
8. Present results:

   SCAN RESULTS — [Company] [Role]
   --------------------------------
   Layer 1 — Claim Validation: [X]/10
   Layer 2 — JD Alignment:     [X]/10
   Combined Score:              [X]/10  [PASS ≥7.0 / FAIL <7.0]

   Layer 3 — Problem Fit [CONFIDENCE: HIGH/MEDIUM/LOW]
   [One paragraph — what the real problem is and whether the scan zone addresses it]

   [If PASS]: Resume clears the 6-second threshold.
   [If FAIL]: One specific reorder recommendation — which bullet to move to which position and why.

Hard rules:
- Layer 3 is qualitative only — never assign a number or weight to it
- Never recommend fabricating content to pass the scan
- One reorder recommendation maximum on a fail — not a list of fixes
- Pass threshold is 7.0. Target is 9.0+.
