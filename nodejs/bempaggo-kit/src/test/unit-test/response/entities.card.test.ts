import { BempaggoCardExpirationResponse, BempaggoCardHolderResponse, BempaggoCardResponse } from "@/app/modules/entity/BempaggoResponse";
import { CardBrandTypes } from "@/app/modules/entity/Enum";
import { assert, assertType, describe, test } from "vitest";

describe("Card Entity", () => {
  describe("Response", () => {
    test("cardHolder", async () => {
      const cardHolder: BempaggoCardHolderResponse = {
        name: "Tony Stark",
        document: "51190844001",
      };

      assertType<BempaggoCardHolderResponse>(cardHolder);
      assert.equal(2, Object.keys(cardHolder).length);
      assert.equal("Tony Stark", cardHolder.name);
      assert.equal("51190844001", cardHolder.document);
    });

    test("card holder with only required fields", async () => {
      const cardHolder: BempaggoCardHolderResponse = {
        name: "Tony Stark",
      };

      assertType<BempaggoCardHolderResponse>(cardHolder);
      assert.equal(1, Object.keys(cardHolder).length);
      assert.equal("Tony Stark", cardHolder.name);
    })

    test("cardExpiration", async () => {
      const cardExpiration: BempaggoCardExpirationResponse = {
        year: 2035,
        month: 1
      };

      assertType<BempaggoCardExpirationResponse>(cardExpiration);
      assert.equal(2, Object.keys(cardExpiration).length);
      assert.equal(2035, cardExpiration.year);
      assert.equal(1, cardExpiration.month);
    });

    test("cardResponse", async () => {
      const card: BempaggoCardResponse = {
        token: "token-1",
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

      assertType<BempaggoCardResponse>(card);
      assertType<BempaggoCardHolderResponse>(card.holder);
      assertType<BempaggoCardExpirationResponse>(card.expiration);

      assert.equal(6, Object.keys(card).length);
      assert.equal(2, Object.keys(card.holder).length);
      assert.equal(2, Object.keys(card.expiration).length);

      assert.equal("Tony Stark", card.holder.name);
      assert.equal("51190844001", card.holder.document);
      assert.equal("token-1", card.token);
      assert.equal("544828", card.bin);
      assert.equal("0007", card.lastFour);
      assert.equal(2035, card.expiration.year);
      assert.equal(1, card.expiration.month);
      assert.equal("MASTERCARD", card.brand);
    });
  });
});
