import { readInput } from "./../../utils";

export const rawInput = readInput();

type Machine = {
  instructions: number[];
  instructionPointer: number;
};

export const operate = (machine: Machine): Machine => {
  switch (machine.instructions[machine.instructionPointer]) {
    case 1:
      return {
        ...machine,
        instructions: add(
          machine.instructions,
          machine.instructions[machine.instructionPointer + 1],
          machine.instructions[machine.instructionPointer + 2],
          machine.instructions[machine.instructionPointer + 3]
        ),
      };
    case 2:
      return {
        ...machine,
        instructions: multiply(
          machine.instructions,
          machine.instructions[machine.instructionPointer + 1],
          machine.instructions[machine.instructionPointer + 2],
          machine.instructions[machine.instructionPointer + 3]
        ),
      };
    case 99:
      return machine;
  }
};

export const process = (machine: Machine): Machine => {
  if (machine.instructions[machine.instructionPointer] === 99) {
    return machine;
  }
  return process({
    ...operate(machine),
    instructionPointer: machine.instructionPointer + 4,
  });
};

const go = (input: string, noun?: number, verb?: number) => {
  const arr = input.split(",").map(Number);

  arr[1] = noun !== undefined ? noun : arr[1];
  arr[2] = verb !== undefined ? verb : arr[2];

  for (let i = 0; arr[i] !== 99; i += 4) {
    arr[arr[i + 3]] =
      arr[i] === 1
        ? arr[arr[i + 1]] + arr[arr[i + 2]]
        : arr[arr[i + 1]] * arr[arr[i + 2]];
  }

  return arr;
};

const add = (instructions, indexFirst, indexSecond, storageIndex): number[] => {
  instructions[storageIndex] =
    instructions[indexFirst] + instructions[indexSecond];
  return instructions;
};

const multiply = (
  instructions,
  indexFirst,
  indexSecond,
  storageIndex
): number[] => {
  instructions[storageIndex] =
    instructions[indexFirst] * instructions[indexSecond];
  return instructions;
};

export const startPartOne = (instructions): number => {
  instructions[1] = 12;
  instructions[2] = 2;
  console.log(instructions[0]);
  const result = process({ instructions, instructionPointer: 0 });
  return result.instructions[0];
};

export const startPartTwo = (input: string, target: number): number => {
  let result = 0;
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const lastOperationResult = go(input, noun, verb)[0];
      if (lastOperationResult === target) {
        return 100 * noun + verb;
      }
    }
  }
  return result;
};

/* Results */

console.time("Time");
const resultA = startPartOne(rawInput.split(",").map(Number));
const resultB = startPartTwo(rawInput, 19690720);
console.timeEnd("Time");

console.log("[Solution] 2019/02 - Part 1:", resultA); // -> 3101878
console.log("[Solution] 2019/02 - Part 2:", resultB); // -> 8444
