const example = await Deno.readTextFile("./day02/example.txt");
const input = await Deno.readTextFile("./day02/input.txt");

function getLists(input: string) {
  return input.split("\n").map((line) => line.split(" ").map(Number));
}

const reports = getLists(input);
const safeRangeDesc = [1, 2, 3];
const safeRangeAsc = [-1, -2, -3];

function solve1() {
  let safe = 0;
  for (const report of reports) {
    const safeRange = report[0] > report[1] ? safeRangeDesc : safeRangeAsc;
    if (isSafe(report, safeRange)) {
      safe++;
    }
  }

  console.log(safe);
}

function solve2() {
  let safe = 0;
  for (const report of reports) {
    const safeRange = report[0] > report[1] ? safeRangeDesc : safeRangeAsc;
    if (isSafe(report, safeRange)) {
      safe++;
      continue;
    }

    let isSafeWithDamp = false;
    for (let i = 0; i < report.length; i++) {
      const dampenedReport = report.slice(0, i).concat(report.slice(i + 1));
      const dampenedSafeRange = dampenedReport[0] > dampenedReport[1]
        ? safeRangeDesc
        : safeRangeAsc;
      if (isSafe(dampenedReport, dampenedSafeRange)) {
        isSafeWithDamp = true;
        break;
      }
    }

    if (isSafeWithDamp) {
      safe++;
    }
  }

  console.log(safe);
}

function isSafe(report: number[], safeRange: number[]) {
  for (let i = 0; i < report.length - 1; i++) {
    const levelDiff = report[i] - report[i + 1];
    if (!safeRange.includes(levelDiff)) {
      return false;
    }
  }
  return true;
}

solve1();
solve2();
