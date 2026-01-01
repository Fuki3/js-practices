#!/usr/bin/env node

import MemoApp from "./memo_app.js";
import NoMemoError from "./no_memo_error.js";

const commandArguments = process.argv.slice(2);

const memoApp = new MemoApp();

try {
  await memoApp.handleOption(commandArguments);
} catch (error) {
  if (!(error instanceof NoMemoError)) {
    console.error("Error", error);
    process.exit(1);
  }
}
