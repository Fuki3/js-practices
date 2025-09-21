#!/usr/bin/env node

import { run, get, close } from "./sqliteUtils.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

try {
  await run(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
  );
  const addedBook = await run(db, "INSERT INTO books(title) VALUES(?)", [
    "初めてのJavaScript",
  ]);
  console.log(addedBook.lastID);
  const getRecord = await get(db, "SELECT * FROM books");
  console.log(getRecord);
  await run(db, "DROP TABLE books");
} finally {
  close(db);
}
