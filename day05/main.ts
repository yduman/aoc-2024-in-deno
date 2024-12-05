const example = await Deno.readTextFile("./day05/example.txt");
const input = await Deno.readTextFile("./day05/input.txt");

const [rules, updates] = input.split("\n\n").map((section) =>
  section.split("\n")
);

const dict: Map<string, string[]> = new Map<string, string[]>();

function sum(arr: string[][]) {
  return arr.map((update) => update[Math.floor(update.length / 2)]).map(Number)
    .reduce((acc, curr) => acc + curr, 0);
}

rules.forEach((rule) => {
  const [key, val] = rule.split("|");
  if (!dict.has(key)) {
    dict.set(key, []);
  }
  dict.get(key)!.push(val);
});

const goodUpdates: string[][] = [];
const badUpdates: string[][] = [];

updates.forEach((update) => {
  const sequence = update.split(",");
  let isOk = true;
  for (let i = sequence.length - 1; i >= 0; i--) {
    const curr = sequence[i];
    const prev = sequence.slice(0, i);
    const matches = (dict.get(curr) || []).filter((val) => prev.includes(val));
    if (matches.length >= 1) {
      isOk = false;
      badUpdates.push(sequence);
      break;
    }
  }

  if (isOk) {
    goodUpdates.push(sequence);
  }
});

console.log("p1 result:", sum(goodUpdates));

const sorted = badUpdates.map((sequence) => {
  let copy = [...sequence];
  for (let i = 0; i < copy.length; i++) {
    for (let j = 0; j < copy.length - 1; j++) {
      const current = copy[j];
      const next = copy[j + 1];
      const values = dict.get(next) || [];
      if (values.includes(current)) {
        [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
      }
    }
  }
  return copy;
});
const sumFixed = sum(sorted);
console.log("p2 result:", sumFixed);
