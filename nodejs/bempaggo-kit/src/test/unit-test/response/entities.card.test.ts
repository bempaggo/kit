import { BempaggoCardExpirationResponse, BempaggoCardHolderResponse, BempaggoCardResponse } from "@/app/modules/entity/BempaggoResponse";
import { CardBrandTypes } from "@/app/modules/entity/Enum";
import { assertType, describe, expect, test } from "vitest";

describe("Card Entity", () => {
  describe("Response", () => {
    test("cardHolder", async () => {
      const cardHolder: BempaggoCardHolderResponse = {
        name: "Tony Stark",
        document: "51190844001",
      };

      expect(cardHolder).not.toBeNull();
      assertType<BempaggoCardHolderResponse>(cardHolder);
      expect(Object.keys(cardHolder).length).toBe(2);
      expect(cardHolder.name).toBe("Tony Stark");
      expect(cardHolder.document).toBe("51190844001");
    });

    test("card holder with only required fields", async () => {
      const cardHolder: BempaggoCardHolderResponse = {
        name: "Tony Stark",
      };

      expect(cardHolder).not.toBeNull();
      assertType<BempaggoCardHolderResponse>(cardHolder);
      expect(Object.keys(cardHolder).length).toBe(1);
      expect(cardHolder.name).toBe("Tony Stark");
    })

    test("cardExpiration", async () => {
      const cardExpiration: BempaggoCardExpirationResponse = {
        year: 2035,
        month: 1
      };

      expect(cardExpiration).not.toBeNull();
      assertType<BempaggoCardExpirationResponse>(cardExpiration);
      expect(Object.keys(cardExpiration).length).toBe(2);
      expect(cardExpiration.year).toBe(2035);
      expect(cardExpiration.month).toBe(1);
    });

    test("cardResponse", async () => {
      const card: BempaggoCardResponse = {
        id: 1,
        holder: {
          name: "Tony Stark",
          document: "51190844001",
        },
        bin: "544828",
        lastFour: "0007",
        expiration: {
          year: 2035,
          month: 1,
        },
        brand: CardBrandTypes.MASTERCARD,
      };

      expect(card).not.toBeNull();
      assertType<BempaggoCardResponse>(card);
      expect(Object.keys(card).length).toBe(6);
      assertType<BempaggoCardHolderResponse>(card.holder);
      expect(Object.keys(card.holder).length).toBe(2);
      expect(card.holder.name).toBe("Tony Stark");
      expect(card.holder.document).toBe("51190844001");
      assertType<BempaggoCardExpirationResponse>(card.expiration);
      expect(Object.keys(card.expiration).length).toBe(2);
      expect(card.expiration.year).toBe(2035);
      expect(card.expiration.month).toBe(1);
      expect(card.brand).toBe(CardBrandTypes.MASTERCARD);
    });
  });
});
