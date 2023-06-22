import assert from "assert";
import { BempaggoAddressResponse } from "../../../../src/app/modules/entity/BempaggoResponse";

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
      assert.equal(7, Object.keys(address).length);
      assert.equal("Rua Jair Hamms", address.street);
      assert.equal("38", address.streetNumber);
      assert.equal("Sala 101", address.lineTwo);
      assert.equal("Pedra Branca", address.neighborhood);
      assert.equal("Palhoça", address.city);
      assert.equal("SC", address.state);
      assert.equal("88137084", address.zipCode);
      assert.equal(true, zipCodeRegex.test(address.zipCode));
    });

    test("address with only required fields", async () => {
      const address: BempaggoAddressResponse = {
        street: "Rua Jair Hamms",
        streetNumber: "38",
        neighborhood: "Pedra Branca",
        city: "Palhoça",
        state: "SC",
        zipCode: "88137084",
        lineTwo: undefined

      };
      const zipCodeRegex = /^\d{8}$/;

      assert.equal(7, Object.keys(address).length);
      assert.equal("Rua Jair Hamms", address.street);
      assert.equal("38", address.streetNumber);
      assert.equal("Pedra Branca", address.neighborhood);
      assert.equal("Palhoça", address.city);
      assert.equal("SC", address.state);
      assert.equal("88137084", address.zipCode);
      assert.equal(true, zipCodeRegex.test(address.zipCode));
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

      assert.equal(7, Object.keys(address).length);
      assert.equal("Rua Jair Hamms", address.street);
      assert.equal("38", address.streetNumber);
      assert.equal("", address.lineTwo);
      assert.equal("Pedra Branca", address.neighborhood);
      assert.equal("Palhoça", address.city);
      assert.equal("SC", address.state);
      assert.equal("88137084", address.zipCode);
      assert.equal(true, zipCodeRegex.test(address.zipCode));
    });
  });
});


