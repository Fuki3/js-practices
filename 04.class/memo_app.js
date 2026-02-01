import MemoCli from "./memo_cli.js";
import MemoRepository from "./memo_repository.js";
import NoMemoError from "./no_memo_error.js";

export default class MemoApp {
  constructor() {
    this.memoRepository = new MemoRepository();
    this.memoCli = new MemoCli();
  }

  async runCommand(options) {
    if (options[0] === "-l") {
      await this.#showFirstLines();
    } else if (options[0] === "-r") {
      await this.#showFullText();
    } else if (options[0] === "-d") {
      await this.#delete();
    } else {
      await this.#add();
    }
  }

  async #showFirstLines() {
    const summaries = await this.memoRepository.getSummaries();
    for (const summary of summaries) {
      this.memoCli.print(summary.content.split("\n")[0]);
    }
  }

  async #showFullText() {
    const summaries = await this.memoRepository.getSummaries();
    const fileToShow = await this.#chooseOrSkip(
      summaries,
      "Choose a memo you want to see:",
    );
    this.memoCli.print(fileToShow.content);
  }

  async #delete() {
    const summaries = await this.memoRepository.getSummaries();
    const fileToDelete = await this.#chooseOrSkip(
      summaries,
      "Choose a memo you want to delete:",
    );
    this.memoRepository.delete(fileToDelete);
  }

  async #add() {
    const lines = await this.memoCli.input();
    await this.memoRepository.save(lines);
  }

  async #chooseOrSkip(summaries, message) {
    if (summaries.length === 0) {
      throw new NoMemoError();
    }
    return await this.memoCli.choose(summaries, message);
  }
}
