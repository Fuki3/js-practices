#!/usr/bin/env node

import { run, get, close } from "./sqliteUtils.js";

async function LearnAsynchronous() {
  try {
    await run(
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
    );
    await run("INSERT INTO books(title) VALUES(?)", null);
  } catch (error) {
    console.error(`Get Error: ${error.message}`);
  }
  try {
    await get("SELECT * FROM memo");
  } catch (error) {
    console.error(`Get Error: ${error.message}`);
    await run("DROP TABLE books");
  } finally {
    close();
  }
}

LearnAsynchronous();
