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
  db.run("INSERT INTO books(title) VALUES(?)", [], (err) => {
    console.error(`Get Error: ${err.message}`);
    callback();
  });
}

function selectAbook(callback) {
  db.get("SELECT * FROM memo", (err) => {
    console.error(`Get Error: ${err.message}`);
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
