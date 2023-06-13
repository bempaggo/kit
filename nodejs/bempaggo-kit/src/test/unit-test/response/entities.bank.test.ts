import { BempaggoBankResponse } from "@/app/modules/entity/BempaggoResponse";
import { assert, assertType, describe, test } from "vitest";

describe("Bank entity", () => {
  describe("Response", () => {
    test("BempaggoBank", async () => {
      const bank: BempaggoBankResponse = {
        code: "001",
        agency: "1234",
        account: "123456"
      };

      assertType<BempaggoBankResponse>(bank);
      assert.equal(bank.code, "001");
      assert.equal(bank.agency, "1234");
      assert.equal(bank.account, "123456");

    });
  });
});

