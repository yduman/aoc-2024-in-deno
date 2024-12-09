const example = await Deno.readTextFile("./day09/example.txt");
const input = await Deno.readTextFile("./day09/input.txt");

const diskMap = input;

const blocks: number[] = [];
let diskId = 0;

// create blocks
for (let i = 0; i < diskMap.length; i++) {
  const length = Number(diskMap[i]);
  if (i % 2 === 0) {
    for (let j = 0; j < length; j++) {
      blocks.push(diskId);
    }
    diskId++;
  } else {
    for (let j = 0; j < length; j++) {
      blocks.push(-1);
    }
  }
}

// move file blocks
function compactP1(blocks: number[], left = 0, right = blocks.length - 1) {
  while (left < right) {
    while (left < right && blocks[left] !== -1) {
      left++;
    }

    while (left < right && blocks[right] === -1) {
      right--;
    }

    if (left < right) {
      blocks[left] = blocks[right];
      blocks[right] = -1;
      left++;
      right--;
    }
  }

  return blocks;
}

function compactP2(blocks: number[]): number[] {
  const maxFileId = diskId - 1;

  for (let fileId = maxFileId; fileId >= 0; fileId--) {
    const filePositions = [];
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i] === fileId) {
        filePositions.push(i);
      }
    }

    const fileStart = filePositions[0];
    const fileLen = filePositions.length;

    let writeStartIdx = -1;
    let currSpaceIdx = -1;
    let currSpaceLen = 0;

    for (let i = 0; i < fileStart; i++) {
      if (blocks[i] === -1) {
        if (currSpaceIdx === -1) {
          currSpaceIdx = i;
          currSpaceLen = 1;
        } else {
          currSpaceLen++;
        }

        if (currSpaceLen >= fileLen) {
          writeStartIdx = currSpaceIdx;
          break;
        }
      } else {
        currSpaceIdx = -1;
        currSpaceLen = 0;
      }
    }

    if (writeStartIdx !== -1) {
      let writeIndex = writeStartIdx;
      for (const _ of filePositions) {
        blocks[writeIndex] = fileId;
        writeIndex++;
      }

      for (const pos of filePositions) {
        blocks[pos] = -1;
      }
    }
  }

  return blocks;
}

// calculate filesystem checksum
function sum(blocks: number[]) {
  let sum = 0;
  for (let i = 0; i < blocks.length; i++) {
    const curr = blocks[i];
    if (curr !== -1) {
      sum += i * Number(curr);
    }
  }
  return sum;
}

// console.log("p1 result:", sum(compactP1(blocks)));
console.log("p2 result:", sum(compactP2(blocks)));
