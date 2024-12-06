const example = await Deno.readTextFile("./day06/example.txt");
const input = await Deno.readTextFile("./day06/input.txt");

const lines = input.split("\n");
const map = lines.map((line) => line.split(""));
const guard = "^";
const obstacle = "#";
const visited = "X";
const path = ".";
const mapChars = [guard, obstacle, visited, path];
const guardPos = { x: 0, y: 0 };
const ROWS = lines.length;
const COLS = lines[0].length;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes(guard)) {
    guardPos.x = i;
    guardPos.y = line.indexOf(guard);
  } else {
    continue;
  }
}

let distinctPos = 1;
let currX = guardPos.x;
let currY = guardPos.y;
let hasLeft = false;

map[currX][currY] = visited;

type Direction = {
  name: "up" | "right" | "down" | "left";
  dx: number;
  dy: number;
};

let dirIdx = 0;
const directions: Direction[] = [
  { name: "up", dx: -1, dy: 0 },
  { name: "right", dx: 0, dy: 1 },
  { name: "down", dx: 1, dy: 0 },
  { name: "left", dx: 0, dy: -1 },
];

function move(direction: Direction): boolean {
  const { dx, dy } = direction;
  let moved = false;

  while (
    !isOutOfBound(currX + dx, currY + dy) &&
    map[currX + dx][currY + dy] !== obstacle
  ) {
    currX += dx;
    currY += dy;

    if (map[currX][currY] !== visited) {
      map[currX][currY] = visited;
      distinctPos++;
    }
    moved = true;
  }

  return moved;
}

while (true) {
  if (hasLeft) {
    break;
  }
  const direction = directions[dirIdx];
  if (!move(direction)) {
    dirIdx = (dirIdx + 1) % directions.length;
  }
}

function isOutOfBound(i: number, j: number) {
  if (
    i < 0 || i >= ROWS || j < 0 || j >= COLS || !mapChars.includes(map[i][j])
  ) {
    hasLeft = true;
    if (map[currX][currY] !== visited) {
      map[currX][currY] = visited;
      distinctPos++;
    }
    return true;
  }
  return false;
}

console.log("p1 result: ", distinctPos);
