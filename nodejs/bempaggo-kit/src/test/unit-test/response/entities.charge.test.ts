

import { BempaggoAffiliateMinimalResponse, BempaggoCardExpirationResponse, BempaggoCardHolderResponse, BempaggoCardResponse, BempaggoChargeResponse, BempaggoEstablishmentMinimalResponse, BempaggoTransactionResponse } from "@/app/modules/entity/BempaggoResponse";
import { CardBrandTypes, ChargeStatusTypes, PaymentMethodTypes, RefundReasonTypes, TransactionResponseTypes, TransactionStatusTypes } from "@/app/modules/entity/Enum";
import { assertType, describe, expect, test } from "vitest";

describe("Charge Entity", () => {
  describe("Response", () => {
    test("chargeResponse", async () => {

      const transaction: BempaggoTransactionResponse[] = [{
        id: 1,
        returnCode: "00",
        returnMessage: "Transação autorizada",
        nsuCapture: "123456",
        nsuNumber: "123456",
        authorizationNumber: "123456",
        tid: "123456",
        uniqueSequenceNumber: "123456",
        authenticationNumber: "123456",
        pan: "5448280000000007",
        returnAutCode: "123456",
        value: 1000,
        paidValue: 1000,
        refundValue: 0,
        transactionKey: "123456",
        refundRason: RefundReasonTypes.DUPLICATE_CHARGE,
        type: TransactionResponseTypes.LOOSE,
        status: TransactionStatusTypes.APPROVED,
        transactionReference: String(123456),
        yourReferenceId: "123456",
        transactionDate: new Date().getTime(),
        affiliate: {
          id: 1,
          name: "Tony Stark",
          businessName: "Stark Industries"
        },
        paymentMethod: PaymentMethodTypes.CREDIT_CARD,
        establishment: {
          id: 1
        },
        card: {
          id: 1,
          holder: {
            name: "Tony Stark",
            document: "51190844001"
          },
          bin: "544828",
          lastFour: "0007",
          expiration: {
            year: 2035,
            month: 1
          },
          brand: CardBrandTypes.MASTERCARD,
        }
      }];

      const chargeResponse: BempaggoChargeResponse = {
        id: 1,
        referenceId: "123456",
        customer: {
          id: 1,
          document: "51190844001",
        },
        status: ChargeStatusTypes.AUTHORIZED,
        value: 1000,
        refundedAmount: 0,
        transactions: transaction,
        installments: 1,
      };

      expect(chargeResponse).not.toBeNull();
      assertType<BempaggoChargeResponse>(chargeResponse);
      expect(Object.keys(chargeResponse.transactions[0]).length).toBe(25);
      expect(chargeResponse.id).toBe(1);
      expect(chargeResponse.transactions[0].id).toBe(1);
      expect(chargeResponse.transactions[0].returnCode).toBe("00");
      expect(chargeResponse.transactions[0].returnMessage).toBe("Transação autorizada");
      expect(chargeResponse.transactions[0].nsuCapture).toBe("123456");
      expect(chargeResponse.transactions[0].nsuNumber).toBe("123456");
      expect(chargeResponse.transactions[0].authorizationNumber).toBe("123456");
      expect(chargeResponse.transactions[0].tid).toBe("123456");
      expect(chargeResponse.transactions[0].uniqueSequenceNumber).toBe("123456");
      expect(chargeResponse.transactions[0].authenticationNumber).toBe("123456");
      expect(chargeResponse.transactions[0].pan).toBe("5448280000000007");
      expect(chargeResponse.transactions[0].returnAutCode).toBe("123456");
      expect(chargeResponse.transactions[0].value).toBe(1000);
      expect(chargeResponse.transactions[0].paidValue).toBe(1000);
      expect(chargeResponse.transactions[0].refundValue).toBe(0);
      expect(chargeResponse.transactions[0].transactionKey).toBe("123456");
      assertType<RefundReasonTypes>(chargeResponse.transactions[0].refundRason!);
      expect(chargeResponse.transactions[0].refundRason).toBe("DUPLICATE_CHARGE");
      assertType<TransactionResponseTypes>(chargeResponse.transactions[0].type);
      expect(chargeResponse.transactions[0].type).toBe("LOOSE");
      assertType<TransactionStatusTypes>(chargeResponse.transactions[0].status);
      expect(chargeResponse.transactions[0].status).toBe("APPROVED");
      expect(chargeResponse.transactions[0].transactionReference).toBe("123456");
      expect(chargeResponse.transactions[0].yourReferenceId).toBe("123456");
      expect(chargeResponse.transactions[0].transactionDate).toBeGreaterThan(0);
      assertType<BempaggoAffiliateMinimalResponse>(chargeResponse.transactions[0].affiliate!);
      expect(Object.keys(chargeResponse.transactions[0].affiliate!).length).toBe(3);
      expect(chargeResponse.transactions[0].affiliate!.id).toBe(1);
      expect(chargeResponse.transactions[0].affiliate!.name).toBe("Tony Stark");
      expect(chargeResponse.transactions[0].affiliate!.businessName).toBe("Stark Industries");
      assertType<PaymentMethodTypes>(chargeResponse.transactions[0].paymentMethod);
      expect(chargeResponse.transactions[0].paymentMethod).toBe("CREDIT_CARD");
      assertType<BempaggoEstablishmentMinimalResponse>(chargeResponse.transactions[0].establishment);
      expect(Object.keys(chargeResponse.transactions[0].establishment).length).toBe(1);
      expect(chargeResponse.transactions[0].establishment.id).toBe(1);
      assertType<BempaggoCardResponse>(chargeResponse.transactions[0].card!);
      expect(Object.keys(chargeResponse.transactions[0].card!).length).toBe(6);
      assertType<BempaggoCardHolderResponse>(chargeResponse.transactions[0].card!.holder);
      expect(Object.keys(chargeResponse.transactions[0].card!.holder).length).toBe(2);
      expect(chargeResponse.transactions[0].card!.holder.name).toBe("Tony Stark");
      expect(chargeResponse.transactions[0].card!.holder.document).toBe("51190844001");
      assertType<BempaggoCardExpirationResponse>(chargeResponse.transactions[0].card!.expiration);
      expect(Object.keys(chargeResponse.transactions[0].card!.expiration).length).toBe(2);
      expect(chargeResponse.transactions[0].card!.expiration.year).toBe(2035);
      expect(chargeResponse.transactions[0].card!.expiration.month).toBe(1);
      expect(chargeResponse.transactions[0].card!.brand).toBe("MASTERCARD");

    });
    test("charge response with only required fields", async () => {

      const transaction: BempaggoTransactionResponse[] = [{
        id: 1,
        returnCode: "00",
        returnMessage: "Transação autorizada",
        nsuCapture: "123456",
        nsuNumber: "123456",
        authorizationNumber: "123456",
        tid: "123456",
        uniqueSequenceNumber: "123456",
        authenticationNumber: "123456",
        pan: "5448280000000007",
        returnAutCode: "123456",
        value: 1000,
        transactionKey: "123456",
        type: TransactionResponseTypes.LOOSE,
        status: TransactionStatusTypes.APPROVED,
        transactionReference: String(123456),
        transactionDate: new Date().getTime(),
        paymentMethod: PaymentMethodTypes.CREDIT_CARD,
        establishment: {
          id: 1
        }
        }];

      const chargeResponse: BempaggoChargeResponse = {
        id: 1,
        referenceId: "123456",
        customer: {
          id: 1,
          document: "51190844001",
        },
        status: ChargeStatusTypes.AUTHORIZED,
        value: 1000,
        transactions: transaction,
        installments: 1,
      };

      expect(chargeResponse).not.toBeNull();
      assertType<BempaggoChargeResponse>(chargeResponse);
      expect(Object.keys(chargeResponse.transactions[0]).length).toBe(19);
      expect(chargeResponse.id).toBe(1);
      expect(chargeResponse.transactions[0].id).toBe(1);
      expect(chargeResponse.transactions[0].returnCode).toBe("00");
      expect(chargeResponse.transactions[0].returnMessage).toBe("Transação autorizada");
      expect(chargeResponse.transactions[0].nsuCapture).toBe("123456");
      expect(chargeResponse.transactions[0].nsuNumber).toBe("123456");
      expect(chargeResponse.transactions[0].authorizationNumber).toBe("123456");
      expect(chargeResponse.transactions[0].tid).toBe("123456");
      expect(chargeResponse.transactions[0].uniqueSequenceNumber).toBe("123456");
      expect(chargeResponse.transactions[0].authenticationNumber).toBe("123456");
      expect(chargeResponse.transactions[0].pan).toBe("5448280000000007");
      expect(chargeResponse.transactions[0].returnAutCode).toBe("123456");
      expect(chargeResponse.transactions[0].value).toBe(1000);
      expect(chargeResponse.transactions[0].paidValue).toBeUndefined();
      expect(chargeResponse.transactions[0].refundValue).toBeUndefined();
      expect(chargeResponse.transactions[0].transactionKey).toBe("123456");
      assertType<RefundReasonTypes>(chargeResponse.transactions[0].refundRason!);
      expect(chargeResponse.transactions[0].refundRason).toBeUndefined();
      assertType<TransactionResponseTypes>(chargeResponse.transactions[0].type);
      expect(chargeResponse.transactions[0].type).toBe("LOOSE");
      assertType<TransactionStatusTypes>(chargeResponse.transactions[0].status);
      expect(chargeResponse.transactions[0].status).toBe("APPROVED");
      expect(chargeResponse.transactions[0].transactionReference).toBe("123456");
      expect(chargeResponse.transactions[0].yourReferenceId).toBeUndefined();
      expect(chargeResponse.transactions[0].transactionDate).toBeGreaterThan(0);
      assertType<BempaggoAffiliateMinimalResponse>(chargeResponse.transactions[0].affiliate!);
      assertType<PaymentMethodTypes>(chargeResponse.transactions[0].paymentMethod);
      expect(chargeResponse.transactions[0].paymentMethod).toBe("CREDIT_CARD");
      assertType<BempaggoEstablishmentMinimalResponse>(chargeResponse.transactions[0].establishment);
      expect(Object.keys(chargeResponse.transactions[0].establishment).length).toBe(1);
      expect(chargeResponse.transactions[0].establishment.id).toBe(1);
      assertType<BempaggoCardResponse>(chargeResponse.transactions[0].card!);
    });

  });
});
