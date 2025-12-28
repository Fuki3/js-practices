import fs from "fs/promises";
import path from "path";

export default class MemoRepository {
  async save(filename, lines) {
    await this.#makeDirectory();
    await fs.writeFile(path.join("memos", `${filename}.txt`), lines.join("\n"));
  }

  async getFirstLines() {
    await this.#makeDirectory();
    const files = await fs.readdir("./memos");
    const lines = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join("./memos", file);
        const content = await fs.readFile(filePath, "utf8");
        const firstLine = content.split("\n")[0];
        return { file, firstLine };
      }),
    );
    return lines;
  }

  readContent(file) {
    return fs.readFile(path.join("memos", file), "utf8");
  }

  async #makeDirectory() {
    try {
      await fs.access("memos");
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.mkdir("memos");
      } else {
        throw error;
      }
    }
  }
}
