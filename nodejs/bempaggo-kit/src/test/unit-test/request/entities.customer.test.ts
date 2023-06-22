import { BempaggoCustomerRequest } from "@/app/modules/entity/BempaggoRequest";
import assert from "assert";

describe("Customer", () => {
  describe("Request", () => {
    test("customer", async () => {
      const customer: BempaggoCustomerRequest = {
        phone: {
          countryCode: 55,
          areaCode: 48,
          number: 999999999,
        },
        address: {
          street: "Rua Jair Hamms",
          streetNumber: "38",
          lineTwo: "Sala 101",
          neighborhood: "Pedra Branca",
          city: "Palhoça",
          state: "SC",
          zipCode: "88137084",
        },
        name: "Tony Stark",
        document: "51190844001",
        birthdate: "2000-01-01",
        email: "tony.stark@bempaggo.com",
      };


      assert.equal(6, Object.keys(customer).length);
      assert.equal(7, Object.keys(customer!.address as {}).length);
      assert.equal(3, Object.keys(customer!.phone as {}).length);

      assert.equal(55, customer.phone!.countryCode);
      assert.equal(48, customer.phone!.areaCode);
      assert.equal(999999999, customer.phone!.number);

      assert.equal("Rua Jair Hamms", customer.address!.street);
      assert.equal("38", customer.address!.streetNumber);
      assert.equal("Sala 101", customer.address!.lineTwo);
      assert.equal("Pedra Branca", customer.address!.neighborhood);
      assert.equal("Palhoça", customer.address!.city);
      assert.equal("SC", customer.address!.state);
      assert.equal("88137084", customer.address!.zipCode);
      assert.equal("Tony Stark", customer.name);
      assert.equal("51190844001", customer.document);
      assert.equal("2000-01-01", customer.birthdate);
      assert.equal("tony.stark@bempaggo.com", customer.email);
    });
  });
});

