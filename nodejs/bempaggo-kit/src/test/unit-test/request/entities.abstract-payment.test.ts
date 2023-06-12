import { BempaggoAbstractPaymentRequest, BempaggoBankSlipPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { PaymentMethodTypes } from "@/app/modules/entity/Enum";
import { assert, assertType, describe, expect, test } from "vitest";

describe("Abstract Payment", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const abstractPayment: BempaggoAbstractPaymentRequest = {
        paymentMethod: PaymentMethodTypes.BOLETO,
        amount: 1000,
        splits: [],
      };

      assert.notEqual(abstractPayment, null);
      assert.notEqual(abstractPayment, undefined);

      assertType<BempaggoAbstractPaymentRequest>(abstractPayment);

      assert.equal(abstractPayment.paymentMethod, PaymentMethodTypes.BOLETO);
      assert.ok(abstractPayment.amount > 0);
      assert.notEqual(abstractPayment.splits, null);
      assert.notEqual(abstractPayment.splits, undefined);
      assert.equal(abstractPayment.splits.length, 0);
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

      assert.notEqual(abstractPayment, null);
      assert.notEqual(abstractPayment, undefined);

      assertType<BempaggoAbstractPaymentRequest>(abstractPayment);

      assert.equal(abstractPayment.paymentMethod, PaymentMethodTypes.BOLETO);
      assert.ok(abstractPayment.amount > 0);
      assert.notEqual(abstractPayment.splits, null);
      assert.notEqual(abstractPayment.splits, undefined);

      assert.ok(abstractPayment.splits[0].amount > 0);
      assert.ok(abstractPayment.splits[0].sellerId > 0);
      
      assert.ok(abstractPayment.splits[1].amount > 0);
      assert.ok(abstractPayment.splits[1].sellerId > 0);
    });
  });
});
