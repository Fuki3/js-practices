import fs from "fs/promises";
import path from "path";

export default class MemoRepository {
  async getMemoSummaries() {
    await this.#makeDirectory();
    const filenames = await fs.readdir("./memos");
    const memoSummaries = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join("./memos", filename);
        const content = await fs.readFile(filePath, "utf8");
        const firstLine = content.split("\n")[0];
        return { filename, firstLine };
      }),
    );
    return memoSummaries;
  }

  readContent(filename) {
    const filePath = path.join("./memos", filename);
    return fs.readFile(filePath, "utf8");
  }

  delete(filename) {
    fs.unlink(path.join("memos", filename));
  }

  async save(lines) {
    const filePath = path.join("memos", `${new Date()}.txt`);
    await this.#makeDirectory();
    await fs.writeFile(filePath, lines.join("\n"));
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
