import { BempaggoBankSlipPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { PaymentMethodTypes } from "@/app/modules/entity/Enum";
import { assert, assertType, describe, test } from "vitest";


describe("Bankslip Payment", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const bankslipPayment: BempaggoBankSlipPaymentRequest = {
        paymentMethod: PaymentMethodTypes.BOLETO,
        expirationDate: new Date().getTime(),
        amount: 1000,
        paymentLimitDate: new Date().getTime(),
        splits: [],
      };

      assert.notEqual(bankslipPayment, null);
      assertType<BempaggoBankSlipPaymentRequest>(bankslipPayment);
      assert.equal(bankslipPayment.paymentMethod, PaymentMethodTypes.BOLETO);
      assert.ok(bankslipPayment.expirationDate > 0);
      assert.ok(bankslipPayment.amount > 0);
      assert.notEqual(bankslipPayment.splits, null);
      assert.notEqual(bankslipPayment.splits, undefined);
      assert.ok(Array.isArray(bankslipPayment.splits));
      assert.equal(bankslipPayment.splits.length, 0);
    });

    test("Valid request with splits", async () => {
      const bankslipPayment: BempaggoBankSlipPaymentRequest = {
        paymentMethod: PaymentMethodTypes.BOLETO,
        expirationDate: new Date().getTime(),
        paymentLimitDate: new Date().getTime(),
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

      assert.equal(PaymentMethodTypes.BOLETO, bankslipPayment.paymentMethod);
      assert.equal(1000, bankslipPayment.amount);
      assertType<BempaggoBankSlipPaymentRequest>(bankslipPayment);
      assert.equal(PaymentMethodTypes.BOLETO, bankslipPayment.paymentMethod);
      assert.ok(bankslipPayment.expirationDate > 0);
      assert.equal(bankslipPayment.splits.length, 2);
      assert.ok(bankslipPayment.splits[0].amount > 0);
      assert.equal(1000, bankslipPayment.splits[0].amount);
      assert.ok(bankslipPayment.splits[0].sellerId > 0);
      assert.ok(bankslipPayment.splits[1].amount > 0);
      assert.ok(bankslipPayment.splits[1].sellerId > 0);
    });
  });
});

