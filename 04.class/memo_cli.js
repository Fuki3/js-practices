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

  async choose(summaries, message) {
    const prompt = new enquirer.Select({
      message,
      choices: summaries.map((summary) => ({
        message: summary.content.split("\n")[0],
        memo: summary,
      })),

      result(value) {
        return this.choices.find((choice) => choice.value === value).memo;
      },
    });
    return await prompt.run();
  }
}
