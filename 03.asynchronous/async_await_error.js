#!/usr/bin/env node

import { run, get, close } from "./sqliteUtils.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

try {
  await run(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
  );
  await run(db, "INSERT INTO books(title) VALUES(?)", [null]);
} catch (error) {
  console.error(`Get Error: ${error.message}`);
}
try {
  await get(db, "SELECT * FROM memo");
} catch (error) {
  console.error(`Get Error: ${error.message}`);
  await run(db, "DROP TABLE books");
} finally {
  close(db);
}
