#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const day = new Date();
const year = argv.y ?? day.getFullYear();
const month = argv.m ?? day.getMonth() + 1;
const firstDay = new Date(year, month - 1, 1);
const lastDay = new Date(year, month, 0);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

process.stdout.write(" ".repeat(firstDay.getDay() * 3));

for (let date = firstDay; date <= lastDay; ) {
  process.stdout.write(date.getDate().toString().padStart(2, " "));
  if (date.getTime() === lastDay.getTime()) {
    break;
  }
  process.stdout.write(date.getDay() === 6 ? "\n" : " ");
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}
process.stdout.write("\n\n");
