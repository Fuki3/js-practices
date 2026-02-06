import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import sanitize from "sanitize-filename";

export default class MemoRepository {
  constructor() {
    this.memosDirectoryPath = "./memos";
    this.fileListFilePath = "./fileList.json";
  }

  async getMemos() {
    await this.#makeDirectory();
    const filenames = await fs.readdir(this.memosDirectoryPath);
    const memos = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(this.memosDirectoryPath, filename);
        const memo = JSON.parse(await fs.readFile(filePath, "utf8"));
        return memo;
      }),
    );
    return memos;
  }

  async delete(memo) {
    const filename = `${memo.content.split("\n")[0]}_${memo.id}.txt`;
    await fs.unlink(path.join(this.memosDirectoryPath, filename));
  }

  async save(lines) {
    await this.#makeDirectory();
    const id = randomUUID();
    const firstLine = sanitize(`${lines[0]}`, { replacement: "_" });
    const filename = `${firstLine}_${id}.txt`;
    const content = lines.join("\n");
    const filePath = path.join(this.memosDirectoryPath, filename);
    const memo = {
      id,
      content,
    };
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
