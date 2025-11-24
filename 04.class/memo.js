#!/usr/bin/env node

import MemoApp from "./memo_app.js";
import { NothingAnyMemos } from "./nothing_any_memos.js";

const option = process.argv.slice(2);

const memoApp = new MemoApp();

try {
  await memoApp.runOption(option);
} catch (error) {
  if (error instanceof NothingAnyMemos) {
    process.exit(0);
  }
  console.error("Error", error);
  process.exit(1);
}
