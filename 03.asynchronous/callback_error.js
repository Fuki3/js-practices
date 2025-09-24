#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
  () => {
    db.run("INSERT INTO books(title) VALUES(?)", [null], (error) => {
      console.error(`Get Error: ${error.message}`);
      db.get("SELECT * FROM memo", (error) => {
        console.error(`Get Error: ${error.message}`);
        db.run("DROP TABLE books", () => {
          db.close();
        });
      });
    });
  },
);
