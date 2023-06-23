import { Util } from "../app/modules/layers/Util";
import assert from "assert";

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
    const umTerco = 1 / 3;
    const cincoOitavos = 5 / 8;
    const tresMeios = 3 / 2;
    const ten = 10;
    const zero = 0;


    test('multiply by 1,00000 and convert to flat number', () => {
      assert.equal(50000, Util.percentToAbsolut(halfPercent));
      assert.equal(100000, Util.percentToAbsolut(onePercent));
      assert.equal(150000, Util.percentToAbsolut(onePointFive));
      assert.equal(500000, Util.percentToAbsolut(fivePercent));
      assert.equal(1000000, Util.percentToAbsolut(tenPercent));
      assert.equal(1098000, Util.percentToAbsolut(tenPointNineEight));
      assert.equal(1098700, Util.percentToAbsolut(tenPointNineEightSeven));

      assert.equal(1098700, Util.percentToAbsolut(tenPointNineEightSevenZero));
      assert.equal(1098709, Util.percentToAbsolut(tenPointNineEightSevenZeroNine));
      assert.equal(1098709, Util.percentToAbsolut(tenPointNineEightSevenZeroNineNine));
      assert.equal(33333, Util.percentToAbsolut(umTerco));
      assert.equal(62500, Util.percentToAbsolut(cincoOitavos));
      assert.equal(150000, Util.percentToAbsolut(tresMeios));
      assert.equal(1000000, Util.percentToAbsolut(ten));
      assert.equal(0, Util.percentToAbsolut(zero));

    });
  });
});
