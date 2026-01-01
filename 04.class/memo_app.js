import fs from "fs/promises";
import path from "path";
import MemoPrompt from "./memo_prompt.js";
import MemoRepository from "./memo_repository.js";
import NoMemoError from "./no_memo_error.js";

export default class MemoApp {
  constructor() {
    this.memoRepository = new MemoRepository();
    this.memoPrompt = new MemoPrompt();
  }

  async handleOption(commandArguments) {
    if (commandArguments[0] === "-l") {
      await this.#refer();
    } else if (commandArguments[0] === "-r") {
      await this.#showFirstLines();
    } else if (commandArguments[0] === "-d") {
      await this.#delete();
    } else {
      await this.#add();
    }
  }

  async #add() {
    const lines = await this.memoPrompt.input();
    const filename = new Date();
    await this.memoRepository.save(filename, lines);
  }

  async #delete() {
    const firstLines = await this.memoRepository.getFirstLines();
    const fileToDelete = await this.#chooseOrSkip(
      firstLines,
      "Choose a memo you want to delete:",
    );
    await fs.unlink(path.join("memos", fileToDelete));
  }

  async #refer() {
    const firstLines = await this.memoRepository.getFirstLines();
    for (const firstLine of firstLines) {
      console.log(firstLine.firstLine);
    }
  }

  async #showFirstLines() {
    const firstLines = await this.memoRepository.getFirstLines();
    const fileToShow = await this.#chooseOrSkip(
      firstLines,
      "Choose a memo you want to see:",
    );
    const content = await this.memoRepository.readContent(fileToShow);
    console.log(content);
  }

  async #chooseOrSkip(firstLines, message) {
    if (firstLines.length === 0) {
      throw new NoMemoError();
    }
    return await this.memoPrompt.choose(firstLines, message);
  }
}
