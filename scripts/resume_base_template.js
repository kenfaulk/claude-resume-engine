"use strict";
// ─────────────────────────────────────────────────────────────────────────────
// Claude Resume Engine — Base Build Script Template
//
// SETUP: Fill in your data from personal/candidate.md
// Replace every [PLACEHOLDER] with your actual content.
// Run: node scripts/resume_base_template.js
// Validate: python3 scripts/office/validate.py outputs/[YourName]_Base_v1.docx
//
// This script generates a .docx resume with:
//   - Single-column main content (ATS-safe)
//   - Floating competency sidebar (visual reference panel, not ATS-scanned)
//   - Calibri font throughout, locked color palette
// ─────────────────────────────────────────────────────────────────────────────

const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, LevelFormat } = require("docx");
const fs   = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ─── COLOR PALETTE ────────────────────────────────────────────────────────────
// Change these to match your preferred color scheme.
// Current: professional blue palette.
const C = {
  darkBlue: "1F4E79",   // Name only
  midBlue:  "2E75B6",   // Section headers, job titles, tagline
  paleBlue: "D6E8F5",   // Sidebar background
  dark:     "1A1A1A",   // Body text, bullets
  midGray:  "555555",   // Context lines, locations, tech items
  dateGray: "888888",   // Dates only
};

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────
function run(text, opts={}) {
  return new TextRun({ text, font:"Calibri", color:opts.color||C.dark,
    size:opts.size||21, bold:opts.bold||false, italics:opts.italics||false });
}

function sectionHeader(text) {
  return new Paragraph({ spacing:{before:160,after:60},
    border:{bottom:{style:BorderStyle.SINGLE,size:8,color:C.midBlue,space:2}},
    children:[run(text.toUpperCase(),{size:23,bold:true,color:C.midBlue})] });
}

function bullet(text) {
  return new Paragraph({ numbering:{reference:"bullets",level:0},
    spacing:{before:20,after:20}, children:[run(text,{size:21})] });
}

// Context lines: italic prose under each job title. Never a bullet.
function contextLine(text) {
  return new Paragraph({ spacing:{before:0,after:40},
    children:[run(text,{size:21,italics:true,color:C.midGray})] });
}

// Job block: returns [company paragraph, title+dates paragraph]
function jobBlock(company, location, title, dates) {
  return [
    new Paragraph({ spacing:{before:140,after:16}, children:[
      run(company,{size:23,bold:true,color:C.dark}),
      run(`  |  ${location}`,{size:21,color:C.midGray}) ]}),
    new Paragraph({ spacing:{before:0,after:40}, children:[
      run(title,{size:22,bold:true,color:C.midBlue}),
      run(`   ${dates}`,{size:19,italics:true,color:C.dateGray}) ]}),
  ];
}

const numbering = { config:[{ reference:"bullets", levels:[{
  level:0, format:LevelFormat.BULLET, text:"•", alignment:AlignmentType.LEFT,
  style:{paragraph:{indent:{left:380,hanging:220}}}
}]}]};

// ─── SIDEBAR COMPETENCY BOX ───────────────────────────────────────────────────
// This is a floating text box anchored to the right side of page 1.
// It is a LEGEND, not part of the main content flow.
// ATS scanners do not read it. Hiring managers use it for quick reference.
// Customize the categories and items from your candidate.md competency pools.
//
// boxH: height in EMU. Increase if content overflows, decrease if too much space.
//   ~5,800,000 = ~6.3 inches. Adjust in ~200,000 increments.
function buildTextBoxXml() {
  const boxW = 1828800;   // 2 inches wide — do not change
  const boxH = 5800000;   // Adjust height to fit your content
  const posX = 5349240;   // Right-aligned to content area — do not change
  const posY = 0;

  function esc(s) {
    return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }

  function wp(text, {sz=18,bold=false,color="1A1A1A",before=0,after=18}={}) {
    const b = bold ? "<w:b/><w:bCs/>" : "";
    return `<w:p><w:pPr><w:spacing w:before="${before}" w:after="${after}"/><w:jc w:val="left"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>${b}<w:color w:val="${color}"/><w:sz w:val="${sz}"/><w:szCs w:val="${sz}"/></w:rPr><w:t xml:space="preserve">${esc(text)}</w:t></w:r></w:p>`;
  }

  // ── EDIT: Replace with your competency categories and items from candidate.md
  // 3 categories, 5-7 items each, max 20 items total across all categories.
  const cats = [
    { heading:"[Category 1 Name]", items:[
      "[Competency item]",
      "[Competency item]",
      "[Competency item]",
      "[Competency item]",
      "[Competency item]"] },
    { heading:"[Category 2 Name]", items:[
      "[Competency item]",
      "[Competency item]",
      "[Competency item]",
      "[Competency item]",
      "[Competency item]"] },
    { heading:"[Category 3 Name]", items:[
      "[Competency item]",
      "[Competency item]",
      "[Competency item]",
      "[Competency item]",
      "[Competency item]"] },
  ];

  // ── EDIT: Replace with your technology / methods line from candidate.md
  const tech = [
    "[Tool or Method]",
    "[Tool or Method]",
    "[Tool or Method]",
    "[Tool or Method]",
    "[Tool or Method]",
    "[Tool or Method]",
  ];

  let inner = wp("CORE COMPETENCIES", {sz:20,bold:true,color:C.midBlue,before:0,after:60});
  cats.forEach((cat,i) => {
    inner += wp(cat.heading, {sz:18,bold:true,color:C.midBlue,before:i===0?0:80,after:28});
    cat.items.forEach(item => { inner += wp(item, {sz:17,color:C.dark,before:0,after:16}); });
  });
  inner += wp("Technologies & Methods", {sz:17,bold:true,color:C.midBlue,before:80,after:20});
  tech.forEach(t => { inner += wp(t, {sz:16,color:C.midGray,before:0,after:14}); });

  return [
    `<w:p>`,
    `<w:pPr><w:spacing w:before="0" w:after="0"/></w:pPr>`,
    `<w:r><w:rPr><w:noProof/></w:rPr>`,
    `<mc:AlternateContent xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006">`,
    `<mc:Choice Requires="wps">`,
    `<w:drawing>`,
    `<wp:anchor distT="0" distB="0" distL="114300" distR="114300" simplePos="0" relativeHeight="251659264" behindDoc="0" locked="0" layoutInCell="1" allowOverlap="1" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing">`,
    `<wp:simplePos x="0" y="0"/>`,
    `<wp:positionH relativeFrom="page"><wp:posOffset>${posX}</wp:posOffset></wp:positionH>`,
    `<wp:positionV relativeFrom="paragraph"><wp:posOffset>${posY}</wp:posOffset></wp:positionV>`,
    `<wp:extent cx="${boxW}" cy="${boxH}"/>`,
    `<wp:effectExtent l="0" t="0" r="0" b="0"/>`,
    `<wp:wrapNone/>`,
    `<wp:docPr id="101" name="CompetencyBox"/>`,
    `<wp:cNvGraphicFramePr/>`,
    `<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">`,
    `<a:graphicData uri="http://schemas.microsoft.com/office/word/2010/wordprocessingShape">`,
    `<wps:wsp xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape">`,
    `<wps:cNvSpPr txBx="1"><a:spLocks noChangeArrowheads="1"/></wps:cNvSpPr>`,
    `<wps:spPr>`,
    `<a:xfrm><a:off x="${posX}" y="${posY}"/><a:ext cx="${boxW}" cy="${boxH}"/></a:xfrm>`,
    `<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>`,
    `<a:solidFill><a:srgbClr val="${C.paleBlue}"/></a:solidFill>`,
    `<a:ln w="9525"><a:solidFill><a:srgbClr val="${C.midBlue}"/></a:solidFill></a:ln>`,
    `</wps:spPr>`,
    `<wps:txbx><w:txbxContent>${inner}</w:txbxContent></wps:txbx>`,
    `<wps:bodyPr insFit="normAuto"><a:prstTxWarp prst="textNoShape"><a:avLst/></a:prstTxWarp></wps:bodyPr>`,
    `</wps:wsp>`,
    `</a:graphicData>`,
    `</a:graphic>`,
    `</wp:anchor>`,
    `</w:drawing>`,
    `</mc:Choice>`,
    `<mc:Fallback>`,
    `<w:pict>`,
    `<v:rect xmlns:v="urn:schemas-microsoft-com:vml" id="vml_comp" style="position:absolute;width:144pt;height:457pt;z-index:251659264;mso-position-horizontal-relative:page;mso-position-vertical-relative:paragraph;mso-left:${Math.round(posX/914400*72)}pt;mso-top:0pt" fillcolor="#${C.paleBlue}" strokecolor="#${C.midBlue}" strokeweight="1pt">`,
    `<v:textbox inset="7.2pt,7.2pt,7.2pt,7.2pt"><w:txbxContent>${inner}</w:txbxContent></v:textbox>`,
    `</v:rect>`,
    `</w:pict>`,
    `</mc:Fallback>`,
    `</mc:AlternateContent>`,
    `</w:r>`,
    `</w:p>`,
  ].join("");
}

// ─── BUILD RESUME ─────────────────────────────────────────────────────────────
function buildResume() {
  const s = [];

  // ── HEADER ──────────────────────────────────────────────────────────────────
  // Edit: Replace placeholders with your data from candidate.md
  s.push(
    // Name — from candidate.md Display Name
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:16},
      children:[run("[YOUR FULL NAME IN CAPS]",{size:40,bold:true,color:C.darkBlue})]}),

    // Contact line — from candidate.md Personal Information
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:16},
      children:[
        run("[Your Phone]",{size:21,color:C.midGray}),
        run("   •   ",{size:21,color:C.midGray}),
        run("[your@email.com]",{size:21,color:C.midBlue}),
        run("   •   ",{size:21,color:C.midGray}),
        run("[linkedin.com/in/your-profile/]",{size:21,color:C.midBlue}),
      ]}),

    // Tagline — from candidate.md Tagline Options (Base/Broad)
    // Format: [Role Title]  |  [Focus Area]  |  [Top Impact Metric]
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:80},
      border:{bottom:{style:BorderStyle.SINGLE,size:8,color:C.midBlue,space:2}},
      children:[run(
        "[Your Title]  |  [Your Focus Area]  |  [Your Top Impact Metric]",
        {size:24,bold:true,color:C.midBlue})]}),

    // Summary — from candidate.md Summary Options (Base/Broad)
    // 2 sentences maximum. Sentence 1: context. Sentence 2: locked metrics.
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:80,after:80},
      children:[run(
        "[Sentence 1: title + years + domain]. [Sentence 2: top metric + delivery record + scale].",
        {size:21})]}),
  );

  // ── PROFESSIONAL EXPERIENCE ──────────────────────────────────────────────────
  // The sidebar text box injects here. Do not move the sectionHeader call.
  s.push(sectionHeader("Professional Experience"));

  // ── JOB BLOCK 1 — Most Recent Role ──────────────────────────────────────────
  // Replace with your most recent position from candidate.md
  s.push(
    ...jobBlock(
      "[Company Name]",
      "[City, State]",
      "[Your Title]",
      "[Start Year] - [End Year]"
    ),
    // Context line: italic prose describing role scope. Not a bullet.
    // Reframe language per JD audience — never change the underlying facts.
    contextLine("[Role scope: what you owned, what scale, what authority.]"),

    // Bullets: from candidate.md experience blocks
    // Use XYZ format (outcome first) or narrative — be consistent within a role.
    // Reorder per JD relevance. Never fabricate. Never change locked metrics.
    bullet("[Bullet 1: strongest outcome — metric + action + scope]"),
    bullet("[Bullet 2]"),
    bullet("[Bullet 3]"),
    bullet("[Bullet 4]"),
  );

  // ── JOB BLOCK 2 ─────────────────────────────────────────────────────────────
  s.push(
    ...jobBlock(
      "[Previous Company]",
      "[City, State]",
      "[Your Title]",
      "[Start Year] - [End Year]"
    ),
    contextLine("[Role scope description]"),
    bullet("[Bullet 1]"),
    bullet("[Bullet 2]"),
    bullet("[Bullet 3]"),
  );

  // ── JOB BLOCK 3 ─────────────────────────────────────────────────────────────
  // Continue pattern for remaining roles.
  // Drop roles older than 20 years unless uniquely relevant.
  s.push(
    ...jobBlock(
      "[Earlier Company]",
      "[City, State]",
      "[Your Title]",
      "[Start Year] - [End Year]"
    ),
    bullet("[Bullet 1]"),
    bullet("[Bullet 2]"),
  );

  // ── EDUCATION ────────────────────────────────────────────────────────────────
  s.push(
    sectionHeader("Education"),
    new Paragraph({spacing:{before:40,after:12},children:[
      run("[Degree or Field of Study]",{size:21,bold:true}),
      run("  |  [Institution Name]",{size:21,color:C.midGray})]}),
    new Paragraph({spacing:{before:40,after:12},children:[
      run("Professional Development: ",{size:21,bold:true}),
      run("[Certifications, methodologies, relevant training]",{size:21,color:C.midGray})]}),
  );

  // ── PATENTS & PUBLICATIONS ───────────────────────────────────────────────────
  // Remove this section from the script if not applicable.
  s.push(
    sectionHeader("Patents & Publications"),
    new Paragraph({spacing:{before:40,after:4},children:[
      run("[Patent Title]  ·  [Patent Number or Status]",{size:21,bold:true})]}),
    new Paragraph({spacing:{before:0,after:12},children:[
      run("[One-line description of what the patent does.]",{size:20,italics:true,color:C.midGray})]}),
  );

  // ── LEADERSHIP, DEVELOPMENT & MEMBERSHIPS ───────────────────────────────────
  s.push(
    sectionHeader("Leadership, Development & Memberships"),
    new Paragraph({spacing:{before:40,after:30},children:[
      run("[Mentoring, training programs developed, key non-title responsibilities]",{size:21})]}),
    new Paragraph({spacing:{before:40,after:30},children:[
      run("[Professional org]  ·  [Professional org]  ·  [Professional org]",{size:21})]}),
  );

  return new Document({ numbering, sections:[{
    properties:{page:{size:{width:12240,height:15840},margin:{top:720,bottom:720,left:936,right:936}}},
    children:s
  }]});
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
(async () => {
  // Edit: update CandidateName to match your Display Name
  const candidateName = "[CandidateName]";
  const version       = "v1";
  const outDir        = path.join(__dirname,"..","outputs");
  const tmpFile       = path.join(outDir,`_tmp_base_${version}.docx`);
  const outFile       = path.join(outDir,`${candidateName}_Base_${version}.docx`);
  fs.mkdirSync(outDir,{recursive:true});

  const buf = await Packer.toBuffer(buildResume());
  fs.writeFileSync(tmpFile,buf);
  console.log("Step 1: Base docx built —",buf.length,"bytes");

  const tbXml = buildTextBoxXml();

  const pyCode = `
import zipfile, os, shutil

src = r"${tmpFile}"
dst = r"${outFile}"
tmp = r"${path.join(outDir,'_sb_unpack')}"

if os.path.exists(tmp):
    shutil.rmtree(tmp)
os.makedirs(tmp)

with zipfile.ZipFile(src,'r') as z:
    z.extractall(tmp)

doc_path = os.path.join(tmp,'word','document.xml')
with open(doc_path,'r',encoding='utf-8') as f:
    xml = f.read()

marker = 'PROFESSIONAL EXPERIENCE'
m_idx = xml.find(marker)
if m_idx == -1:
    raise ValueError('Marker not found in document.xml')

before  = xml[:m_idx]
p_start = before.rfind('<w:p>')
if p_start == -1:
    p_start = before.rfind('<w:p ')
if p_start == -1:
    raise ValueError('Paragraph start not found before marker')

tbxml_path = r"${path.join(outDir,'_tb.xml')}"
with open(tbxml_path,'r',encoding='utf-8') as f:
    tbxml = f.read()

xml = xml[:p_start] + tbxml + xml[p_start:]

with open(doc_path,'w',encoding='utf-8') as f:
    f.write(xml)

with zipfile.ZipFile(dst,'w',zipfile.ZIP_DEFLATED) as zout:
    for root,dirs,files in os.walk(tmp):
        for file in files:
            fp  = os.path.join(root,file)
            arc = os.path.relpath(fp,tmp)
            zout.write(fp,arc)

shutil.rmtree(tmp)
os.remove(src)
print("Step 3: Docx assembled successfully")
`;

  const tbPath = path.join(outDir,"_tb.xml");
  const pyPath = path.join(outDir,"_inject.py");
  fs.writeFileSync(tbPath, tbXml, "utf8");
  fs.writeFileSync(pyPath, pyCode, "utf8");

  execSync(`python3 "${pyPath}"`, {stdio:"inherit"});

  fs.rmSync(tbPath);
  fs.rmSync(pyPath);

  const sz = fs.statSync(outFile).size;
  console.log(`Built: ${outFile}`);
  console.log(`Size:  ${(sz/1024).toFixed(1)} KB`);

  // ── CONTENT SNAPSHOT ────────────────────────────────────────────────────────
  // Used by /scan in future sessions. Update this section to match your actual content.
  const today        = new Date().toISOString().slice(0,10);
  const snapshotFile = outFile.replace(".docx","_content.md");
  const snapshot     = `# Resume Content Snapshot\n## ${path.basename(outFile)}\n## Built: ${today}\n\n### ZONE 1 — Tagline / Summary\nTagline: [your tagline]\nSummary: [your summary]\n\n### ZONE 2 — [Company] / [Title] / [Dates]\nContext: [context line]\nBullet 1: [bullet 1]\nBullet 2: [bullet 2]\n\n### ZONE 3 — [Company] / [Title] / [Dates]\nContext: [context line]\nBullet 1: [bullet 1]\n\n### READ-ON CONTENT — [Company] (remaining bullets)\n[remaining bullets]\n`;
  fs.writeFileSync(snapshotFile, snapshot, "utf8");
  console.log(`Snapshot: ${snapshotFile}`);

})().catch(e => { console.error(e); process.exit(1); });
