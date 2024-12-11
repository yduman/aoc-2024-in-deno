const example = await Deno.readTextFile("./day11/example.txt");
const input = await Deno.readTextFile("./day11/input.txt");

const stones = input.split(" ").map(Number);
let stoneMap = new Map<number, number>();
stones.forEach((stone) => stoneMap.set(stone, (stoneMap.get(stone) || 0) + 1));

function is0(x: number) {
  if (x === 0) return true;
  return false;
}

function hasEvenDigits(x: number) {
  const len = x.toString().length;
  return len % 2 === 0;
}

function split(x: number) {
  const s = x.toString();
  const mid = s.length / 2;
  const l = s.slice(0, mid);
  const r = s.slice(mid);

  return [parseInt(l), parseInt(r)];
}

function p1() {
  let replaced: number[] = [];
  let blinks = 1;
  let currentStones = stones;
  while (blinks <= 25) {
    currentStones.forEach((stone) => {
      if (is0(stone)) {
        replaced.push(1);
      } else if (hasEvenDigits(stone)) {
        const [left, right] = split(stone);
        replaced.push(left, right);
      } else {
        replaced.push(stone * 2024);
      }
    });
    currentStones = replaced;
    replaced = [];
    blinks++;
  }

  return currentStones.length;
}

function p2() {
  let blinks = 1;
  while (blinks <= 75) {
    const newStoneMap = new Map<number, number>();

    for (const [stone, count] of stoneMap.entries()) {
      if (stone === 0) {
        newStoneMap.set(1, (newStoneMap.get(1) || 0) + count);
      } else if (hasEvenDigits(stone)) {
        const [left, right] = split(stone);
        newStoneMap.set(left, (newStoneMap.get(left) || 0) + count);
        newStoneMap.set(right, (newStoneMap.get(right) || 0) + count);
      } else {
        const newStone = stone * 2024;
        newStoneMap.set(
          newStone,
          (newStoneMap.get(newStone) || 0) + count,
        );
      }
    }

    stoneMap = newStoneMap;
    blinks++;
  }

  let result = 0;
  for (const count of stoneMap.values()) {
    result += count;
  }

  return result;
}

console.log("p1 result:", p1()); // 186203
console.log("p2 result:", p2()); // 221291560078593
