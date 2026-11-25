// The One-Line AI Excuse for Breaking Production
// Entry program: writes the single-line excuse to <OUTPUT_DIR>/entry.txt
// and verifies the file byte-for-byte before reporting success.
// Node 22, no dependencies, no network.

import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line, exactly as designed: the agent read "delete the test
// database" as a suggestion, and it has always been a very literal coworker.
const ENTRY =
  "Production is down because I read 'delete the test database' as a suggestion, and I have always been a very literal coworker.";

// The kit's gate: /output/entry.txt must be UTF-8 text of 1 to 180
// characters, not only white space.
const MIN_CHARS = 1;
const MAX_CHARS = 180;

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Count Unicode code points, not UTF-16 code units, so the check matches
// the gate's character count even for text outside the BMP.
function codePointCount(text) {
  return [...text].length;
}

function validateEntry(text) {
  const count = codePointCount(text);
  if (count < MIN_CHARS || count > MAX_CHARS) {
    fail(`entry is ${count} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`);
  }
  if (text.trim().length === 0) {
    fail("entry is only white space");
  }
  if (text !== text.trim()) {
    fail("entry has leading or trailing white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    fail("entry must be a single line");
  }
  for (const ch of text) {
    const code = ch.codePointAt(0);
    if (code < 0x20 || code === 0x7f || code === 0x2028 || code === 0x2029) {
      fail(`entry contains a forbidden control character U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
    }
  }
  return count;
}

function main() {
  const count = validateEntry(ENTRY);

  const outputDir = process.env.OUTPUT_DIR || "/output";
  mkdirSync(outputDir, { recursive: true });

  // Clear only the contents of the output directory, never the directory
  // itself: the grader's /output is a mount point and removing it fails.
  for (const name of readdirSync(outputDir)) {
    rmSync(join(outputDir, name), { recursive: true, force: true });
  }

  const outPath = join(outputDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");

  // Read the file back and verify it byte-for-byte.
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY) {
    fail("verification failed: entry.txt does not match the entry text byte-for-byte");
  }
  if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(ENTRY, "utf8")) {
    fail("verification failed: entry.txt byte length differs from the entry text");
  }
  // Re-validate the text as read from disk, so a write that silently
  // re-encoded the entry (BOM, normalised quotes, trailing newline) is
  // caught here instead of at the gate.
  if (written.charCodeAt(0) === 0xfeff) {
    fail("verification failed: entry.txt starts with a byte-order mark");
  }
  validateEntry(written);

  // The entry file must be the only thing the program leaves behind:
  // the kit expects one text at /output/entry.txt and nothing else.
  const leftovers = readdirSync(outputDir).filter((name) => name !== "entry.txt");
  if (leftovers.length > 0) {
    fail(`verification failed: unexpected files in output directory: ${leftovers.join(", ")}`);
  }

  console.log(`wrote ${outPath} (${count} characters, single line, no trailing newline)`);
}

main();
