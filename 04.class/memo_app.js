import fs from "fs/promises";
import MemoPrompt from "./memo_prompt.js";
import MemoRepository from "./memo_repository.js";

export default class MemoApp extends MemoRepository {
  constructor() {
    super();
    this.memoPrompt = new MemoPrompt();
  }

  async add() {
    const lines = await this.memoPrompt.input();
    const filename = lines[0];
    await this._save(filename, lines);
  }

  async delete() {
    const lines = await this.#getFirstLines("./memos");

    const memoPrompt = new MemoPrompt();
    const answer = await memoPrompt.choose(
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

    const memoPrompt = new MemoPrompt();
    const answer = await memoPrompt.choose(
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
