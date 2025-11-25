import fs from "fs/promises";
import path from "path";

export default class MemoRepository {
  async _save(filename, lines) {
    await fs.mkdir("memos", { recursive: true });
    await fs.writeFile(`./memos/${filename}.txt`, lines.join("\n"));
  }

  async _getFirstLines(directoryPath) {
    await fs.mkdir("memos", { recursive: true });
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
}
