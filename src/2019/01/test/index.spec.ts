import { expect } from "chai";
import {
  input,
  calculateFuelMass,
  calculateTotalFuelMass,
  calculateCorrectFuelMass,
} from "../index";

describe(`2019 - Day 1`, () => {
  it("should be that that the first example resolves to 2", async () => {
    expect(await calculateFuelMass(12)).to.equal(2);
  });

  it("should be that that the second example resolves to 2", async () => {
    expect(await calculateFuelMass(14)).to.equal(2);
  });

  it("should be that that the third example resolves to 654", async () => {
    expect(await calculateFuelMass(1969)).to.equal(654);
  });

  it("should be that that the fourth example resolves to 33583", async () => {
    expect(await calculateFuelMass(100756)).to.equal(33583);
  });

  it(`[Response - Part 1] should always return 3452245 when using the input`, async () => {
    expect(await calculateTotalFuelMass(input, calculateFuelMass)).to.equal(
      3452245
    );
  });
  it(`[Response - Part 2] should always return 5175499 when using the input`, async () => {
    expect(
      await calculateTotalFuelMass(input, calculateCorrectFuelMass)
    ).to.equal(5175499);
  });
});
