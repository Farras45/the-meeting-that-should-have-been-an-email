import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// One original line: the meeting doesn't just fail to replace the email —
// it spawns a second meeting to approve the email about the first meeting.
const LINE =
  "We held a meeting to decide who would write the email summarizing the meeting, then booked a follow-up to approve the draft.";

const trimmed = LINE.trim();
if (trimmed.length === 0) {
  throw new Error("Entry line must not be empty or only whitespace.");
}
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`Entry line must be 1-200 characters, got ${LINE.length}.`);
}
if (LINE !== trimmed) {
  throw new Error("Entry line must not have leading or trailing whitespace.");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Entry must be a single line.");
}

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE + "\n", "utf8");
console.log(`Wrote ${LINE.length} characters to ${outPath}`);
