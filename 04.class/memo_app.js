import MemoCli from "./memo_cli.js";
import MemoRepository from "./memo_repository.js";
import NoMemoError from "./no_memo_error.js";

export default class MemoApp {
  constructor() {
    this.memoRepository = new MemoRepository();
    this.memoCli = new MemoCli();
  }

  async runCommand(commandArguments) {
    if (commandArguments[0] === "-l") {
      await this.#refer();
    } else if (commandArguments[0] === "-r") {
      await this.#showFullText();
    } else if (commandArguments[0] === "-d") {
      await this.#delete();
    } else {
      await this.#add();
    }
  }

  async #refer() {
    const memoSummaries = await this.memoRepository.getMemoSummaries();
    for (const memoSummary of memoSummaries) {
      this.memoCli.output(memoSummary.firstLine);
    }
  }

  async #showFullText() {
    const memoSummaries = await this.memoRepository.getMemoSummaries();
    const fileToShow = await this.#chooseOrSkip(
      memoSummaries,
      "Choose a memo you want to see:",
    );
    const content = await this.memoRepository.readContent(fileToShow);
    this.memoCli.output(content);
  }

  async #delete() {
    const memoSummaries = await this.memoRepository.getMemoSummaries();
    const fileToDelete = await this.#chooseOrSkip(
      memoSummaries,
      "Choose a memo you want to delete:",
    );
    this.memoRepository.delete(fileToDelete);
  }

  async #add() {
    const lines = await this.memoCli.input();
    await this.memoRepository.save(lines);
  }

  async #chooseOrSkip(firstLines, message) {
    if (firstLines.length === 0) {
      throw new NoMemoError();
    }
    return await this.memoCli.choose(firstLines, message);
  }
}
