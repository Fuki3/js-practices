#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const date = new Date();
const year = argv.y ?? date.getFullYear();
const month = argv.m ?? date.getMonth() + 1;
const day = new Date(year, month - 1, 1);
const lastDay = new Date(year, month, 0);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

for (let numberOfBlank = 0; numberOfBlank < day.getDay(); numberOfBlank++) {
  process.stdout.write("   ");
}
for (let eachDay = day.getDate(); eachDay < lastDay.getDate(); eachDay++) {
  if (String(eachDay).length === 1) {
    process.stdout.write(" ");
  }
  day.setDate(eachDay);
  if (day.getDay() === 6) {
    process.stdout.write(`${day.getDate()}\n`);
  } else {
    process.stdout.write(`${day.getDate()} `);
  }
}
process.stdout.write(`${lastDay.getDate()}\n\n`);
