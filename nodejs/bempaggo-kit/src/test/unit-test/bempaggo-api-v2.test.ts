import { Bempaggo, BempaggoFactory } from "@/app/modules/Bempaggo";
import { BempaggoApiV2 } from "@/app/modules/BempaggoApiV2";
import { BempaggoTransactionServiceable, CreditCardOperable } from "@/app/modules/Transaction";
import { Environments } from "@/app/modules/entity/Enum";
import { describe, expect, test } from "vitest";

describe("BempaggoApiV2", () => {
  describe("create", () => {

    test("Bempaggo Factory Development", () => {
      const bempaggo:  Bempaggo = new  BempaggoFactory().create( Environments.DEVELOPMENT, "aaaa");
      expect(bempaggo).not.toBeNull();
      expect(bempaggo.getUrl()).equals("http://localhost:5000/api");
    });

    test("Bempaggo Factory sandbox", () => {
      const bempaggo:  Bempaggo = new  BempaggoFactory().create( Environments.SANDBOX, "aaab");
      expect(bempaggo.getUrl()).equals("https://api-sandbox.bempaggo.io/api");
    });
    test("Bempaggo Factory url", () => {
      const bempaggo:  Bempaggo = new  BempaggoFactory().createByUrl("tcp://127.0.0.1:5000", "aaab");
      expect(bempaggo.getUrl()).equals("tcp://127.0.0.1:5000");
    });

    test("Bempaggo Factory sandbox auto build", () => {
      const bempaggo:  Bempaggo = new  BempaggoFactory().createAsBuild("aaab");
      expect(bempaggo.getUrl()).equals("https://api-sandbox.bempaggo.io/api");
    });

    test("Bempaggo Factory production", () => {
      const bempaggo:  Bempaggo = new  BempaggoFactory().create( Environments.PRODUCTION, "aaap");
      expect(bempaggo.getUrl()).equals("https://api.bempaggo.io/api");
    });
    test("create bempaggo object", () => {
      const bempaggo:  BempaggoApiV2 = new  BempaggoApiV2("", "");
      expect(bempaggo).not.toBeNull();
    });
    test("create bempaggo services", () => {
      const bempaggo:  BempaggoApiV2 = new  BempaggoApiV2("", "");
      const chargeService:  BempaggoTransactionServiceable =
        bempaggo.getChargeService();
      expect(chargeService).not.toBeNull();
    });
    test("create bempaggo credit card services", () => {
      const bempaggo:  BempaggoApiV2 = new  BempaggoApiV2("", "");
      const chargeService:  BempaggoTransactionServiceable =
        bempaggo.getChargeService();
      const cardService: CreditCardOperable =
        chargeService.getCreditCardServiceable();
      expect(cardService).not.toBeNull();
    });
  });
});