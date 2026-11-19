// Entry program for the gta6-meme-x-01 bounty on make.fun.
//
// The entry itself is a post on X; this repository only has to tell the
// grader where that post lives. POST.json, kept beside this file in the bot
// directory, holds the post's address, and the grader expects to find a copy
// of it in the output directory. So the whole job here is one faithful copy:
// make sure the output directory exists, then copy POST.json across byte for
// byte. Success is silent; a failure is reported on stderr, naming the paths
// involved, and exits 1.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "POST.json");
const destination = join(outputDir, "POST.json");

function fail(message: string): never {
  console.error(`gta6-meme-x: ${message}`);
  process.exit(1);
}

if (!existsSync(source)) {
  fail(`POST.json not found in the bot directory (${source})`);
}

try {
  mkdirSync(outputDir, { recursive: true });
} catch (err) {
  fail(
    `could not create the output directory ${outputDir}: ${err instanceof Error ? err.message : String(err)}`,
  );
}

try {
  copyFileSync(source, destination);
} catch (err) {
  fail(
    `could not copy ${source} to ${destination}: ${err instanceof Error ? err.message : String(err)}`,
  );
}
