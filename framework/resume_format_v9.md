# Resume Format Specification
## Version: v9 (locked final)
## Example candidate: Fred Flintstone — Heavy Equipment Operator, Quarryland CA

This file defines the exact format, fonts, layout, spacing, and code patterns for a resume built with this framework.
Load this file at the start of any resume session. Follow it exactly.
Replace the example content in the Locked Experience Content section with your own candidate data from candidate.md.

---

## Quick Start — What To Do When Loaded

1. Read this entire file before writing any code
2. Use `scripts/resume_base_template.js` as the starting point
3. Only change **content** (bullets, summary, competencies) to match a new JD
4. Never change **format, fonts, spacing, or layout** without explicit user approval
5. Output file: always write to `outputs/`

---

## File & Build Info

| Property | Value |
|---|---|
| Working script | `scripts/resume_base_template.js` (copy and fill in) |
| npm dependency | `docx@9.5.3` |
| Build command | `node scripts/resume_[Candidate]_Base_v1.js` |
| Output filename | `[CandidateName]_[Company]_[Role]_v[n].docx` |

---

## Page Setup

| Property | Value |
|---|---|
| Paper | US Letter (12240 x 15840 DXA) |
| Left/Right margins | 936 DXA (0.65 inch) |
| Top/Bottom margins | 720 DXA (0.5 inch) |
| Content width | 10368 DXA |
| Layout | **Single column — NO sidebar, NO two-column layout** |
| Target length | 2 pages |
| File format | .docx always — never PDF for ATS submission |

---

## Font — CALIBRI ONLY

**Every single text element uses Calibri. No exceptions. Never Arial. Never any other font.**

| Element | Size (pt) | Size (half-points) | Style | Color |
|---|---|---|---|---|
| Name | 20pt | 40hp | Bold | #1F4E79 dark blue |
| Tagline / subtitle | 12pt | 24hp | Bold | #2E75B6 mid blue |
| Section headers | 11.5pt | 23hp | Bold + blue underline border | #2E75B6 mid blue |
| Company names | 11.5pt | 23hp | Bold | #1A1A1A dark |
| Job titles | 11pt | 22hp | Bold | #2E75B6 mid blue |
| Body text / bullets | 10.5pt | 21hp | Regular | #1A1A1A dark |
| Context lines | 10.5pt | 21hp | Italic | #555555 mid gray |
| Dates | 9.5pt | 19hp | Italic | #888888 |
| Technology line label | 9.5pt | 19hp | Bold | #2E75B6 mid blue |
| Technology line items | 9.5pt | 19hp | Regular | #555555 mid gray |
| Competency col headers | 10pt | 20hp | Bold | #FFFFFF white |
| Competency items | 10.5pt | 21hp | Regular | #1A1A1A dark |

---

## Color Palette

| Name | Hex | Usage |
|---|---|---|
| Dark Blue | #1F4E79 | Name only |
| Mid Blue | #2E75B6 | Section headers, job titles, tagline, table header bg, tech label |
| Dark | #1A1A1A | Body text, company names, bullet text |
| Mid Gray | #555555 | Locations, context lines, technology items, education sub-items |
| Date Gray | #888888 | Date text only |
| White | #FFFFFF | Page background, competency header text |

---

## Document Structure — Section Order (never change this order)

1. Name
2. Contact line
3. Tagline
4. Summary (no section header label — flows directly from tagline)
5. CORE COMPETENCIES (section header + categorized list + technology line)
6. PROFESSIONAL EXPERIENCE (section header + jobs reverse chronological)
7. EDUCATION
8. PATENTS & PUBLICATIONS (remove if not applicable)
9. LEADERSHIP, DEVELOPMENT & MEMBERSHIPS (combined single section)

---

## Section Header Style

```javascript
function sectionHeader(text) {
  return new Paragraph({
    spacing: { before: 160, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "2E75B6", space: 2 } },
    children: [new TextRun({ text: text.toUpperCase(), font: "Calibri", size: 23,
      bold: true, color: "2E75B6" })]
  });
}
```

---

## Header Block (Name / Contact / Tagline)

```javascript
// Name — CENTER ALIGNED
new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 16 },
  children: [new TextRun({ text: "FRED FLINTSTONE", font: "Calibri", size: 40,
    bold: true, color: "1F4E79" })]
})

// Contact — CENTER ALIGNED
new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 16 },
  children: [
    new TextRun({ text: "555-BEDROCK", font: "Calibri", size: 21, color: "555555" }),
    new TextRun({ text: "   •   ", font: "Calibri", size: 21, color: "555555" }),
    new TextRun({ text: "fred@bedrock.com", font: "Calibri", size: 21, color: "2E75B6" }),
    new TextRun({ text: "   •   ", font: "Calibri", size: 21, color: "555555" }),
    new TextRun({ text: "linkedin.com/in/fred-flintstone/", font: "Calibri", size: 21, color: "2E75B6" }),
  ]
})

// Tagline — CENTER ALIGNED — update role/focus per JD, always keep top impact metric
new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 80 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "2E75B6", space: 2 } },
  children: [new TextRun({
    text: "Lead Boulder Tech  |  Aggregate Production & Crushing Operations  |  50,000 Tons Delivered",
    font: "Calibri", size: 24, bold: true, color: "2E75B6" })]
})
```

---

## Summary Rules

- **2 sentences maximum** — target 8-second read time
- **Must always include** the candidate's top locked metric, on-time delivery record, and years of experience
- **CENTER ALIGNED** — matches name, contact, tagline
- No section header label — flows directly under tagline
- Spacing: before 80, after 80
- Tailor sentence 1 to JD context; sentence 2 metrics are fixed and never change

**Example locked base text (Fred Flintstone):**
> "Veteran Heavy Equipment Operator with 15 years delivering precision rock crushing and aggregate production across Quarryland's largest infrastructure projects. 50,000 tons delivered, 100% on-time across 12 projects and 3 quarry sites."

Replace with your candidate's actual locked metrics from candidate.md.

---

## Core Competencies — Categorized Format (v9)

Clean hierarchy. ATS safe. Every skill has first-position eye contact.

### Structure
- Three named categories, each with a bold mid-blue heading
- One competency item per line in dark body text beneath each heading
- Calibri 9.5pt (19hp) for all items
- Category headings: bold, #2E75B6 mid blue
- Items: regular weight, #1A1A1A dark
- Followed immediately by Technology & Methods line
- Spacing: before 40 on first category, before 100 between categories, after 20 per item

### Example (Fred Flintstone — Base/Broad audience)

```javascript
const BASE_COMPETENCIES = [
  {
    heading: "Equipment & Operations",
    items: [
      "John Deere CB1220 Operation",
      "Multi-Ton Load Management",
      "Quarry Site Coordination",
      "Equipment Maintenance & Inspection",
      "Safety Protocol Compliance",
      "Blast Pattern Coordination",
    ]
  },
  {
    heading: "Production & Delivery",
    items: [
      "Aggregate Sizing & Grading",
      "Volume Throughput Optimization",
      "Material Delivery Scheduling",
      "Quality Control & Inspection",
      "Waste Reduction & Recovery",
    ]
  },
  {
    heading: "Team & Project Leadership",
    items: [
      "Crew Supervision (8 Technicians)",
      "Contractor Coordination",
      "Client Milestone Reporting",
      "Site Safety Leadership",
      "Training & Certification Programs",
    ]
  },
];
```

Replace with your candidate's competency pools from candidate.md.

### Tailoring rules for /tailor runs
- Swap items within categories to match JD keywords — never reorder categories
- Add a fourth category only with explicit user approval
- Skills already covered in bullets with proof: keep in competency block (double ATS hit)
- Skills orphaned (no bullet coverage): ask user before adding
- Never add terms not defensible in an interview
- Never exceed 20 items total across all categories

### Technology line — versions (swap per target audience)

Replace these with your candidate's technology lines from candidate.md.

**Base — broad audience:**
John Deere CB1220  ·  CAT 390F  ·  Blast Pattern Design  ·  Load & Haul Optimization  ·  MSHA Safety Standards  ·  Lean Production

**Infrastructure / Municipal:**
John Deere CB1220  ·  CAT 390F  ·  Blast Pattern Design  ·  Load & Haul Optimization  ·  MSHA Safety Standards  ·  Lean Production  ·  DOT Compliance  ·  Project Closeout Documentation

**Mining / Extraction:**
John Deere CB1220  ·  CAT 390F  ·  Blast Pattern Design  ·  Load & Haul Optimization  ·  MSHA Safety Standards  ·  Lean Production  ·  Overburden Removal  ·  Seam Identification  ·  Royalty & Volume Reporting

---

## Job Block Style

```javascript
function jobBlock(company, location, title, dates) {
  return [
    new Paragraph({
      spacing: { before: 140, after: 16 },
      children: [
        new TextRun({ text: company, font: "Calibri", size: 23, bold: true, color: "1A1A1A" }),
        new TextRun({ text: `  |  ${location}`, font: "Calibri", size: 21, color: "555555" }),
      ]
    }),
    new Paragraph({
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({ text: title, font: "Calibri", size: 22, bold: true, color: "2E75B6" }),
        new TextRun({ text: `   ${dates}`, font: "Calibri", size: 19, color: "888888", italics: true }),
      ]
    })
  ];
}
```

---

## Context Lines

- 1-2 sentences describing role scope — always italic prose, never a bullet
- Calibri 10.5pt italic #555555
- Spacing: before 0, after 40
- Reframe language per JD without changing the underlying facts

---

## Bullet Style

```javascript
// Numbering config
{
  reference: "bullets",
  levels: [{
    level: 0,
    format: LevelFormat.BULLET,
    text: "•",
    alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 380, hanging: 220 } } }
  }]
}
```

- Spacing: **before 20, after 20**
- Calibri 10.5pt (21hp)
- Always lead with number or outcome — never start with "Responsible for"
- Use `x` not `×` for ATS compatibility

---

## Spacing Reference

| Element | Before | After |
|---|---|---|
| Name | 0 | 16 |
| Contact | 0 | 16 |
| Tagline | 0 | 80 |
| Summary | 80 | 80 |
| Section header | 160 | 60 |
| Company name | 140 | 16 |
| Job title line | 0 | 40 |
| Context line | 0 | 40 |
| Bullet | 20 | 20 |
| Technology line | 60 | 30 |
| Education lines | 40 | 12 |
| Patent lines | 40 | 12 |
| Final section lines | 40 | 30 |

---

## Locked Experience Content — EXAMPLE (Fred Flintstone)

Replace everything below this line with your candidate's actual experience from candidate.md.
These are illustrative examples showing the format, not real content.

---

### Bedrock Construction Co. | Quarryland, CA | Lead Boulder Tech | 2019–Present
Context: Owned end-to-end rock crushing and aggregate production for Bedrock's flagship infrastructure contracts, managing an 8-person crew and 3 active quarry sites delivering 12,000 tons annually.

Bullets (all locked — reorder per JD relevance):
1. Delivered 50,000 tons of precision-graded aggregate across 12 infrastructure projects with 100% on-time completion, supporting Bedrock's new Overpass and 3 municipal contracts.
2. Optimized John Deere CB1220 crushing sequences to reduce cycle time by 35%, increasing daily throughput from 180 to 243 tons per shift.
3. Developed a rock waste recovery program that reclaimed 40% of previously discarded material, generating $2.8M in annual cost savings across 3 quarry sites.
4. Led crew certification program for 8 boulder technicians, achieving 100% MSHA compliance and zero lost-time incidents over 18 consecutive months.

### Slate Rock & Gravel | Quarryland, CA | Junior Boulder Tech | 2014–2019
Context: Supported boulder extraction and primary crushing operations for Slate Rock's commercial and municipal aggregate supply contracts across 2 active sites.

Bullets (all locked):
1. Operated CB1220 and CAT 390F crushing systems across 2 simultaneous quarry sites, maintaining 95% equipment uptime and delivering 8,500 tons per quarter.
2. Identified a loader pattern inefficiency that reduced turnaround time by 22%, adopted by site management as standard operating procedure across all Slate Rock quarry sites.
3. Completed advanced John Deere CB1220 operator certification, becoming the youngest technician in company history to reach lead-operator status.

### Pebble Industries | Quarryland, CA | Apprentice Boulder Tech | 2010–2014
Bullets (both locked):
1. Progressed to solo CB1220 operation within 18 months of hire, completing primary rock breaking and grading across 2 active quarry sites under senior operator mentorship.
2. Assisted delivery of 4,200 tons of aggregate for the Cobblestone Highway expansion, completing 3 weeks ahead of schedule.

---

## Education (example — replace with candidate.md)

- Heavy Equipment Operations  |  Bedrock Technical Institute
- Professional Development: MSHA Safety Certification, John Deere CB1220 Master Operator, Lean Production, Load & Haul Optimization

---

## Leadership, Development & Memberships (example — replace with candidate.md)

Two lines:
> Mentored 3 junior boulder technicians (technical & career development)  ·  Developed CB1220 operator certification program adopted company-wide
> International Union of Operating Engineers (IUOE)  ·  National Stone, Sand & Gravel Association (NSSGA)

---

## ATS Rules

- Single column layout only — no sidebar, no two-column table
- No × symbol — always use plain x
- Skills in main body flow — competency table in document body
- Standard section labels: PROFESSIONAL EXPERIENCE, EDUCATION, CORE COMPETENCIES
- No text boxes — all content in paragraph or table flow
- Dates: YYYY or YYYY – YYYY
- Submit .docx for online portals — never PDF unless required

---

## Hard Rules — Never Violate

- Never reintroduce two-column or sidebar layout
- Never use any font except Calibri
- Never hardcode bullet characters — always LevelFormat.BULLET
- Never use × — always x
- Never exceed 2 sentences in summary
- Never change any locked metric from candidate.md
- Never bold a full bullet — lead with outcome, no bold prefix format
- Never use em dashes anywhere — not in bullets, summaries, context lines, or chat

---

## How To Adapt For A New Job Description

1. Load this file and the current base build script
2. Update **tagline** — match role title and focus to JD
3. Update **summary sentence 1** — reframe context to JD industry/domain
4. Update **Core Competencies** — swap items to match JD keywords
5. Update **Technology line** — add/remove tech terms per JD audience
6. Reorder **experience bullets** — most JD-relevant bullets go first within each role
7. Reframe **context lines** — adjust italic descriptions to JD language
8. Never change locked metrics, dates, company names, or education
9. Run /scan after rebuild to verify JD match score
10. Name output: `[CandidateName]_[Company]_[Role]_v1.docx`
