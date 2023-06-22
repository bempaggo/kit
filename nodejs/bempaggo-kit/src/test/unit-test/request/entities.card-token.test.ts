import assert from "assert";
import { BempaggoTokenCardRequest } from "../../../../src/app/modules/entity/BempaggoRequest";
describe("Credit card token", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const cardToken: BempaggoTokenCardRequest = {
        cvv: "123",
        token: "123"
      }

      assert.equal(2, Object.keys(cardToken).length);
      assert.equal("123", cardToken.cvv);
      assert.equal("123", cardToken.token);
    });
  });
});

