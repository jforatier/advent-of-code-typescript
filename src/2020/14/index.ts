import { readInput } from "./../../utils";

export const rawInput = readInput();

export const BASE = 36;

export class Bloc {
  mask: Mask;
  instructions: Instruction[] = [];

  constructor(mask: Mask) {
    this.mask = mask;
  }

  addInstruction = (instruction: Instruction): void => {
    this.instructions.push(instruction);
  };
}

export class Mask {
  mask: string;

  constructor(mask: string) {
    this.mask = mask.split(" = ")[1];
  }

  apply(value: number): number {
    const binary = [...value.toString(2).padStart(BASE, "0")];
    for (let i = 0; i < BASE; i++) {
      const maskVal = this.mask[this.mask.length - i - 1];
      if (maskVal !== "X") {
        binary[binary.length - i - 1] = maskVal;
      }
    }
    return parseInt(binary.join(""), 2);
  }
  applyWithDecoder(value: number): number[] {
    const result = [[...value.toString(2).padStart(BASE, "0")]];
    for (let i = 0; i < BASE; i++) {
      const maskVal = this.mask[this.mask.length - i - 1];
      if (maskVal === "1") {
        for (const binary of result) {
          binary[binary.length - i - 1] = maskVal;
        }
      } else if (maskVal === "X") {
        const resc = [...result.map((r) => [...r])];
        for (const binary of result) {
          binary[binary.length - i - 1] = "0";
        }
        for (const binary of resc) {
          binary[binary.length - i - 1] = "1";
        }
        result.push(...resc);
      }
    }
    return result.map((r) => parseInt(r.join(""), 2));
  }
}

export class Instruction {
  position: number;
  value: number;

  constructor(instruction: string) {
    let instructionSplitted = instruction.split(" = ");
    this.value = parseInt(instructionSplitted[1], 10);
    let positionArr = instructionSplitted[0].split("[");
    this.position = parseInt(positionArr[1].replace("]", ""), 10);
  }
}

export class Program {
  blocs: Bloc[] = [];
  memory: Map<number, number> = new Map(); // adress - value

  constructor(lines: string[]) {
    let currentBloc;
    lines.forEach((element) => {
      if (element.includes("mask =")) {
        if (currentBloc) {
          this.blocs.push(currentBloc);
        }
        currentBloc = new Bloc(new Mask(element));
      } else {
        currentBloc.addInstruction(new Instruction(element));
      }
    });
    this.blocs.push(currentBloc);
  }

  getSum(): number {
    let result = 0;
    this.memory.forEach((value, keys) => {
      result += value;
    });
    return result;
  }
  run() {
    this.blocs.forEach((element) => {
      element.instructions.forEach((instruction) => {
        let result = element.mask.apply(instruction.value);
        this.writeValue(instruction.position, result);
      });
    });
  }

  runWithDecoder() {
    let currentMask: Mask = new Mask(
      "mask = 000000000000000000000000000000000000"
    );
    this.blocs.forEach((element) => {
      currentMask = element.mask;
      element.instructions.forEach((instruction) => {
        for (const address of currentMask.applyWithDecoder(
          instruction.position
        )) {
          this.memory.set(address, instruction.value);
        }
      });
    });
  }

  writeValue = (adress: number, value) => {
    this.memory.set(adress, value);
  };
}

export const parse = (input: string): string[] => input.split(/\r?\n/);

export const processPartOne = (input: string): number => {
  let program = new Program(parse(input));
  program.run();
  return program.getSum();
};

export const processPartTwo = (input: string): number => {
  let program = new Program(parse(input));
  program.runWithDecoder();
  return program.getSum();
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/14 - Part 1:", resultA); // -> 10717676595607
console.log("[Solution] 2020/14 - Part 2:", resultB); // -> 3974538275659
