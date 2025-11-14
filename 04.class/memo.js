#!/usr/bin/env node

import MemoApp from "./memo-app.js";

const option = process.argv.slice(2);
const memoapp = new MemoApp(option);
memoapp.output();
