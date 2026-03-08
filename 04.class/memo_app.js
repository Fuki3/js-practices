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
    const memos = await this.memoRepository.getMemos();
    for (const memo of memos) {
      this.memoCli.print(memo.content.split("\n")[0]);
    }
  }

  async #showFullText() {
    const memos = await this.memoRepository.getMemos();
    const memoToShow = await this.#chooseOrSkip(
      memos,
      "Choose a memo you want to see:",
    );
    this.memoCli.print(memoToShow.content);
  }

  async #delete() {
    const memos = await this.memoRepository.getMemos();
    const memoToDelete = await this.#chooseOrSkip(
      memos,
      "Choose a memo you want to delete:",
    );
    this.memoRepository.delete(memoToDelete);
  }

  async #add() {
    const lines = await this.memoCli.input();
    await this.memoRepository.save(lines);
  }

  async #chooseOrSkip(memos, message) {
    if (memos.length === 0) {
      throw new NoMemoError();
    }
    return await this.memoCli.choose(memos, message);
  }
}
