Generate a tailored resume for a specific company and role.

The user will provide: /tailor [Company] [Role]

Steps:
1. Read personal/candidate.md for all locked content
2. Read framework/resume_format_v9.md for format rules
3. Ask the user to paste the full job description
4. Run gap analysis against candidate profile:
   - Identify strong alignment (candidate owns this clearly)
   - Identify partial alignment (honest but requires reframing)
   - Identify gaps (do not claim these)
5. Propose changes:
   - Tagline update to match role
   - Summary sentence 1 reframe for audience
   - Competency table column selection (choose the appropriate audience pool from candidate.md)
   - Tech line selection (choose the appropriate variant from candidate.md)
   - Bullet reordering — most JD-relevant bullets first
   - Any bullet reframing needed (honest reframes only — never fabricate)
6. Show proposals to user and get approval before building
7. Write tailored build script to scripts/resume_[Company]_[Role]_v1.js
8. Run: node scripts/resume_[Company]_[Role]_v1.js
9. Validate output: python3 scripts/office/validate.py [output file]
10. Generate a content snapshot: outputs/[Company]/[Role]/[Name]_[Company]_[Role]_v1_content.md with scan zones labeled
11. Save JD to outputs/[Company]/[Role]/JD.md
12. Append to outputs/build_log.md
13. Confirm build complete

Hard rules:
- Never fabricate experience or metrics
- Never use em dashes anywhere ever
- Never change locked metrics
- Always get user approval before building
