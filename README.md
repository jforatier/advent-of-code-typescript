# 🎄 Advent of Code - Typescript

My 'chocolate-free' Advent Calendar for TypeScript

[![2020 Progress](https://img.shields.io/badge/2020-25%2F25-f5ef42)](./src/2020/)
[![2019 Progress](https://img.shields.io/badge/2019-3%2F25-f5ef42)](./src/2019/)

[![CI](https://github.com/jforatier/advent-of-code/workflows/CI/badge.svg)](https://github.com/jforatier/advent-of-code/actions) 
[![codecov](https://codecov.io/gh/jforatier/advent-of-code/branch/master/graph/badge.svg?token=A1B23U0Q29)](https://codecov.io/gh/jforatier/advent-of-code)

------

## ⚙️ Installation

Required: Node 14 or higher ([download](https://nodejs.org/en/download/))

```
npm i
```

## ▶️ Running all solutions

```
npm start
```

### Running specific day in dev mode

```
npm start day<N>
```

Example:

```
npm start day01
```

## 🧪 Test

```
npm test
```

## 🎓 Lesson Learned - with expression throwed in the house

### General
- You will do shit ... Deal with-it (don't panic you'll clean-it) - "Why i write the same code twice ? Why this function of 30 lines is not used."
- You will dont't get it all on first read ... Baby-steps - "A plane in a tree ? Why ?"
- Take care of your inputs (and edit-it) - "$#% my code was good it's the f### input parser (i write)"
- Be verbouse (but not too much) - "const allTheRulesSortedByNameWithValueChecked"
- Test Test & Test (whatever how) - "Ok, so that function was not doing what expecting she should does. Waht the test are telling ? Ah ... no test here ..."
- Be different, You have 1 way of coding recpect-it, follow-it each have pro and cons - "Why the f### in Python it take 2 lines, Ok but my code is more readable ..."
- Share and Read others but avoid ctrl-c/ctrl-v - "Hey, that's a great idea ... 5 minutes later 'This f### method is revreted ..."
- Don't forget default case - "I don't understand, i'm logging thing here ... Ah didn't see that case"

### Technical
- BitManipulation - [Read](https://medium.com/@parkerjmed/practical-bit-manipulation-in-javascript-bfd9ef6d6c30)

## 🛠️ Tools discovered

| I want to ...            | Selected                        | Seen                       | Skill   |
| ------------------------ | ------------------------------- | -------------------------- | ------- |
| ... run test             | [mocha](https://mochajs.org/)   | [jest](https://jestjs.io/) | Know-It |
| ... write readable test  | [chai](https://www.chaijs.com/) |                            | Know-It |
| ... know coverage        | [NYC](https://istanbul.js.org/) |                            | Know-It |
| ... parse file with ease |                                 |                            |         |

## 🔬 Solutions to experiment

| I want to ...                                   | Selected                              | Challenger            | Done                   |
| ----------------------------------------------- | ------------------------------------- | --------------------- | ---------------------- |
| ... share my code                               | [Github](https://github.com/)         | BitBucket             | <ul><li>[x] </li></ul> |
| ... quick-share and run some parts of my code   | Codesandbox                           |                       | <ul><li>[ ] </li></ul> |
| ... take care of my commits                     | CommitLint                            |                       | <ul><li>[ ] </li></ul> |
| ... add some fun and relax on my repo           | GitMoji                               |                       | <ul><li>[ ] </li></ul> |
| ... know my coverage                            | Codecov                               |                       | <ul><li>[x] </li></ul> |
| ... know how much time it take                  | sentry                                |                       | <ul><li>[ ] </li></ul> |
| ... know if i can do better in my way of coding | codacy                                | sonarcloud.io         | <ul><li>[ ] </li></ul> |
| ... monitor quality with a lifecycle            | codeclimate                           |                       | <ul><li>[ ] </li></ul> |
| ... know vulnerabilities                        | snyk                                  |                       | <ul><li>[ ] </li></ul> |
| ... watch dependencies issues                   | [Dependabot](https://dependabot.com/) |                       | <ul><li>[x] </li></ul> |
| ... auto-update my dependencies                 | [Dependabot](https://dependabot.com/) | Greenkeeper, Renovate | <ul><li>[x] </li></ul> |
| ... check/format my code                        | prettier                              |                       | <ul><li>[ ] </li></ul> |
| ... check my doc issues                         | markdownlint                          |                       | <ul><li>[ ] </li></ul> |
| ... check my code issues                        | eslint                                |                       | <ul><li>[ ] </li></ul> |
| ... monitor run                                 | sentry                                |                       | <ul><li>[ ] </li></ul> |
| ... make releasable solution                    | release-it                            |                       | <ul><li>[ ] </li></ul> |

## 🙏 Thanks

- [Start Simple & Easy KISS](https://github.com/caderek/aoc2019)
- [Use project to experiment and iterate](https://github.com/AlexAegis/advent-of-code)
- [For Codecov share](https://github.com/xballoy/aoc2020) & [Codecov for Mocha](https://medium.com/@erickzhao/adding-test-coverage-to-your-nodejs-app-with-codecov-istanbul-and-travisci-aa092c1e360c)
