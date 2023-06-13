import { BempaggoSplitPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { assert, assertType, describe, test } from "vitest";

describe("Split payment", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const splitPayment: BempaggoSplitPaymentRequest = {
        amount: 1000,
        sellerId: 123456789,
      };

      assertType<BempaggoSplitPaymentRequest>(splitPayment);
      assert.equal(1000, splitPayment.amount);
      assert.equal(123456789, splitPayment.sellerId);
      assert.isTrue(splitPayment.amount > 0);
      assert.isTrue(splitPayment.sellerId > 0);
    });
  });
});

