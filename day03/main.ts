const example = await Deno.readTextFile("./day03/example.txt");
const input = await Deno.readTextFile("./day03/input.txt");

const memRegex = /(mul\(\d+,\d+\))/g;
const instrRegex = /(\d+)\,(\d+)/;

const instructions = input.match(memRegex) as string[];
// console.log(instructions);

function multiply(instructions: string[]) {
  return instructions.reduce((acc, instr) => {
    const matches = instr.match(instrRegex);
    // console.log(matches)
    return acc + Number(matches![1]) * Number(matches![2]);
  }, 0);
}

console.log(multiply(instructions));
