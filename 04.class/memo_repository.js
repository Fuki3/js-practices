import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export default class MemoRepository {
  constructor() {
    this.fileListFilePath = "./fileList.json";
  }

  async getMemoSummaries() {
    await this.#makeDirectory();
    const filenames = await fs.readdir("./memos");
    const memoSummaries = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join("./memos", filename);
        const content = await fs.readFile(filePath, "utf8");
        const id = await this.#filenameToId(filename);
        return { id, content };
      }),
    );
    return memoSummaries;
  }

  async delete(memoSummary) {
    const filename = await this.#idToFilename(memoSummary.id);
    await this.#deleteFileList(memoSummary.id);
    await fs.unlink(path.join("memos", filename));
  }

  async save(lines) {
    await this.#makeDirectory();
    const id = randomUUID();
    const filename = `${lines[0]}_${id}.txt`;
    const filePath = path.join("memos", filename);
    await fs.writeFile(filePath, lines.join("\n"));
    await this.#addFileList(filename, id);
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

  async #filenameToId(filename) {
    const fileList = await this.#loadFileList();
    return Object.keys(fileList).find((key) => fileList[key] === filename);
  }

  async #idToFilename(id) {
    const fileList = await this.#loadFileList();
    return fileList[id];
  }

  async #deleteFileList(id) {
    const fileList = await this.#loadFileList();
    delete fileList[id];
    return await fs.writeFile(
      this.fileListFilePath,
      JSON.stringify(fileList, null, 2) + "\n",
      "utf8",
    );
  }

  async #addFileList(filename, id) {
    let fileList = {};
    try {
      fileList = JSON.parse(await fs.readFile(this.fileListFilePath, "utf8"));
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
    fileList[id] = filename;
    await fs.writeFile(
      this.fileListFilePath,
      JSON.stringify(fileList, null, 2) + "\n",
      "utf8",
    );
  }

  async #loadFileList() {
    return JSON.parse(await fs.readFile(this.fileListFilePath, "utf8"));
  }
}
