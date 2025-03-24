#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const date = new Date();
const year = argv.y ?? date.getFullYear();
const month = argv.m ?? date.getMonth() + 1;
const firstDay = new Date(year, month - 1, 1);
const lastDay = new Date(year, month, 0);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

process.stdout.write(" ".repeat(firstDay.getDay() * 3));

for (let date = firstDay; date <= lastDay; date.setDate(date.getDate() + 1)) {
  if (String(date.getDate()).length === 1) {
    process.stdout.write(" ");
  }
  process.stdout.write(String(date.getDate()));
  if (date !== lastDay) {
    if (date.getDay() === 6) {
      process.stdout.write("\n");
    } else {
      process.stdout.write(" ");
    }
  }
}
process.stdout.write("\n\n");
