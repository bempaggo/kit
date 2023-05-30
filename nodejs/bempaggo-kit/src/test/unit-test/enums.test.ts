import { CardBrandTypes, ChargeStatusTypes, Environments, PaymentMethodTypes, RefundReasonTypes, TransactionRequestTypes, TransactionResponseTypes, TransactionStatusTypes } from "@/app/modules/entity/Enum";
import { describe, expect, test } from "vitest";


describe("Enums", () => {
  test("Paymen tMethod Types", async () => {
    expect(PaymentMethodTypes.CREDIT_CARD).toBe("CREDIT_CARD");
    expect(PaymentMethodTypes.PIX).toBe("PIX");
    expect(PaymentMethodTypes.BANK_SLIP).toBe("BANK_SLIP");
    expect(PaymentMethodTypes.TRANSFER).toBe("TRANSFER");
  });
  test("Charge Status Types", async () => {
    expect(ChargeStatusTypes.PAY).toBe("PAY");
    expect(ChargeStatusTypes.PENDING).toBe("PENDING");
    expect(ChargeStatusTypes.SCHEDULE).toBe("SCHEDULE");
    expect(ChargeStatusTypes.ACCREDIT).toBe("ACCREDIT");
    expect(ChargeStatusTypes.REFUND).toBe("REFUND");
    expect(ChargeStatusTypes.MANUAL_DISCHARGE).toBe("MANUAL_DISCHARGE");
    expect(ChargeStatusTypes.CHARGEBACK).toBe("CHARGEBACK");
    expect(ChargeStatusTypes.COUNTERCHARGE).toBe("COUNTERCHARGE");
    expect(ChargeStatusTypes.IN_PROGRESS).toBe("IN_PROGRESS");
    expect(ChargeStatusTypes.AUTHORIZED).toBe("AUTHORIZED");
    expect(ChargeStatusTypes.FAIL).toBe("FAIL");
    expect(ChargeStatusTypes.CANCELED).toBe("CANCELED");
  });
  
  test("Refund ReasonTypes", async () => {
    expect(RefundReasonTypes.DUPLICATE_CHARGE).toBe("DUPLICATE_CHARGE");
    expect(RefundReasonTypes.IMPROPER_CHARGE).toBe("IMPROPER_CHARGE");
    expect(RefundReasonTypes.COSTUMER_WITHDRAWAL).toBe("COSTUMER_WITHDRAWAL");
    expect(RefundReasonTypes.OTHERS).toBe("OTHERS");
  });

  test("Transaction Status Types", async () => {
    expect(TransactionStatusTypes.IN_PROGRESS).toBe("IN_PROGRESS");
    expect(TransactionStatusTypes.APPROVED).toBe("APPROVED");
    expect(TransactionStatusTypes.REFUND).toBe("REFUND");
    expect(TransactionStatusTypes.AUTHORIZED).toBe("AUTHORIZED");
    expect(TransactionStatusTypes.MANUAL_DISCHARGE).toBe("MANUAL_DISCHARGE");
    expect(TransactionStatusTypes.MANUAL_REFUND).toBe("MANUAL_REFUND");
    expect(TransactionStatusTypes.NOT_AUTHORIZED).toBe("NOT_AUTHORIZED");
    expect(TransactionStatusTypes.NOT_APPROVED).toBe("NOT_APPROVED");
    expect(TransactionStatusTypes.CHARGEBACK).toBe("CHARGEBACK");
    expect(TransactionStatusTypes.COUNTERCHARGE).toBe("COUNTERCHARGE");
    expect(TransactionStatusTypes.CANCELED).toBe("CANCELED");
    expect(TransactionStatusTypes.AWAITING_PAYMENT).toBe("AWAITING_PAYMENT");
    expect(TransactionStatusTypes.UNDER_PAYMENT).toBe("UNDER_PAYMENT");
    expect(TransactionStatusTypes.OVER_PAYMENT).toBe("OVER_PAYMENT");
    expect(TransactionStatusTypes.FAIL).toBe("FAIL");
    expect(TransactionStatusTypes.INVALID).toBe("INVALID");
  });

  test("Environments", async () => {
    expect(Environments.DEVELOPMENT).toBe("DEVELOPMENT");
    expect(Environments.PRODUCTION).toBe("PRODUCTION");
    expect(Environments.SANDBOX).toBe("SANDBOX");
  });

  test("TransactionRequestTypes", async () => {
    expect(TransactionRequestTypes.ACCESSION).toBe("ACCESSION");
    expect(TransactionRequestTypes.RECURRENT).toBe("RECURRENT");
    expect(TransactionRequestTypes.LOOSE).toBe("LOOSE");
  });

  test("TransactionResponseTypes", async () => {
    expect(TransactionResponseTypes.ACCESSION).toBe("ACCESSION");
    expect(TransactionResponseTypes.RECURRENT).toBe("RECURRENT");
    expect(TransactionResponseTypes.LOOSE).toBe("LOOSE");
    expect(TransactionResponseTypes.REFUND).toBe("REFUND");
    expect(TransactionResponseTypes.CHARGEBACK).toBe("CHARGEBACK");
    expect(TransactionResponseTypes.COUNTERCHARGE).toBe("COUNTERCHARGE");
    expect(TransactionResponseTypes.MANUAL_DISCHARGE).toBe("MANUAL_DISCHARGE");
  });

  test("CardBrandTypes", async () => {
    expect(CardBrandTypes.VISA).toBe("VISA");
    expect(CardBrandTypes.MASTERCARD).toBe("MASTERCARD");
    expect(CardBrandTypes.ELO).toBe("ELO");
    expect(CardBrandTypes.AMEX).toBe("AMEX");
    expect(CardBrandTypes.DINERS).toBe("DINERS");
    expect(CardBrandTypes.AURA).toBe("AURA");
    expect(CardBrandTypes.DISCOVER).toBe("DISCOVER");
    expect(CardBrandTypes.JCB).toBe("JCB");
    expect(CardBrandTypes.HIPERCARD).toBe("HIPERCARD");
    expect(CardBrandTypes.CABAL).toBe("CABAL");
    expect(CardBrandTypes.SOROCRED).toBe("SOROCRED");
    expect(CardBrandTypes.BANESCARD).toBe("BANESCARD");
    expect(CardBrandTypes.CREDSYSTEM).toBe("CREDSYSTEM");
    expect(CardBrandTypes.CREDZ).toBe("CREDZ");
    expect(CardBrandTypes.OTHER).toBe("OTHER");
  });

});
