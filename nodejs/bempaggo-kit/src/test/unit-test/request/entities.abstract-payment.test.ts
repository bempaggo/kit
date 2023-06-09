import { BempaggoAbstractPaymentRequest, BempaggoBankSlipPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { PaymentMethodTypes } from "@/app/modules/entity/Enum";
import { assertType, describe, expect, test } from "vitest";

describe("Abstract Payment", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const abstractPayment: BempaggoAbstractPaymentRequest = {
        paymentMethod: PaymentMethodTypes.BOLETO,
        amount: 1000,
        splits: [],
      };

      expect(abstractPayment).not.toBeNull();
      expect(abstractPayment).not.toBeUndefined();
      expect(abstractPayment).not.toBeNaN();

      assertType<BempaggoAbstractPaymentRequest>(abstractPayment);

      expect(abstractPayment.paymentMethod).toBe(PaymentMethodTypes.BOLETO);
      expect(abstractPayment.amount).toBeGreaterThan(0);
      expect(abstractPayment.splits).not.toBeNull();
      expect(abstractPayment.splits).not.toBeUndefined();
      expect(abstractPayment.splits).not.toBeNaN();
      expect(abstractPayment.splits).toHaveLength(0);

    });
    test("Valid request with splits", async () => {
      const abstractPayment: BempaggoAbstractPaymentRequest = {
        paymentMethod: PaymentMethodTypes.BOLETO,
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

      expect(abstractPayment).not.toBeNull();
      expect(abstractPayment).not.toBeUndefined();
      expect(abstractPayment).not.toBeNaN();

      assertType<BempaggoAbstractPaymentRequest>(abstractPayment);

      expect(abstractPayment.paymentMethod).toBe(PaymentMethodTypes.BOLETO);
      expect(abstractPayment.amount).toBeGreaterThan(0);
      expect(abstractPayment.splits).not.toBeNull();
      expect(abstractPayment.splits).not.toBeUndefined();
      expect(abstractPayment.splits).not.toBeNaN();

      expect(abstractPayment.splits[0].amount).toBeGreaterThan(0);
      expect(abstractPayment.splits[0].sellerId).toBeGreaterThan(0);

      expect(abstractPayment.splits[1].amount).toBeGreaterThan(0);
      expect(abstractPayment.splits[1].sellerId).toBeGreaterThan(0);
    });
  });

});
