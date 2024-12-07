const example = await Deno.readTextFile("./day07/example.txt");
const input = await Deno.readTextFile("./day07/input.txt");

const splitted = input.split("\n").map((s) => s.split(": "));

const equations = [];
for (const line of splitted) {
  equations.push({
    testValue: Number(line[0]),
    numbers: line[1].split(" ").map(Number),
  });
}

function canCalibrate(testValue: number, numbers: number[]) {
  const map = new Map();

  function calc(index: number, currVal: number): number | boolean {
    const key = `${index},${currVal}`;
    if (map.has(key)) {
      return map.get(key);
    }

    // check result when end reached
    if (index === numbers.length) {
      const result = currVal === testValue;
      map.set(key, result);
      return result;
    }

    // apply operators
    const next = numbers[index];

    if (calc(index + 1, currVal + next)) {
      map.set(key, true);
      return true;
    }

    if (calc(index + 1, currVal * next)) {
      map.set(key, true);
      return true;
    }

    if (calc(index + 1, Number(`${currVal}${next}`))) {
      map.set(key, true);
      return true;
    }

    map.set(key, false);
    return false;
  }

  return calc(1, numbers[0]);
}

let testValueSum = 0;
for (const { testValue, numbers } of equations) {
  if (canCalibrate(testValue, numbers)) {
    testValueSum += testValue;
  }
}

console.log("result:", testValueSum);
