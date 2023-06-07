import { BempaggoTokenCardRequest } from "@/app/modules/entity/BempaggoRequest";
import { describe, expect, test } from "vitest";

describe("Credit card token", () => {
  describe("Request", () => {
    test("Valid request", async () => {
      const cardToken: BempaggoTokenCardRequest  = {
        cvv: "123",
        token: "123"
      }

      expect(cardToken).not.toBeNull();
      expect(cardToken).not.toBeUndefined();
      expect(cardToken).not.toBeNaN();

      expect(cardToken.cvv).not.toBeNull();
      expect(cardToken.cvv).not.toBeUndefined();
      expect(cardToken.cvv).not.toBeNaN();
      expect(cardToken.cvv).toHaveLength(3);

      expect(cardToken.token).not.toBeNull();
      expect(cardToken.token).not.toBeUndefined();
      expect(cardToken.token).not.toBeNaN();
      expect(cardToken.token).toHaveLength(3);
      
    });
  });

});
