import { BempaggoCardExpirationRequest, BempaggoCardHolderRequest, BempaggoCardRequest } from "@/app/modules/entity/BempaggoRequest";
import { assertType, describe, expect, test } from "vitest";

describe("Customer", () => {
  describe("Request", () => {
    test("card", async () => {
      const card: BempaggoCardRequest = {
        cardNumber: "5448280000000007",
        holder: {
          name: "Tony Stark",
          document: "51190844001",
        },
        expiration: {
          year: 2025,
          month: 3,
        },
      };

      expect(card).not.toBeNull();
      assertType<BempaggoCardRequest>(card);
      assertType<BempaggoCardHolderRequest>(card.holder);
      assertType<BempaggoCardExpirationRequest>(card.expiration);
      expect(Object.keys(card).length).toBe(3);
      expect(card.cardNumber).toBe("5448280000000007");
      expect(Object.keys(card.holder).length).toBe(2);
      expect(card.holder.name).toBe("Tony Stark");
      expect(card.holder.document).toBe("51190844001");
      expect(Object.keys(card.expiration).length).toBe(2);
      expect(card.expiration.year).toBe(2025);
      expect(card.expiration.month).toBe(3);
    });
  });

});
