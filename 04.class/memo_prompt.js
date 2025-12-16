import readline from "readline";
import enquirer from "enquirer";

const Select = enquirer.Select;

export default class MemoPrompt {
  async input() {
    const lines = [];
    const rl = readline.createInterface({
      input: process.stdin,
    });

    await new Promise((resolve, reject) => {
      rl.on("line", (input) => {
        lines.push(input);
      });

      rl.on("close", resolve);
      rl.on("error", reject);
    });

    return lines;
  }

  async choose(lines, message) {
    const prompt = new Select({
      message,
      choices: lines.map((line) => ({
        name: line.file,
        message: line.firstLine,
      })),
    });

    return await prompt.run();
  }
}
