#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { run, get, close } from "./sqlite_functions.js";

const db = new sqlite3.Database(":memory:");

run(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
)
  .then(() =>
    run(db, "INSERT INTO books(title) VALUES(?)", ["初めてのJavaScript"]),
  )
  .then((statement) => {
    console.log(statement.lastID);
    return get(db, "SELECT * FROM books");
  })
  .then((book) => {
    console.log(book);
    return run(db, "DROP TABLE books");
  })
  .then(() => close(db));
