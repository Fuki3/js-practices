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
    const lines = await this._getFirstLines("./memos");

    const memoPrompt = new MemoPrompt();
    const answer = await memoPrompt.choose(
      lines,
      "Choose a note you want to delete:",
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

    const memoPrompt = new MemoPrompt();
    const answer = await memoPrompt.choose(
      lines,
      "Choose a note you want to see:",
    );
    const content = await fs.readFile(`./memos/${answer}.txt`, "utf8");
    console.log(content);
  }

  runOption(option) {
    try {
      if (option[0] === "-l") {
        this.print();
      } else if (option[0] === "-r") {
        this.printAll();
      } else if (option[0] === "-d") {
        this.delete();
      } else {
        this.add();
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
}
