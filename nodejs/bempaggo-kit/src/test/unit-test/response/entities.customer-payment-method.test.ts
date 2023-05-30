import { BempaggoCardExpirationResponse, BempaggoCardHolderResponse, BempaggoCardResponse } from "@/app/modules/entity/BempaggoResponse";
import { CardBrandTypes } from "@/app/modules/entity/Enum";
import { assertType, describe, expect, test } from "vitest";

describe("Customer", () => {
  describe("Response", () => {
    test("customerPaymentMethod", async () => {
      const paymentMethod: BempaggoCardResponse = {
        id: 1,
        holder: {
          name: "Tony Stark",
          document: "51190844001"
        },
        bin: "544828",
        lastFour: "0007",
        expiration: {
          year: 2035,
          month: 1
        },
        brand: CardBrandTypes.MASTERCARD,
      };

      expect(paymentMethod).not.toBeNull();
      assertType<BempaggoCardResponse>(paymentMethod);
      expect(Object.keys(paymentMethod).length).toBe(6);
      assertType<BempaggoCardHolderResponse>(paymentMethod.holder);
      expect(Object.keys(paymentMethod.holder).length).toBe(2);
      expect(paymentMethod.holder.name).toBe("Tony Stark");
      expect(paymentMethod.holder.document).toBe("51190844001");
      assertType<BempaggoCardExpirationResponse>(paymentMethod.expiration);
      expect(Object.keys(paymentMethod.expiration).length).toBe(2);
      expect(paymentMethod.expiration.year).toBe(2035);
      expect(paymentMethod.expiration.month).toBe(1);
      expect(paymentMethod.id).toBe(1);
      expect(paymentMethod.brand).toBe("MASTERCARD");
    });
  });
});
