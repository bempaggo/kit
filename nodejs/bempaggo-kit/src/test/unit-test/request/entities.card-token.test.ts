import { BempaggoTokenCardRequest } from "@/app/modules/entity/BempaggoRequest";
import { assert, assertType, describe, test } from "vitest";

describe("Credit card token", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const cardToken: BempaggoTokenCardRequest = {
        cvv: "123",
        token: "123"
      }

      assertType<BempaggoTokenCardRequest>(cardToken);
      assert.equal(2, Object.keys(cardToken).length);
      assert.equal("123", cardToken.cvv);
      assert.equal("123", cardToken.token);
    });
  });
});

