import { readInput } from "./../../utils";

export const rawInput = readInput();

class Operation {
  firstValue: number = NaN;
  operator: string = undefined;
  secondValue: number = NaN;

  constructor(firstValue, secondValue, operator) {
    this.firstValue = firstValue;
    this.secondValue = secondValue;
    this.operator = operator;
  }

  isValid = (): boolean => {
    return (
      !isNaN(this.firstValue) &&
      !isNaN(this.secondValue) &&
      this.operator != undefined
    );
  };

  operate = (): number => {
    switch (this.operator) {
      case "+":
        return this.firstValue + this.secondValue;
      case "*":
        return this.firstValue * this.secondValue;
      default:
        console.log("unknown operator" + this.operator);
    }
  };
}

class Expression {
  items: Array<string | number> = [];

  constructor(line: string, withPrecedence: boolean) {
    const chars = line
      .trim()
      .replace(/\(/g, "( ")
      .replace(/\)/g, " )")
      .split(" ");
    if (!withPrecedence) {
      for (const char of chars) {
        this.items = this.nextState(char, this.items);
      }
    } else {
      this.items = this.nextStateWithPrecedences(chars);
    }
  }

  nextState(
    token: string,
    stack: Array<string | number>
  ): Array<string | number> {
    switch (true) {
      case Number.isInteger(+token):
        if (stack.length === 0) {
          stack.push(+token);
          break;
        }
        const head = stack.slice(-1).pop()!;
        if (["+", "*"].includes(head.toString())) {
          const operator = stack.pop();
          const left = +stack.pop()!;
          const right = +token;
          const result = operator === "+" ? left + right : left * right;
          stack.push(result);
        } else {
          stack.push(token);
        }
        break;
      case ["*", "+", "("].includes(token):
        stack.push(token);
        break;
      default:
        const lastNumber = stack.pop()!;
        stack.pop()!;
        this.nextState(lastNumber.toString(), stack);
        break;
    }
    return stack.slice();
  }

  nextStateWithPrecedences(tokens: string[]): Array<string | number> {
    const stack: string[] = [];
    const precedences = new Map<string, number>([
      ["+", 1],
      ["*", 0],
    ]);
    let head;
    for (const token of tokens) {
      switch (true) {
        case Number.isInteger(+token):
          stack.push(token);
          break;
        case token === "(":
          stack.push(token);
          break;
        case token === ")":
          while (
            ((head = stack.slice(-1).pop()), head != null && head !== "(")
          ) {
            this.items.push(stack.pop()!);
          }
          stack.pop();
          break;
        default:
          if (stack.length === 0 || stack.slice(-1).pop() === "(") {
            stack.push(token);
            break;
          }
          while (
            ((head = stack.slice(-1).pop()),
            stack.length !== 0 &&
              head !== "(" &&
              (!precedences.has(head!) ||
                (precedences.has(head!) &&
                  precedences.get(token!)! <= precedences.get(head!)!)))
          ) {
            this.items.push(stack.pop()!);
          }
          stack.push(token);
          break;
      }
    }
    this.items.push(...stack.reverse());
    return this.items;
  }

  getOperationAt(index: number): Operation {
    let valueBefore = this.items[index - 1];
    let operator = this.items[index];
    let valueAfter = this.items[index + 1];
    return new Operation(valueBefore, valueAfter, operator);
  }
  resolve(): Array<string | number> {
    let stack = [];

    for (let index = 0; index < this.items.length + 1; index++) {
      stack.push(+this.items.pop()!);
    }
    return stack;
  }
}

const calc = (expressions: Expression[], withPrecedence: boolean): number => {
  let result: number = 0;
  expressions.forEach((element) => {
    if (!withPrecedence) {
      result += parseInt(element.items[0].toString());
    } else {
      const stack: Array<string | number> = [];
      for (const token of element.items) {
        if (Number.isInteger(+token)) {
          stack.push(+token);
        } else {
          const left = +stack.pop()!;
          const right = +stack.pop()!;
          const result = token === "*" ? left * right : left + right;
          stack.push(result);
        }
      }
      result += +stack.pop()!;
    }
  });
  return result;
};

export const parse = (input: string): string[] => input.split(/\r?\n/);

export const processPartOne = (input: string): number => {
  let expressions: Expression[] = parse(input).map(
    (item) => new Expression(item, false)
  );
  return calc(expressions, false);
};
export const processPartTwo = (input: string): number => {
  let expressions: Expression[] = parse(input).map(
    (item) => new Expression(item, true)
  );
  return calc(expressions, true);
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/18 - Part 1:", resultA); // -> 36382392389406
console.log("[Solution] 2020/18 - Part 2:", resultB); // -> 381107029777968
