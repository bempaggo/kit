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

      assertType<BempaggoCardRequest>(card);
      assertType<BempaggoCardHolderRequest>(card.holder);
      assertType<BempaggoCardExpirationRequest>(card.expiration);

      assert.equal(3, Object.keys(card).length);
      assert.equal(2, Object.keys(card.holder).length);
      assert.equal(2, Object.keys(card.expiration).length);

      assert.equal("5448280000000007", card.cardNumber);
      assert.equal("Tony Stark", card.holder.name);
      assert.equal("51190844001", card.holder.document);
      assert.equal(2025, card.expiration.year);
      assert.equal(3, card.expiration.month);
    });
  });
});

