const fs = require("fs");
const path = require("path");

const IGNORE_DIRS = [
  "node_modules",
  "dist",
  "build",
  ".expo",
  ".git",
  ".next",
  ".cache",
  ".vscode"
];

function generateTree(dirPath: string, indent: string = ""): string {
  let tree = "";
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
    if (IGNORE_DIRS.includes(item.name)) continue;
    const fullPath = path.join(dirPath, item.name);
    const isDir = item.isDirectory();
    tree += `${indent}├── ${item.name}\n`;
    if (isDir) tree += generateTree(fullPath, indent + "│   ");
  }
  return tree;
}

function main() {
  const startDir = process.argv[2] || ".";
  const outputFile = "tree.txt";

  console.log(`🗂️  Generating tree for: ${path.resolve(startDir)} ...`);
  const tree = `${path.basename(startDir)}/\n${generateTree(startDir)}`;
  fs.writeFileSync(outputFile, tree);
  console.log(`✅ Directory tree saved to ${outputFile}`);
}

main();
