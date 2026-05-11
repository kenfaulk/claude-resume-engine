#!/usr/bin/env python3
"""
validate.py — Resume DOCX validator for Claude Resume Engine
Usage: python3 scripts/office/validate.py outputs/[YourName]_Base_v1.docx

Checks fonts, colors, section order, ground rules, and locked metrics.
Update the LOCKED_STRINGS section below to match your candidate's locked metrics.
"""

import sys
import os
import zipfile

PASS = "\033[92mPASS\033[0m"
FAIL = "\033[91mFAIL\033[0m"
WARN = "\033[93mWARN\033[0m"

def check(label, condition, warn=False):
    status = (WARN if warn else FAIL) if not condition else PASS
    print(f"  [{status}] {label}")
    return condition

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 validate.py <file.docx>")
        sys.exit(1)

    filepath = sys.argv[1]

    if not os.path.exists(filepath):
        print(f"[FAIL] File not found: {filepath}")
        sys.exit(1)

    print(f"\nValidating: {filepath}")
    print(f"File size:  {os.path.getsize(filepath) / 1024:.1f} KB\n")

    try:
        with zipfile.ZipFile(filepath, 'r') as z:
            doc_xml = z.read("word/document.xml").decode("utf-8")
            try:
                numbering_xml = z.read("word/numbering.xml").decode("utf-8")
            except KeyError:
                numbering_xml = ""
    except Exception as e:
        print(f"[FAIL] Could not read docx: {e}")
        sys.exit(1)

    failures = 0
    warnings = 0

    print("=== STRUCTURE CHECKS ===")
    check("File is valid DOCX (zip readable)", True)

    print("\n=== FONT CHECKS ===")
    has_calibri = "Calibri" in doc_xml
    has_arial   = "Arial" in doc_xml
    ok = check("Calibri font present", has_calibri);    failures += not ok
    ok = check("No Arial font", not has_arial);         failures += not ok

    print("\n=== COLOR CHECKS ===")
    for name, hex_val in [
        ("Dark Blue (1F4E79 — name)",          "1F4E79"),
        ("Mid Blue (2E75B6 — headers/titles)", "2E75B6"),
    ]:
        ok = check(f"{name}", hex_val in doc_xml)
        failures += not ok

    # ─── LOCKED METRIC CHECKS ──────────────────────────────────────────────────
    # Update these to match your candidate's locked metrics from candidate.md.
    # Each entry is (description, exact_string_to_find_in_docx).
    # Example below uses Fred Flintstone. Replace with your own.
    print("\n=== LOCKED METRIC CHECKS ===")
    locked_strings = [
        ("Top impact metric in tagline/summary",  "50,000"),
        ("On-time delivery record",               "100%"),
        ("Cost savings metric",                   "$2.8M"),
        ("Throughput improvement",                "35%"),
        ("Safety record",                         "zero lost-time"),
    ]
    for label, text in locked_strings:
        ok = check(label, text in doc_xml)
        failures += not ok

    print("\n=== GROUND RULE CHECKS ===")
    has_emdash = "—" in doc_xml or "&#x2014;" in doc_xml or "&#8212;" in doc_xml
    ok = check("No em dashes (ground rule #1)", not has_emdash)
    if not ok:
        failures += 1

    has_first_person = " I " in doc_xml or ">I <" in doc_xml
    ok = check("No first person 'I' in body", not has_first_person, warn=True)
    if not ok:
        warnings += 1

    has_x_symbol = "×" in doc_xml
    ok = check("No multiplication symbol (x00D7)", not has_x_symbol)
    failures += not ok

    print("\n=== SECTION ORDER CHECKS ===")
    sections = [
        "CORE COMPETENCIES",
        "PROFESSIONAL EXPERIENCE",
        "EDUCATION",
        "LEADERSHIP, DEVELOPMENT",
    ]
    last_pos = -1
    for s in sections:
        pos = doc_xml.upper().find(s.upper())
        if pos == -1:
            check(f"Section present: {s}", False)
            failures += 1
        elif pos < last_pos:
            check(f"Section order: {s}", False)
            failures += 1
        else:
            check(f"Section present + ordered: {s}", True)
            last_pos = pos

    print("\n=== NUMBERING CHECK ===")
    ok = check("Bullet numbering definition exists", bool(numbering_xml))
    failures += not ok

    print(f"\n{'=' * 40}")
    print(f"Results: {failures} failure(s), {warnings} warning(s)")
    if failures == 0:
        print(f"\033[92mVALIDATION PASSED\033[0m")
    else:
        print(f"\033[91mVALIDATION FAILED — fix {failures} issue(s) before submitting\033[0m")
    print()

    sys.exit(0 if failures == 0 else 1)

if __name__ == "__main__":
    main()
