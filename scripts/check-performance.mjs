import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const buildDir = ".next";
if (!existsSync(buildDir)) {
  console.error("Build Next.js introuvable. Exécutez `npm run build` avant ce contrôle.");
  process.exit(1);
}

const manifests = [join(buildDir, "build-manifest.json"), join(buildDir, "app-build-manifest.json")];
const initialFiles = new Set();
for (const path of manifests) {
  if (!existsSync(path)) continue;
  const manifest = JSON.parse(readFileSync(path, "utf8"));
  for (const files of Object.values(manifest.pages ?? {})) for (const file of files) if (file.endsWith(".js")) initialFiles.add(file);
  for (const file of manifest.rootMainFiles ?? []) if (file.endsWith(".js")) initialFiles.add(file);
}

// App Router manifests vary between Next.js versions: shared runtime chunks are
// collected when page-specific entries are absent. Every file is counted once.
if (initialFiles.size === 0) {
  const chunks = join(buildDir, "static", "chunks");
  for (const file of readdirSync(chunks)) if (file.endsWith(".js") && !file.startsWith("app")) initialFiles.add(`static/chunks/${file}`);
}
let total = 0;
for (const file of initialFiles) {
  const path = join(buildDir, file);
  if (existsSync(path)) total += gzipSync(readFileSync(path)).byteLength;
}
const budget = 260000;
console.log(`JavaScript initial gzip : ${total.toLocaleString("fr-FR")} octets / ${budget.toLocaleString("fr-FR")} octets`);
if (!total || total > budget) process.exit(1);
console.log("Budget de performance respecté.");
