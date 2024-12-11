const example = await Deno.readTextFile("./day11/example.txt");
const input = await Deno.readTextFile("./day11/input.txt");

const stones = input.split(" ").map(Number);

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

console.log("p1 result:", currentStones.length);
