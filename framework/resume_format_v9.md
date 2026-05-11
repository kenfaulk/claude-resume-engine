# Ken Faulk — Resume Format Specification
## Version: v9 (locked final)
## Last Updated: April 2026

This file defines the exact format, fonts, layout, spacing, and code patterns for Ken's resume.
Load this file at the start of any resume session. Follow it exactly.
The working script is `resume_base_v9.js`. To regenerate: `node scripts/resume_base_v9.js`

---

## Quick Start — What To Do When Loaded

1. Read this entire file before writing any code
2. Use `resume_base_v9.js` as the base script — do not start from scratch
3. Only change **content** (bullets, summary, competencies) to match a new JD
4. Never change **format, fonts, spacing, or layout** without Ken's explicit approval
5. Output file: always copy to `/mnt/user-data/outputs/`

---

## File & Build Info

| Property | Value |
|---|---|
| Working script | `resume_base_v9.js` |
| npm dependency | `docx@9.5.3` (already installed globally) |
| Build command | `node scripts/resume_base_v9.js` |
| Output filename | `Ken_Faulk_[Company]_[Role]_v[n].docx` |

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
| Dark | #1A1A1A | Body text, company names, bullet metric prefix |
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
8. PATENTS & PUBLICATIONS
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
  children: [new TextRun({ text: "KENNETH FAULK", font: "Calibri", size: 40,
    bold: true, color: "1F4E79" })]
})

// Contact — CENTER ALIGNED
new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 16 },
  children: [
    new TextRun({ text: "916-836-7757", font: "Calibri", size: 21, color: "555555" }),
    new TextRun({ text: "   •   ", font: "Calibri", size: 21, color: "555555" }),
    new TextRun({ text: "kfaulk1@gmail.com", font: "Calibri", size: 21, color: "2E75B6" }),
    new TextRun({ text: "   •   ", font: "Calibri", size: 21, color: "555555" }),
    new TextRun({ text: "linkedin.com/in/ken-faulk/", font: "Calibri", size: 21, color: "2E75B6" }),
  ]
})

// Tagline — CENTER ALIGNED — update role/focus per JD, always keep $122M Business Impact
new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 80 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "2E75B6", space: 2 } },
  children: [new TextRun({
    text: "Sr. Technical Program Manager  |  Global Manufacturing & Technology Operations  |  $122M Business Impact",
    font: "Calibri", size: 24, bold: true, color: "2E75B6" })]
})
```

---

## Summary Rules

- **2 sentences maximum** — target 8-second read time
- **Must always include:** $122M business impact, 100% on-time delivery, 25+ years
- **CENTER ALIGNED** — matches name, contact, tagline
- No section header label — flows directly under tagline
- Spacing: before 80, after 80
- Tailor sentence 1 to JD context; sentence 2 metrics are fixed and never change

**Locked base text:**
> "Senior Technical Program Manager with 25+ years driving complex multi-workstream programs from concept through delivery across global manufacturing and technology operations. $122M documented business impact, 100% on-time delivery, across 5 global sites and 9 product launches."

---

## Core Competencies — Categorized Format (v9)

**The inline dot-separated keyword line is retired.** Replaced with bold category headings and one item per line.
No dots. No color block. No table. Clean hierarchy. ATS safe. Every skill has first-position eye contact.

### Structure
- Three named categories, each with a bold mid-blue heading
- One competency item per line in dark body text beneath each heading
- Calibri 9.5pt (19hp) for all items
- Category headings: bold, #2E75B6 mid blue
- Items: regular weight, #1A1A1A dark
- Followed immediately by Technology & Methods line
- Spacing: before 40 on first category, before 100 between categories, after 20 per item

### Rendering function
```javascript
const BASE_COMPETENCIES = [
  {
    heading: "Program Management & Governance",
    items: [
      "PMO Governance & Scaling",
      "Full-Lifecycle Program Management",
      "Schedule & Milestone Tracking",
      "Risk Register & Dependency Management",
      "Lab & Production Readiness",
      "Change Control Management",
      "Program Risk & Issue Resolution",
    ]
  },
  {
    heading: "Operations & Continuous Improvement",
    items: [
      "Lean Six Sigma Black Belt (LSS BB)",
      "Yield & Process Optimization",
      "Kaizen / Continuous Improvement",
      "CapEx Planning & Management",
      "Budget Forecasting & Variance",
      "Cost Reduction & CapEx Control",
    ]
  },
  {
    heading: "Leadership & Stakeholder Management",
    items: [
      "Team Development & Mentorship",
      "VP & Executive Reporting",
      "Vendor SOW Management",
      "Executive Stakeholder Management",
    ]
  },
];

function competencyCategoryBlock(categories) {
  const paragraphs = [];
  categories.forEach((cat, catIdx) => {
    paragraphs.push(new Paragraph({
      spacing: { before: catIdx === 0 ? 40 : 100, after: 30 },
      children: [run(cat.heading, { size: 19, bold: true, color: C.midBlue })]
    }));
    cat.items.forEach(item => {
      paragraphs.push(new Paragraph({
        spacing: { before: 0, after: 20 },
        children: [run(item, { size: 19, color: C.dark })]
      }));
    });
  });
  return paragraphs;
}
```

### Tailoring rules for /tailor runs
- Swap items within categories to match JD keywords — never reorder categories
- Add a fourth category only with explicit user approval
- "Lean Six Sigma Black Belt (LSS BB)" is the full-text form — never abbreviate to "LSS BB" alone
- Skills already covered in bullets with proof: keep in competency block (double ATS hit)
- Skills orphaned (no bullet coverage): ask user before adding
- Never add terms not defensible in an interview
- Never add "Omnichannel" — removed intentionally

### Technology line — THREE VERSIONS (swap per target audience)

**Base — broad audience (Tesla, GD, Motorola, ops/TPM roles):**
MS Project  ·  JIRA / Confluence  ·  PowerBI / Looker / ELM  ·  Agile / Scrum  ·  DOE / SPC  ·  Lean Six Sigma

**Defense:**
MS Project  ·  JIRA / Confluence  ·  PowerBI / Looker / ELM  ·  Agile / Scrum  ·  DOE / SPC  ·  Lean Six Sigma  ·  NDA & IP Compliance Governance  ·  Vendor SOW Management

**Semiconductor — (KLA, Lam Research, AMAT, Synopsys, Micron):**
MS Project  ·  JIRA / Confluence  ·  PowerBI / Looker / ELM  ·  Agile / Scrum  ·  DOE / SPC  ·  Lean Six Sigma  ·  Foundry Partnerships (TSMC / Samsung / Intel)  ·  GAA / CFET / FinFET  ·  HBM / TSV Integration  ·  3DIC / Heterogeneous Integration

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
- Calibri 10.5pt italic #1A1A1A
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
- **Format: METRIC — narrative** (everything before em dash is bold, after is regular)
- Always lead with number or outcome — never start with a verb
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

## Locked Experience Content

### SiClarity Inc | Director, AI Product Development | 2024–2025
Context: Owned cross-functional product development for an AI-powered process development and analysis platform targeting $20M revenue.

Bullets (all 4 locked):
1. Analyzed tier-1 customer requirements and competitive landscape to define AI platform vision in a $2.14B market, delivering 4x faster process insights and positioning product for enterprise adoption.
2. Architected AI-driven analysis platform that accelerated simulation-to-silicon validation by 95%, reducing process development cycle time for next-generation chip architecture through hardware/software integration and agile delivery.
3. Translated complex AI and engineering software development progress into business impact assessments enabling strategic decisions on $20M product roadmap through monthly board presentations.
4. Owned product requirements, business model, and roadmap using agile delivery methodology, running biweekly stakeholder reviews across AI, engineering, and executive teams.

### Intel Corporation | Technical Program Lead – Product Engineering | 2014–2024
Context: Drove cross-functional programs influencing design, manufacturing, validation, and vendor teams across 5 global sites, with go/no-go program authority and direct VP-level reporting.

Bullets (all 6 locked — reorder per JD relevance):
1. Identified and delivered a new metal ECO approach that reduced dependency and complexity of base layers, saving $2.4M+ per stepping and cutting cycle time by 8-10 weeks. TSMC subsequently adopted it as a standard N3 and N2 offering alongside existing ECO solutions.
2. Championed a new debug methodology across multiple product lines, building a data-driven business case to secure executive alignment and drive standardization across global teams. Achieved 80% feature coverage and reduced root cause analysis cycle time by 40%.
3. Architected debug solutions for next-generation heterogeneous packaging technology, delivering 16% device access improvement and 50% early boot failure recovery across client, HPC, and server product lines.
4. Owned enterprise-wide CAD platform transformation across 2,500 engineers at 9 global sites, with go/no-go launch authority and executive change management accountability. Drove conversion success from 40% to 97% and delivered 20x performance improvement.
5. Managed compute and storage capacity planning for 120 engineers across 5 global sites, aligning quarterly forecasts to project demand and driving a 50% reduction in compute consumption.
6. Governed $2M Synopsys Avalon SOW across procurement, licensing, and performance accountability, maintaining 99% uptime and 95% SLA compliance for 2,500 engineers. Managed weekly vendor cadence with JIRA/Confluence tracking and delivered quarterly KPI reporting to executive leadership.

### Intel Corporation | Operations Manager – Si Debug Lab | 2011–2014
Context: Owned and governed $13M debug lab and operations execution for 14nm and 10nm product lines.

Bullets (all 4 locked):
1. Owned lab readiness and execution for 14nm and 10nm nodes, delivering 7 products to on-time launch across global manufacturing sites.
2. Streamlined workflow and equipment suite through Lean Six Sigma optimization, improving utilization 15% and generating $2M in annual savings.
3. Established DOE/SPC-based FIB validation framework, eliminating $8M in avoidable CapEx.
4. Developed a high-performing team through mentorship and 1:1 coaching, achieving a 20% promotion rate.

### Intel Corporation | Senior Product Engineer | 2008–2011
Bullets (both locked):
1. Recovered and stabilized yield for 22nm client graphics from 10% to 90%, enabling production launch.
2. Drove data-based analysis proving a planned $100M tester upgrade was unviable, redirecting to an alternate DFT strategy and eliminating unnecessary capital spend.

### Intel Corporation | Software Engineering Manager | 2004–2008
Bullets (locked):
1. Directed development of failure analysis ATE debug tools, achieving 100% on-time readiness and 10x performance improvement.

**Software Engineer 1999–2004: intentionally omitted — too old, adds no value**

---

## Education (locked)

- Computer Science & Electrical Engineering  |  Arizona State University
- Electron Microscopy  |  San Joaquin Delta College
- Professional Development: Lean Six Sigma, Agile/Scrum, PMP Candidate, Change Management, DOE/SPC Methodologies, Program Management

**"Change Management" must always appear in the Professional Development line**

---

## Patents & Publications (condensed — 2 lines, locked)

**Line 1 (bold):**
Integrated Circuit Alignment Marks — US Patent 5,936,311  ·  AI/ML based DRC Localized Adjuster — Patent Filed

**Line 2:**
3 Intel Technical Publications on semiconductor process engineering and CAD tooling methodology

---

## Leadership, Development & Memberships (combined, locked)

Two lines:
> Mentored 8 engineers (technical & career development)  ·  Developed training programs for FIB, lab operations, material handling, and NDA/IP Compliance
> PMI  ·  ASM International  ·  EDFAS

---

## ATS Rules

- Single column layout only — no sidebar, no two-column table
- No × symbol — always use plain x
- Skills in main body flow — competency table in document body
- Standard section labels: PROFESSIONAL EXPERIENCE, EDUCATION, CORE COMPETENCIES
- No text boxes — all content in paragraph or table flow
- Dates: YYYY or YYYY – YYYY, no spaces inside year
- Submit .docx for online portals — never PDF unless required

---

## Hard Rules — Never Violate

- Never reintroduce two-column or sidebar layout
- Never use any font except Calibri
- Never hardcode bullet characters — always LevelFormat.BULLET
- Never use × — always x
- Never exceed 2 sentences in summary
- Never add "Omnichannel"
- Never use "Proven" for SiClarity — use "Record of architecting" or "Owned"
- Never bold the narrative half of a bullet — bold prefix only (before em dash)
- Never change any metric ($122M, $20M, $2.4M, 99%, 20x, 100%, etc.)
- Always keep $122M in both tagline and summary

---

## How To Adapt For A New Job Description

1. Load this file and `resume_base_v9.js`
2. Update **tagline** — match role title and focus to JD
3. Update **summary sentence 1** — reframe context to JD industry/domain
4. Update **Core Competencies** — swap items to match JD keywords 
5. Update **Technology line** — add/remove tech terms per JD
6. Reorder **Intel TPM bullets** — most JD-relevant bullets go first
7. Reframe **context lines** — adjust italic descriptions to JD language
8. Never change metrics, dates, company names, or education
9. Run scorecard after rebuild to verify JD match score
10. Name output: `Ken_Faulk_[Company]_[Role]_v1.docx`

---

## Version History

| Version | Key Change |
|---|---|
| v1 | Initial tailored resume for Intel ISS role |
| v2 | Reordered Intel TPM bullets, SOW language added |
| v3 | Summary → 8-second 2-sentence version |
| v4 | Multi-workstream bullet cleaned to Option C |
| v5 | Dashboard bullet trimmed |
| v6 | Full rebuild: single-column, Calibri, 3-column competency table, ATS-clean |
| v7 | 4-column competency table + Data & Analytics column, solid pale blue rows, no column dividers, condensed patents to 2 lines, merged Leadership/Memberships, dropped SW Engineer 1999-2004, tightened spacing to 2 pages |
| v8 | Header block centered (name/contact/tagline/summary), SiClarity plain language pass (4 bullets, semiconductor jargon removed), competency table updated to broad audience (Lab & Production Readiness, Kaizen/Continuous Improvement), Intel TPM reduced to 6 locked bullets, Ops Manager/Sr Product Eng/SW Eng bullets rewritten (no em dashes), patents reformatted (title first, consistent format), publications condensed to one-liner, Leadership split to two lines with PMI added |
| v9 (current) | Competency block redesigned from inline dot-separated keyword lines to categorized format. Three named categories (Program Management & Governance, Operations & Continuous Improvement, Leadership & Stakeholder Management) with bold mid-blue headings and one item per line. Dead code removed from build script. "Lean Six Sigma Black Belt (LSS BB)" spelled out in full for ATS exact-match. CLAUDE.md stripped to thin bootstrap. SKILL.md is now sole source of truth for commands and ground rules. |

