Generate a cover letter for a specific company and role.

The user will provide: /cover [Company] [Role]

Steps:
1. Read personal/candidate.md for proof bank and locked content
2. Read framework/cover_letter_engine.md for the full 11-phase methodology
3. Check outputs/[Company]/[Role]/JD.md — use if exists, otherwise ask user to paste JD
4. Execute the full cover letter engine:

   Phase 1 - Intake: collect JD, role, company, optional hiring manager name
   Phase 2 - JD Decomposition: extract responsibilities, qualifications, soft skills, tools, hidden business needs
   Phase 3 - Prioritization: rank Tier 1 critical, Tier 2 important, Tier 3 supporting
   Phase 4 - Experience Matching: for each Tier 1 requirement write mirror statement, proving statement, outcome statement
   Phase 5 - Pattern Detection: identify repeatable strength patterns across candidate experience
   Phase 6 - Bridge Construction: connect role needs to candidate strength pattern
   Phase 7 - Identity Hook: select one memorable sentence the reader keeps
   Phase 8 - Selective Proof: choose 2 to 4 proof points only
   Phase 9 - Letter Assembly: write 4 paragraphs, 250-400 words
   Phase 10 - Quality Control: run all 7 checks, require average 4.0+ to pass
   Phase 11 - Output Variants: full letter, short email version, application text box version

5. Show alignment table to user before writing the letter
6. Write draft and run quality checks
7. If quality checks fail, revise and recheck
8. Save full letter to outputs/[Company]/[Role]/[Name]_CoverLetter_[Company]_v1.md
9. Append to outputs/build_log.md
10. Present all output variants

Hard rules:
- Never rehash the resume
- Lead with relevance not enthusiasm
- Use 2 to 4 proof points only
- Every paragraph must advance the fit argument
- One page discipline always
- Never use em dashes anywhere ever
- The cover letter is a sales pitch for how the candidate makes the hiring manager's life better
