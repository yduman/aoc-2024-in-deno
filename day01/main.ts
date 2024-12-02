import { abs } from "https://deno.land/x/math@v1.1.0/mod.ts";

const example = await Deno.readTextFile("./day01/example.txt");
const locations = await Deno.readTextFile("./day01/input.txt");

let firstList = [];
let secondList = [];
const regex = /(\d+)\s+(\d+)/;

locations.split("\n").forEach((line) => {
  const match = line.match(regex);
  if (match) {
    firstList.push(match[1]);
    secondList.push(match[2]);
  }
});

firstList.sort();
secondList.sort();

const accDistance = firstList.reduce((acc, el1, i) => {
  const el2 = secondList[i];
  return acc + Number(abs(el1 - el2));
}, 0);

console.log(accDistance);
