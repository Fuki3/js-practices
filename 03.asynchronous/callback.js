#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function createTable(callback) {
  db.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
    callback,
  );
}

function insertABook(callback) {
  db.run("INSERT INTO books(title) VALUES(?)", ["a"], function () {
    console.log(this.lastID);
    callback();
  });
}

function selectAbook(callback) {
  db.get("SELECT * FROM books", (_, data) => {
    console.log(data);
    callback();
  });
}

function dropTable() {
  db.run("DROP TABLE books");
  db.close();
}

createTable(() => {
  insertABook(() => {
    selectAbook(() => {
      dropTable();
    });
  });
});
