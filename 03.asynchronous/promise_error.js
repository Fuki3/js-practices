#!/usr/bin/env node

import { run, get, close } from "./sqliteUtils.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

run(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
)
  .then(() => {
    return run(db, "INSERT INTO books(title) VALUES(?)", null);
  })
  .catch((error) => {
    console.error(`Get Error: ${error.message}`);
    return get(db, "SELECT * FROM memo");
  })
  .catch((error) => {
    console.error(`Get Error: ${error.message}`);
    return run(db, "DROP TABLE books");
  })
  .then(() => {
    return close(db);
  });
