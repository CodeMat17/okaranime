/**
 * Import Convex snapshot backup into a deployment.
 *
 * Usage (from project root, after pointing .env.local at the NEW deployment):
 *   node scripts/import-backup.mjs
 *
 * What it does:
 *   1. Unzips ./convex-backup
 *   2. Strips _id, _creationTime, and image (storage IDs tied to old deployment)
 *   3. Writes clean JSONL files to a temp directory
 *   4. Calls `npx convex import --table` for each table
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const backupFile = join(root, "convex-backup");

const tempDir = mkdtempSync(join(tmpdir(), "convex-import-"));

try {
  // 1. Extract zip
  console.log("Extracting backup…");
  execSync(`unzip -o "${backupFile}" -d "${tempDir}"`, { stdio: "inherit" });

  // 2. Parse JSONL — strip system fields and old storage IDs
  const parseAndStrip = (filePath, keep) =>
    readFileSync(filePath, "utf8")
      .split("\n")
      .filter((l) => l.trim())
      .map((l) => {
        const doc = JSON.parse(l);
        return Object.fromEntries(keep.map((k) => [k, doc[k]]).filter(([, v]) => v !== undefined));
      });

  const news = parseAndStrip(join(tempDir, "news", "documents.jsonl"), [
    "title",
    "slug",
    "content",
  ]);

  const team = parseAndStrip(join(tempDir, "team", "documents.jsonl"), [
    "name",
    "position",
    "description",
    "email",
  ]);

  console.log(`Prepared ${news.length} news articles, ${team.length} team members.`);

  // 3. Write clean JSONL files (one JSON object per line, no _id)
  const newsFile = join(tempDir, "news-clean.jsonl");
  const teamFile = join(tempDir, "team-clean.jsonl");
  writeFileSync(newsFile, news.map((r) => JSON.stringify(r)).join("\n"));
  writeFileSync(teamFile, team.map((r) => JSON.stringify(r)).join("\n"));

  // Use process.execPath so we don't rely on PATH (works in any shell on Windows)
  const node = process.execPath;
  const convexCli = join(root, "node_modules", "convex", "bin", "main.js");

  // 4. Import each table — data goes via file, no command-line size limits
  for (const [table, file] of [["news", newsFile], ["team", teamFile]]) {
    console.log(`\nImporting table: ${table}…`);
    execSync(
      `"${node}" "${convexCli}" import --table ${table} --yes "${file}"`,
      { cwd: root, stdio: "inherit" }
    );
  }

  console.log("\nAll done! Import complete.");
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}
