#!/usr/bin/env node

import { run, get, close } from "./sqliteUtils.js";

async function LearnAsynchronous() {
  try {
    await run(
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
    );
    const newRecord = await run(
      "INSERT INTO books(title) VALUES(?)",
      "初めてのJavaScript",
    );
    console.log(newRecord.lastID);
    const getRecord = await get("SELECT * FROM books");
    console.log(getRecord);
    await run("DROP TABLE books");
  } finally {
    close();
  }
}

LearnAsynchronous();
