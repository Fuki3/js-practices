import fs from "fs/promises";
import path from "path";

export default class MemoRepository {
  constructor() {
    this.directory = "memos";
  }

  async _save(filename, lines) {
    await fs.mkdir(this.directory, { recursive: true });
    await fs.writeFile(`./${this.directory}/${filename}.txt`, lines.join("\n"));
  }

  async _getFirstLines(directoryPath) {
    await fs.mkdir(this.directory, { recursive: true });
    const files = await fs.readdir(directoryPath);

    const lines = [];

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const content = await fs.readFile(filePath, "utf8");
      const firstLine = content.split("\n")[0];
      lines.push(firstLine);
    }
    if (lines.length === 0) {
      process.exit(0);
    }
    return lines;
  }
}
