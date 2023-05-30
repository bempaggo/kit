import { BempaggoPhoneRequest } from "@/app/modules/entity/BempaggoRequest";
import { BempaggoPhoneResponse } from "@/app/modules/entity/BempaggoResponse";
import { assertType, describe, expect, test } from "vitest";

describe("Customer", () => {
  describe("Request", () => {
    test("Phone", async () => {
      const phone:BempaggoPhoneRequest = {
        countryCode: 55,
        areaCode: 48,
        number: 999999999,
      };

      expect(phone).not.toBeNull();
      assertType<BempaggoPhoneRequest>(phone);
      expect(Object.keys(phone).length).toBe(3);
      expect(phone.countryCode).toBe(55);
      expect(phone.areaCode).toBe(48);
      expect(phone.number).toBe(999999999);
    });
  });

});
