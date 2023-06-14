import { CardBrandTypes, ChargeStatusTypes, Environments, PaymentMethodTypes, RefundReasonTypes, TransactionResponseTypes, TransactionStatusTypes } from "@/app/modules/entity/Enum";
import { assert, describe, test } from "vitest";


describe("Enums", () => {
	test("Payment Method Types", async () => {
		assert.equal("CREDIT_CARD", PaymentMethodTypes.CREDIT_CARD);
		assert.equal("PIX", PaymentMethodTypes.PIX);
		assert.equal("BOLETO", PaymentMethodTypes.BOLETO);
		assert.equal("TRANSFER", PaymentMethodTypes.TRANSFER);
	});

	test("Charge Status Types", async () => {
		assert.equal("PAY", ChargeStatusTypes.PAY);
		assert.equal("PENDING", ChargeStatusTypes.PENDING);
		assert.equal("SCHEDULE", ChargeStatusTypes.SCHEDULE);
		assert.equal("ACCREDIT", ChargeStatusTypes.ACCREDIT);
		assert.equal("REFUND", ChargeStatusTypes.REFUND);
		assert.equal("MANUAL_DISCHARGE", ChargeStatusTypes.MANUAL_DISCHARGE);
		assert.equal("CHARGEBACK", ChargeStatusTypes.CHARGEBACK);
		assert.equal("COUNTERCHARGE", ChargeStatusTypes.COUNTERCHARGE);
		assert.equal("IN_PROGRESS", ChargeStatusTypes.IN_PROGRESS);
		assert.equal("AUTHORIZED", ChargeStatusTypes.AUTHORIZED);
		assert.equal("FAIL", ChargeStatusTypes.FAIL);
		assert.equal("CANCELED", ChargeStatusTypes.CANCELED);
	});

	test("Refund Reason Types", async () => {
		assert.equal("DUPLICATE_CHARGE", RefundReasonTypes.DUPLICATE_CHARGE);
		assert.equal("IMPROPER_CHARGE", RefundReasonTypes.IMPROPER_CHARGE);
		assert.equal("COSTUMER_WITHDRAWAL", RefundReasonTypes.COSTUMER_WITHDRAWAL);
		assert.equal("OTHERS", RefundReasonTypes.OTHERS);
	});

	test("Transaction Status Types", async () => {
		assert.equal("IN_PROGRESS", TransactionStatusTypes.IN_PROGRESS);
		assert.equal("APPROVED", TransactionStatusTypes.APPROVED);
		assert.equal("REFUND", TransactionStatusTypes.REFUND);
		assert.equal("AUTHORIZED", TransactionStatusTypes.AUTHORIZED);
		assert.equal("MANUAL_DISCHARGE", TransactionStatusTypes.MANUAL_DISCHARGE);
		assert.equal("MANUAL_REFUND", TransactionStatusTypes.MANUAL_REFUND);
		assert.equal("NOT_AUTHORIZED", TransactionStatusTypes.NOT_AUTHORIZED);
		assert.equal("NOT_APPROVED", TransactionStatusTypes.NOT_APPROVED);
		assert.equal("CHARGEBACK", TransactionStatusTypes.CHARGEBACK);
		assert.equal("COUNTERCHARGE", TransactionStatusTypes.COUNTERCHARGE);
		assert.equal("CANCELED", TransactionStatusTypes.CANCELED);
		assert.equal("AWAITING_PAYMENT", TransactionStatusTypes.AWAITING_PAYMENT);
		assert.equal("UNDER_PAYMENT", TransactionStatusTypes.UNDER_PAYMENT);
		assert.equal("OVER_PAYMENT", TransactionStatusTypes.OVER_PAYMENT);
		assert.equal("FAIL", TransactionStatusTypes.FAIL);
		assert.equal("INVALID", TransactionStatusTypes.INVALID);
	});

	test("Environments", async () => {
		assert.equal("DEVELOPMENT", Environments.DEVELOPMENT);
		assert.equal("PRODUCTION", Environments.PRODUCTION);
		assert.equal("SANDBOX", Environments.SANDBOX);
	});

	test("Transaction Response Types", async () => {
		assert.equal("ACCESSION", TransactionResponseTypes.ACCESSION);
		assert.equal("RECURRENT", TransactionResponseTypes.RECURRENT);
		assert.equal("LOOSE", TransactionResponseTypes.LOOSE);
		assert.equal("REFUND", TransactionResponseTypes.REFUND);
		assert.equal("CHARGEBACK", TransactionResponseTypes.CHARGEBACK);
		assert.equal("COUNTERCHARGE", TransactionResponseTypes.COUNTERCHARGE);
		assert.equal("MANUAL_DISCHARGE", TransactionResponseTypes.MANUAL_DISCHARGE);
	});

	test("Card Brand Types", async () => {
		assert.equal("VISA", CardBrandTypes.VISA);
		assert.equal("MASTERCARD", CardBrandTypes.MASTERCARD);
		assert.equal("ELO", CardBrandTypes.ELO);
		assert.equal("AMEX", CardBrandTypes.AMEX);
		assert.equal("DINERS", CardBrandTypes.DINERS);
		assert.equal("AURA", CardBrandTypes.AURA);
		assert.equal("DISCOVER", CardBrandTypes.DISCOVER);
		assert.equal("JCB", CardBrandTypes.JCB);
		assert.equal("HIPERCARD", CardBrandTypes.HIPERCARD);
		assert.equal("CABAL", CardBrandTypes.CABAL);
		assert.equal("SOROCRED", CardBrandTypes.SOROCRED);
		assert.equal("BANESCARD", CardBrandTypes.BANESCARD);
		assert.equal("CREDSYSTEM", CardBrandTypes.CREDSYSTEM);
		assert.equal("CREDZ", CardBrandTypes.CREDZ);
	});
});
