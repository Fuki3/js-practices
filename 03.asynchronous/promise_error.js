#!/usr/bin/env node

import { run, get, close } from "./utils.js";

run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
)
  .then(() => {
    return run("INSERT INTO books(title) VALUES(?)", null);
  })
  .catch((error) => {
    console.error(`Get Error: ${error.message}`);
    return get("SELECT * FROM memo");
  })
  .catch((error) => {
    console.error(`Get Error: ${error.message}`);
    return run("DROP TABLE books");
  })
  .then(() => {
    return close();
  });
