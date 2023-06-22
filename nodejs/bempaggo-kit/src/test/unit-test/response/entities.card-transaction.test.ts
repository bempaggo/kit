import { CardBrandTypes, PaymentMethodTypes, RefundReasonTypes, TransactionResponseTypes, TransactionStatusTypes } from "@/app/modules/entity/Enum";
import assert from "assert";
import { BempaggoCreditCardTransactionResponse } from "../../../../src/app/modules/entity/BempaggoResponse";
describe("Credit card transaction", () => {
  describe("Response", () => {
    test("Valid response", async () => {
      const card: BempaggoCreditCardTransactionResponse = {
        refundValue: 1000,
        transactionKey: "12345678901234567890",
        refundReason: RefundReasonTypes.OTHERS,
        card: {
          token: "12345678901234567890",
          holder: {
            name: "Teste",
            document: "12345678901"
          },
          bin: "123456",
          lastFour: "1234",
          expiration: {
            month: 12,
            year: 2021
          },
          brand: CardBrandTypes.VISA
        },
        installments: 1,
        paymentMethod: PaymentMethodTypes.CREDIT_CARD,
        id: 1,
        establishment: {
          id: 1,
        },
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
        splits: []
      };


      assert.equal(18, Object.keys(card).length);
      assert.equal(6, Object.keys(card.card).length);
      assert.equal(2, Object.keys(card.card.holder).length);
      assert.equal(1, Object.keys(card.establishment).length);
      assert.equal(3, Object.keys(card.affiliate!).length);

      assert.equal(1000, card.refundValue);
      assert.equal("12345678901234567890", card.transactionKey);
      assert.equal("OTHERS", card.refundReason);
      assert.equal("12345678901234567890", card.card.token);
      assert.equal("Teste", card.card.holder.name);
      assert.equal("12345678901", card.card.holder.document);
      assert.equal("123456", card.card.bin);
      assert.equal("1234", card.card.lastFour);
      assert.equal(12, card.card.expiration.month);
      assert.equal(2021, card.card.expiration.year);
      assert.equal("VISA", card.card.brand);
      assert.equal(1, card.installments);
      assert.equal("CREDIT_CARD", card.paymentMethod);
      assert.equal(1, card.id);
      assert.equal(1, card.establishment!.id);
      assert.equal("00", card.returnCode);
      assert.equal("Transação autorizada", card.returnMessage);
      assert.equal("AUTHORIZED", card.status);
      assert.equal(1000, card.value);
      assert.equal(1620000000000, card.transactionDate);
      assert.equal("12345678901234567890", card.transactionReference);
      assert.equal("LOOSE", card.type);
      assert.equal(1, card.affiliate!.id);
      assert.equal("Bempaggo", card.affiliate!.name);
      assert.equal("Bempaggo", card.affiliate!.businessName);
      assert.deepEqual([], card.splits);
    });
  });
});

