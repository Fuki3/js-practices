import fs from "fs/promises";
import path from "path";
import MemoPrompt from "./memo_prompt.js";
import MemoRepository from "./memo_repository.js";
import NoMemoError from "./no_memo_error.js";

export default class MemoApp extends MemoRepository {
  constructor() {
    super();
    this.memoPrompt = new MemoPrompt();
  }

  async add() {
    const lines = await this.memoPrompt.input();
    const filename = new Date();
    await this._save(filename, lines);
  }

  async delete() {
    const lines = await this._getFirstLines("./memos");
    const fileToDelete = await this._skipOrChoose(
      lines,
      "Choose a memo you want to delete:",
    );
    await fs.unlink(path.join("memos", fileToDelete));
  }

  async refer() {
    const lines = await this._getFirstLines("./memos");
    for (const line of lines) {
      console.log(line.firstLine);
    }
  }

  async showTheList() {
    const lines = await this._getFirstLines("./memos");
    const fileToShow = await this._skipOrChoose(
      lines,
      "Choose a memo you want to see:",
    );
    const content = await fs.readFile(
      path.join("memos", `${fileToShow}`),
      "utf8",
    );
    console.log(content);
  }

  async runOption(args) {
    if (args[0] === "-l") {
      await this.refer();
    } else if (args[0] === "-r") {
      await this.showTheList();
    } else if (args[0] === "-d") {
      await this.delete();
    } else {
      await this.add();
    }
  }

  async _skipOrChoose(lines, message) {
    if (lines.length === 0) {
      throw new NoMemoError();
    }
    const memoPrompt = new MemoPrompt();
    return await memoPrompt.choose(lines, message);
  }
}
