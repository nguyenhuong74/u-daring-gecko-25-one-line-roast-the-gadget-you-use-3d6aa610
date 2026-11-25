// One-Line Roast: The Gadget You Use Every Day
// Writes a single original roast line to /output/entry.txt.
// Deterministic: no randomness, no network, no environment reads.

import { mkdirSync, writeFileSync } from "node:fs";

// The roast: an authenticator app (used daily for 2FA) rotates its
// six-digit code every 30 seconds, and it always seems to rotate at
// the exact moment you finish typing. Setup, then punch: the security
// tool itself has a sense of humour — at your expense.
const LINE =
  "My authenticator app lets me type all six digits, then changes the code — security with a sense of humour.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  // The file must hold exactly the line: no trailing newline, no padding.
  if (line !== line.trim()) {
    throw new Error("line must not have leading or trailing whitespace");
  }
}

validate(LINE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(`wrote ${LINE.length} characters to /output/entry.txt`);
