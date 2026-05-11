Build the base resume.

Steps:
1. Read personal/candidate.md for all locked content and metrics
2. Read framework/resume_format_v9.md for format rules, fonts, spacing, and colors
3. Write a complete node.js build script to scripts/resume_base_v1.js using the docx@9.5.3 library
4. The script must follow ALL format rules exactly — Calibri only, correct colors, centered header, 4-column competency table, bullet numbering config, correct spacing
5. Use the base/broad audience content — base tagline, base summary, base competency table, base tech line, base bullets
6. Run the script: node scripts/resume_base_v1.js
7. Validate the output: python3 scripts/office/validate.py outputs/[Name]_Base_v1.docx
8. If validation fails, fix the script and rebuild until it passes
9. Generate a content snapshot: outputs/[Name]_Base_v1_content.md with scan zones labeled
10. Append to outputs/build_log.md: date, company=Base, role=Base, filename, version, notes
11. Confirm build complete and validation passed
