import fs from "fs/promises";
import path from "path";

export default class MemoRepository {
  async save(filename, lines) {
    await this.#makeDirectory();
    await fs.writeFile(path.join("memos", `${filename}.txt`), lines.join("\n"));
  }

  async getFirstLines(directoryPath) {
    await this.#makeDirectory();
    const files = await fs.readdir(directoryPath);
    const lines = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(directoryPath, file);
        const content = await fs.readFile(filePath, "utf8");
        const firstLine = content.split("\n")[0];
        return { file, firstLine };
      }),
    );
    return lines;
  }

  async #makeDirectory() {
    try {
      await fs.access("memos");
    } catch {
      await fs.mkdir("memos");
    }
  }
}
