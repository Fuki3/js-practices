import readline from "readline";
import enquirer from "enquirer";

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

  async choose(firstLines, message) {
    const prompt = new enquirer.Select({
      message,
      choices: firstLines.map((firstLine) => ({
        name: firstLine.filename,
        message: firstLine.firstLine,
      })),
    });

    return await prompt.run();
  }
}
