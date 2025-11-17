#!/usr/bin/env node

import MemoApp from "./memo_app.js";

const option = process.argv.slice(2);

const memoApp = new MemoApp();
memoApp.runOption(option);
