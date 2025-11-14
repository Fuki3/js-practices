import readline from "readline";
import Memo from "./memo-extends-file.js";
import enquirer from "enquirer";
const { Select } = enquirer;

export default class MemoApp {
  constructor(option) {
    this.option = option;
    this.lines = [];
  }

  async input() {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.on("line", (input) => {
        if (input === "") {
          rl.close();
        } else {
          this.lines.push(input);
        }
      });

      rl.on("close", () => {
        resolve(this.lines);
      });
    });
  }

  async choose(lines, message) {
    const prompt = new Select({
      message: message,
      choices: lines,
    });

    const answer = await prompt.run();
    return answer;
  }

  async output() {
    const memo = new Memo();
    if (this.option[0] === "-l") {
      memo.print();
    } else if (this.option[0] === "-r") {
      memo.printAll();
    } else if (this.option[0] === "-d") {
      memo.delete();
    } else {
      memo.add();
    }
  }
}
