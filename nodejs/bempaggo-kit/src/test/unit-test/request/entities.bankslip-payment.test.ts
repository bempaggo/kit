import { BempaggoBankSlipPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { PaymentMethodTypes } from "@/app/modules/entity/Enum";
import { assertType, describe, expect, test } from "vitest";

describe("Bankslip Payment", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const bankslipPayment: BempaggoBankSlipPaymentRequest = {
        paymentMethod: PaymentMethodTypes.BOLETO,
        expirationDate: new Date().getTime(),
        amount: 1000,
        splits: [],
      };

      expect(bankslipPayment).not.toBeNull();
      expect(bankslipPayment).not.toBeUndefined();
      expect(bankslipPayment).not.toBeNaN();

      assertType<BempaggoBankSlipPaymentRequest>(bankslipPayment);

      expect(bankslipPayment.paymentMethod).toBe(PaymentMethodTypes.BOLETO);
      expect(bankslipPayment.expirationDate).toBeGreaterThan(0);
      expect(bankslipPayment.amount).toBeGreaterThan(0);
      expect(bankslipPayment.splits).not.toBeNull();
      expect(bankslipPayment.splits).not.toBeUndefined();
      expect(bankslipPayment.splits).not.toBeNaN();
      expect(bankslipPayment.splits).toHaveLength(0);

    });
    test("Valid request with splits", async () => {
      const bankslipPayment: BempaggoBankSlipPaymentRequest = {
        paymentMethod: PaymentMethodTypes.BOLETO,
        expirationDate: new Date().getTime(),
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

      expect(bankslipPayment).not.toBeNull();
      expect(bankslipPayment).not.toBeUndefined();
      expect(bankslipPayment).not.toBeNaN();

      assertType<BempaggoBankSlipPaymentRequest>(bankslipPayment);

      expect(bankslipPayment.paymentMethod).toBe(PaymentMethodTypes.BOLETO);
      expect(bankslipPayment.expirationDate).toBeGreaterThan(0);
      expect(bankslipPayment.amount).toBeGreaterThan(0);
      expect(bankslipPayment.splits).not.toBeNull();
      expect(bankslipPayment.splits).not.toBeUndefined();
      expect(bankslipPayment.splits).not.toBeNaN();
      expect(bankslipPayment.splits).toHaveLength(2);

      expect(bankslipPayment.splits[0].amount).toBeGreaterThan(0);
      expect(bankslipPayment.splits[0].sellerId).toBeGreaterThan(0);

      expect(bankslipPayment.splits[1].amount).toBeGreaterThan(0);
      expect(bankslipPayment.splits[1].sellerId).toBeGreaterThan(0);

    });
  });

});
