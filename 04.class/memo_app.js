import fs from "fs/promises";
import MemoPrompt from "./memo_prompt.js";
import MemoRepository from "./memo_repository.js";
import { NothingAnyMemos } from "./nothing_any_memos.js";

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
    const lines = await this._getFirstLines("./memos");
    const answer = await this._skipOrChoose(
      lines,
      "Choose a memo you want to delete:",
    );
    await fs.unlink(`./memos/${answer}.txt`);
  }
  async print() {
    const lines = await this._getFirstLines("./memos");
    for (const line of lines) {
      console.log(line);
    }
  }
  async printAll() {
    const lines = await this._getFirstLines("./memos");

    const answer = await this._skipOrChoose(
      lines,
      "Choose a memo you want to see:",
    );
    const content = await fs.readFile(`./memos/${answer}.txt`, "utf8");
    console.log(content);
  }

  async runOption(option) {
    if (option[0] === "-l") {
      await this.print();
    } else if (option[0] === "-r") {
      await this.printAll();
    } else if (option[0] === "-d") {
      await this.delete();
    } else {
      await this.add();
    }
  }

  async _skipOrChoose(lines, message) {
    if (lines.length === 0) {
      throw new NothingAnyMemos();
    }
    const memoPrompt = new MemoPrompt();

    return await memoPrompt.choose(lines, message);
  }
}
