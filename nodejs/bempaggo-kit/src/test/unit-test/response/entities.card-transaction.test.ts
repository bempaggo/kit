import { BempaggoCreditCardTransactionResponse } from "@/app/modules/entity/BempaggoResponse";
import { CardBrandTypes, PaymentMethodTypes, RefundReasonTypes, TransactionResponseTypes, TransactionStatusTypes } from "@/app/modules/entity/Enum";
import { describe, expect, test } from "vitest";

describe("Credit card transaction", () => {
  describe("Response", () => {
    test("Valid response", async () => {
      const card: BempaggoCreditCardTransactionResponse = {
        refundValue: 1000,
        transactionKey: "12345678901234567890",
        refundRason: RefundReasonTypes.OTHERS,
        card: {
          token:"12345678901234567890",
          holder:{
            name:"Teste", 
            document:"12345678901"
          },
          bin:"123456",
          lastFour:"1234",
          expiration:{
            month:12,
            year:2021
          },
          brand:CardBrandTypes.VISA
        },
        installments: 1, 
        paymentMethod: PaymentMethodTypes.CREDIT_CARD,
        id: 1,
        establishment:{
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

      expect(card).not.toBeNull();
      expect(card).not.toBeUndefined();
      expect(card).not.toBeNaN();

      expect(Object.keys(card).length).toBe(18);
      expect(Object.keys(card.card.holder).length).toBe(2);
      expect(Object.keys(card.card.expiration).length).toBe(2);
      expect(Object.keys(card.establishment).length).toBe(1);
      expect(Object.keys(card.affiliate!).length).toBe(3);

      expect(card).toHaveProperty("refundValue");
      expect(card).toHaveProperty("transactionKey");
      expect(card).toHaveProperty("refundRason");
      expect(card).toHaveProperty("card");
      expect(card).toHaveProperty("installments");
      expect(card).toHaveProperty("paymentMethod");
      expect(card).toHaveProperty("id");
      expect(card).toHaveProperty("establishment");
      expect(card).toHaveProperty("returnCode");
      expect(card).toHaveProperty("returnMessage");
      expect(card).toHaveProperty("status");
      expect(card).toHaveProperty("value");
      expect(card).toHaveProperty("transactionDate");
      expect(card).toHaveProperty("transactionReference");
      expect(card).toHaveProperty("type");
      expect(card).toHaveProperty("affiliate");
      expect(card).toHaveProperty("paidValue");
      expect(card).toHaveProperty("splits");

      expect(card.refundValue).not.toBeNull();
      expect(card.refundValue).not.toBeUndefined();
      expect(card.refundValue).not.toBeNaN();
      expect(card.refundValue).toBe(1000);

      expect(card.transactionKey).not.toBeNull();
      expect(card.transactionKey).not.toBeUndefined();
      expect(card.transactionKey).not.toBeNaN();
      expect(card.transactionKey).toBe("12345678901234567890");

      expect(card.refundRason).not.toBeNull();
      expect(card.refundRason).not.toBeUndefined();
      expect(card.refundRason).not.toBeNaN();
      expect(card.refundRason).toBe(RefundReasonTypes.OTHERS);
      
      expect(card.card).not.toBeNull();
      expect(card.card).not.toBeUndefined();
      expect(card.card).not.toBeNaN();
      expect(card.card).toHaveProperty("token");
      expect(card.card).toHaveProperty("holder");
      expect(card.card).toHaveProperty("bin");
      expect(card.card).toHaveProperty("lastFour");
      expect(card.card).toHaveProperty("expiration");
      expect(card.card).toHaveProperty("brand");

      expect(card.card.token).not.toBeNull();
      expect(card.card.token).not.toBeUndefined();
      expect(card.card.token).not.toBeNaN();
      expect(card.card.token).toBe("12345678901234567890");

      expect(card.card.holder).not.toBeNull();
      expect(card.card.holder).not.toBeUndefined();
      expect(card.card.holder).not.toBeNaN();
      expect(card.card.holder).toHaveProperty("name");

      expect(card.card.holder.name).not.toBeNull();
      expect(card.card.holder.name).not.toBeUndefined();
      expect(card.card.holder.name).not.toBeNaN();
      expect(card.card.holder.name).toBe("Teste");

      expect(card.card.holder).toHaveProperty("document");
      expect(card.card.holder.document).not.toBeNull();
      expect(card.card.holder.document).not.toBeUndefined();
      expect(card.card.holder.document).not.toBeNaN();
      expect(card.card.holder.document).toBe("12345678901");

      expect(card.card.bin).not.toBeNull();
      expect(card.card.bin).not.toBeUndefined();
      expect(card.card.bin).not.toBeNaN();
      expect(card.card.bin).toBe("123456");

      expect(card.card.lastFour).not.toBeNull();
      expect(card.card.lastFour).not.toBeUndefined();
      expect(card.card.lastFour).not.toBeNaN();
      expect(card.card.lastFour).toBe("1234");

      expect(card.card.expiration).not.toBeNull();
      expect(card.card.expiration).not.toBeUndefined();
      expect(card.card.expiration).not.toBeNaN();
      expect(card.card.expiration).toHaveProperty("month");
      expect(card.card.expiration).toHaveProperty("year");

      expect(card.card.expiration.month).not.toBeNull();
      expect(card.card.expiration.month).not.toBeUndefined();
      expect(card.card.expiration.month).not.toBeNaN();
      expect(card.card.expiration.month).toBe(12);
      
      expect(card.card.expiration.year).not.toBeNull();
      expect(card.card.expiration.year).not.toBeUndefined();
      expect(card.card.expiration.year).not.toBeNaN();
      expect(card.card.expiration.year).toBe(2021);
      
      expect(card.card.brand).not.toBeNull();
      expect(card.card.brand).not.toBeUndefined();
      expect(card.card.brand).not.toBeNaN();
      expect(card.card.brand).toBe(CardBrandTypes.VISA);

      expect(card.installments).not.toBeNull();
      expect(card.installments).not.toBeUndefined();
      expect(card.installments).not.toBeNaN();
      expect(card.installments).toBe(1);

      expect(card.paymentMethod).not.toBeNull();
      expect(card.paymentMethod).not.toBeUndefined();
      expect(card.paymentMethod).not.toBeNaN();

      expect(card.paymentMethod).toBe(PaymentMethodTypes.CREDIT_CARD);

      expect(card.id).not.toBeNull();
      expect(card.id).not.toBeUndefined();
      expect(card.id).not.toBeNaN();
      expect(card.id).toBe(1);

      expect(card.transactionReference).not.toBeNull();
      expect(card.transactionReference).not.toBeUndefined();
      expect(card.transactionReference).not.toBeNaN();
      expect(card.transactionReference).toBe("12345678901234567890");

      expect(card.returnCode).not.toBeNull();
      expect(card.returnCode).not.toBeUndefined();
      expect(card.returnCode).not.toBeNaN();
      expect(card.returnCode).toBe("00");

      expect(card.value).not.toBeNull();
      expect(card.value).not.toBeUndefined();
      expect(card.value).not.toBeNaN();
      expect(card.value).toBe(1000);

      expect(card.paidValue).not.toBeNull();
      expect(card.paidValue).not.toBeUndefined();
      expect(card.paidValue).not.toBeNaN();
      expect(card.paidValue).toBe(1000);

      expect(card.returnMessage).not.toBeNull();
      expect(card.returnMessage).not.toBeUndefined();
      expect(card.returnMessage).not.toBeNaN();
      expect(card.returnMessage).toBe("Transação autorizada");

      expect(card.status).not.toBeNull();
      expect(card.status).not.toBeUndefined();
      expect(card.status).not.toBeNaN();
      expect(card.status).toBe(TransactionStatusTypes.AUTHORIZED);

      expect(card.transactionDate).not.toBeNull();
      expect(card.transactionDate).not.toBeUndefined();
      expect(card.transactionDate).not.toBeNaN();
      expect(card.transactionDate).toBe(1620000000000);

      expect(card.type).not.toBeNull();
      expect(card.type).not.toBeUndefined();
      expect(card.type).not.toBeNaN();
      expect(card.type).toBe(TransactionResponseTypes.LOOSE);

      expect(card.affiliate).not.toBeNull();
      expect(card.affiliate).not.toBeUndefined();
      expect(card.affiliate).not.toBeNaN();

      expect(card.affiliate).toHaveProperty("id");
      expect(card.affiliate).toHaveProperty("name");
      expect(card.affiliate).toHaveProperty("businessName");

      expect(card.affiliate?.id).not.toBeNull();
      expect(card.affiliate?.id).not.toBeUndefined();
      expect(card.affiliate?.id).not.toBeNaN();
      expect(card.affiliate?.id).toBe(1);

      expect(card.affiliate?.name).not.toBeNull();
      expect(card.affiliate?.name).not.toBeUndefined();
      expect(card.affiliate?.name).not.toBeNaN();
      expect(card.affiliate?.name).toBe("Bempaggo");

      expect(card.affiliate?.businessName).not.toBeNull();
      expect(card.affiliate?.businessName).not.toBeUndefined();
      expect(card.affiliate?.businessName).not.toBeNaN();
      expect(card.affiliate?.businessName).toBe("Bempaggo");

      expect(card.affiliate).toHaveProperty("id");

      expect(card.affiliate?.id).not.toBeNull();
      expect(card.affiliate?.id).not.toBeUndefined();
      expect(card.affiliate?.id).not.toBeNaN();
      expect(card.affiliate?.id).toBe(1);

      expect(card.establishment).not.toBeNull();
      expect(card.establishment).not.toBeUndefined();
      expect(card.establishment).not.toBeNaN();

      expect(card.establishment).toHaveProperty("id");

      expect(card.establishment?.id).not.toBeNull();
      expect(card.establishment?.id).not.toBeUndefined();
      expect(card.establishment?.id).not.toBeNaN();
      expect(card.establishment?.id).toBe(1);

      expect(card.splits).not.toBeNull();
      expect(card.splits).not.toBeUndefined();
      expect(card.splits).not.toBeNaN();
      expect(card.splits).toHaveLength(0);
    
    });

  });
});
