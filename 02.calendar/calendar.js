#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const now = new Date();
const year = argv.y ?? now.getFullYear();
const month = argv.m ?? now.getMonth() + 1;
const firstDay = new Date(year, month - 1, 1);
const lastDay = new Date(year, month, 0);
const week = firstDay.getDay();

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

let weekCount = week;
for (let numberOfBlank = 0; numberOfBlank < weekCount; numberOfBlank++) {
  process.stdout.write("   ");
}
for (
  let eachDay = firstDay.getDate();
  eachDay <= lastDay.getDate();
  eachDay++
) {
  if (String(eachDay).length === 1) {
    process.stdout.write(" ");
  }
  process.stdout.write(eachDay + " ");
  if (weekCount === 6) {
    process.stdout.write("\n");
    weekCount = 0;
  } else {
    weekCount++;
  }
}
process.stdout.write("\n" + "\n");
