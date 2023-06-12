import { CardBrandTypes, ChargeStatusTypes, Environments, PaymentMethodTypes, RefundReasonTypes, TransactionResponseTypes, TransactionStatusTypes } from "@/app/modules/entity/Enum";
import { assert, describe, test } from "vitest";


describe("Enums", () => {
	test("Payment Method Types", async () => {
		assert.equal(PaymentMethodTypes.CREDIT_CARD, "CREDIT_CARD");
		assert.equal(PaymentMethodTypes.PIX, "PIX");
		assert.equal(PaymentMethodTypes.BOLETO, "BOLETO");
		assert.equal(PaymentMethodTypes.TRANSFER, "TRANSFER");
	});

	test("Charge Status Types", async () => {
		assert.equal(ChargeStatusTypes.PAY, "PAY");
		assert.equal(ChargeStatusTypes.PENDING, "PENDING");
		assert.equal(ChargeStatusTypes.SCHEDULE, "SCHEDULE");
		assert.equal(ChargeStatusTypes.ACCREDIT, "ACCREDIT");
		assert.equal(ChargeStatusTypes.REFUND, "REFUND");
		assert.equal(ChargeStatusTypes.MANUAL_DISCHARGE, "MANUAL_DISCHARGE");
		assert.equal(ChargeStatusTypes.CHARGEBACK, "CHARGEBACK");
		assert.equal(ChargeStatusTypes.COUNTERCHARGE, "COUNTERCHARGE");
		assert.equal(ChargeStatusTypes.IN_PROGRESS, "IN_PROGRESS");
		assert.equal(ChargeStatusTypes.AUTHORIZED, "AUTHORIZED");
		assert.equal(ChargeStatusTypes.FAIL, "FAIL");
		assert.equal(ChargeStatusTypes.CANCELED, "CANCELED");
	});

	test("Refund Reason Types", async () => {
		assert.equal(RefundReasonTypes.DUPLICATE_CHARGE, "DUPLICATE_CHARGE");
		assert.equal(RefundReasonTypes.IMPROPER_CHARGE, "IMPROPER_CHARGE");
		assert.equal(RefundReasonTypes.COSTUMER_WITHDRAWAL, "COSTUMER_WITHDRAWAL");
		assert.equal(RefundReasonTypes.OTHERS, "OTHERS");
	});

	test("Transaction Status Types", async () => {
		assert.equal(TransactionStatusTypes.IN_PROGRESS, "IN_PROGRESS");
		assert.equal(TransactionStatusTypes.APPROVED, "APPROVED");
		assert.equal(TransactionStatusTypes.REFUND, "REFUND");
		assert.equal(TransactionStatusTypes.AUTHORIZED, "AUTHORIZED");
		assert.equal(TransactionStatusTypes.MANUAL_DISCHARGE, "MANUAL_DISCHARGE");
		assert.equal(TransactionStatusTypes.MANUAL_REFUND, "MANUAL_REFUND");
		assert.equal(TransactionStatusTypes.NOT_AUTHORIZED, "NOT_AUTHORIZED");
		assert.equal(TransactionStatusTypes.NOT_APPROVED, "NOT_APPROVED");
		assert.equal(TransactionStatusTypes.CHARGEBACK, "CHARGEBACK");
		assert.equal(TransactionStatusTypes.COUNTERCHARGE, "COUNTERCHARGE");
		assert.equal(TransactionStatusTypes.CANCELED, "CANCELED");
		assert.equal(TransactionStatusTypes.AWAITING_PAYMENT, "AWAITING_PAYMENT");
		assert.equal(TransactionStatusTypes.UNDER_PAYMENT, "UNDER_PAYMENT");
		assert.equal(TransactionStatusTypes.OVER_PAYMENT, "OVER_PAYMENT");
		assert.equal(TransactionStatusTypes.FAIL, "FAIL");
		assert.equal(TransactionStatusTypes.INVALID, "INVALID");
	});

	test("Environments", async () => {
		assert.equal(Environments.DEVELOPMENT, "DEVELOPMENT");
		assert.equal(Environments.PRODUCTION, "PRODUCTION");
		assert.equal(Environments.SANDBOX, "SANDBOX");
	});

	test("Transaction Response Types", async () => {
		assert.equal(TransactionResponseTypes.ACCESSION, "ACCESSION");
		assert.equal(TransactionResponseTypes.RECURRENT, "RECURRENT");
		assert.equal(TransactionResponseTypes.LOOSE, "LOOSE");
		assert.equal(TransactionResponseTypes.REFUND, "REFUND");
		assert.equal(TransactionResponseTypes.CHARGEBACK, "CHARGEBACK");
		assert.equal(TransactionResponseTypes.COUNTERCHARGE, "COUNTERCHARGE");
		assert.equal(TransactionResponseTypes.MANUAL_DISCHARGE, "MANUAL_DISCHARGE");
	});

	test("Card Brand Types", async () => {
		assert.equal(CardBrandTypes.VISA, "VISA");
		assert.equal(CardBrandTypes.MASTERCARD, "MASTERCARD");
		assert.equal(CardBrandTypes.ELO, "ELO");
		assert.equal(CardBrandTypes.AMEX, "AMEX");
		assert.equal(CardBrandTypes.DINERS, "DINERS");
		assert.equal(CardBrandTypes.AURA, "AURA");
		assert.equal(CardBrandTypes.DISCOVER, "DISCOVER");
		assert.equal(CardBrandTypes.JCB, "JCB");
		assert.equal(CardBrandTypes.HIPERCARD, "HIPERCARD");
		assert.equal(CardBrandTypes.CABAL, "CABAL");
		assert.equal(CardBrandTypes.SOROCRED, "SOROCRED");
		assert.equal(CardBrandTypes.BANESCARD, "BANESCARD");
		assert.equal(CardBrandTypes.CREDSYSTEM, "CREDSYSTEM");
		assert.equal(CardBrandTypes.CREDZ, "CREDZ");
	});
});
