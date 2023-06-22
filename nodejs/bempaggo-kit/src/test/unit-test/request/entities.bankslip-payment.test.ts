import { BempaggoBankSlipPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { PaymentMethodTypes } from "@/app/modules/entity/Enum";
import { assert, assertType, describe, test } from "vitest";


describe("Bankslip Payment", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const bankslipPayment: BempaggoBankSlipPaymentRequest = {
        paymentMethod: PaymentMethodTypes.BOLETO,
        dueDate: 1686683096030,
        amount: 1000,
        paymentLimitDate: 1686683096030,
        splits: [],
        fine: undefined,
        interest: undefined,
        ourNumber: undefined
      };

      assertType<BempaggoBankSlipPaymentRequest>(bankslipPayment);


      assert.equal("BOLETO", bankslipPayment.paymentMethod);
      assert.equal(1686683096030, bankslipPayment.dueDate);
      assert.equal(1000, bankslipPayment.amount);
      assert.equal(1686683096030, bankslipPayment.paymentLimitDate);
      assert.deepEqual([], bankslipPayment.splits);
    });

    test("Valid request with splits", async () => {
      const bankslipPayment: BempaggoBankSlipPaymentRequest = {
        fine: undefined,
        interest: undefined,
        ourNumber: undefined,
        paymentMethod: PaymentMethodTypes.BOLETO,
        dueDate: new Date().getTime(),
        paymentLimitDate: 1686683096030,
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
      assert.equal("BOLETO", bankslipPayment.paymentMethod);
      assert.equal(1686683096030, bankslipPayment.dueDate);
      assert.equal(1686683096030, bankslipPayment.paymentLimitDate);
      assert.ok(bankslipPayment.dueDate > 0);
      assert.lengthOf(bankslipPayment.splits, 2);
      assert.equal(1000, bankslipPayment.splits[0].amount);
      assert.equal(123456789, bankslipPayment.splits[0].sellerId);
      assert.equal(1000, bankslipPayment.splits[1].amount);
      assert.equal(123456789, bankslipPayment.splits[1].sellerId);
    });
  });
});

