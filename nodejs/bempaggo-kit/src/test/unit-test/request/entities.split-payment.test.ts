import { BempaggoCreditCardPaymentRequest, BempaggoSplitPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { PaymentMethodTypes } from "@/app/modules/entity/Enum";
import { assert, assertType, describe, expect, test } from "vitest";

describe("Split payment", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const splitPayment: BempaggoSplitPaymentRequest = {
        amount: 1000,
        sellerId: 123456789,
      };

      assertType<BempaggoSplitPaymentRequest>(splitPayment);
      assert.isTrue(splitPayment.amount > 0);
      assert.isTrue(splitPayment.sellerId > 0);
    });
  });
});

