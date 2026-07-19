import { access } from "node:fs/promises";
import sharp from "sharp";

const source = "public/og-renoqo.svg";
const output = "public/og-renoqo.png";
try { await access(source); } catch { throw new Error(`Open Graph source not found: ${source}`); }

await sharp(source, { density: 144 })
  .flatten({ background: "#f4f8fa" })
  .resize(1200, 630, { fit: "contain", background: "#f4f8fa" })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(output);

const metadata = await sharp(output).metadata();
if (metadata.format !== "png" || metadata.width !== 1200 || metadata.height !== 630 || metadata.hasAlpha) {
  throw new Error(`Invalid generated image: ${JSON.stringify(metadata)}`);
}
console.log(`Generated ${output}: ${metadata.width}x${metadata.height}, ${metadata.format}, opaque`);
