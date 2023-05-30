

import { BempaggoAddressRequest, BempaggoCardExpirationRequest, BempaggoCardHolderRequest, BempaggoCardRequest, BempaggoChargeRequest, BempaggoCustomerRequest, BempaggoPhoneRequest } from "@/app/modules/entity/BempaggoRequest";
import { assertType, describe, expect, test } from "vitest";

describe("Charge Entity", () => {
  describe("Request", () => {

    test("charge", async () => {
      const charge: BempaggoChargeRequest = {
        customer: {
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
        },
        card: {
          holder: {
            name: "Tony Stark",
            document: "51190844001",
          },
          expiration: {
            year: 2035,
            month: 1,
          },
          cardNumber: "5448280000000007",
          cvv: "123",
        },
        value: 1000,
        installments: 1,
        yourReferenceId: 123456,
        notificationUrl: "https://meusite.com.br/events",
        affiliateId: 1
      };

      expect(charge.customer).not.toBeNull();
      assertType<BempaggoCustomerRequest>(charge.customer);
      assertType<BempaggoChargeRequest>(charge);
      assertType<BempaggoAddressRequest | undefined>(charge.customer.address);
      assertType<BempaggoPhoneRequest | undefined>(charge.customer.phone);
      assertType<BempaggoCardRequest>(charge.card!);
      assertType<BempaggoCardHolderRequest>(charge.card!.holder);
      assertType<BempaggoCardExpirationRequest>(charge.card!.expiration);

      expect(Object.keys(charge).length).toBe(7);
      expect(charge.value).toBe(1000);
      expect(charge.installments).toBe(1);
      expect(charge.yourReferenceId).toBe(123456);
      expect(charge.notificationUrl).toBe("https://meusite.com.br/events");

      expect(Object.keys(charge.customer).length).toBe(6);
      expect(charge.customer.name).toBe("Tony Stark");
      expect(charge.customer.document).toBe("51190844001");
      expect(charge.customer.birthdate).toBe("2000-01-01");
      expect(charge.customer.email).toBe("tony.stark@bempaggo.com");
      expect(Object.keys(charge.customer?.address ?? {}).length).toBe(7);
      expect(charge.customer.address?.street).toBe("Rua Jair Hamms");
      expect(charge.customer.address?.streetNumber).toBe("38");
      expect(charge.customer.address?.lineTwo).toBe("Sala 101");
      expect(charge.customer.address?.neighborhood).toBe("Pedra Branca");
      expect(charge.customer.address?.city).toBe("Palhoça");
      expect(charge.customer.address?.state).toBe("SC");
      expect(charge.customer.address?.zipCode).toBe("88137084");
      expect(Object.keys(charge.customer?.phone ?? {}).length).toBe(3);
      expect(charge.customer.phone?.countryCode).toBe(55);
      expect(charge.customer.phone?.areaCode).toBe(48);
      expect(charge.customer.phone?.number).toBe(999999999);
      expect(Object.keys(charge.card!).length).toBe(4);
      expect(charge.card!.cardNumber).toBe("5448280000000007");
      expect(charge.card!.cvv).toBe("123");
      expect(Object.keys(charge.card!.holder).length).toBe(2);
      expect(charge.card!.holder.name).toBe("Tony Stark");
      expect(charge.card!.holder.document).toBe("51190844001");
      expect(Object.keys(charge.card!.expiration).length).toBe(2);
      expect(charge.card!.expiration.year).toBe(2035);
      expect(charge.card!.expiration.month).toBe(1);
      
    });


  });

});
