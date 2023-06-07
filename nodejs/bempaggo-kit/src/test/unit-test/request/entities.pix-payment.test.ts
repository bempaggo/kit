import { BempaggoPixPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { PaymentMethodTypes } from "@/app/modules/entity/Enum";
import { assertType, describe, expect, test } from "vitest";

describe("Pix Payment", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const pixPayment: BempaggoPixPaymentRequest = {
        paymentMethod: PaymentMethodTypes.PIX,
        desiredExpirationDate: new Date().getTime(),
        amount: 1000,
        splits: [],
      };

      expect(pixPayment).not.toBeNull();
      expect(pixPayment).not.toBeUndefined();
      expect(pixPayment).not.toBeNaN();

      assertType<BempaggoPixPaymentRequest>(pixPayment);

      expect(pixPayment.paymentMethod).toBe(PaymentMethodTypes.PIX);
      expect(pixPayment.desiredExpirationDate).toBeGreaterThan(0);
      expect(pixPayment.amount).toBeGreaterThan(0);
      expect(pixPayment.splits).not.toBeNull();
      expect(pixPayment.splits).not.toBeUndefined();
      expect(pixPayment.splits).not.toBeNaN();
      expect(pixPayment.splits).toHaveLength(0);

    });
    test("Valid request", async () => {
      const pixPayment: BempaggoPixPaymentRequest = {
        paymentMethod: PaymentMethodTypes.PIX,
        desiredExpirationDate: new Date().getTime(),
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

      expect(pixPayment).not.toBeNull();
      expect(pixPayment).not.toBeUndefined();
      expect(pixPayment).not.toBeNaN();

      assertType<BempaggoPixPaymentRequest>(pixPayment);

      expect(pixPayment.paymentMethod).toBe(PaymentMethodTypes.PIX);
      expect(pixPayment.desiredExpirationDate).toBeGreaterThan(0);
      expect(pixPayment.amount).toBeGreaterThan(0);
      expect(pixPayment.splits).not.toBeNull();
      expect(pixPayment.splits).not.toBeUndefined();
      expect(pixPayment.splits).not.toBeNaN();
      expect(pixPayment.splits).toHaveLength(2);

      expect(pixPayment.splits[0].amount).toBeGreaterThan(0);
      expect(pixPayment.splits[0].sellerId).toBeGreaterThan(0);

      expect(pixPayment.splits[1].amount).toBeGreaterThan(0);
      expect(pixPayment.splits[1].sellerId).toBeGreaterThan(0);
    });
  });

});
