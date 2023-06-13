import { BempaggoCreditCardTransactionResponse } from "@/app/modules/entity/BempaggoResponse";
import { CardBrandTypes, PaymentMethodTypes, RefundReasonTypes, TransactionResponseTypes, TransactionStatusTypes } from "@/app/modules/entity/Enum";
import { assert, describe, expect, test } from "vitest";

describe("Credit card transaction", () => {
  describe("Response", () => {
    test("Valid response", async () => {
      const card: BempaggoCreditCardTransactionResponse = {
        refundValue: 1000,
        transactionKey: "12345678901234567890",
        refundRason: RefundReasonTypes.OTHERS,
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

      assert.equal(card.refundValue, 1000);
      assert.equal(card.transactionKey, "12345678901234567890");
      assert.equal(card.refundRason, RefundReasonTypes.OTHERS);

      assert.equal(card.card.token, "12345678901234567890");
      assert.equal(card.card.holder.name, "Teste");
      assert.equal(card.card.holder.document, "12345678901");
      assert.equal(card.card.bin, "123456");
      assert.equal(card.card.lastFour, "1234");
      assert.equal(card.card.expiration.month, 12);
      assert.equal(card.card.expiration.year, 2021);
      assert.equal(card.card.brand, CardBrandTypes.VISA);

      assert.equal(card.installments, 1);
      assert.equal(card.paymentMethod, PaymentMethodTypes.CREDIT_CARD);
      assert.equal(card.id, 1);
      assert.equal(card.transactionReference, "12345678901234567890");
      assert.equal(card.returnCode, "00");
      assert.equal(card.returnMessage, "Transação autorizada");
      assert.equal(card.status, TransactionStatusTypes.AUTHORIZED);
      assert.equal(card.value, 1000);
      assert.equal(card.transactionDate, 1620000000000);
      assert.equal(card.type, TransactionResponseTypes.LOOSE);
      assert.equal(card.affiliate?.id, 1);
      assert.equal(card.affiliate?.name, "Bempaggo");
      assert.equal(card.affiliate?.businessName, "Bempaggo");
      assert.equal(card.establishment?.id, 1);
      assert.lengthOf(card.splits, 0);
    });
  });
});

