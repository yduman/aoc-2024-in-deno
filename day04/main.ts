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

function search(wordSearch: string[]) {
  const regex = /(?=(XMAS|SAMX))/g;
  let matches = 0;
  for (const row of wordSearch) {
    for (const _ of row.matchAll(regex)) {
      matches++;
    }
  }
  return matches;
}

const wordSearchRows = getWordSearchRows(input);
const wordSearchMatrix = getWordSearchMatrix(input);
const wordSearchTransposed = transpose(wordSearchMatrix);
const wordSearchDiagonals = getWordSearchDiagonals(wordSearchMatrix);

const horizontalMatches = search(wordSearchRows);
const verticalMatches = search(wordSearchTransposed);
const diagonalMatches = search(wordSearchDiagonals);

console.log(horizontalMatches + verticalMatches + diagonalMatches);
