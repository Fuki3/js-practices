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

process.stdout.write(" ".repeat(firstDay.getDay() * 3));

for (
  let currentDay = new Date(firstDay);
  currentDay <= lastDay;
  currentDay.setDate(currentDay.getDate() + 1)
) {
  process.stdout.write(currentDay.getDate().toString().padStart(2, " "));

  if (currentDay.getTime() === lastDay.getTime() || currentDay.getDay() === 6) {
    process.stdout.write("\n");
  } else {
    process.stdout.write(" ");
  }
}
process.stdout.write("\n");
