const example = await Deno.readTextFile("./day05/example.txt");
const input = await Deno.readTextFile("./day05/input.txt");

const [rules, updates] = input.split("\n\n").map((section) =>
  section.split("\n")
);

const dict: Map<string, string[]> = new Map<string, string[]>();

rules.forEach((rule) => {
  const [key, val] = rule.split("|");
  if (dict.get(key)) {
    dict.get(key)!.push(val);
  } else {
    dict.set(key, [val]);
  }
});

const results: string[] = [];
updates.forEach((update) => {
  const sequence = update.split(",");
  let isOk = true;
  for (let i = sequence.length - 1; i >= 0; i--) {
    const curr = sequence[i];
    const prev = sequence.slice(0, i);
    const matches = (dict.get(curr) || []).filter((val) => prev.includes(val));
    if (matches.length >= 1) {
      isOk = false;
    }
  }

  if (isOk) {
    results.push(sequence[Math.floor(sequence.length / 2)]);
  }
});

console.log(
  "Result: ",
  results.map(Number).reduce((acc, curr) => acc + curr, 0),
);
