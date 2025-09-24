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
  .then((addedBook) => {
    console.log(addedBook.lastID);
    return get(db, "SELECT * FROM books");
  })
  .then((fetchedBook) => {
    console.log(fetchedBook);
    return run(db, "DROP TABLE books");
  })
  .then(() => close(db));
