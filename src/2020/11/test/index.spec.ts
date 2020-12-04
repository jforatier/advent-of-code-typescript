import { expect } from "chai";
import {
  rawInput,
  parse,
  processPartOne,
  processPartTwo,
  Boat,
} from "../index";

const part1sample1 = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

const part1Round1Result = `#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
`;

const part1Round2Result = `#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##
`;

const part1Round3Result = `#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##
`;

const part1Round4Result = `#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##
`;

const part1Round5Result = `#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##
`;

// -------------------- Part 2 --------------------------------
const part2sample1 = `.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`;

const part2sample2 = `.............
.L.L.#.#.#.#.
.............`;

const part2sample3 = `.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.`;

describe(`2020 - Day 11`, () => {
  describe("Functions", () => {
    it(`scan should return answer 1 after 1 scan`, async () => {
      let boat: Boat = new Boat(parse(part1sample1));
      boat.scan(4, boat.aroundOccupied);
      expect(boat.toString()).to.equal(part1Round1Result);
    });
    it(`scan should return answer 2 after 2 scan`, async () => {
      let boat: Boat = new Boat(parse(part1sample1));
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      expect(boat.toString()).to.equal(part1Round2Result);
    });

    it(`scan should return answer 3 after 3 scan`, async () => {
      let boat: Boat = new Boat(parse(part1sample1));
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      expect(boat.toString()).to.equal(part1Round3Result);
    });

    it(`scan should return answer 4 after 4 scan`, async () => {
      let boat: Boat = new Boat(parse(part1sample1));
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      expect(boat.toString()).to.equal(part1Round4Result);
    });

    it(`scan should return answer 5 after 5 scan`, async () => {
      let boat: Boat = new Boat(parse(part1sample1));
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      expect(boat.toString()).to.equal(part1Round5Result);
    });

    it(`scan should return 0 after 6 scan`, async () => {
      let boat: Boat = new Boat(parse(part1sample1));
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      boat.scan(4, boat.aroundOccupied);
      let result = boat.scan(4, boat.aroundOccupied);
      expect(result).to.equal(0);
    });

    it(`seeSeatsCount should return 8 with part2sample1`, async () => {
      let boat: Boat = new Boat(parse(part2sample1));
      let result = boat.aroundVisible(boat.places, 4, 3);
      expect(result.length).to.equal(8);
    });

    it(`seeSeatsCount should return 1 with part2sample2`, async () => {
      let boat: Boat = new Boat(parse(part2sample2));
      let result = boat.aroundVisible(boat.places, 1, 1);
      expect(result.length).to.equal(0);
    });

    it(`seeSeatsCount should return 0 with part2sample3`, async () => {
      let boat: Boat = new Boat(parse(part2sample3));
      let result = boat.aroundVisible(boat.places, 3, 3);
      expect(result.length).to.equal(0);
    });
  });

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput)[0]).to.equal(
        "LLLLLLLL.LLL.LLLLLLLLLLLLL.LL.LLLLLL.LL.LLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLL.LLLLLLLL"
      );
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should return 37 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1)).to.equal(37);
    });
    it(`[Part 2 - Sample 1] should return 26 when using the sample 2`, async () => {
      expect(processPartTwo(part1sample1)).to.equal(26);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 2113 when using the input file`, async () => {
      expect(processPartOne(rawInput)).to.equal(2113);
    });
    it(`[Part 2] should always return 1865 when using the input file`, async () => {
      expect(processPartTwo(rawInput)).to.equal(1865);
    });
  });
});
