// Read the input files
const example = await Deno.readTextFile("./day10/example.txt");
const input = await Deno.readTextFile("./day10/input.txt");

function getTopographicMap(input: string) {
  return input.split("\n").map((line) => line.split("").map(Number));
}

function isInBounds(x: number, y: number, map: number[][]) {
  return x >= 0 && y >= 0 && x < map.length && y < map[0].length;
}

const topographicMap = getTopographicMap(input);
const ROWS = topographicMap.length;
const COLS = topographicMap[0].length;
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function getScore(startX: number, startY: number) {
  const Q = [[startX, startY, 0]];
  const visited = new Set<string>();
  let score = 0;

  while (Q.length > 0) {
    const [x, y, height] = Q.shift()!;
    const key = `${x},${y}`;

    if (visited.has(key)) {
      continue;
    }

    visited.add(key);

    if (topographicMap[x][y] === 9) {
      score++;
      continue;
    }

    for (const [dirX, dirY] of directions) {
      const newX = x + dirX;
      const newY = y + dirY;

      if (
        isInBounds(newX, newY, topographicMap) &&
        !visited.has(`${newX},${newY}`) &&
        topographicMap[newX][newY] === height + 1
      ) {
        Q.push([newX, newY, topographicMap[newX][newY]]);
      }
    }
  }

  return score;
}

function calcScore() {
  let totalScore = 0;

  for (let x = 0; x < ROWS; x++) {
    for (let y = 0; y < COLS; y++) {
      if (topographicMap[x][y] === 0) {
        totalScore += getScore(x, y);
      }
    }
  }

  return totalScore;
}

console.log("p1 result:", calcScore());
