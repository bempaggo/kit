import assert from "assert";
import { Bempaggo, BempaggoFactory } from "../../../src/app/modules/Bempaggo";
import { BempaggoApiV2 } from "../../../src/app/modules/BempaggoApiV2";
import { BempaggoTransactionServiceable, CreditCardOperable } from "../../../src/app/modules/Transaction";
import { Environments } from "../../../src/app/modules/entity/Enum";

describe("BempaggoApiV2", () => {
  describe("create", () => {

    test("Bempaggo Factory Development", () => {
      const bempaggo: Bempaggo = new BempaggoFactory().create(Environments.DEVELOPMENT, "aaaa");
      assert.equal("http://localhost:5000/api", bempaggo.getUrl());
    });

    test("Bempaggo Factory sandbox", () => {
      const bempaggo: Bempaggo = new BempaggoFactory().create(Environments.SANDBOX, "aaab");
      assert.equal("https://api-sandbox.bempaggo.io/api", bempaggo.getUrl());
    });
    test("Bempaggo Factory url", () => {
      const bempaggo: Bempaggo = new BempaggoFactory().createByUrl("tcp://127.0.0.1:5000", "aaab");
      assert.equal("tcp://127.0.0.1:5000", bempaggo.getUrl());
    });

    test("Bempaggo Factory sandbox auto build", () => {
      const bempaggo: Bempaggo = new BempaggoFactory().createAsBuild("aaab");
      assert.equal("https://api-sandbox.bempaggo.io/api", bempaggo.getUrl());
    });

    test("Bempaggo Factory production", () => {
      const bempaggo: Bempaggo = new BempaggoFactory().create(Environments.PRODUCTION, "aaap");
      assert.equal("https://api.bempaggo.io/api", bempaggo.getUrl());
    });
    test("create bempaggo object", () => {
      const bempaggo: BempaggoApiV2 = new BempaggoApiV2("", "");
      assert.notEqual(null, bempaggo.getUrl());
      assert.notEqual(null, bempaggo);
    });
    test("create bempaggo services", () => {
      const bempaggo: BempaggoApiV2 = new BempaggoApiV2("", "");
      const chargeService: BempaggoTransactionServiceable =
        bempaggo.getChargeService();
      assert.notEqual(null, chargeService);
    });
    test("create bempaggo credit card services", () => {
      const bempaggo: BempaggoApiV2 = new BempaggoApiV2("", "");
      const chargeService: BempaggoTransactionServiceable =
        bempaggo.getChargeService();
      const cardService: CreditCardOperable =
        chargeService.getCreditCardServiceable();
      assert.notEqual(null, cardService);
    });
  });
});