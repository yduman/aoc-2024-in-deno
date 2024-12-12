const example = await Deno.readTextFile("./day12/example.txt");
const input = await Deno.readTextFile("./day12/input.txt");

type Cell = {
  x: number;
  y: number;
};

const grid = input.split("\n").map((line) => line.split(""));
const ROWS = grid.length;
const COLS = grid[0].length;

const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function isInBounds(r: number, c: number) {
  return r >= 0 && r < ROWS && c >= 0 && c < COLS;
}

let result = 0;

for (let i = 0; i < ROWS; i++) {
  for (let j = 0; j < COLS; j++) {
    if (!visited[i][j]) {
      const plantType = grid[i][j];
      const Q: Cell[] = [{ x: i, y: j }];
      visited[i][j] = true;

      let area = 0;
      let perimeter = 0;
      while (Q.length > 0) {
        const { x, y } = Q.pop()!;
        area++;

        for (const [dirX, dirY] of directions) {
          const nextX = x + dirX;
          const nextY = y + dirY;
          if (!isInBounds(nextX, nextY)) {
            perimeter++;
          } else {
            if (grid[nextX][nextY] !== plantType) {
              perimeter++;
            } else {
              if (!visited[nextX][nextY]) {
                visited[nextX][nextY] = true;
                Q.push({ x: nextX, y: nextY });
              }
            }
          }
        }
      }

      const price = area * perimeter;
      result += price;
    }
  }
}

console.log("p1 result:", result);
