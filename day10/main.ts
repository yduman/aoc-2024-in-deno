const example = await Deno.readTextFile("./day10/example.txt");
const input = await Deno.readTextFile("./day10/input.txt");

const tMap = input.split("\n").map((line) => line.split("").map(Number));
const ROWS = tMap.length;
const COLS = tMap[0].length;
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function isInBounds(x: number, y: number) {
  return x >= 0 && y >= 0 && x < ROWS && y < COLS;
}

function p1(startX: number, startY: number) {
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

    if (tMap[x][y] === 9) {
      score++;
      continue;
    }

    for (const [dirX, dirY] of directions) {
      const newX = x + dirX;
      const newY = y + dirY;

      if (
        isInBounds(newX, newY) &&
        !visited.has(`${newX},${newY}`) &&
        tMap[newX][newY] === height + 1
      ) {
        Q.push([newX, newY, tMap[newX][newY]]);
      }
    }
  }

  return score;
}

function p2(startX: number, startY: number) {
  const paths = new Set<string>();

  function dfs(x: number, y: number, path: string) {
    const key = `${x},${y}`;

    if (path.includes(key)) {
      return;
    }

    path += key;

    if (tMap[x][y] === 9) {
      paths.add(path);
      return;
    }

    for (const [dirX, dirY] of directions) {
      const newX = x + dirX;
      const newY = y + dirY;

      if (
        isInBounds(newX, newY) &&
        tMap[newX][newY] === tMap[x][y] + 1
      ) {
        dfs(newX, newY, path);
      }
    }
  }

  dfs(startX, startY, "");
  return paths.size;
}

function calcScore(cb: (x: number, y: number) => number) {
  let totalScore = 0;

  for (let x = 0; x < ROWS; x++) {
    for (let y = 0; y < COLS; y++) {
      if (tMap[x][y] === 0) {
        totalScore += cb(x, y);
      }
    }
  }

  return totalScore;
}

console.log("p1 result:", calcScore(p1));
console.log("p2 result:", calcScore(p2));
