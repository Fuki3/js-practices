import fs from "fs/promises";
import MemoApp from "./memo-app.js";
import File from "./file.js";

export default class Memo extends File {
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
    if (lines.length === 0) {
      process.exit(0);
    }
    return lines;
  }
}
