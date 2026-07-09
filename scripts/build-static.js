const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "dist");
const publicEntries = ["index.html", "assets", "css", "js", "pages"];

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const entry of publicEntries) {
  const source = path.join(rootDir, entry);
  const destination = path.join(outputDir, entry);

  if (!fs.existsSync(source)) {
    continue;
  }

  if (fs.statSync(source).isDirectory()) {
    fs.cpSync(source, destination, { recursive: true });
  } else {
    fs.copyFileSync(source, destination);
  }
}

console.log(`Static build complete: ${publicEntries.join(", ")} -> dist`);
