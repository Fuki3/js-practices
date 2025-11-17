import readline from "readline";
import enquirer from "enquirer";
const { Select } = enquirer;

export default class MemoPrompt {
  constructor() {
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
}
