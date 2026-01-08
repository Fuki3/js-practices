import MemoCli from "./memo_cli.js";
import MemoRepository from "./memo_repository.js";
import NoMemoError from "./no_memo_error.js";

export default class MemoApp {
  constructor() {
    this.memoRepository = new MemoRepository();
    this.memoCli = new MemoCli();
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
    const lines = await this.memoCli.input();
    await this.memoRepository.save(lines);
  }

  async #delete() {
    const firstLines = await this.memoRepository.getFirstLines();
    const fileToDelete = await this.#chooseOrSkip(
      firstLines,
      "Choose a memo you want to delete:",
    );
    this.memoRepository.delete(fileToDelete);
  }

  async #refer() {
    const firstLines = await this.memoRepository.getFirstLines();
    for (const firstLine of firstLines) {
      this.memoCli.output(firstLine.firstLine);
    }
  }

  async #showFirstLines() {
    const firstLines = await this.memoRepository.getFirstLines();
    const fileToShow = await this.#chooseOrSkip(
      firstLines,
      "Choose a memo you want to see:",
    );
    const content = await this.memoRepository.readContent(fileToShow);
    this.memoCli.output(content);
  }

  async #chooseOrSkip(firstLines, message) {
    if (firstLines.length === 0) {
      throw new NoMemoError();
    }
    return await this.memoCli.choose(firstLines, message);
  }
}
