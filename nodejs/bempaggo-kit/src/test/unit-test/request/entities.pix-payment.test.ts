import { BempaggoPixPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { PaymentMethodTypes } from "@/app/modules/entity/Enum";
import { assert, assertType, describe, test } from "vitest";

describe("Pix Payment", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const pixPayment: BempaggoPixPaymentRequest = {
        paymentMethod: PaymentMethodTypes.PIX,
        desiredExpirationDate: new Date().getTime(),
        amount: 1000,
        splits: [],
      };

      assertType<BempaggoPixPaymentRequest>(pixPayment);
      assert.equal(pixPayment.paymentMethod, PaymentMethodTypes.PIX);
      assert.lengthOf(pixPayment.splits, 0);
    });

    test("Valid request", async () => {
      const pixPayment: BempaggoPixPaymentRequest = {
        paymentMethod: PaymentMethodTypes.PIX,
        desiredExpirationDate: new Date().getTime(),
        amount: 1000,
        splits: [{
          amount: 1000,
          sellerId: 123456789,
        },
        {
          amount: 1000,
          sellerId: 123456789,
        }],
      };

      assertType<BempaggoPixPaymentRequest>(pixPayment);
      assert.equal(pixPayment.paymentMethod, PaymentMethodTypes.PIX);
      assert.lengthOf(pixPayment.splits, 2);
    });
  });
});

