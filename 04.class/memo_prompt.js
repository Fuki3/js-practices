import readline from "readline";
import enquirer from "enquirer";
const { Select } = enquirer;

export default class MemoPrompt {
  constructor() {
    this.lines = [];
  }

  async input() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    await new Promise((resolve, reject) => {
      rl.on("line", (input) => {
        if (input === "") {
          rl.close();
        } else {
          this.lines.push(input);
        }
      });

      rl.on("close", resolve);
      rl.on("error", reject);
    });

    return this.lines;
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
