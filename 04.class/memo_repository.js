import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export default class MemoRepository {
  constructor() {
    this.memosDirectoryPath = "./memos";
    this.fileListFilePath = "./fileList.json";
  }

  async getSummaries() {
    await this.#makeDirectory();
    const filenames = await fs.readdir(this.memosDirectoryPath);
    const summaries = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(this.memosDirectoryPath, filename);
        const memo = JSON.parse(await fs.readFile(filePath, "utf8"));
        const id = memo.id;
        const content = memo.content;
        return { id, content };
      }),
    );
    return summaries;
  }

  async delete(summary) {
    const filename = `${summary.content.split("\n")[0]}_${summary.id}.txt`;
    await fs.unlink(path.join(this.memosDirectoryPath, filename));
  }

  async save(lines) {
    await this.#makeDirectory();
    const id = randomUUID();
    const filename = `${lines[0]}_${id}.txt`;
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
