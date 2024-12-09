const example = await Deno.readTextFile("./day09/example.txt");
const input = await Deno.readTextFile("./day09/input.txt");

const diskMap = input;

const blocks = [];
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

console.log(blocks);

// move file blocks
let left = 0;
let right = blocks.length - 1;

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

// calculate filesystem checksum
let sum = 0;
for (let i = 0; i < blocks.length; i++) {
  const curr = blocks[i];
  if (curr !== -1) {
    sum += i * Number(curr);
  }
}

// 6367087064415
console.log("p1 result:", sum);
