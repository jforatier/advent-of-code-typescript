import { readInput } from "./../../utils";

const rawInput = readInput();
export const input = rawInput.split("\n").map(Number);

type Calc = (num: number) => number;

export const calculateFuelMass: Calc = (moduleWeight) => {
  return Math.floor(moduleWeight / 3) - 2;
};

export const calculateCorrectFuelMass: Calc = (moduleWeight) => {
  const mass = calculateFuelMass(moduleWeight);
  return mass > 0 ? mass + calculateCorrectFuelMass(mass) : 0;
};

export const calculateTotalFuelMass = (input: number[], calculate: Calc) => {
  return input.reduce((a, b) => a + calculate(b), 0);
};

/* Results */

console.time("Time");
const resultA = calculateTotalFuelMass(input, calculateFuelMass);
const resultB = calculateTotalFuelMass(input, calculateCorrectFuelMass);
console.timeEnd("Time");

console.log("[Solution] 2019/01 - Part 1:", resultA); // -> 3515171
console.log("[Solution] 2019/01 - Part 2:", resultB); // -> 5269882
