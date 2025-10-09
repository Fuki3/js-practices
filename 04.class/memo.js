#!/usr/bin/env node

import fs from "fs/promises";
import readline from "readline";
import path from "path";
import enquirer from "enquirer";

const argv = process.argv.slice(2);
const { Select } = enquirer;

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
} else if (argv[0] === "-r") {
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
    const lines = [];
    try {
      const files = await fs.readdir(directoryPath);
      for (const file of files) {
        const Path = path.join(directoryPath, file);
        const line = await readFirstLine(Path);
        lines.push(line);
      }
      return lines;
    } catch (err) {
      console.error("Error:", err);
      return [];
    }
  }

  const lines = await readAllFilesFirstLine("./memos");

  const prompt = new Select({
    message: "Choose a note you want to see:",
    choices: lines,
  });

  const answer = await prompt.run();

  async function showList(filePath) {
    try {
      const content = await fs.readFile(filePath, "utf8");
      console.log(content);
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
  showList(`./memos/${answer}.txt`);
} else if (argv[0] === "-d") {
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
    const lines = [];
    try {
      const files = await fs.readdir(directoryPath);
      for (const file of files) {
        const Path = path.join(directoryPath, file);
        const line = await readFirstLine(Path);
        lines.push(line);
      }
      return lines;
    } catch (err) {
      console.error("Error:", err);
      return [];
    }
  }

  const lines = await readAllFilesFirstLine("./memos");

  const prompt = new Select({
    message: "Choose a memo you want to delete:",
    choices: lines,
  });

  const answer = await prompt.run();

  async function deleteFile(filePath) {
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.error("Error:", err.message);
    }
  }

  deleteFile(`./memos/${answer}.txt`);
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
