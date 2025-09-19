#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function run(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, [params], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID });
      }
    });
  });
}

function get(sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, [params], function (err, title) {
      if (err) {
        reject(err);
      } else {
        resolve(title);
      }
    });
  });
}

function close() {
  db.close();
}

export { run, get, close };
