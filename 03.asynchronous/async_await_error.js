#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { run, get, close } from "./sqlite_functions.js";

const db = new sqlite3.Database(":memory:");

await run(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
);
try {
  await run(db, "INSERT INTO books(title) VALUES(?)", [null]);
} catch (error) {
  if (error?.code === "SQLITE_CONSTRAINT") {
    console.error(`Error: ${error.message}`);
  } else {
    throw error;
  }
}
try {
  await get(db, "SELECT * FROM memo");
} catch (error) {
  if (error?.code === "SQLITE_ERROR") {
    console.error(`Error: ${error.message}`);
  } else {
    throw error;
  }
}
await run(db, "DROP TABLE books");
await close(db);
