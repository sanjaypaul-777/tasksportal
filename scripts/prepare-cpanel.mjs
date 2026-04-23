import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const distDir = resolve(root, "dist");
const outputDir = resolve(root, "cpanel-upload");
const readmePath = resolve(outputDir, "UPLOAD-INSTRUCTIONS.txt");

if (!existsSync(distDir)) {
  console.error("dist folder not found. Run `npm run build` first.");
  process.exit(1);
}

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });
cpSync(distDir, outputDir, { recursive: true });

writeFileSync(
  readmePath,
  [
    "TasksPortal cPanel Upload Package",
    "",
    "1) Open cPanel File Manager",
    "2) Go to /home/branemlz/tasksportal.online/",
    "3) Remove old website files",
    "4) Upload all files from this cpanel-upload folder",
    "5) Hard refresh browser (Ctrl+F5)",
    "",
    "Note: index.html and assets/ must stay in the same folder.",
  ].join("\n"),
  "utf8"
);

console.log("cPanel upload package ready at:", outputDir);
