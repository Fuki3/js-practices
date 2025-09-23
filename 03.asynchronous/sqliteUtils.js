#!/usr/bin/env node

export function run(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });
}

export function get(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, function (error, title) {
      if (error) {
        reject(error);
      } else {
        resolve(title);
      }
    });
  });
}

export function close(db) {
  return new Promise((resolve) => db.close(() => resolve()));
}
