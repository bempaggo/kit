import { BempaggoAddressRequest } from "@/app/modules/entity/BempaggoRequest";
import { assert, assertType, describe, test } from "vitest";

describe("Address entity", () => {
  describe("Request", () => {
    test("valid address", async () => {
      const address: BempaggoAddressRequest = {
        street: "Rua Jair Hamms",
        streetNumber: "38",
        lineTwo: "Sala 101",
        neighborhood: "Pedra Branca",
        city: "Palhoça",
        state: "SC",
        zipCode: "88137084",
      };
      const zipCodeRegex = /^\d{8}$/;
      

      assert.notEqual(address, null);
      assertType<BempaggoAddressRequest>(address);
      assert.equal(Object.keys(address).length, 7);
      assert.equal(address.street, "Rua Jair Hamms");
      assert.equal(address.streetNumber, "38");
      assert.equal(address.lineTwo, "Sala 101");
      assert.equal(address.neighborhood, "Pedra Branca");
      assert.equal(address.city, "Palhoça");
      assert.equal(address.state, "SC");
      assert.equal(address.zipCode, "88137084");
      assert.ok(address.street.length > 0);
      assert.ok(address.streetNumber.length > 0);
      assert.ok(address.neighborhood.length > 0);
      assert.ok(address.city.length > 0);
      assert.ok(address.state.length > 0);
      assert.ok(address.zipCode.length > 0);
      assert.ok(zipCodeRegex.test(address.zipCode));
    });

    test("address with only required fields", async () => {
      const address: BempaggoAddressRequest = {
        street: "Rua Jair Hamms",
        streetNumber: "38",
        neighborhood: "Pedra Branca",
        city: "Palhoça",
        state: "SC",
        zipCode: "88137084",
      };
      const zipCodeRegex = /^\d{8}$/;

      assertType<BempaggoAddressRequest>(address);
      assert.equal(Object.keys(address).length, 6);
      assert.equal(address.street, "Rua Jair Hamms");
      assert.equal(address.streetNumber, "38");
      assert.equal(address.lineTwo, undefined);
      assert.equal(address.neighborhood, "Pedra Branca");
      assert.equal(address.city, "Palhoça");
      assert.equal(address.state, "SC");
      assert.equal(address.zipCode, "88137084");
      assert.ok(address.street.length === 14);
      assert.ok(address.streetNumber.length > 0);
      assert.ok(address.neighborhood.length > 0);
      assert.ok(address.city.length === 7);
      assert.ok(address.state.length > 0);
      assert.ok(address.zipCode.length > 0);
      assert.ok(zipCodeRegex.test(address.zipCode));
    });
  });
});
