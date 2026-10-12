#!/usr/bin/env node
// Copies package.json's version into every host plugin manifest.
// Runs as part of `pnpm run version`, immediately after `changeset version`.
// With --check it changes nothing and exits 1 if any manifest differs.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const PLUGIN_NAME = "agustinusnathaniel-skills";

// One list of target manifests and where each version field lives:
// a top-level `version` key, or the matching plugin entry inside
// a marketplace's `plugins` array.
const TARGETS = [
  { file: ".claude-plugin/plugin.json", kind: "version" },
  { file: ".claude-plugin/marketplace.json", kind: "marketplace-entry" },
  { file: "marketplace.json", kind: "marketplace-entry" },
  { file: ".devin-plugin/plugin.json", kind: "version" },
  { file: ".cursor-plugin/plugin.json", kind: "version" },
  { file: "kimi.plugin.json", kind: "version" },
  { file: ".zcode-plugin/plugin.json", kind: "version" },
];

const { version } = JSON.parse(readFileSync(join(repo, "package.json"), "utf8"));
const check = process.argv.includes("--check");
let failed = false;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function syncTopLevel(file, source, data) {
  if (data.version === version) {
    console.log(`${file} version is ${version} (already in sync)`);
    return;
  }
  if (check) {
    console.error(`${file} version is ${data.version}, package.json is ${version}.`);
    failed = true;
    return;
  }
  // Rewrite only the version line, to keep the key order and the formatting.
  const updated = source.replace(/("version"\s*:\s*")[^"]*(")/, `$1${version}$2`);
  if (JSON.parse(updated).version !== version) {
    console.error(`Could not find a version field to replace in ${file}.`);
    process.exit(1);
  }
  writeFileSync(join(repo, file), updated);
  console.log(`${file} version ${data.version} -> ${version}`);
}

function syncMarketplaceEntry(file, source, data) {
  const entry = data.plugins.find((plugin) => plugin.name === PLUGIN_NAME);
  if (!entry) {
    console.error(`${file} has no plugins[] entry named ${PLUGIN_NAME}.`);
    process.exit(1);
  }
  if (entry.version === version) {
    console.log(`${file} entry ${PLUGIN_NAME} is ${version} (already in sync)`);
    return;
  }
  if (check) {
    console.error(`${file} entry ${PLUGIN_NAME} is ${entry.version}, package.json is ${version}.`);
    failed = true;
    return;
  }
  // Rewrite only the entry's version line, to keep the key order and the
  // formatting. Search after the "plugins" key so the marketplace's own
  // top-level fields are never touched.
  const start = source.indexOf('"plugins"');
  const namePattern = new RegExp(`"name"\\s*:\\s*"${escapeRegExp(PLUGIN_NAME)}"`, "g");
  namePattern.lastIndex = start;
  const nameMatch = namePattern.exec(source);
  if (!nameMatch) {
    console.error(`Could not find a plugins[] entry named ${PLUGIN_NAME} in ${file}.`);
    process.exit(1);
  }
  const versionPattern = /"version"\s*:\s*"([^"]*)"/g;
  versionPattern.lastIndex = nameMatch.index;
  const versionMatch = versionPattern.exec(source);
  if (!versionMatch || source.slice(nameMatch.index + nameMatch[0].length, versionMatch.index).includes('"name"')) {
    console.error(`Could not find a version field for entry ${PLUGIN_NAME} in ${file}.`);
    process.exit(1);
  }
  const updated =
    source.slice(0, versionMatch.index) +
    versionMatch[0].replace(/(:\s*")[^"]*(")/, `$1${version}$2`) +
    source.slice(versionMatch.index + versionMatch[0].length);
  if (JSON.parse(updated).plugins.find((plugin) => plugin.name === PLUGIN_NAME).version !== version) {
    console.error(`Could not replace the version for entry ${PLUGIN_NAME} in ${file}.`);
    process.exit(1);
  }
  writeFileSync(join(repo, file), updated);
  console.log(`${file} entry ${PLUGIN_NAME} ${entry.version} -> ${version}`);
}

for (const { file, kind } of TARGETS) {
  const source = readFileSync(join(repo, file), "utf8");
  const data = JSON.parse(source);
  if (kind === "version") {
    syncTopLevel(file, source, data);
  } else {
    syncMarketplaceEntry(file, source, data);
  }
}

if (failed) {
  console.error("Run `node scripts/sync-plugin-version.mjs` to sync the manifests.");
  process.exit(1);
}
