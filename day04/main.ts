import _ from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js";

const example = await Deno.readTextFile("./day04/example.txt");
const input = await Deno.readTextFile("./day04/input.txt");

function getWordSearchRows(input: string): string[] {
  return input.split("\n");
}

function getWordSearchMatrix(input: string): string[][] {
  return input.split("\n").map((line) => line.split(""));
}

function transpose(matrix: string[][]): string[] {
  return _.zip(...matrix).map((row) => row.join(""));
}

function getWordSearchDiagonals(matrix: string[][]): string[] {
  const diagonals: string[] = [];
  const rowLen = matrix.length;
  const colLen = matrix[0].length;

  for (let i = 0; i < rowLen + colLen - 1; i++) {
    let word = "";
    for (let row = 0; row < rowLen; row++) {
      const col = i - row;
      if (col >= 0 && col < colLen) {
        word += matrix[row][col];
      }
    }

    if (word) {
      diagonals.push(word);
    }
  }

  for (let i = 0; i < rowLen + colLen - 1; i++) {
    let word = "";
    for (let row = 0; row < rowLen; row++) {
      const col = rowLen - 1 - i + row;
      if (col >= 0 && col < colLen) {
        word += matrix[row][col];
      }
    }
    if (word) {
      diagonals.push(word);
    }
  }

  return diagonals;
}

function search(wordSearch: string[], regex: RegExp) {
  let matches = 0;
  for (const row of wordSearch) {
    for (const _ of row.matchAll(regex)) {
      matches++;
    }
  }
  return matches;
}

function isM(x: string) {
  return x === "M";
}

function isS(x: string) {
  return x === "S";
}

function isXMAS(matrix: string[][], x: number, y: number) {
  const topl_bottomr = isM(matrix[x - 1][y - 1]) && isS(matrix[x + 1][y + 1]);
  const topr_bottoml = isM(matrix[x - 1][y + 1]) && isS(matrix[x + 1][y - 1]);
  const bottoml_topr = isM(matrix[x + 1][y - 1]) && isS(matrix[x - 1][y + 1]);
  const bottomr_topl = isM(matrix[x + 1][y + 1]) && isS(matrix[x - 1][y - 1]);

  return [topl_bottomr, topr_bottoml, bottoml_topr, bottomr_topl].filter((x) =>
    x === true
  ).length === 2;
}

function searchP2(matrix: string[][]) {
  const rowLen = matrix.length;
  const colLen = matrix[0].length;
  let count = 0;

  for (let i = 1; i < rowLen - 1; i++) {
    for (let j = 1; j < colLen - 1; j++) {
      if (matrix[i][j] === "A" && isXMAS(matrix, i, j)) {
        count++;
      }
    }
  }

  return count;
}

const wordSearchRows = getWordSearchRows(input);
const wordSearchMatrix = getWordSearchMatrix(input);

const wordSearchTransposed = transpose(wordSearchMatrix);
const wordSearchDiagonals = getWordSearchDiagonals(wordSearchMatrix);

const regexP1 = /(?=(XMAS|SAMX))/g;
const horizontalMatches = search(wordSearchRows, regexP1);
const verticalMatches = search(wordSearchTransposed, regexP1);
const diagonalMatches = search(wordSearchDiagonals, regexP1);

const xmasMatches = searchP2(wordSearchMatrix);

console.log(
  "P1 Result:",
  horizontalMatches + verticalMatches + diagonalMatches,
);

console.log("P2 Result: ", xmasMatches);
