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
    
    function multiplyAndConvert(number: number) {
      const multipliedNumber = number * 100000;
      return Math.floor(multipliedNumber);
    }

    test('multiply by 1,00000 and convert to flat number', () => {
      const floatingNumber1 = multiplyAndConvert(halfPercent);
      const floatingNumber2 = multiplyAndConvert(onePercent);
      const floatingNumber3 = multiplyAndConvert(onePointFive);
      const floatingNumber4 = multiplyAndConvert(fivePercent);
      const floatingNumber5 = multiplyAndConvert(tenPercent);
      const floatingNumber6 = multiplyAndConvert(tenPointNineEight);
      const floatingNumber7 = multiplyAndConvert(tenPointNineEightSeven);

      assert.equal(50000, floatingNumber1);
      assert.equal(100000, floatingNumber2);
      assert.equal(150000, floatingNumber3);
      assert.equal(500000, floatingNumber4);
      assert.equal(1000000, floatingNumber5);
      assert.equal(1098000, floatingNumber6);
      assert.equal(1098700, floatingNumber7);
    });
  });
});

