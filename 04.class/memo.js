#!/usr/bin/env node

import MemoPrompt from "./memo_prompt.js";

const option = process.argv.slice(2);
const memoPrompt = new MemoPrompt(option);
memoPrompt.output();
