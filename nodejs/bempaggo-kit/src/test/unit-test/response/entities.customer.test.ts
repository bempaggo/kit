import { BempaggoCustomerResponse, BempaggoMinimalCustomerResponse, BempaggoPhoneResponse } from "@/app/modules/entity/BempaggoResponse";
import { assertType, describe, expect, test } from "vitest";

describe("Customer", () => {
  describe("Response", () => {
    test("customerResponse", async () => {
      const customer:  BempaggoCustomerResponse = {
        id: 1,
        phone: {
          countryCode: "55",
          areaCode: "11",
          number: "999999999"
        },
        birthdate: "2023-01-03",
        email: "tony.stark@ligadajustica.com",
        document: "51190844001",
        name: "Tony Stark"
      };

      expect(customer).not.toBeNull();
      assertType< BempaggoCustomerResponse>(customer);
      expect(Object.keys(customer).length).toBe(6);
      expect(customer.id).toBe(1);
      assertType< BempaggoPhoneResponse>(customer.phone!);
      expect(Object.keys(customer.phone!).length).toBe(3);
      expect(customer.phone!.countryCode).toBe("55");
      expect(customer.phone!.areaCode).toBe("11");
      expect(customer.phone!.number).toBe("999999999");
      expect(customer.birthdate).toBe("2023-01-03");
      expect(customer.email).toBe("tony.stark@ligadajustica.com");
      expect(customer.document).toBe("51190844001");
      expect(customer.name).toBe("Tony Stark");
    });
    test("customerResponse with only required fields", async () => {
      const customer:  BempaggoCustomerResponse = {
        id: 1,
        name: "Tony Stark"
      };

      expect(customer).not.toBeNull();
      assertType< BempaggoCustomerResponse>(customer);
      expect(Object.keys(customer).length).toBe(2);
      expect(customer.id).toBe(1);
      expect(customer.name).toBe("Tony Stark");
    });
    test("customerResponse with minimal response", async () => {
      const customerMinimal:  BempaggoMinimalCustomerResponse = {
        id: 1,
        document: "51190844001",
      };

      expect(customerMinimal).not.toBeNull();
      assertType<BempaggoMinimalCustomerResponse>(customerMinimal);
      expect(Object.keys(customerMinimal).length).toBe(2);
      expect(customerMinimal.id).toBe(1);
      expect(customerMinimal.document).toBe("51190844001");
    });
  });
});
