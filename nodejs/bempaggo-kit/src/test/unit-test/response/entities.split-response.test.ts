import { BempaggoSplitPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { BempaggoSplitResponse } from "@/app/modules/entity/BempaggoResponse";
import { assertType, describe, expect, test } from "vitest";

describe("Split payment", () => {
  describe("Response", () => {
    test("Valid response", async () => {
      const splitPayment: BempaggoSplitResponse = {
        amount: 1000,
        affiliate: {
          id: 123456789,
          name: "Teste",
          businessName: "Teste"
        }
      };

      expect(splitPayment).not.toBeNull();
      expect(splitPayment).not.toBeUndefined();
      expect(splitPayment).not.toBeNaN();

      assertType<BempaggoSplitResponse>(splitPayment);

      expect(splitPayment.amount).toBeGreaterThan(0);
      expect(splitPayment.affiliate).not.toBeNull();
      expect(splitPayment.affiliate).not.toBeUndefined();
      expect(splitPayment.affiliate).not.toBeNaN();
      expect(splitPayment.affiliate.id).toBeGreaterThan(0);
      expect(splitPayment.affiliate.id).toBe(123456789);
  
      expect(splitPayment.affiliate.name).not.toBeNull();
      expect(splitPayment.affiliate.name).not.toBeUndefined();
      expect(splitPayment.affiliate.name).not.toBeNaN();
      expect(splitPayment.affiliate.name).toBe("Teste");

      expect(splitPayment.affiliate.businessName).not.toBeNull();
      expect(splitPayment.affiliate.businessName).not.toBeUndefined();
      expect(splitPayment.affiliate.businessName).not.toBeNaN();
      expect(splitPayment.affiliate.businessName).toBe("Teste");

    });
  });

});
