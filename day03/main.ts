const example = await Deno.readTextFile("./day03/example.txt");
const example2 = await Deno.readTextFile("./day03/example2.txt");
const input = await Deno.readTextFile("./day03/input.txt");
const input2 = await Deno.readTextFile("./day03/input2.txt");

const memRegex = /(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g;
const instrRegex = /(\d+)\,(\d+)/;

const instructions = input2.match(memRegex) as string[];

function removeDisabledInstructions(instructions: string[]) {
  const result: string[] = [];
  let skip = false;

  for (const instruction of instructions) {
    if (instruction === "don't()") {
      skip = true;
    } else if (instruction === "do()") {
      skip = false;
      continue;
    }

    if (!skip) {
      result.push(instruction);
    }
  }

  return result;
}

function multiply(instructions: string[]) {
  return instructions.reduce((acc, instr) => {
    const matches = instr.match(instrRegex);
    return acc + Number(matches![1]) * Number(matches![2]);
  }, 0);
}

console.log(multiply(removeDisabledInstructions(instructions)));
