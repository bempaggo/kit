import { BempaggoPhoneResponse } from "@/app/modules/entity/BempaggoResponse";
import { assertType, describe, expect, test } from "vitest";

describe("Customer", () => {
  describe("Response", () => {
    test("phoneResponse", async () => {
      const phoneResponse:  BempaggoPhoneResponse = {
        countryCode: "55",
        areaCode: "11",
        number: "999999999"
      };

      expect(phoneResponse).not.toBeNull();
      assertType< BempaggoPhoneResponse>(phoneResponse);
      expect(Object.keys(phoneResponse).length).toBe(3);
      expect(phoneResponse.countryCode).toBe("55");
      expect(phoneResponse.areaCode).toBe("11");
      expect(phoneResponse.number).toBe("999999999");
    });
  });
});
