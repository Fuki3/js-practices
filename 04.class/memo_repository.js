import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export default class MemoRepository {
  constructor() {
    this.memosDirectoryPath = "./memos";
  }

  async getMemos() {
    await this.#makeDirectory();
    const filenames = await fs.readdir(this.memosDirectoryPath);
    const memos = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(this.memosDirectoryPath, filename);
        const fileContent = await fs.readFile(filePath, "utf8");
        const memo = JSON.parse(fileContent);
        return memo;
      }),
    );
    return memos;
  }

  async delete(memo) {
    const filename = `${memo.id}.txt`;
    const filePath = path.join(this.memosDirectoryPath, filename);
    await fs.unlink(filePath);
  }

  async save(lines) {
    await this.#makeDirectory();
    const id = randomUUID();
    const content = lines.join("\n");
    const memo = {
      id,
      content,
    };
    const filename = `${id}.txt`;
    const filePath = path.join(this.memosDirectoryPath, filename);
    await fs.writeFile(filePath, JSON.stringify(memo, null, 2));
  }

  async #makeDirectory() {
    try {
      await fs.access(this.memosDirectoryPath);
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.mkdir(this.memosDirectoryPath);
      } else {
        throw error;
      }
    }
  }
}
