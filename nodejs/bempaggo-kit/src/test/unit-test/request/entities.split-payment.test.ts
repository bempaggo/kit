import { BempaggoCreditCardPaymentRequest, BempaggoSplitPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { PaymentMethodTypes } from "@/app/modules/entity/Enum";
import { assertType, describe, expect, test } from "vitest";

describe("Split payment", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const splitPayment: BempaggoSplitPaymentRequest = {
        amount: 1000,
        sellerId: 123456789,
      };

      expect(splitPayment).not.toBeNull();
      expect(splitPayment).not.toBeUndefined();
      expect(splitPayment).not.toBeNaN();

      assertType<BempaggoSplitPaymentRequest>(splitPayment);

      expect(splitPayment.amount).toBeGreaterThan(0);
      expect(splitPayment.sellerId).toBeGreaterThan(0);

    });
  });

});
