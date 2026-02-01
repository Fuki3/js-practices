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
        const content = await fs.readFile(filePath, "utf8");
        const id = await this.#filenameToId(filename);
        return { id, content };
      }),
    );
    return summaries;
  }

  async delete(summary) {
    const filename = await this.#idToFilename(summary.id);
    await this.#deleteFileList(summary.id);
    await fs.unlink(path.join(this.memosDirectoryPath, filename));
  }

  async save(lines) {
    await this.#makeDirectory();
    const id = randomUUID();
    const filename = `${lines[0]}_${id}.txt`;
    const filePath = path.join(this.memosDirectoryPath, filename);
    await fs.writeFile(filePath, lines.join("\n"));
    await this.#addFileList(filename, id);
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
