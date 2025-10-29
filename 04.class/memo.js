#!/usr/bin/env node

import fs from "fs/promises";
import readline from "readline";
import path from "path";
import enquirer from "enquirer";

const option = process.argv.slice(2);
const { Select } = enquirer;

class MemoApp {
  constructor(option) {
    this.option = option;
    this.lines = [];
  }

  async input() {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.on("line", (input) => {
        if (input === "") {
          rl.close();
        } else {
          this.lines.push(input);
        }
      });

      rl.on("close", () => {
        resolve(this.lines);
      });
    });
  }

  async choose(lines, message) {
    const prompt = new Select({
      message: message,
      choices: lines,
    });

    const answer = await prompt.run();
    return answer;
  }

  async output() {
    const memo = new Memo();
    if (this.option[0] === "-l") {
      memo.print();
    } else if (this.option[0] === "-r") {
      memo.printAll();
    } else if (this.option[0] === "-d") {
      memo.delete();
    } else {
      memo.add();
    }
  }
}

class File {
  constructor() {
    this.directory = "memos";
  }

  async _save(filename, lines) {
    await fs.mkdir(this.directory, { recursive: true });
    await fs.writeFile(`./${this.directory}/${filename}.txt`, lines.join("\n"));
  }

  async _handleContent(callback) {
    try {
      return await callback();
    } catch (err) {
      console.error("Error:", err.message);
      return null;
    }
  }

  async _readFirstLine(directoryPath, callback) {
    try {
      const files = await fs.readdir(directoryPath);
      for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const content = await fs.readFile(filePath, "utf8");
        const firstLine = content.split("\n")[0];
        await callback(firstLine);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
}

class Memo extends File {
  constructor() {
    super();
    this.memoapp = new MemoApp();
  }

  async add() {
    const lines = await this.memoapp.input();
    const filename = lines[0];
    await this._save(filename, lines);
  }

  async delete() {
    const lines = await this.#getFirstLines("./memos");

    const memoapp = new MemoApp();
    const answer = await memoapp.choose(
      lines,
      "Choose a note you want to delete:",
    );
    await this._handleContent(() => fs.unlink(`./memos/${answer}.txt`));
  }
  async print() {
    await this._readFirstLine("./memos", (line) => console.log(line));
  }
  async printAll() {
    const lines = await this.#getFirstLines("./memos");

    const memoapp = new MemoApp();
    const answer = await memoapp.choose(
      lines,
      "Choose a note you want to see:",
    );

    const content = await this._handleContent(() =>
      fs.readFile(`./memos/${answer}.txt`, "utf8"),
    );

    console.log(content);
  }

  async #getFirstLines(directoryPath) {
    const lines = [];
    await this._readFirstLine(directoryPath, (line) => lines.push(line));
    return lines;
  }
}

const memoapp = new MemoApp(option);
memoapp.output();
