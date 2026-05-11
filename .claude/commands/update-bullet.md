Replace a specific bullet and rebuild the resume.

The user will provide: /update-bullet [section] [number]

Valid sections: the company/role section names as they appear in personal/candidate.md
(e.g., the section headers in your experience blocks)

Steps:
1. Read personal/candidate.md to find the current bullet
2. Show the user the current bullet text
3. Ask the user for the plain language description of what the bullet should say
4. Propose a rewritten bullet following all ground rules:
   - No em dashes ever
   - No first person
   - No bold metric prefix format
   - Lead with outcome or ownership
   - Two sentences acceptable if each owns a distinct idea
5. Score the proposed bullet on all 7 rubric dimensions
6. If score is below 8.5 rewrite and rescore before showing user
7. Get user approval — lock or adjust
8. Update personal/candidate.md with the locked bullet
9. Rebuild the affected resume script
10. Validate output
11. Confirm lock and rebuild complete

Hard rules:
- Never fabricate metrics or experience
- Never change locked metrics
- Only lock bullets the user explicitly approves
