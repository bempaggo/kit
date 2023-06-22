import { BempaggoCreditCardPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { PaymentMethodTypes } from "@/app/modules/entity/Enum";
import assert from "assert";


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

      assert.equal(5, Object.keys(creditCardPayment).length);
      assert.equal(2, Object.keys(creditCardPayment.cardToken).length);
      assert.equal("CREDIT_CARD", creditCardPayment.paymentMethod);
      assert.equal("123", creditCardPayment.cardToken.cvv);
      assert.equal("123", creditCardPayment.cardToken.token);
      assert.equal(1, creditCardPayment.installments);
      assert.equal(1000, creditCardPayment.amount);
      assert.deepEqual([], creditCardPayment.splits);

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

      assert.equal(5, Object.keys(creditCardPayment).length);
      assert.equal(2, Object.keys(creditCardPayment.cardToken).length);
      assert.equal("CREDIT_CARD", creditCardPayment.paymentMethod);
      assert.equal("123", creditCardPayment.cardToken.cvv);
      assert.equal("123", creditCardPayment.cardToken.token);
      assert.equal(1, creditCardPayment.installments);
      assert.equal(1000, creditCardPayment.amount);
      assert.equal(2, creditCardPayment.splits.length);
      assert.equal(1000, creditCardPayment.splits[0].amount);
      assert.equal(123456789, creditCardPayment.splits[0].sellerId);
      assert.equal(1000, creditCardPayment.splits[1].amount);
      assert.equal(123456789, creditCardPayment.splits[1].sellerId);
    });
  });
});

