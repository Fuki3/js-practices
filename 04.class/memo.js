#!/usr/bin/env node

import MemoApp from "./memo_app.js";
import NoMemoError from "./no_memo_error.js";

const args = process.argv.slice(2);

const memoApp = new MemoApp();

try {
  await memoApp.runOption(args);
} catch (error) {
  if (error instanceof NoMemoError) {
    process.exit(0);
  }
  console.error("Error", error);
  process.exit(1);
}
