#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
  () => {
    db.run("INSERT INTO books(title) VALUES(?)", ["a"], function () {
      console.log(this.lastID);
      db.get("SELECT * FROM books", (_, data) => {
        console.log(data);
        db.run("DROP TABLE books"),
          function () {
            db.close();
          };
      });
    });
  },
);
