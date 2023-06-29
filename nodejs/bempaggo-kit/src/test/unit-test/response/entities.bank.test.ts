import assert from "assert";
import { BempaggoBankResponse } from "../../../../src/app/modules/entity/BempaggoResponse";
describe("Bank entity", () => {
  describe("Response", () => {
    test("BempaggoBank", async () => {
      const bank: BempaggoBankResponse = {
        code: "001",
        agency: "1234",
        account: "123456"
      };

      assert.equal(3, Object.keys(bank).length);
      assert.equal("001", bank.code);
      assert.equal("1234", bank.agency);
      assert.equal("123456", bank.account);
    });
  });
});

