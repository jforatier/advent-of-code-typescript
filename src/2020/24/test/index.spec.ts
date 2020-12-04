import { expect } from "chai";
import { rawInput, parse, processPartOne, processPartTwo } from "../index";

const part1sample1 = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`;

describe(`2020 - Day 24`, () => {
  describe("Functions", () => {});

  describe("Input", () => {
    it(`should have a line look like`, async () => {
      expect(parse(rawInput).length).to.equal(316);
      expect(parse(rawInput)[0].length).to.equal(38);
    });
  });

  describe("Sample", () => {
    it(`[Part 1 - Sample 1] should return 10 when using the sample 1`, async () => {
      expect(processPartOne(part1sample1)).to.equal(10);
    });
    it(`[Part 2 - Sample 1] should return 2208 when using the sample 1`, async () => {
      expect(processPartTwo(part1sample1)).to.equal(2208);
    });
  });

  describe("Response", () => {
    it(`[Part 1] should always return 244 when using the input file`, async () => {
      expect(processPartOne(rawInput)).to.equal(244);
    });
    it(`[Part 2] should always return 3665 when using the input file`, async () => {
      expect(processPartTwo(rawInput)).to.equal(3665);
    });
  });
});
