import { BempaggoPhoneRequest } from "@/app/modules/entity/BempaggoRequest";
import { assert, assertType, describe, test } from "vitest";

describe("Customer", () => {
  describe("Request", () => {
    test("Phone", async () => {
      const phone: BempaggoPhoneRequest = {
        countryCode: 55,
        areaCode: 48,
        number: 999999999,
      };

      assertType<BempaggoPhoneRequest>(phone);
      assert.notEqual(phone, null);
      assert.equal(Object.keys(phone).length, 3);
      assert.equal(phone.countryCode, 55);
      assert.equal(phone.areaCode, 48);
      assert.equal(phone.number, 999999999);
    });
  });
});

