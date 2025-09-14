#!/usr/bin/env node

import { createTable, insertABook, selectAbook, dropTable } from "./utils.js";

async function LearnAsynchronous() {
  try {
    await createTable();
    await insertABook();
  } catch (err) {
    console.error(`Get Error: ${err.message}`);
  }
  try {
    await selectAbook("SELECT * FROM memo");
  } catch (err) {
    console.error(`Get Error: ${err.message}`);
  } finally {
    dropTable();
  }
}

LearnAsynchronous();
