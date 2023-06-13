import { BempaggoCardExpirationRequest, BempaggoCardHolderRequest, BempaggoCardRequest } from "@/app/modules/entity/BempaggoRequest";
import { assert, assertType, describe, expect, test } from "vitest";

describe("Card Entity", () => {
  describe("Request", () => {
    test("CardHolder", async () => {
      const cardHolder: BempaggoCardHolderRequest = {
        name: "Tony Stark",
        document: "51190844001",
      };

      assert.notEqual(cardHolder, null);
      assertType<BempaggoCardHolderRequest>(cardHolder);
      assert.equal(Object.keys(cardHolder).length, 2);
      assert.equal(cardHolder.name, "Tony Stark");
      assert.equal(cardHolder.document, "51190844001");
    });

    test("cardExpiration", async () => {
      const cardExpiration: BempaggoCardExpirationRequest = {
        year: 2025,
        month: 3,
      };

      assertType<BempaggoCardExpirationRequest>(cardExpiration);
      assert.notEqual(cardExpiration, null);
      assert.equal(Object.keys(cardExpiration).length, 2);
      assert.equal(cardExpiration.year, 2025);
      assert.equal(cardExpiration.month, 3);
    });

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

      assertType<BempaggoCardRequest>(card);
      assertType<BempaggoCardHolderRequest>(card.holder);
      assertType<BempaggoCardExpirationRequest>(card.expiration);
      assert.notEqual(card, null);
      assert.equal(Object.keys(card).length, 3);
      assert.equal(card.cardNumber, "5448280000000007");
      assert.equal(Object.keys(card.holder).length, 2);
      assert.equal(card.holder.name, "Tony Stark");
      assert.equal(card.holder.document, "51190844001");
      assert.equal(Object.keys(card.expiration).length, 2);
      assert.equal(card.expiration.year, 2025);
      assert.equal(card.expiration.month, 3);
    });
  });
});

