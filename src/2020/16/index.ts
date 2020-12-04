import { readInput } from "./../../utils";

export const rawInput = readInput();

export class Range {
  lowValue: number;
  highValue: number;

  constructor(lowValue: number, highValue: number) {
    this.lowValue = lowValue;
    this.highValue = highValue;
  }

  isValidRange = (value: number): boolean => {
    return value >= this.lowValue && value <= this.highValue;
  };
}

export class Rule {
  action: string;
  lowRange: Range;
  highRange: Range;

  constructor(line: String) {
    let sections = line.split(": ");
    this.action = sections[0];
    let ranges = sections[1].split(" or ");
    this.lowRange = new Range(
      parseInt(ranges[0].split("-")[0], 10),
      parseInt(ranges[0].split("-")[1], 10)
    );
    this.highRange = new Range(
      parseInt(ranges[1].split("-")[0], 10),
      parseInt(ranges[1].split("-")[1], 10)
    );
  }

  isInRange = (value: number): boolean => {
    return (
      this.lowRange.isValidRange(value) || this.highRange.isValidRange(value)
    );
  };
}

export class Document {
  rules: Rule[] = [];
  yourTickets: number[];
  nearbyTickets: number[][] = [];

  constructor(input: String) {
    let sections = input.split(/\r?\n\r?\n/);
    let rules = sections[0].split(/\r?\n/);
    rules.forEach((element) => {
      this.rules.push(new Rule(element));
    });
    let yourTicketsLine = sections[1].split("your ticket:");
    this.yourTickets = yourTicketsLine[1]
      .trim()
      .replace(/\n/g, ",")
      .split(",")
      .map((item) => {
        return parseInt(item, 10);
      });
    let nearbyTicketsLine = sections[2].split("nearby tickets:");
    nearbyTicketsLine[1]
      .trim()
      .split(/\r?\n/)
      .forEach((element) => {
        this.nearbyTickets.push(
          element
            .trim()
            .split(",")
            .map((item) => parseInt(item, 10))
        );
      });
  }

  getInvalidTicketsSum = (tickets: number[]): number => {
    let invalidTicketsSum = 0;
    tickets.forEach((ticket) => {
      let isValid = false;
      this.rules.forEach((rule) => {
        if (rule.isInRange(ticket)) {
          isValid = true;
        }
      });
      if (!isValid) {
        invalidTicketsSum += ticket;
      }
    });
    return invalidTicketsSum;
  };

  isValid = (tickets: number[]): boolean => {
    let remainingTickets = [];
    tickets.forEach((ticket) => {
      let isValid = false;
      this.rules.forEach((rule) => {
        if (rule.isInRange(ticket)) {
          isValid = true;
        }
      });
      if (isValid) {
        remainingTickets.push(ticket);
      }
    });
    return remainingTickets.length === tickets.length;
  };

  run = (): number => {
    let result = 0;
    this.nearbyTickets.forEach((element) => {
      result += this.getInvalidTicketsSum(element);
    });
    return result;
  };

  runPartTwo = (): number => {
    let validTickets: number[][] = [];
    let rulesResult: string[][] = [];

    // Filter invalid tickets
    this.nearbyTickets.forEach((element) => {
      if (this.isValid(element)) {
        validTickets.push(element);
      }
    });

    // List columns to parse
    const ticketsColumns: number[][] = validTickets[0].map((_, index) =>
      validTickets.map((row) => row[index])
    );

    // Validate which rows meet each rules
    this.rules.forEach((rule, index) => {
      for (let row in ticketsColumns) {
        if (ticketsColumns[row].every((item) => rule.isInRange(item))) {
          if (rulesResult[index]) {
            rulesResult[index].push(row);
          } else {
            rulesResult[index] = [row];
          }
        }
      }
    });

    // For each rules index
    const applyRulesByRowLength = Object.entries(rulesResult)
      .sort(([, p1], [, p2]) => p1.length - p2.length)
      .reduce((result, [rule, rows], index, obj) => {
        if (index === 0) {
          result[parseInt(rule, 10)] = parseInt(rows[0], 10);
          return result;
        }

        const prevRows = obj[index - 1][1];
        const rowValue = rows.filter((row) => !prevRows.includes(row))[0];

        result[parseInt(rule, 10)] = parseInt(rowValue, 10);

        return result;
      }, {});

    let result = 1;
    for (let i = 0; i < 6; i++) {
      if (!this.yourTickets[applyRulesByRowLength[i]]) {
        return result;
      }
      result = result * this.yourTickets[applyRulesByRowLength[i]];
    }

    return result;
  };
}

export const parse = (input: string): number[] =>
  input.split(/\r?\n/).map((item) => parseInt(item, 10));

export const processPartOne = (input: string): number => {
  let document = new Document(input);
  return document.run();
};

export const processPartTwo = (input: string): number => {
  let document = new Document(input);
  return document.runPartTwo();
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/16 - Part 1:", resultA); // -> 23115
console.log("[Solution] 2020/16 - Part 2:", resultB); // -> 239727793813
