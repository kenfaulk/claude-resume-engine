Generate an Evidence of Excellence positioning document for a specific company and role.

The user will provide: /evidence [Company] [Role]

This is NOT a cover letter. It is a pre-letter alignment document that answers:
"Why is this candidate a strong and credible fit for this specific problem?"

Steps:
1. Read personal/candidate.md for proof bank and locked content
2. Read framework/cover_letter_engine.md for methodology
3. Check outputs/[Company]/[Role]/JD.md — use if exists, otherwise ask user to paste JD
4. Run all 8 analysis phases before writing anything:

   Phase 2 - JD Decomposition: extract explicit requirements and hidden business needs
   Phase 3 - Tier 1 / Tier 2 / Tier 3 prioritization of requirements
   Phase 4 - Requirement to mirror / proving / outcome mapping table
   Phase 5 - Repeatable strength pattern detection
   Phase 6 - Bridge construction: connect role needs to candidate strength pattern
   Phase 7 - Identity hook: one sentence the reader keeps
   Phase 8 - Select 2 to 4 proof points only

5. Show alignment table and identity hook to user before writing
6. Write the Evidence of Excellence — 4 paragraphs, 300-400 words
7. Run quality checks — must score 4.0+ average, no Tier 1 need unaddressed
8. Output full document plus:
   - Short email version (5-7 sentences)
   - "Why should we hire you?" interview answer
   - "Why this role?" interview answer
9. Save to outputs/[Company]/[Role]/[Name]_Evidence_[Company]_v1.md
10. Append to outputs/build_log.md

Hard rules:
- Never rehash the resume — interpret, do not list
- Add information NOT in the resume that exists in candidate.md
- Lead with relevance, not enthusiasm
- Not to exceed 2200 characters in length
- No "I am passionate about" or equivalent
- No em dashes anywhere ever
- Every paragraph must advance the fit argument
- Identity hook must appear or be implied in P1 and P4
- Use 2 to 4 proof points maximum — never a fact dump
- Always name the hidden need, not just the explicit JD bullet
- Answer the questions of the JD pain point
