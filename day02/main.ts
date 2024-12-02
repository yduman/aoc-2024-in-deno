const example = await Deno.readTextFile("./day02/example.txt");
const input = await Deno.readTextFile("./day02/input.txt");

function getLists(input: string) {
  return input.split("\n").map((line) => line.split(" ").map(Number));
}

const reports = getLists(input);

let safe = 0;
const safeRangeDesc = [1, 2, 3];
const safeRangeAsc = [-1, -2, -3];

for (const report of reports) {
  let isSafe = true;
  const safeRange = report[0] > report[1] ? safeRangeDesc : safeRangeAsc;

  for (let i = 0; i < report.length - 1; i++) {
    const left = report[i];
    const right = report[i + 1];

    const levelDiff = left - right;

    if (!safeRange.includes(levelDiff)) {
      isSafe = false;
      break;
    }
  }

  if (isSafe) {
    safe++;
  }
}

console.log(safe);
