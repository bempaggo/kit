import { BempaggoCreditCardPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { PaymentMethodTypes } from "@/app/modules/entity/Enum";
import { assertType, describe, expect, test } from "vitest";

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

      expect(creditCardPayment).not.toBeNull();
      expect(creditCardPayment).not.toBeUndefined();
      expect(creditCardPayment).not.toBeNaN();

      assertType<BempaggoCreditCardPaymentRequest>(creditCardPayment);

      expect(creditCardPayment.paymentMethod).toBe(PaymentMethodTypes.CREDIT_CARD);
      expect(creditCardPayment.amount).toBeGreaterThan(0);
      expect(creditCardPayment.splits).not.toBeNull();
      expect(creditCardPayment.splits).not.toBeUndefined();
      expect(creditCardPayment.splits).not.toBeNaN();
      expect(creditCardPayment.splits).toHaveLength(0);

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

      expect(creditCardPayment).not.toBeNull();
      expect(creditCardPayment).not.toBeUndefined();
      expect(creditCardPayment).not.toBeNaN();

      assertType<BempaggoCreditCardPaymentRequest>(creditCardPayment);

      expect(creditCardPayment.paymentMethod).toBe(PaymentMethodTypes.CREDIT_CARD);
      expect(creditCardPayment.amount).toBeGreaterThan(0);
      expect(creditCardPayment.splits).not.toBeNull();
      expect(creditCardPayment.splits).not.toBeUndefined();
      expect(creditCardPayment.splits).not.toBeNaN();
      expect(creditCardPayment.splits).toHaveLength(2);

      expect(creditCardPayment.splits[0].amount).toBeGreaterThan(0);
      expect(creditCardPayment.splits[0].sellerId).toBeGreaterThan(0);

      expect(creditCardPayment.splits[1].amount).toBeGreaterThan(0);
      expect(creditCardPayment.splits[1].sellerId).toBeGreaterThan(0);
    });
  });

});
