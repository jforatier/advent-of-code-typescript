import { readInput } from "./../../utils";

export const rawInput = readInput();

export interface Rule {
  atLeast: number;
  atMost: number;
  letter: string;
}

export const buildRule = (line: string): Rule => {
  var params = line.split(" ");
  const rule: Rule = {
    atLeast: parseInt(params[0].split("-")[0]),
    atMost: parseInt(params[0].split("-")[1]),
    letter: params[1].split(":")[0],
  };
  return rule;
};

export const isValid = (
  line: string,
  rule: Rule,
  validation: (password: string, rule: Rule) => boolean
): boolean => {
  var password = line.split(" ")[2];
  return validation(password, rule);
};

export const atLeastAtMostValid = (password: string, rule: Rule): boolean => {
  let counter: number = 0;
  for (var i = 0; i < password.length; i++) {
    if (password[i] === rule.letter) {
      counter++;
    }
  }
  return counter >= rule.atLeast && counter <= rule.atMost;
};

export const atLeastAtMostOnce = (password: string, rule: Rule): boolean => {
  var atLeastAsChar = password[rule.atLeast - 1] === rule.letter;
  var atMostChar = password[rule.atMost - 1] === rule.letter;
  let count = 0;
  if (atLeastAsChar) {
    count++;
  }
  if (atMostChar) {
    count++;
  }
  return count === 1;
};

export const processPartOne = (input: string[]): number => {
  let counter: number = 0;
  input.forEach((value: string) => {
    let rule = buildRule(value);
    if (isValid(value, rule, atLeastAtMostValid)) {
      counter++;
    }
  });
  return counter;
};

export const processPartTwo = (input: string[]): number => {
  let counter: number = 0;
  input.forEach((value: string) => {
    let rule = buildRule(value);
    if (isValid(value, rule, atLeastAtMostOnce)) {
      counter++;
    }
  });
  return counter;
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput.split("\n").map(String));
const resultB = processPartTwo(rawInput.split("\n").map(String));
console.timeEnd("Time");

console.log("[Solution] 2020/02 - Part 1:", resultA); // -> 383
console.log("[Solution] 2020/02 - Part 2:", resultB); // -> 272
