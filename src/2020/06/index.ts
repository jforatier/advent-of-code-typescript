import { readInput } from "./../../utils";

export const rawInput = readInput();

export class UserForm {
  questions: string[] = [];

  constructor(form: string) {
    for (const letter of form) {
      if (letter) {
        this.questions.push(letter, letter);
      }
    }
  }

  hasAnswerTo = (letter: string) => {
    return this.questions.includes(letter);
  };
}

export class GroupForm {
  user: UserForm[] = [];

  constructor(input: string) {
    const lines = input.split(" ");
    lines.forEach((item) => {
      this.user.push(new UserForm(item));
    });
  }

  allUserAnswer = (letter: string) => {
    if (this.user.length == 1) {
      return true;
    }
    var allAnswer = true;
    this.user.forEach((user) => {
      if (!user.hasAnswerTo(letter)) {
        allAnswer = false;
      }
    });
    return allAnswer;
  };

  sameAnswerCount = (letters: string[]): number => {
    var count = 0;
    letters.forEach((item) => {
      if (this.allUserAnswer(item)) {
        count++;
      }
    });
    return count;
  };
}

export const parseForms = (input: string): GroupForm[] =>
  input
    .split(/\r?\n\r?\n/)
    .map((raw) => raw.replace(/\r?\n/g, " "))
    .map((item) => new GroupForm(item));

export const processPartOne = (input: string): number => {
  let forms = parseForms(input);
  let count = 0;
  forms.forEach((form) => {
    var groupQuestions: string[] = [];
    form.user.forEach((user) => {
      user.questions.forEach((question) => {
        if (!groupQuestions.includes(question)) {
          groupQuestions.push(question);
        }
      });
    });
    count = count + groupQuestions.length;
  });
  return count;
};

export const processPartTwo = (input: string): number => {
  let forms = parseForms(input);
  let count = 0;
  forms.forEach((form) => {
    var groupQuestions: string[] = [];
    form.user.forEach((user) => {
      user.questions.forEach((question) => {
        if (!groupQuestions.includes(question)) {
          groupQuestions.push(question);
        }
      });
    });
    count = count + form.sameAnswerCount(groupQuestions);
  });
  return count;
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/06 - Part 1:", resultA); // -> 6443
console.log("[Solution] 2020/06 - Part 2:", resultB); // -> 3232
