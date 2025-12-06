#!/usr/bin/env node

import MemoApp from "./memo_app.js";
import { NothingAnyMemos } from "./nothing_any_memos.js";

const args = process.argv.slice(2);

const memoApp = new MemoApp();

try {
  await memoApp.runOption(args);
} catch (error) {
  if (error instanceof NothingAnyMemos) {
    process.exit(0);
  }
  console.error("Error", error);
  process.exit(1);
}
