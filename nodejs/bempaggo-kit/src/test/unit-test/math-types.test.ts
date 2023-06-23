import assert from "assert";

describe("Math types", () => {
  describe("Create flat values from floating points ", () => {
    
    function multiplyAndConvert(number: number) {
        const multipliedNumber = number * 100000;
        return Math.floor(multipliedNumber);
    }
    test('multiply by 1,000,00 and convert to flat number', () => {
      const floatingNumber = 1.2;
      const flatNumber = multiplyAndConvert(floatingNumber);

      assert.equal(120000,flatNumber);
    });

  });
});

