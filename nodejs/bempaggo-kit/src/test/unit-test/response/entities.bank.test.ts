import { BempaggoBankResponse } from "@/app/modules/entity/BempaggoResponse";
import { assertType, describe, expect, test } from "vitest";

describe("Bank entity", () => {

  describe("Response", () => {
    test("BempaggoBank", async () => {
      const bank: BempaggoBankResponse = {
        code: "001",
        agency: "1234",
        account: "123456"
      };

      expect(bank).not.toBeNull();
      expect(bank).not.toBeUndefined();
      expect(bank).not.toBeNaN();

      assertType<BempaggoBankResponse>(bank);

      expect(bank.code).not.toBeNull();
      expect(bank.code).not.toBeUndefined();
      expect(bank.code).not.toBeNaN();
      expect(bank.code).toBe("001");

      expect(bank.agency).not.toBeNull();
      expect(bank.agency).not.toBeUndefined();
      expect(bank.agency).not.toBeNaN();
      expect(bank.agency).toBe("1234");
      
      expect(bank.account).not.toBeNull();
      expect(bank.account).not.toBeUndefined();
      expect(bank.account).not.toBeNaN();
      expect(bank.account).toBe("123456");

    });
  });
});
