import { abs } from "https://deno.land/x/math@v1.1.0/mod.ts";

const example = await Deno.readTextFile("./day01/example.txt");
const example2 = await Deno.readTextFile("./day01/example2.txt");
const locations = await Deno.readTextFile("./day01/input.txt");
const locations2 = await Deno.readTextFile("./day01/input2.txt");

function getLists(input) {
  const regex = /(\d+)\s+(\d+)/;
  const firstList = [];
  const secondList = [];

  input.split("\n").forEach((line) => {
    const match = line.match(regex);
    if (match) {
      firstList.push(match[1]);
      secondList.push(match[2]);
    }
  });

  return { firstList, secondList };
}

function solve1() {
  const { firstList, secondList } = getLists(locations);
  firstList.sort();
  secondList.sort();

  const accDistance = firstList.reduce((acc, el1, i) => {
    const el2 = secondList[i];
    return acc + Number(abs(el1 - el2));
  }, 0);

  console.log(`Distance result: ${accDistance}`);
}

function solve2() {
  const { firstList, secondList } = getLists(locations2);
  const freqMap = new Map<string, number>();
  for (const el of secondList) {
    freqMap.set(el, (freqMap.get(el) || 0) + 1);
  }

  const accSimScore = firstList.reduce((acc, el) => {
    const count = freqMap.get(el) || 0;
    return acc + Number(el) * count;
  }, 0);

  console.log(`Sim score result: ${accSimScore}`);
}

solve1();
solve2();
