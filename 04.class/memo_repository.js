import fs from "fs/promises";
import path from "path";

export default class MemoRepository {
  async _save(filename, lines) {
    await this.#makeDirectory();
    await fs.writeFile(path.join("memos", `${filename}.txt`), lines.join("\n"));
  }

  async _getFirstLines(directoryPath) {
    await this.#makeDirectory();
    const files = await fs.readdir(directoryPath);

    const lines = [];

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const content = await fs.readFile(filePath, "utf8");
      const firstLine = content.split("\n")[0];
      lines.push(firstLine);
    }
    return lines;
  }

  async _getFilenames(directoryPath) {
    await this.#makeDirectory();
    const files = await fs.readdir(directoryPath);

    const fileNames = [];

    for (const file of files) {
      fileNames.push(file);
    }

    return fileNames;
  }

  async #makeDirectory() {
    try {
      await fs.access("memos");
    } catch {
      await fs.mkdir("memos");
    }
  }
}
