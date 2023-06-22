import { BempaggoPixPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { PaymentMethodTypes } from "@/app/modules/entity/Enum";
import assert from "assert";
import { describe, test } from "node:test";
describe("Pix Payment", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const pixPayment: BempaggoPixPaymentRequest = {
        description: undefined,
        paymentMethod: PaymentMethodTypes.PIX,
        desiredExpirationDate: 1686681565342,
        amount: 1000,
        splits: [],
      };

      assert.equal(4, Object.keys(pixPayment).length);
      assert.equal("PIX", pixPayment.paymentMethod);
      assert.equal(1686681565342, pixPayment.desiredExpirationDate);
      assert.equal(1000, pixPayment.amount);
      assert.deepEqual([], pixPayment.splits);
    });

    test("Valid request", async () => {
      const pixPayment: BempaggoPixPaymentRequest = {
        description: undefined,
        paymentMethod: PaymentMethodTypes.PIX,
        desiredExpirationDate: 1686681565342,
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

      assert.equal("PIX", pixPayment.paymentMethod);
      assert.equal(1686681565342, pixPayment.desiredExpirationDate);
      assert.equal(1000, pixPayment.amount);
      assert.equal(2, pixPayment.splits.length);
      assert.equal(1000, pixPayment.splits[0].amount);
      assert.equal(123456789, pixPayment.splits[0].sellerId);
      assert.equal(1000, pixPayment.splits[1].amount);
      assert.equal(123456789, pixPayment.splits[1].sellerId);
    });
  });
});

