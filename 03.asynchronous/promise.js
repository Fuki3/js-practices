#!/usr/bin/env node

import { run, get, close } from "./sqliteUtils.js";

run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
)
  .then(() => {
    return run("INSERT INTO books(title) VALUES(?)", "初めてのJavaScript");
  })
  .then((book) => {
    console.log(book.lastID);
    return get("SELECT * FROM books");
  })
  .then((title) => {
    console.log(title);
    return run("DROP TABLE books");
  })
  .then(() => {
    return close();
  });
