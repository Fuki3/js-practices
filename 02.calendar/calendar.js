#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const now = new Date();
const year = argv.y ?? now.getFullYear();
const month = argv.m ?? now.getMonth() + 1;
const firstDay = new Date(year, month - 1, 1);
const lastDay = new Date(year, month, 0);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

for (
  let numberOfBlank = 0;
  numberOfBlank < firstDay.getDay();
  numberOfBlank++
) {
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
  firstDay.setDate(eachDay);
  process.stdout.write(firstDay.getDate() + " ");
  if (firstDay.getDay() === 6) {
    process.stdout.write("\n");
  }
}
process.stdout.write("\n" + "\n");
