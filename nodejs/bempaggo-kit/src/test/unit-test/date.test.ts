import assert from "assert";

describe("Date", () => {
  describe("adding days to current date", () => {
    function addDaysToDate(date: string, days: number): Date {
      if (days < 0 ) {
        throw new Error("Days must be greater than zero");
      }
      const newDate = new Date(date);
    
      if (newDate.toString() === "Invalid Date") {
        throw new Error("Invalid date");
      }

      newDate.setDate(newDate.getDate() + days);
      return newDate;
    }

    test('adding one day', () => {
      const tomorrow = addDaysToDate("2023-05-07", 1);

      assert.deepEqual(new Date("2023-05-08"), tomorrow);
    });

    test('adding 15 days', () => {
      const date = addDaysToDate("2023-05-07", 15);
      
      assert.deepEqual(new Date("2023-05-22"), date);
    });

    test('adding 0 days', () => {
      const sameDay = addDaysToDate("2023-05-07", 0);
      
      assert.deepEqual(new Date("2023-05-07"), sameDay);
    });

    test('back to the past', () => {
      try {
        addDaysToDate("2023-05-07", -5);
      } catch (error: any) {
        assert.equal("Days must be greater than zero", error.message);
      }
    });

    test('invalid date', () => {
      try {
        addDaysToDate("2023-13-07", 1);
      } catch (error: any) {
        assert.equal("Invalid date", error.message);
      }
    });

    test('other month', () => {
      const date = addDaysToDate("2023-05-15", 20);
      
      assert.deepEqual(new Date("2023-06-04"), date);
    });
  });
});

