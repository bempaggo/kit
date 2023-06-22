import { BempaggoSplitPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import assert from "assert";

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

