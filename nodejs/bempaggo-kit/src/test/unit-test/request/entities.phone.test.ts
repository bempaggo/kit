import assert from "assert";
import { BempaggoPhoneRequest } from "../../../../src/app/modules/entity/BempaggoRequest";
describe("Customer", () => {
  describe("Request", () => {
    test("Phone", async () => {
      const phone: BempaggoPhoneRequest = {
        countryCode: 55,
        areaCode: 48,
        number: 999999999,
      };

      assert.equal(3, Object.keys(phone).length);
      assert.equal(55, phone.countryCode);
      assert.equal(48, phone.areaCode);
      assert.equal(999999999, phone.number);
    });
  });
});

