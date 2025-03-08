#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

/*現在の年月日*/
const now_date = new Date();
/*カレンダーで表示する年*/
const output_year = argv.y || now_date.getFullYear();
/*カレンダーで表示する月*/
const output_month = argv.m || now_date.getMonth() + 1;
/*月初めの年月日*/
const first_day = new Date(output_year, output_month - 1, 1);
/*月終わりの年月日*/
const last_day = new Date(output_year, output_month, 0);
/*月初めの曜日を取得*/
const week = first_day.getDay();

/*年月を表示*/
console.log("      " + output_month + "月" + " " + output_year);
console.log("日 月 火 水 木 金 土");

/*月初めから月終わりまでの日にちを表示*/
let week_count = week;
for (let blank = 0; blank < week_count; blank++) {
  process.stdout.write("   ");
}
for (let number = first_day.getDate(); number <= last_day.getDate(); number++) {
  if (String(number).length == 1) {
    process.stdout.write(" ");
  }
  process.stdout.write(number + " ");
  if (week_count == 6) {
    process.stdout.write("\n");
    week_count = 0;
  } else {
    week_count++;
  }
}
process.stdout.write("\n" + "\n");
