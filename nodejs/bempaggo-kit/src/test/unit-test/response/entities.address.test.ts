import { BempaggoAddressResponse } from "@/app/modules/entity/BempaggoResponse";
import { assertType, describe, expect, test } from "vitest";
describe("Address entity", () => {
  describe("Response", () => {
    test("address", async () => {
      const address: BempaggoAddressResponse  = {
        street: "Rua Jair Hamms",
        streetNumber: "38",
        lineTwo: "Sala 101",
        neighborhood: "Pedra Branca",
        city: "Palhoça",
        state: "SC",
        zipCode: "88137084",
      };
      const zipCodeRegex = /^\d{8}$/;

      expect(address).not.toBeNull();
      assertType<BempaggoAddressResponse>(address);
      expect(Object.keys(address).length).toBe(7);
      expect(address.street).toBe("Rua Jair Hamms");
      expect(address.streetNumber).toBe("38");
      expect(address.lineTwo).toBe("Sala 101");
      expect(address.neighborhood).toBe("Pedra Branca");
      expect(address.city).toBe("Palhoça");
      expect(address.state).toBe("SC");
      expect(address.zipCode).toBe("88137084");
      expect(typeof address.street).toBe("string");
      expect(typeof address.streetNumber).toBe("string");
      expect(typeof address.lineTwo).toBe("string");
      expect(typeof address.neighborhood).toBe("string");
      expect(typeof address.city).toBe("string");
      expect(typeof address.state).toBe("string");
      expect(typeof address.zipCode).toBe("string");
      expect(address.street.length).toBeGreaterThan(0);
      expect(address.streetNumber.length).toBeGreaterThan(0);
      expect(address.neighborhood.length).toBeGreaterThan(0);
      expect(address.city.length).toBeGreaterThan(0);
      expect(address.state.length).toBeGreaterThan(0);
      expect(address.zipCode.length).toBeGreaterThan(0);
      expect(zipCodeRegex.test(address.zipCode)).toBe(true);
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

      expect(address).not.toBeNull();
      assertType<BempaggoAddressResponse>(address);
      expect(Object.keys(address).length).toBe(6);
      expect(address.street).toBe("Rua Jair Hamms");
      expect(address.streetNumber).toBe("38");
      expect(address.lineTwo).toBeUndefined();
      expect(address.neighborhood).toBe("Pedra Branca");
      expect(address.city).toBe("Palhoça");
      expect(address.state).toBe("SC");
      expect(address.zipCode).toBe("88137084");
      expect(typeof address.street).toBe("string");
      expect(typeof address.streetNumber).toBe("string");
      expect(typeof address.lineTwo).toBe("undefined");
      expect(typeof address.neighborhood).toBe("string");
      expect(typeof address.city).toBe("string");
      expect(typeof address.state).toBe("string");
      expect(typeof address.zipCode).toBe("string");
      expect(address.street.length).toBe(14);
      expect(address.streetNumber.length).toBeGreaterThan(0);
      expect(address.neighborhood.length).toBeGreaterThan(0);
      expect(address.city.length).toBe(7);
      expect(address.state.length).toBeGreaterThan(0);
      expect(address.zipCode.length).toBeGreaterThan(0);
      expect(zipCodeRegex.test(address.zipCode)).toBe(true);
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

      expect(address).not.toBeNull();
      assertType<BempaggoAddressResponse>(address);
      expect(Object.keys(address).length).toBe(7);
      expect(address.street).toBe("Rua Jair Hamms");
      expect(address.streetNumber).toBe("38");
      expect(address.lineTwo).toBe("");
      expect(address.neighborhood).toBe("Pedra Branca");
      expect(address.city).toBe("Palhoça");
      expect(address.state).toBe("SC");
      expect(address.zipCode).toBe("88137084");
      expect(typeof address.street).toBe("string");
      expect(typeof address.streetNumber).toBe("string");
      expect(typeof address.lineTwo).toBe("string");
      expect(typeof address.neighborhood).toBe("string");
      expect(typeof address.city).toBe("string");
      expect(typeof address.state).toBe("string");
      expect(typeof address.zipCode).toBe("string");
      expect(address.street.length).toBeGreaterThan(0);
      expect(address.streetNumber.length).toBeGreaterThan(0);
      expect(address.lineTwo?.length).toBe(0);
      expect(address.neighborhood.length).toBeGreaterThan(0);
      expect(address.city.length).toBeGreaterThan(0);
      expect(address.state.length).toBeGreaterThan(0);
      expect(address.zipCode.length).toBeGreaterThan(0);
      expect(zipCodeRegex.test(address.zipCode)).toBe(true);
    });
  });
});
  
