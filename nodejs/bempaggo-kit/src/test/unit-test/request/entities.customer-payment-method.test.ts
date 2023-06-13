import { BempaggoCardExpirationRequest, BempaggoCardHolderRequest, BempaggoCardRequest } from "@/app/modules/entity/BempaggoRequest";
import { assert, assertType, describe, test } from "vitest";

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

      assert.notEqual(card, null);
      assertType<BempaggoCardRequest>(card);
      assertType<BempaggoCardHolderRequest>(card.holder);
      assertType<BempaggoCardExpirationRequest>(card.expiration);
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

