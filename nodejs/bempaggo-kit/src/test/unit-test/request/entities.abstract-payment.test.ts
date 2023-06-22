import { BempaggoAbstractPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { PaymentMethodTypes } from "@/app/modules/entity/Enum";
import assert from "node:assert";
import { describe, test } from "node:test";
describe("Abstract Payment", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const abstractPayment: BempaggoAbstractPaymentRequest = {
        paymentMethod: PaymentMethodTypes.BOLETO,
        amount: 1000,
        splits: [],
      };

      assert.equal(3, Object.keys(abstractPayment).length);
      assert.equal("BOLETO", abstractPayment.paymentMethod);
      assert.equal(1000, abstractPayment.amount);
      assert.deepEqual([], abstractPayment.splits);
    });

    test("Valid request with splits", async () => {
      const abstractPayment: BempaggoAbstractPaymentRequest = {
        paymentMethod: PaymentMethodTypes.BOLETO,
        amount: 1000,
        splits: [
          {
            amount: 1000,
            sellerId: 123456789,
          },
          {
            amount: 1000,
            sellerId: 123456789,
          },
        ],
      };

      assert.equal(3, Object.keys(abstractPayment).length);
      assert.equal("BOLETO", abstractPayment.paymentMethod);
      assert.equal(1000, abstractPayment.amount);
      assert.equal(2, abstractPayment.splits.length);
      assert.equal(1000, abstractPayment.splits[0].amount);
      assert.equal(123456789, abstractPayment.splits[0].sellerId);
      assert.equal(1000, abstractPayment.splits[1].amount);
      assert.equal(123456789, abstractPayment.splits[1].sellerId);
    });
  });
});
