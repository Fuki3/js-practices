#!/usr/bin/env node

import fs from "fs/promises";
import readline from "readline";
import path from "path";

const argv = process.argv.slice(2);

if (argv[0] === "-l") {
  async function readFirstLine(filePath) {
    try {
      const content = await fs.readFile(filePath, "utf8");
      const firstLine = content.split("\n")[0];
      return firstLine;
    } catch (err) {
      console.error(`Error: ${filePath}`, err);
      return null;
    }
  }

  async function readAllFilesFirstLine(directoryPath) {
    try {
      const files = await fs.readdir(directoryPath);
      for (const file of files) {
        const Path = path.join(directoryPath, file);
        const line = await readFirstLine(Path);
        console.log(line);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }

  readAllFilesFirstLine("./memos");
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const lines = [];

  rl.on("line", (input) => {
    if (input === "") return rl.close();
    lines.push(input);
  });

  rl.on("close", async () => {
    await fs.mkdir("memos", { recursive: true });
    await fs.writeFile(`./memos/${lines[0]}.txt`, lines.join("\n"));
  });
}
