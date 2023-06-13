import { BempaggoCreditCardPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { PaymentMethodTypes } from "@/app/modules/entity/Enum";
import { assert, assertType, describe, expect, test } from "vitest";


describe("Credit card payment", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const creditCardPayment: BempaggoCreditCardPaymentRequest = {
        paymentMethod: PaymentMethodTypes.CREDIT_CARD,
        installments: 1,
        cardToken: {
          cvv: "123",
          token: "123",
        },
        amount: 1000,
        splits: [],
      };

      assertType<BempaggoCreditCardPaymentRequest>(creditCardPayment);
      assert.equal(creditCardPayment.paymentMethod, PaymentMethodTypes.CREDIT_CARD);
      assert.equal(creditCardPayment.splits.length, 0);
      assert.notEqual(creditCardPayment.splits, null);
      assert.notEqual(creditCardPayment.splits, undefined);
      assert.ok(creditCardPayment.amount > 0);
      assert.ok(Array.isArray(creditCardPayment.splits));
    });

    test("Valid request with splits", async () => {
      const creditCardPayment: BempaggoCreditCardPaymentRequest = {
        paymentMethod: PaymentMethodTypes.CREDIT_CARD,
        installments: 1,
        cardToken: {
          cvv: "123",
          token: "123",
        },
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

      assertType<BempaggoCreditCardPaymentRequest>(creditCardPayment);
      assert.equal(creditCardPayment.paymentMethod, PaymentMethodTypes.CREDIT_CARD);
      assert.equal(creditCardPayment.splits.length, 2);
      assert.ok(creditCardPayment.amount > 0);
      assert.ok(Array.isArray(creditCardPayment.splits));
      assert.ok(creditCardPayment.splits[0].amount > 0);
      assert.ok(creditCardPayment.splits[0].sellerId > 0);
      assert.ok(creditCardPayment.splits[1].amount > 0);
      assert.ok(creditCardPayment.splits[1].sellerId > 0);
    });
  });
});

