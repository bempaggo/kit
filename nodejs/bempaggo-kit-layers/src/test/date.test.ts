import assert from "assert";
import { Util } from "../app/modules/layers/Util";
describe("Date", () => {
  describe("adding days to current date", () => {

    test('adding one day', () => {
      const tomorrow = Util.createDateFromDays(new Date("2023-05-07"), 1);

      assert.deepEqual(new Date("2023-05-08"), tomorrow);
    });

    test('adding 15 days', () => {
      const date = Util.createDateFromDays(new Date("2023-05-07"), 15);

      assert.deepEqual(new Date("2023-05-22"), date);
    });

    test('adding 0 days', () => {
      const sameDay = Util.createDateFromDays(new Date("2023-05-07"), 0);

      assert.deepEqual(new Date("2023-05-07"), sameDay);
    });

    test('back to the past', () => {
      try {
        Util.createDateFromDays(new Date("2023-05-07"), -5);
      } catch (error: any) {
        assert.equal("Days must be greater than zero", error.message);
      }
    });

    test('other month', () => {
      const date = Util.createDateFromDays(new Date("2023-05-15"), 20);

      assert.deepEqual(new Date("2023-06-04"), date);
    });

    test('createCurrentDateAddingDays', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const calculatedTomorrow = Util.createCurrentDateAddingDays(1);
      assert.equal(true, tomorrow.getTime() <= calculatedTomorrow.getTime());
      assert.equal(true, calculatedTomorrow.getTime() - 1 <= tomorrow.getTime());
    })
  });
});
