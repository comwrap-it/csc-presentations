#!/usr/bin/env node
/* Render a .pptx to PDF with LibreOffice, so diagrams, SmartArt and layouts can be SEEN
   (open the PDF pages with the Read tool, e.g. pages "12-14").
   node tools/pptx/render.mjs "<deck.pptx>" [--out=qa-out/pptx]
   Needs LibreOffice (soffice) on the PATH; on Windows usually
   "C:\Program Files\LibreOffice\program\soffice.exe" (pass it with --soffice=…).
   The PDF is cached next to the extraction folder and rebuilt only if the deck is newer.
   No LibreOffice? Ask the user to export the slides as PDF from PowerPoint (File → Export). */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { ROOT, argv } from "../lib.mjs";

const a = argv();
const file = a._[0];
if (!file || !fs.existsSync(file)) { console.error('Usage: node tools/pptx/render.mjs "<deck.pptx>"'); process.exit(2); }
const out = path.resolve(a.out || path.join(ROOT, "qa-out/pptx"));
fs.mkdirSync(out, { recursive: true });
const pdf = path.join(out, path.basename(file, path.extname(file)) + ".pdf");
if (fs.existsSync(pdf) && fs.statSync(pdf).mtimeMs > fs.statSync(file).mtimeMs) { console.log(pdf); process.exit(0); }
const candidates = [a.soffice, "soffice", "libreoffice", "C:\\Program Files\\LibreOffice\\program\\soffice.exe", "/Applications/LibreOffice.app/Contents/MacOS/soffice"].filter(Boolean);
for (const bin of candidates) {
  try { execFileSync(bin, ["--headless", "--convert-to", "pdf", "--outdir", out, file], { stdio: "ignore", timeout: 900000 }); } catch (e) { continue; }
  if (fs.existsSync(pdf)) { console.log(pdf); process.exit(0); }
}
console.error("LibreOffice not found or conversion failed. Ask the user for a PDF export of the slides.");
process.exit(1);
