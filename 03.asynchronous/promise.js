#!/usr/bin/env node

import { run, get, close } from "./utils.js";

run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
)
  .then(() => {
    return run("INSERT INTO books(title) VALUES(?)", "a");
  })
  .then((data) => {
    console.log(data.lastID);
    return get("SELECT * FROM books");
  })
  .then((data) => {
    console.log(data);
    return run("DROP TABLE books");
  })
  .then(() => {
    return close();
  });
