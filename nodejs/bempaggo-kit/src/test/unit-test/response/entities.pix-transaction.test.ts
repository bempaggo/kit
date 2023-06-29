import assert from "assert";
import { BempaggoPixTransactionResponse } from "../../../../src/app/modules/entity/BempaggoResponse";
import { PaymentMethodTypes, TransactionResponseTypes, TransactionStatusTypes } from "../../../../src/app/modules/entity/Enum";
describe("Pix transaction", () => {
  describe("Response", () => {
    test("Valid response", async () => {
      const pix: BempaggoPixTransactionResponse = {
        quickResponseCode: "000201265800140136Ltda600962070503***6304E2C3",
        expirationDate: 1620000000000,
        paymentMethod: PaymentMethodTypes.PIX,
        id: 1,
        establishment: {
          id: 1,
        },
        paymentDate:undefined,
        returnCode: "00",
        returnMessage: "Transação autorizada",
        status: TransactionStatusTypes.AUTHORIZED,
        value: 1000,
        transactionDate: 1620000000000,
        transactionReference: "12345678901234567890",
        type: TransactionResponseTypes.LOOSE,
        affiliate: {
          id: 1,
          name: "Bempaggo",
          businessName: "Bempaggo",
        },
        paidValue: 1000,
        splits: [],
        emv: "emv mocked"
      };

      assert.equal(17, Object.keys(pix).length);
      assert.equal(1, Object.keys(pix.establishment).length);
      assert.equal(3, Object.keys(pix.affiliate!).length);

      assert.equal("000201265800140136Ltda600962070503***6304E2C3", pix.quickResponseCode);
      assert.equal(1620000000000, pix.expirationDate);
      assert.equal("PIX", pix.paymentMethod);
      assert.equal(1, pix.id);
      assert.equal(1, pix.establishment!.id);
      assert.equal("00", pix.returnCode);
      assert.equal("Transação autorizada", pix.returnMessage);
      assert.equal("AUTHORIZED", pix.status);
      assert.equal(1000, pix.value);
      assert.equal(1620000000000, pix.transactionDate);
      assert.equal("12345678901234567890", pix.transactionReference);
      assert.equal("LOOSE", pix.type);
      assert.equal(1, pix.affiliate!.id);
      assert.equal("Bempaggo", pix.affiliate!.name);
      assert.equal("Bempaggo", pix.affiliate!.businessName);
      assert.equal(1000, pix.paidValue);
      assert.deepEqual([], pix.splits);
      assert.equal("emv mocked", pix.emv);
    });

  });
});
