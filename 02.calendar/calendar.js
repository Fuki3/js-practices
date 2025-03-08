#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const now_date = new Date();
const output_year = argv.y ?? now_date.getFullYear();
const output_month = argv.m ?? now_date.getMonth() + 1;
const first_day = new Date(output_year, output_month - 1, 1);
const last_day = new Date(output_year, output_month, 0);
const week = first_day.getDay();

console.log("      " + output_month + "月" + " " + output_year);
console.log("日 月 火 水 木 金 土");

let week_count = week;
for (let blank = 0; blank < week_count; blank++) {
  process.stdout.write("   ");
}
for (let number = first_day.getDate(); number <= last_day.getDate(); number++) {
  if (String(number).length === 1) {
    process.stdout.write(" ");
  }
  process.stdout.write(number + " ");
  if (week_count === 6) {
    process.stdout.write("\n");
    week_count = 0;
  } else {
    week_count++;
  }
}
process.stdout.write("\n" + "\n");
