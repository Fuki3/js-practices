#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function run(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, [params], function (error) {
      if (error) {
        reject(error);
      } else {
        resolve({ lastID: this.lastID });
      }
    });
  });
}

function get(sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, [params], function (error, title) {
      if (error) {
        reject(error);
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
