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
      assert.notEqual(cardToken, null);
      assert.notEqual(cardToken.cvv, null);
      assert.notEqual(cardToken.cvv, undefined);
      assert.notEqual(cardToken.token, null);
      assert.notEqual(cardToken.token, undefined);
      assert.ok(cardToken.cvv.length === 3);
      assert.ok(cardToken.token.length === 3);
    });
  });
});

