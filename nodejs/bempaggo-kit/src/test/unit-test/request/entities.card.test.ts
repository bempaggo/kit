import assert from "assert";
import { BempaggoCardExpirationRequest, BempaggoCardHolderRequest, BempaggoCardRequest } from "../../../../src/app/modules/entity/BempaggoRequest";
describe("Card Entity", () => {
  describe("Request", () => {
    test("CardHolder", async () => {
      const cardHolder: BempaggoCardHolderRequest = {
        name: "Tony Stark",
        document: "51190844001",
      };

      assert.equal(2, Object.keys(cardHolder).length);
      assert.equal("Tony Stark", cardHolder.name);
      assert.equal("51190844001", cardHolder.document);
    });

    test("cardExpiration", async () => {
      const cardExpiration: BempaggoCardExpirationRequest = {
        year: 2025,
        month: 3,
      };

      assert.equal(2, Object.keys(cardExpiration).length);
      assert.equal(2025, cardExpiration.year);
      assert.equal(3, cardExpiration.month);
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

