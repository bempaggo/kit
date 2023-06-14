import { BempaggoCustomerResponse, BempaggoMinimalCustomerResponse, BempaggoPhoneResponse } from "@/app/modules/entity/BempaggoResponse";
import { assert, assertType, describe, expect, test } from "vitest";

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

      assertType< BempaggoPhoneResponse>(customer.phone!);
      assertType<BempaggoCustomerResponse>(customer);

      assert.equal(6, Object.keys(customer).length);
      assert.equal(3, Object.keys(customer.phone!).length);

      assert.equal(1, customer.id);
      assert.equal("55", customer.phone!.countryCode);
      assert.equal("11", customer.phone!.areaCode);
      assert.equal("999999999", customer.phone!.number);
      assert.equal("2023-01-03", customer.birthdate);
      assert.equal("tony.stark@ligadajustica.com", customer.email);
      assert.equal("51190844001", customer.document);
      assert.equal("Tony Stark", customer.name);
    });

    test("customerResponse with only required fields", async () => {
      const customer:  BempaggoCustomerResponse = {
        id: 1,
        name: "Tony Stark"
      };

      assertType<BempaggoCustomerResponse>(customer);
      assert.equal(2, Object.keys(customer).length);
      assert.equal(1, customer.id);
      assert.equal("Tony Stark", customer.name);
    });

    test("customerResponse with minimal response", async () => {
      const customerMinimal:  BempaggoMinimalCustomerResponse = {
        id: 1,
        document: "51190844001",
      };

      assertType<BempaggoMinimalCustomerResponse>(customerMinimal);
      expect(Object.keys(customerMinimal).length).toBe(2);
      assert.equal(1, customerMinimal.id);
      assert.equal("51190844001", customerMinimal.document);
    });
  });
});
