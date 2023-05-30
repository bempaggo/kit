import { BempaggoCardExpirationRequest, BempaggoCardHolderRequest, BempaggoCardRequest } from "@/app/modules/entity/BempaggoRequest";
import { BempaggoCardExpirationResponse, BempaggoCardHolderResponse,BempaggoCardResponse  } from "@/app/modules/entity/BempaggoResponse";
import { CardBrandTypes } from "@/app/modules/entity/Enum";
import { assertType, describe, expect, test } from "vitest";

describe("Card Entity", () => {
  describe("Request", () => {
    test("CardHolder", async () => {
      const cardHolder: BempaggoCardHolderRequest = {
        name: "Tony Stark",
        document: "51190844001",
      };
      expect(cardHolder).not.toBeNull();
      assertType<BempaggoCardHolderRequest>(cardHolder);
      expect(Object.keys(cardHolder).length).toBe(2);
      expect(cardHolder.name).toBe("Tony Stark");
      expect(cardHolder.document).toBe("51190844001");
    });

    test("cardExpiration", async () => {
      const cardExpiration: BempaggoCardExpirationRequest = {
        year: 2025,
        month: 3,
      };

      expect(cardExpiration).not.toBeNull();
      assertType<BempaggoCardExpirationRequest>(cardExpiration);
      expect(Object.keys(cardExpiration).length).toBe(2);
      expect(cardExpiration.year).toBe(2025);
      expect(cardExpiration.month).toBe(3);
    });

    test("card", async () => {
      const card: BempaggoCardRequest = {
        cardNumber: "5448280000000007",
        cvv: "123",
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
      expect(Object.keys(card).length).toBe(4);
      expect(card.cardNumber).toBe("5448280000000007");
      expect(card.cvv).toBe("123");
      expect(Object.keys(card.holder).length).toBe(2);
      expect(card.holder.name).toBe("Tony Stark");
      expect(card.holder.document).toBe("51190844001");
      expect(Object.keys(card.expiration).length).toBe(2);
      expect(card.expiration.year).toBe(2025);
      expect(card.expiration.month).toBe(3);
    });
  });

});
