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

  async _handleContent(callback) {
    try {
      return await callback();
    } catch (err) {
      console.error("Error:", err.message);
      return null;
    }
  }

  async _readFirstLine(directoryPath, callback) {
    try {
      await fs.mkdir(this.directory, { recursive: true });
      const files = await fs.readdir(directoryPath);
      for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const content = await fs.readFile(filePath, "utf8");
        const firstLine = content.split("\n")[0];
        await callback(firstLine);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
}
