#!/usr/bin/env node

import { run, get, close } from "./sqliteUtils.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

async function LearnAsynchronous() {
  try {
    await run(
      db,
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
    );
    const newRecord = await run(
      db,
      "INSERT INTO books(title) VALUES(?)",
      "初めてのJavaScript",
    );
    console.log(newRecord.lastID);
    const getRecord = await get(db, "SELECT * FROM books");
    console.log(getRecord);
    await run(db, "DROP TABLE books");
  } finally {
    close(db);
  }
}

LearnAsynchronous();
