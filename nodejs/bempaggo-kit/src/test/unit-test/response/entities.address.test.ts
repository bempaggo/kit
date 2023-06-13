import { BempaggoAddressResponse } from "@/app/modules/entity/BempaggoResponse";
import { assert, assertType, describe, test } from "vitest";

describe("Address entity", () => {
  describe("Response", () => {
    test("address", async () => {
      const address: BempaggoAddressResponse = {
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
      assertType<BempaggoAddressResponse>(address);
      assert.equal(Object.keys(address).length, 7);
      assert.equal(address.street, "Rua Jair Hamms");
      assert.equal(address.streetNumber, "38");
      assert.equal(address.lineTwo, "Sala 101");
      assert.equal(address.neighborhood, "Pedra Branca");
      assert.equal(address.city, "Palhoça");
      assert.equal(address.state, "SC");
      assert.equal(address.zipCode, "88137084");
      assert.isTrue(address.street.length > 0);
      assert.isTrue(address.streetNumber.length > 0);
      assert.isTrue(address.neighborhood.length > 0);
      assert.isTrue(address.city.length > 0);
      assert.isTrue(address.state.length > 0);
      assert.isTrue(address.zipCode.length > 0);
      assert.isTrue(zipCodeRegex.test(address.zipCode));
    });

    test("address with only required fields", async () => {
      const address: BempaggoAddressResponse = {
        street: "Rua Jair Hamms",
        streetNumber: "38",
        neighborhood: "Pedra Branca",
        city: "Palhoça",
        state: "SC",
        zipCode: "88137084",
      };
      const zipCodeRegex = /^\d{8}$/;

      assertType<BempaggoAddressResponse>(address);
      assert.equal(Object.keys(address).length, 6);
      assert.equal(address.street, "Rua Jair Hamms");
      assert.equal(address.streetNumber, "38");
      assert.equal(address.lineTwo, undefined);
      assert.equal(address.neighborhood, "Pedra Branca");
      assert.equal(address.city, "Palhoça");
      assert.equal(address.state, "SC");
      assert.equal(address.zipCode, "88137084");
      assert.isTrue(address.street.length > 0);
      assert.isTrue(address.streetNumber.length > 0);
      assert.isTrue(address.neighborhood.length > 0);
      assert.isTrue(address.city.length > 0);
      assert.isTrue(address.state.length > 0);
      assert.isTrue(address.zipCode.length > 0);
      assert.isTrue(zipCodeRegex.test(address.zipCode));
    });

    test("address with empty lineTwo", async () => {
      const address: BempaggoAddressResponse = {
        street: "Rua Jair Hamms",
        streetNumber: "38",
        lineTwo: "",
        neighborhood: "Pedra Branca",
        city: "Palhoça",
        state: "SC",
        zipCode: "88137084",
      };
      const zipCodeRegex = /^\d{8}$/;

      assertType<BempaggoAddressResponse>(address);
      assert.equal(Object.keys(address).length, 7);
      assert.equal(address.street, "Rua Jair Hamms");
      assert.equal(address.streetNumber, "38");
      assert.equal(address.lineTwo, "");
      assert.equal(address.neighborhood, "Pedra Branca");
      assert.equal(address.city, "Palhoça");
      assert.equal(address.state, "SC");
      assert.equal(address.zipCode, "88137084");
      assert.isTrue(address.street.length > 0);
      assert.isTrue(address.streetNumber.length > 0);
      assert.isTrue(address.lineTwo?.length === 0);
      assert.isTrue(address.neighborhood.length > 0);
      assert.isTrue(address.city.length > 0);
      assert.isTrue(address.state.length > 0);
      assert.isTrue(address.zipCode.length > 0);
      assert.isTrue(zipCodeRegex.test(address.zipCode));
    });
  });
});

  
