#!/usr/bin/env node

import { createTable, insertABook, selectAbook, dropTable } from "./utils.js";

createTable()
  .then(() => {
    return insertABook("a");
  })
  .then((data) => {
    console.log(data.lastID);
    return selectAbook("SELECT * FROM books");
  })
  .then((data) => {
    console.log(data);
    return dropTable();
  });
