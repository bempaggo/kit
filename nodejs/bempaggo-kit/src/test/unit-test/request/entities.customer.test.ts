import { BempaggoAddressRequest, BempaggoCustomerRequest, BempaggoPhoneRequest } from "@/app/modules/entity/BempaggoRequest";
import { assert, assertType, describe, test } from "vitest";

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

      assertType<BempaggoAddressRequest | undefined>(customer.address);
      assertType<BempaggoPhoneRequest | undefined>(customer.phone);
      assertType<BempaggoCustomerRequest>(customer);
      assert.equal(Object.keys(customer).length, 6);
      assert.equal(customer.name, "Tony Stark");
      assert.equal(customer.document, "51190844001");
      assert.equal(customer.birthdate, "2000-01-01");
      assert.equal(customer.email, "tony.stark@bempaggo.com");
      assert.equal(Object.keys(customer?.address ?? {}).length, 7);
      assert.equal(customer.address?.street, "Rua Jair Hamms");
      assert.equal(customer.address?.streetNumber, "38");
      assert.equal(customer.address?.lineTwo, "Sala 101");
      assert.equal(customer.address?.neighborhood, "Pedra Branca");
      assert.equal(customer.address?.city, "Palhoça");
      assert.equal(customer.address?.state, "SC");
      assert.equal(customer.address?.zipCode, "88137084");
      assert.equal(Object.keys(customer?.phone ?? {}).length, 3);
      assert.equal(customer.phone?.countryCode, 55);
      assert.equal(customer.phone?.areaCode, 48);
      assert.equal(customer.phone?.number, 999999999);
    });
  });
});

