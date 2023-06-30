import assert from "assert";
import { Util } from "../app/modules/layers/Util";

describe("Math types", () => {
  describe("Create flat values from floating points ", () => {
    const halfPercent = 0.5;
    const onePercent = 1.00;
    const onePointFive = 1.50;
    const fivePercent = 5.00;
    const tenPercent = 10.00;
    const tenPointNineEight = 10.98;
    const tenPointNineEightSeven = 10.987;

    const tenPointNineEightSevenZero = 10.9870;
    const tenPointNineEightSevenZeroNine = 10.98709;
    const tenPointNineEightSevenZeroNineNine = 10.987099;
    const oneThird = 1 / 3;
    const fiveEights = 5 / 8;
    const threeHalves = 3 / 2;
    const ten = 10;
    const zero = 0;


    test('multiply by 1,00000 and convert to flat number', () => {
      assert.equal(50000, Util.percentToAbsolute(halfPercent));
      assert.equal(100000, Util.percentToAbsolute(onePercent));
      assert.equal(150000, Util.percentToAbsolute(onePointFive));
      assert.equal(500000, Util.percentToAbsolute(fivePercent));
      assert.equal(1000000, Util.percentToAbsolute(tenPercent));
      assert.equal(1098000, Util.percentToAbsolute(tenPointNineEight));
      assert.equal(1098700, Util.percentToAbsolute(tenPointNineEightSeven));

      assert.equal(1098700, Util.percentToAbsolute(tenPointNineEightSevenZero));
      assert.equal(1098709, Util.percentToAbsolute(tenPointNineEightSevenZeroNine));
      assert.equal(1098709, Util.percentToAbsolute(tenPointNineEightSevenZeroNineNine));
      assert.equal(33333, Util.percentToAbsolute(oneThird));
      assert.equal(62500, Util.percentToAbsolute(fiveEights));
      assert.equal(150000, Util.percentToAbsolute(threeHalves));
      assert.equal(1000000, Util.percentToAbsolute(ten));
      assert.equal(0, Util.percentToAbsolute(zero));

    });
  });
});
