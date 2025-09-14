#!/usr/bin/env node

import { createTable, insertABook, selectAbook, dropTable } from "./utils.js";

async function LearnAsynchronous() {
  try {
    await createTable();
    const newRecord = await insertABook("a");
    console.log(newRecord.lastID);
    const getRecord = await selectAbook("SELECT * FROM books");
    console.log(getRecord);
  } finally {
    dropTable();
  }
}

LearnAsynchronous();
