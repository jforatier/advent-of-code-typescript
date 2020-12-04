import { readInput } from "./../../utils";

export const rawInput = readInput();

export class Instruction {
  operation: string;
  argument: number;

  constructor(line: string) {
    this.operation = line.split(" ")[0];
    this.argument = parseInt(line.split(" ")[1], 10);
  }
}

export type Pointer = {
  index: number;
  accumulator: number;
};

export type Iteration = {
  changeIndex: number;
  result: number;
  instructions: Instruction[];
};

export const execute = (pointer: Pointer, instructions: Instruction[]) => {
  let nextPointer: Pointer = {
    index: pointer.index + 1,
    accumulator: pointer.accumulator,
  };
  if (pointer.index < instructions.length) {
    switch (instructions[pointer.index].operation) {
      case "acc":
        nextPointer.accumulator =
          instructions[pointer.index].argument + pointer.accumulator;
        break;
      case "jmp":
        nextPointer.index =
          pointer.index + instructions[pointer.index].argument;
        break;
      case "nop":
        break;
      default:
        console.log(
          "Unknown operation" + instructions[pointer.index].operation
        );
    }
  }
  return nextPointer;
};

export const swithInstructionAt = (
  index: number,
  instructions: Instruction[]
): Instruction[] => {
  let newInstructions: Instruction[] = [...instructions];
  if (newInstructions[index].operation === "nop") {
    newInstructions[index].operation = "jmp";
  } else if (newInstructions[index].operation === "jmp") {
    newInstructions[index].operation = "nop";
  }
  return newInstructions;
};

export const changeMap = (iteration: Iteration): Iteration => {
  let runnedInstruction: Instruction[] = [];
  let pointer: Pointer = { index: 0, accumulator: 0 };
  do {
    runnedInstruction.push(iteration.instructions[pointer.index]);
    pointer = execute(pointer, iteration.instructions);
  } while (
    runnedInstruction.indexOf(iteration.instructions[pointer.index]) == -1
  );
  return {
    changeIndex: iteration.changeIndex,
    result: pointer.accumulator,
    instructions: iteration.instructions,
  };
};

export const changeMapBis = (input: string, size): Pointer[] => {
  let instructions: Instruction[] = parse(input);
  let result = [];
  for (let index = 0; index < size; index++) {
    let runnedInstruction: Instruction[] = [];
    let pointer: Pointer = { index: 0, accumulator: 0 };
    do {
      runnedInstruction.push(instructions[pointer.index]);
      pointer = execute(pointer, instructions);
    } while (runnedInstruction.indexOf(instructions[pointer.index]) == -1);
    if (pointer.index >= size) {
      result.push(pointer);
    }
    instructions = swithInstructionAt(index, parse(input));
  }
  return result;
};

export const parse = (input: string): Instruction[] =>
  input.split(/\r?\n/).map((item) => new Instruction(item));

export const processPartOne = (input: string): number => {
  let instructions: Instruction[] = parse(input);
  return changeMap({ changeIndex: 0, instructions, result: 0 }).result;
};

export const processPartTwo = (input: string): number => {
  let instructions: Instruction[] = parse(input);
  return changeMapBis(input, instructions.length)[0].accumulator;
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/08 - Part 1:", resultA); // -> 1684
console.log("[Solution] 2020/08 - Part 2:", resultB); // -> 2188
