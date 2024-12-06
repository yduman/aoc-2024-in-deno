const input = await Deno.readTextFile("./day06/input.txt");
const lines = input.trim().split("\n");
const map = lines.map((line) => line.split(""));

const ROWS = map.length;
const COLS = map[0].length;

const directions = [
  { dx: -1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
];

let guardX = 0, guardY = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes("^")) {
    guardX = i;
    guardY = line.indexOf("^");
  } else {
    continue;
  }
}

function isInBounds(x: number, y: number) {
  return x >= 0 && x < ROWS && y >= 0 && y < COLS;
}

function simLoop() {
  let x = guardX;
  let y = guardY;
  let dirIdx = 0;
  const visited = new Set<string>();

  while (true) {
    const state = `${x},${y},${dirIdx}`;
    if (visited.has(state)) {
      return true;
    }
    visited.add(state);

    const { dx, dy } = directions[dirIdx];
    const nextX = x + dx;
    const nextY = y + dy;

    if (!isInBounds(nextX, nextY)) {
      return false;
    }

    const cell = map[nextX][nextY];
    if (cell === "#" || cell === "O") {
      dirIdx = (dirIdx + 1) % directions.length;
    } else {
      x = nextX;
      y = nextY;
    }
  }
}

let result = 0;
for (let i = 0; i < ROWS; i++) {
  for (let j = 0; j < COLS; j++) {
    if (map[i][j] === "." && !(i === guardX && j === guardY)) {
      map[i][j] = "O";
      const isLooping = simLoop();
      if (isLooping) {
        result++;
      }
      map[i][j] = ".";
    }
  }
}

console.log(result);
