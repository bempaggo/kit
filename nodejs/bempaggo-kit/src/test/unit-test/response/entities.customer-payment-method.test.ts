import assert from "assert";
import { BempaggoCardResponse } from "../../../../src/app/modules/entity/BempaggoResponse";
import { CardBrandTypes } from "../../../../src/app/modules/entity/Enum";
describe("Customer", () => {
  describe("Response", () => {
    test("customerPaymentMethod", async () => {
      const paymentMethod: BempaggoCardResponse = {
        token: "skksks",
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
      assert.equal(6, Object.keys(paymentMethod).length);
      assert.equal(2, Object.keys(paymentMethod.holder).length);
      assert.equal(2, Object.keys(paymentMethod.expiration).length);

      assert.equal("skksks", paymentMethod.token);
      assert.equal("Tony Stark", paymentMethod.holder.name);
      assert.equal("51190844001", paymentMethod.holder.document);
      assert.equal("544828", paymentMethod.bin);
      assert.equal("0007", paymentMethod.lastFour);
      assert.equal(2035, paymentMethod.expiration.year);
      assert.equal(1, paymentMethod.expiration.month);
      assert.equal("MASTERCARD", paymentMethod.brand);
    });
  });
});
