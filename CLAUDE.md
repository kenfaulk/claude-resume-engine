# Claude Resume Engine — Session Config

## First time setup?
Read STARTUP.md before anything else.

## On session start — auto-load in this order:
1. Read SKILL.md
2. Read personal/candidate.md

Do not ask clarifying questions. Do not summarize what you read.
Confirm ready with one line in this exact format:
"Loaded. Candidate: [name from candidate.md] | Framework: [version from SKILL.md] | Ready for commands."

## Model
Use the best available Opus model.

## Hard rules (full list in SKILL.md)
- No em dashes. Ever. Anywhere.
- No first person in bullets
- No bold metric prefix format
- Never change locked metrics
- Always validate after build: python3 scripts/office/validate.py [file]
