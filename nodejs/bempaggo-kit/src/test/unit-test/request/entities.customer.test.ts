import { BempaggoAddressRequest, BempaggoCustomerRequest, BempaggoPhoneRequest } from "@/app/modules/entity/BempaggoRequest";
import { BempaggoCustomerResponse, BempaggoPhoneResponse } from "@/app/modules/entity/BempaggoResponse";
import { assertType, describe, expect, test } from "vitest";

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
      expect(customer).not.toBeNull();
      assertType<BempaggoCustomerRequest>(customer);
      expect(Object.keys(customer).length).toBe(6);
      expect(customer.name).toBe("Tony Stark");
      expect(customer.document).toBe("51190844001");
      expect(customer.birthdate).toBe("2000-01-01");
      expect(customer.email).toBe("tony.stark@bempaggo.com");
      assertType<BempaggoAddressRequest | undefined>(customer.address);
      expect(Object.keys(customer?.address ?? {}).length).toBe(7);
      expect(customer.address?.street).toBe("Rua Jair Hamms");
      expect(customer.address?.streetNumber).toBe("38");
      expect(customer.address?.lineTwo).toBe("Sala 101");
      expect(customer.address?.neighborhood).toBe("Pedra Branca");
      expect(customer.address?.city).toBe("Palhoça");
      expect(customer.address?.state).toBe("SC");
      expect(customer.address?.zipCode).toBe("88137084");
      assertType<BempaggoPhoneRequest | undefined>(customer.phone);
      expect(Object.keys(customer?.phone ?? {}).length).toBe(3);
      expect(customer.phone?.countryCode).toBe(55);
      expect(customer.phone?.areaCode).toBe(48);
      expect(customer.phone?.number).toBe(999999999);
    });
  });

});
