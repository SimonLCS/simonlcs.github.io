import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const contentDirectory = join(root, "content");
const contentNames = ["site", "news", "publications", "cv", "portfolio"];
const outputPath = join(contentDirectory, "data.js");

const content = Object.fromEntries(
  await Promise.all(
    contentNames.map(async (name) => [
      name,
      JSON.parse(await readFile(join(contentDirectory, `${name}.json`), "utf8"))
    ])
  )
);

const output = `// Generated from content/*.json by npm run build-content.\nwindow.siteContent = ${JSON.stringify(content, null, 2)};\n`;

if (process.argv.includes("--check")) {
  const currentOutput = await readFile(outputPath, "utf8").catch(() => "");

  if (currentOutput !== output) {
    throw new Error("content/data.js is out of date. Run npm run build-content.");
  }
} else {
  await writeFile(outputPath, output);
}
