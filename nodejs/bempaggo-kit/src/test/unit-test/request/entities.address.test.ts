import { BempaggoAddressRequest } from "@/app/modules/entity/BempaggoRequest";
import assert from "node:assert";
import { describe, test } from "node:test";

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


      assert.equal(7, Object.keys(address).length);
      assert.equal("Rua Jair Hamms", address.street);
      assert.equal("38", address.streetNumber);
      assert.equal("Sala 101", address.lineTwo);
      assert.equal("Pedra Branca", address.neighborhood);
      assert.equal("Palhoça", address.city);
      assert.equal("SC", address.state);
      assert.equal("88137084", address.zipCode);
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
        lineTwo: undefined
      };
      const zipCodeRegex = /^\d{8}$/;

      assert.equal(6, Object.keys(address).length);
      assert.equal("Rua Jair Hamms", address.street);
      assert.equal("38", address.streetNumber);
      assert.equal("Pedra Branca", address.neighborhood);
      assert.equal("Palhoça", address.city);
      assert.equal("SC", address.state);
      assert.equal("88137084", address.zipCode);
      assert.ok(zipCodeRegex.test(address.zipCode));
    });
  });
});
