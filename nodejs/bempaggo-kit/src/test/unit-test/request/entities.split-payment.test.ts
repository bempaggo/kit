import assert from "assert";
import { BempaggoSplitPaymentRequest } from "../../../../src/app/modules/entity/BempaggoRequest";
describe("Split payment", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const splitPayment: BempaggoSplitPaymentRequest = {
        amount: 1000,
        sellerId: 123456789,
      };

      assert.equal(1000, splitPayment.amount);
      assert.equal(123456789, splitPayment.sellerId);
    });
  });
});

