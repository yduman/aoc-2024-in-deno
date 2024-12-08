const example = await Deno.readTextFile("./day08/example.txt");
const input = await Deno.readTextFile("./day08/input.txt");

function isEmpty(s: string): boolean {
  return s === ".";
}

function isAntenna(s: string): boolean {
  return (
    (s >= "0" && s <= "9") ||
    (s >= "a" && s <= "z") ||
    (s >= "A" && s <= "Z")
  );
}

function p1(lines: string[]) {
  const ROWS = lines.length;
  const COLS = lines[0].length;

  const antennas: Record<string, [number, number][]> = {};

  for (let i = 0; i < ROWS; i++) {
    const line = lines[i];
    for (let j = 0; j < COLS; j++) {
      const curr = line[j];
      if (isEmpty(curr) || !isAntenna(curr)) {
        continue;
      }

      if (!antennas[curr]) {
        antennas[curr] = [];
      }
      antennas[curr].push([i, j]);
    }
  }

  const antinodes = new Set<string>();

  for (const freq in antennas) {
    const pos = antennas[freq];
    const count = pos.length;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const [ax, ay] = pos[i];
        const [bx, by] = pos[j];
        const p1x = 2 * ax - bx;
        const p1y = 2 * ay - by;
        const p2x = 2 * bx - ax;
        const p2y = 2 * by - ay;

        if (p1x >= 0 && p1x < ROWS && p1y >= 0 && p1y < COLS) {
          antinodes.add(`${p1x},${p1y}`);
        }

        if (p2x >= 0 && p2x < ROWS && p2y >= 0 && p2y < COLS) {
          antinodes.add(`${p2x},${p2y}`);
        }
      }
    }
  }

  console.log(antinodes.size);
}

p1(example.split("\n"));
p1(input.split("\n"));
