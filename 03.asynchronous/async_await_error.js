#!/usr/bin/env node

import { run, get, close } from "./sqliteUtils.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

await run(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
);
try {
  await run(db, "INSERT INTO books(title) VALUES(?)", [null]);
} catch (error) {
  if (error.message.includes("NOT NULL constraint failed: books.title")) {
    console.error(`Get Error: ${error.message}`);
  } else {
    throw error;
  }
}
try {
  await get(db, "SELECT * FROM memo");
} catch (error) {
  if (error.message.includes("no such table: memo")) {
    console.error(`Get Error: ${error.message}`);
  } else {
    throw error;
  }
}
await run(db, "DROP TABLE books");
await close(db);
