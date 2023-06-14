import { BempaggoPixTransactionResponse } from "@/app/modules/entity/BempaggoResponse";
import { PaymentMethodTypes, TransactionResponseTypes, TransactionStatusTypes } from "@/app/modules/entity/Enum";
import { describe, expect, test } from "vitest";

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

      expect(Object.keys(pix).length).toBe(16);
      expect(Object.keys(pix.establishment).length).toBe(1);
      expect(Object.keys(pix.affiliate!).length).toBe(3);
      expect("emv mocked").toBe(pix.emv)
      expect(pix).not.toBeNull();
      expect(pix).not.toBeUndefined();
      expect(pix).not.toBeNaN();
      expect(pix).toHaveProperty("quickResponseCode");
      expect(pix).toHaveProperty("expirationDate");
      expect(pix).toHaveProperty("paymentMethod");
      expect(pix).toHaveProperty("id");
      expect(pix).toHaveProperty("establishment");
      expect(pix).toHaveProperty("returnCode");
      expect(pix).toHaveProperty("returnMessage");
      expect(pix).toHaveProperty("status");
      expect(pix).toHaveProperty("value");
      expect(pix).toHaveProperty("transactionDate");
      expect(pix).toHaveProperty("transactionReference");
      expect(pix).toHaveProperty("type");
      expect(pix).toHaveProperty("affiliate");
      expect(pix).toHaveProperty("paidValue");
      expect(pix).toHaveProperty("splits");

      expect(pix.quickResponseCode).not.toBeNull();
      expect(pix.quickResponseCode).not.toBeUndefined();
      expect(pix.quickResponseCode).not.toBeNaN();
      expect(pix.quickResponseCode).toBe("000201265800140136Ltda600962070503***6304E2C3");

      expect(pix.expirationDate).not.toBeNull();
      expect(pix.expirationDate).not.toBeUndefined();
      expect(pix.expirationDate).not.toBeNaN();
      expect(pix.expirationDate).toBe(1620000000000);

      expect(pix.paymentMethod).not.toBeNull();
      expect(pix.paymentMethod).not.toBeUndefined();
      expect(pix.paymentMethod).not.toBeNaN();

      expect(pix.paymentMethod).toBe(PaymentMethodTypes.PIX);

      expect(pix.id).not.toBeNull();
      expect(pix.id).not.toBeUndefined();
      expect(pix.id).not.toBeNaN();
      expect(pix.id).toBe(1);

      expect(pix.transactionReference).not.toBeNull();
      expect(pix.transactionReference).not.toBeUndefined();
      expect(pix.transactionReference).not.toBeNaN();
      expect(pix.transactionReference).toBe("12345678901234567890");

      expect(pix.returnCode).not.toBeNull();
      expect(pix.returnCode).not.toBeUndefined();
      expect(pix.returnCode).not.toBeNaN();
      expect(pix.returnCode).toBe("00");

      expect(pix.value).not.toBeNull();
      expect(pix.value).not.toBeUndefined();
      expect(pix.value).not.toBeNaN();
      expect(pix.value).toBe(1000);

      expect(pix.paidValue).not.toBeNull();
      expect(pix.paidValue).not.toBeUndefined();
      expect(pix.paidValue).not.toBeNaN();
      expect(pix.paidValue).toBe(1000);

      expect(pix.returnMessage).not.toBeNull();
      expect(pix.returnMessage).not.toBeUndefined();
      expect(pix.returnMessage).not.toBeNaN();
      expect(pix.returnMessage).toBe("Transação autorizada");

      expect(pix.status).not.toBeNull();
      expect(pix.status).not.toBeUndefined();
      expect(pix.status).not.toBeNaN();
      expect(pix.status).toBe(TransactionStatusTypes.AUTHORIZED);

      expect(pix.transactionDate).not.toBeNull();
      expect(pix.transactionDate).not.toBeUndefined();
      expect(pix.transactionDate).not.toBeNaN();
      expect(pix.transactionDate).toBe(1620000000000);

      expect(pix.type).not.toBeNull();
      expect(pix.type).not.toBeUndefined();
      expect(pix.type).not.toBeNaN();
      expect(pix.type).toBe(TransactionResponseTypes.LOOSE);

      expect(pix.affiliate).not.toBeNull();
      expect(pix.affiliate).not.toBeUndefined();
      expect(pix.affiliate).not.toBeNaN();

      expect(pix.affiliate).toHaveProperty("id");
      expect(pix.affiliate).toHaveProperty("name");
      expect(pix.affiliate).toHaveProperty("businessName");

      expect(pix.affiliate?.id).not.toBeNull();
      expect(pix.affiliate?.id).not.toBeUndefined();
      expect(pix.affiliate?.id).not.toBeNaN();
      expect(pix.affiliate?.id).toBe(1);

      expect(pix.affiliate?.name).not.toBeNull();
      expect(pix.affiliate?.name).not.toBeUndefined();
      expect(pix.affiliate?.name).not.toBeNaN();
      expect(pix.affiliate?.name).toBe("Bempaggo");

      expect(pix.affiliate?.businessName).not.toBeNull();
      expect(pix.affiliate?.businessName).not.toBeUndefined();
      expect(pix.affiliate?.businessName).not.toBeNaN();
      expect(pix.affiliate?.businessName).toBe("Bempaggo");

      expect(pix.affiliate).toHaveProperty("id");

      expect(pix.affiliate?.id).not.toBeNull();
      expect(pix.affiliate?.id).not.toBeUndefined();
      expect(pix.affiliate?.id).not.toBeNaN();
      expect(pix.affiliate?.id).toBe(1);

      expect(pix.establishment).not.toBeNull();
      expect(pix.establishment).not.toBeUndefined();
      expect(pix.establishment).not.toBeNaN();

      expect(pix.establishment).toHaveProperty("id");

      expect(pix.establishment?.id).not.toBeNull();
      expect(pix.establishment?.id).not.toBeUndefined();
      expect(pix.establishment?.id).not.toBeNaN();
      expect(pix.establishment?.id).toBe(1);

      expect(pix.splits).not.toBeNull();
      expect(pix.splits).not.toBeUndefined();
      expect(pix.splits).not.toBeNaN();
      expect(pix.splits).toHaveLength(0);

    });

  });
});
