#!/usr/bin/env node

import { createTable, insertABook, selectAbook, dropTable } from "./utils.js";

createTable()
  .then(() => {
    return insertABook();
  })
  .catch((err) => {
    console.error(`Get Error: ${err.message}`);
    return selectAbook("SELECT * FROM memo");
  })
  .catch((err) => {
    console.error(`Get Error: ${err.message}`);
    return dropTable();
  });
