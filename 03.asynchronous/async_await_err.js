#!/usr/bin/env node

import { run, get, close } from "./utils.js";

async function LearnAsynchronous() {
  try {
    await run(
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
    );
    await run("INSERT INTO books(title) VALUES(?)", null);
  } catch (err) {
    console.error(`Get Error: ${err.message}`);
  }
  try {
    await get("SELECT * FROM memo");
  } catch (err) {
    console.error(`Get Error: ${err.message}`);
    await run("DROP TABLE books");
  } finally {
    close();
  }
}

LearnAsynchronous();
