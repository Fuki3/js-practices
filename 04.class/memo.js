#!/usr/bin/env node

import fs from "fs/promises";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on("line", (input) => {
  if (input === "") return rl.close();
  lines.push(input);
});

rl.on("close", async () => {
  await fs.writeFile(`${lines[0]}.txt`, lines.join("\n"));
});
