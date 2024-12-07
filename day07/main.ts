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

  function helper(index: number, currVal: number): number | boolean {
    const key = `${index},${currVal}`;
    if (map.has(key)) return map.get(key);

    // check result when end reached
    if (index === numbers.length) {
      const result = currVal === testValue;
      map.set(key, result);
      return result;
    }

    // apply operators
    const next = numbers[index];
    const sum = helper(index + 1, currVal + next);
    const product = helper(index + 1, currVal * next);

    const result = sum || product;
    map.set(key, result);
    return result;
  }

  return helper(1, numbers[0]);
}

let testValueSum = 0;
for (const { testValue, numbers } of equations) {
  if (canCalibrate(testValue, numbers)) {
    testValueSum += testValue;
  }
}

console.log("p1 result:", testValueSum);
