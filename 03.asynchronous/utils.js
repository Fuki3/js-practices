#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function createTable() {
  return new Promise((resolve) => {
    db.run(
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
      function () {
        resolve(this);
      },
    );
  });
}

function insertABook(title) {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO books(title) VALUES(?)", [title], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID });
      }
    });
  });
}

function selectAbook(sql) {
  return new Promise((resolve, reject) => {
    db.get(sql, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function dropTable() {
  db.run("DROP TABLE books");
  db.close();
}

export { createTable, insertABook, selectAbook, dropTable };
