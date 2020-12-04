import { readInput } from "./../../utils";

export const rawInput = readInput();

export class Message {
  rules: Map<number, number[][] | string> = new Map();
  words: string[] = [];

  constructor(inputInlined: string[]) {
    let parseCases = false;
    for (const line of inputInlined) {
      if (line === "") {
        parseCases = true;
        continue;
      }

      if (parseCases) {
        this.words.push(line);
      } else {
        const [index, rulesUnsplit] = line.split(": ");
        const rules = rulesUnsplit.split(" | ");
        if (rules[0].startsWith('"') && rules[0].endsWith('"')) {
          this.rules.set(parseInt(index, 10), rules[0][1]);
        } else {
          this.rules.set(
            parseInt(index, 10),
            rules.map((c) => c.split(" ").map((n) => parseInt(n, 10)))
          );
        }
      }
    }
  }

  addRule(ruleIndex: number, rule: number[][]) {
    this.rules.set(ruleIndex, rule);
  }

  match = (line: string, ruleIndex = 0, wordIndex = 0): number | undefined => {
    const currentRule = this.rules.get(ruleIndex)!;
    if (typeof currentRule === "string") {
      return line[wordIndex] === currentRule ? wordIndex + 1 : undefined;
    } else {
      for (const rule of currentRule) {
        let lastIndex = wordIndex;
        let failed = false;
        for (const r of rule) {
          const nextIndex = this.match(line, r, lastIndex);
          if (nextIndex === undefined) {
            failed = true;
            break;
          } else {
            lastIndex = nextIndex;
          }
        }
        if (!failed) {
          return lastIndex;
        }
      }
    }
    return undefined;
  };

  matchSame = (line: string, ruleIndex = 0, wordIndex = 0): number[] => {
    const currentRule = this.rules.get(ruleIndex)!;
    if (typeof currentRule === "string") {
      return line[wordIndex] === currentRule ? [wordIndex + 1] : [];
    } else {
      return currentRule.flatMap((rule) =>
        rule.reduce(
          (stack, current) => {
            return stack.flatMap((ir) => this.matchSame(line, current, ir));
          },
          [wordIndex]
        )
      );
    }
  };
}

export const parse = (input: string): string[] => input.split(/\r?\n/);

export const processPartOne = (input: string): number => {
  let message = new Message(parse(input));
  let result = message.words.filter(
    (word) => message.match(word, 0) === word.length
  ).length;
  return result;
};

export const processPartTwo = (input: string): number => {
  let message = new Message(parse(input));
  message.addRule(8, [[42], [42, 8]]);
  message.addRule(11, [
    [42, 31],
    [42, 11, 31],
  ]);
  let result = message.words.filter(
    (word) => message.matchSame(word, 0)[0] === word.length
  ).length;
  return result;
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/19 - Part 1:", resultA); // -> 241
console.log("[Solution] 2020/19 - Part 2:", resultB); // -> 424
