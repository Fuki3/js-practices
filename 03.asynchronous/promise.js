#!/usr/bin/env node

import { run, get, close } from "./sqliteUtils.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

run(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
)
  .then(() => {
    return run(db, "INSERT INTO books(title) VALUES(?)", "初めてのJavaScript");
  })
  .then((book) => {
    console.log(book.lastID);
    return get(db, "SELECT * FROM books");
  })
  .then((title) => {
    console.log(title);
    return run(db, "DROP TABLE books");
  })
  .then(() => {
    return close(db);
  });
