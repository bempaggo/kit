import { Util } from "@/app/modules/layers/Util";
import { assert, describe, test } from "vitest";
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
      const date = new Date();
      const newDate = new Date(date.setDate(date.getDate() + 1));
      
      assert.deepEqual(newDate, Util.createCurrentDateAddingDays(1));
    })
  });
});
