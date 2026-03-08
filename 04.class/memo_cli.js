import readline from "readline";
import enquirer from "enquirer";

export default class MemoCli {
  print(text) {
    console.log(text);
  }

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

  async choose(memos, message) {
    const prompt = new enquirer.Select({
      message,
      choices: memos.map((memo) => ({
        name: memo.content.split("\n")[0],
        memo,
      })),

      result() {
        return this.focused.memo;
      },
    });
    return await prompt.run();
  }
}
