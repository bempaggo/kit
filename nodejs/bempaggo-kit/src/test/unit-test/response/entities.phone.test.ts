import { BempaggoPhoneResponse } from "@/app/modules/entity/BempaggoResponse";
import assert from "assert";

describe("Customer", () => {
  describe("Response", () => {
    test("phoneResponse", async () => {
      const phoneResponse:  BempaggoPhoneResponse = {
        countryCode: "55",
        areaCode: "11",
        number: "999999999"
      };

      assert.equal(3, Object.keys(phoneResponse).length);
      assert.equal("55", phoneResponse.countryCode);
      assert.equal("11", phoneResponse.areaCode);
      assert.equal("999999999", phoneResponse.number);
    });
  });
});
