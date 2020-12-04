import { expect } from "chai";
import { rawInput, parse, processPartOne, processPartTwo } from "../index";

const part1sample1 = `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`;

describe(`2020 - Day 20`, () => {
  describe("Functions", () => {});

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput).length).to.equal(1728);
      expect(parse(rawInput)[0].length).to.equal(10);
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should return 20899048083289 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1)).to.equal(20899048083289);
    });
    it(`[Part 2 - Sample 1] should return 273 when using the sample 1`, async () => {
      expect(processPartTwo(part1sample1)).to.equal(273);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 140656720229539 when using the input file`, async () => {
      expect(processPartOne(rawInput)).to.equal(140656720229539);
    });
    it(`[Part 2] should always return 1885 when using the input file`, async () => {
      expect(processPartTwo(rawInput)).to.equal(1885);
    });
  });
});
