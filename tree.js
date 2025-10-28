// tree.js
import fs from "fs";
import path from "path";

const IGNORE_FOLDERS = [
  "node_modules",
  ".git",
  "build",
  "dist",
  ".expo",
  ".gradle",
  ".idea",
  ".vscode"
];

const OUTPUT_FILE = "tree.txt";

/**
 * Recursively generate a folder structure string.
 * @param {string} dir - Starting directory
 * @param {string} prefix - Tree indentation
 * @returns {string}
 */
function generateTree(dir, prefix = "") {
  let output = "";
  const items = fs.readdirSync(dir, { withFileTypes: true });

  const visibleItems = items.filter(
    (item) => !IGNORE_FOLDERS.includes(item.name)
  );

  visibleItems.forEach((item, index) => {
    const isLast = index === visibleItems.length - 1;
    const pointer = isLast ? "└── " : "├── ";
    const nextPrefix = prefix + (isLast ? "    " : "│   ");
    const fullPath = path.join(dir, item.name);

    output += `${prefix}${pointer}${item.name}\n`;

    if (item.isDirectory()) {
      output += generateTree(fullPath, nextPrefix);
    }
  });

  return output;
}

// Start from the current working directory
const startDir = process.argv[2] || ".";
const fullTree = `${path.basename(path.resolve(startDir))}/\n${generateTree(
  startDir
)}`;

fs.writeFileSync(OUTPUT_FILE, fullTree, "utf8");

console.log(`✅ Folder tree saved to ${OUTPUT_FILE}`);
