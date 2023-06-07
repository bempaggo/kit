import { BempaggoAffiliateMinimalResponse, BempaggoCardExpirationResponse, BempaggoCardHolderResponse, BempaggoCardResponse, BempaggoChargeResponse, BempaggoCreditCardTransactionResponse, BempaggoEstablishmentMinimalResponse, BempaggoPixTransactionResponse, BempaggoTransactionResponse } from "@/app/modules/entity/BempaggoResponse";
import { CardBrandTypes, ChargeStatusTypes, PaymentMethodTypes, RefundReasonTypes, TransactionResponseTypes, TransactionStatusTypes } from "@/app/modules/entity/Enum";
import { assertType, describe, expect, test } from "vitest";

describe("Charge Entity", () => {
	describe("Response", () => {
		test("chargeResponse", async () => {

			const transactions: BempaggoTransactionResponse[] = [{
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
			} as BempaggoCreditCardTransactionResponse];

			const chargeResponse: BempaggoChargeResponse = {
				id: 1,
				customer: {
					id: 1,
					document: "51190844001",
				},
				status: ChargeStatusTypes.AUTHORIZED,
				value: 1000,
				refundedAmount: 0,
				transactions: transactions,
				order: {
					id: 123, orderReference: "123456",
					affiliate: {
						id: 1,
						businessName: "",
						name: "Selo A"
					}
				}

			};

			expect(chargeResponse).not.toBeNull();
			expect(Object.keys(chargeResponse.transactions[0]).length).toBe(18);
			expect(chargeResponse.id).toBe(1);
			expect(chargeResponse.transactions[0].id).toBe(1);
			expect(chargeResponse.transactions[0].returnCode).toBe("00");
			expect(chargeResponse.transactions[0].returnMessage).toBe("Transação autorizada");
			expect(chargeResponse.transactions[0].value).toBe(1000);
			expect(chargeResponse.transactions[0].paidValue).toBe(1000);
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).refundValue).toBe(1000);
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).transactionKey).toBe("12345678901234567890");
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).refundRason).toBe("OTHERS");
			expect(chargeResponse.transactions[0].type).toBe("LOOSE");
			expect(chargeResponse.transactions[0].status).toBe("AUTHORIZED");
			expect(chargeResponse.transactions[0].transactionReference).toBe("12345678901234567890");
			expect(chargeResponse.transactions[0].transactionDate).toBeGreaterThan(0);
			expect(Object.keys(chargeResponse.transactions[0].affiliate!).length).toBe(3);
			expect(chargeResponse.transactions[0].affiliate!.id).toBe(1);
			expect(chargeResponse.transactions[0].affiliate!.name).toBe("Bempaggo");
			expect(chargeResponse.transactions[0].affiliate!.businessName).toBe("Bempaggo");
			expect(chargeResponse.transactions[0].paymentMethod).toBe("CREDIT_CARD");
			expect(Object.keys(chargeResponse.transactions[0].establishment).length).toBe(1);
			expect(chargeResponse.transactions[0].establishment.id).toBe(1);
			expect(Object.keys((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!).length).toBe(6);
			expect(Object.keys((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.holder).length).toBe(2);
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.holder.name).toBe("Teste");
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.holder.document).toBe("12345678901");
			expect(Object.keys((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.expiration).length).toBe(2);
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.expiration.year).toBe(2021);
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.expiration.month).toBe(12);
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.brand).toBe("VISA");
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).splits).toStrictEqual([]);
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).installments).toBe(1);
			expect(chargeResponse.customer.id).toBe(1);
			expect(chargeResponse.customer.document).toBe("51190844001");
			expect(chargeResponse.status).toBe("AUTHORIZED");
			expect(chargeResponse.value).toBe(1000);
			expect(chargeResponse.refundedAmount).toBe(0);
			expect(chargeResponse.order.id).toBe(123);
			assertType<BempaggoChargeResponse>(chargeResponse);
			assertType<BempaggoTransactionResponse>(chargeResponse.transactions[0]);
			assertType<RefundReasonTypes>((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).refundRason!);
			assertType<TransactionResponseTypes>(chargeResponse.transactions[0].type);
			assertType<TransactionStatusTypes>(chargeResponse.transactions[0].status);
			assertType<BempaggoAffiliateMinimalResponse>(chargeResponse.transactions[0].affiliate!);
			assertType<PaymentMethodTypes>(chargeResponse.transactions[0].paymentMethod);
			assertType<BempaggoEstablishmentMinimalResponse>(chargeResponse.transactions[0].establishment);
			assertType<BempaggoCardResponse>((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!);
			assertType<BempaggoCardHolderResponse>((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.holder);
			assertType<BempaggoCardExpirationResponse>((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.expiration);
			assertType<ChargeStatusTypes>(chargeResponse.status);
		});
		test("charge response with only required fields", async () => {

			const transactions: BempaggoTransactionResponse[] = [{
				id: 1,
				returnCode: "00",
				value: 1000,
				transactionKey: "123456",
				type: TransactionResponseTypes.LOOSE,
				status: TransactionStatusTypes.APPROVED,
				transactionDate: new Date().getTime(),
				paymentMethod: PaymentMethodTypes.CREDIT_CARD,
				establishment: {
					id: 1
				},
				installments: 1,
				card: {
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
				splits: []

			} as BempaggoCreditCardTransactionResponse];

			const chargeResponse: BempaggoChargeResponse = {
				id: 1,
				customer: {
					id: 1,
					document: "51190844001",
				},
				status: ChargeStatusTypes.AUTHORIZED,
				value: 1000,
				transactions: transactions,
				order: {
					id: 123, orderReference: "123456",
					affiliate: {
						id: 1,
						businessName: "",
						name: "Selo A"
					}
				}
			};

			expect(chargeResponse).not.toBeNull();
			expect(Object.keys(chargeResponse.transactions[0]).length).toBe(12);
			expect(chargeResponse.id).toBe(1);
			expect(chargeResponse.transactions[0].id).toBe(1);
			expect(chargeResponse.transactions[0].returnCode).toBe("00");
			expect(chargeResponse.transactions[0].value).toBe(1000);
			expect(chargeResponse.transactions[0].paidValue).toBeUndefined();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).refundValue).toBeUndefined();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).transactionKey).toBe("123456");
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).refundRason).toBeUndefined();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).type).toBe("LOOSE");
			expect(chargeResponse.transactions[0].status).toBe("APPROVED");
			expect(chargeResponse.transactions[0].transactionReference).toBeUndefined();
			expect(chargeResponse.transactions[0].transactionDate).toBeGreaterThan(0);
			expect(chargeResponse.transactions[0].paymentMethod).toBe("CREDIT_CARD");
			expect(Object.keys(chargeResponse.transactions[0].establishment).length).toBe(1);
			expect(chargeResponse.transactions[0].establishment.id).toBe(1);
			expect(chargeResponse.transactions[0].splits).toStrictEqual([]);
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder).not.toBeNull();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder).not.toBeUndefined();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder).not.toBeNaN();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder).toHaveProperty("name");
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.name).not.toBeNull();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.name).not.toBeUndefined();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.name).not.toBeNaN();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.name).toBe("Teste")
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder).toHaveProperty("document");
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.document).not.toBeNull();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.document).not.toBeUndefined();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.document).not.toBeNaN();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.document).toBe("12345678901");
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).installments).toBe(1);
			expect(chargeResponse.customer.id).toBe(1);
			expect(chargeResponse.customer.document).toBe("51190844001");
			expect(chargeResponse.status).toBe("AUTHORIZED");
			expect(chargeResponse.value).toBe(1000);
			expect(chargeResponse.refundedAmount).toBeUndefined();
			expect(chargeResponse.order.id).toBe(123);
			assertType<BempaggoChargeResponse>(chargeResponse);
			assertType<RefundReasonTypes>((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).refundRason!);
			assertType<TransactionResponseTypes>((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).type);
			assertType<TransactionStatusTypes>(chargeResponse.transactions[0].status);
			assertType<BempaggoAffiliateMinimalResponse>(chargeResponse.transactions[0].affiliate!);
			assertType<PaymentMethodTypes>(chargeResponse.transactions[0].paymentMethod);
			assertType<BempaggoEstablishmentMinimalResponse>(chargeResponse.transactions[0].establishment);
			assertType<BempaggoCardResponse>((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!);
			assertType<ChargeStatusTypes>(chargeResponse.status);
			
		});
		test("charge response with two types of transactions", async () => {

			const transactions: BempaggoTransactionResponse[] = [{
				id: 1,
				returnCode: "00",
				returnMessage: "Transação autorizada",
				value: 1000,
				transactionKey: "123456",
				type: TransactionResponseTypes.LOOSE,
				status: TransactionStatusTypes.APPROVED,
				transactionReference: String(123456),
				transactionDate: new Date().getTime(),
				paymentMethod: PaymentMethodTypes.CREDIT_CARD,
				establishment: {
					id: 1
				},
				installments: 1,
				card: {
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
				splits: []

			} as BempaggoCreditCardTransactionResponse,
			{
				expirationDate: 1620000000000,
				paymentMethod: PaymentMethodTypes.PIX,
				id: 1,
				establishment: {
					id: 1,
				},
				returnCode: "00",
				status: TransactionStatusTypes.AUTHORIZED,
				value: 1000,
				transactionDate: 1620000000000,
				type: TransactionResponseTypes.LOOSE,
				splits: []
			} as BempaggoPixTransactionResponse];

			const chargeResponse: BempaggoChargeResponse = {
				id: 1,
				customer: {
					id: 1,
					document: "51190844001",
				},
				status: ChargeStatusTypes.AUTHORIZED,
				value: 1000,
				transactions: transactions,
				order: {
					id: 123, orderReference: "123456",
					affiliate: {
						id: 1,
						businessName: "",
						name: "Selo A"
					}
				}
			};

			expect(chargeResponse).not.toBeNull();
			expect(Object.keys(chargeResponse.transactions[0]).length).toBe(14);
			expect(chargeResponse.id).toBe(1);
			expect(chargeResponse.transactions[0].id).toBe(1);
			expect(chargeResponse.transactions[0].returnCode).toBe("00");
			expect(chargeResponse.transactions[0].returnMessage).toBe("Transação autorizada");
			expect(chargeResponse.transactions[0].value).toBe(1000);
			expect(chargeResponse.transactions[0].paidValue).toBeUndefined();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).refundValue).toBeUndefined();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).transactionKey).toBe("123456");
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).refundRason).toBeUndefined();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).type).toBe("LOOSE");
			expect(chargeResponse.transactions[0].status).toBe("APPROVED");
			expect(chargeResponse.transactions[0].transactionReference).toBe("123456");
			expect(chargeResponse.transactions[0].transactionDate).toBeGreaterThan(0);
			expect(chargeResponse.transactions[0].paymentMethod).toBe("CREDIT_CARD");
			expect(Object.keys(chargeResponse.transactions[0].establishment).length).toBe(1);
			expect(chargeResponse.transactions[0].establishment.id).toBe(1);
			expect(chargeResponse.transactions[0].splits).toStrictEqual([]);

			expect(chargeResponse.transactions[1].id).toBe(1);
			expect(chargeResponse.transactions[1].returnCode).toBe("00");
			expect(chargeResponse.transactions[1].returnMessage).toBeUndefined();
			expect(chargeResponse.transactions[1].paidValue).toBeUndefined();
			expect(chargeResponse.transactions[1].value).toBe(1000);
			expect((chargeResponse.transactions[1] as BempaggoCreditCardTransactionResponse).transactionKey).toBeUndefined();
			expect((chargeResponse.transactions[1] as BempaggoCreditCardTransactionResponse).refundValue).toBeUndefined();
			expect((chargeResponse.transactions[1] as BempaggoCreditCardTransactionResponse).refundRason).toBeUndefined();
			expect((chargeResponse.transactions[1] as BempaggoCreditCardTransactionResponse).type).toBe("LOOSE");
			expect(chargeResponse.transactions[1].status).toBe("AUTHORIZED");
			expect(chargeResponse.transactions[1].transactionReference).toBeUndefined();
			expect(chargeResponse.transactions[1].transactionDate).toBeGreaterThan(0);
			expect(chargeResponse.transactions[1].paymentMethod).toBe("PIX");
			expect(Object.keys(chargeResponse.transactions[1].establishment).length).toBe(1);
			expect(chargeResponse.transactions[1].establishment.id).toBe(1);
			expect(chargeResponse.transactions[1].splits).toStrictEqual([]);
			expect((chargeResponse.transactions[1] as BempaggoCreditCardTransactionResponse).installments).toBeUndefined();

			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder).not.toBeNull();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder).not.toBeUndefined();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder).not.toBeNaN();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder).toHaveProperty("name");
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.name).not.toBeNull();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.name).not.toBeUndefined();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.name).not.toBeNaN();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.name).toBe("Teste")
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder).toHaveProperty("document");
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.document).not.toBeNull();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.document).not.toBeUndefined();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.document).not.toBeNaN();
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.document).toBe("12345678901");
			expect((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).installments).toBe(1);

			expect(chargeResponse.customer.id).toBe(1);
			expect(chargeResponse.customer.document).toBe("51190844001");
			expect(chargeResponse.status).toBe("AUTHORIZED");
			expect(chargeResponse.value).toBe(1000);
			expect(chargeResponse.refundedAmount).toBeUndefined();
			expect(chargeResponse.order.id).toBe(123);
			assertType<BempaggoChargeResponse>(chargeResponse);
			assertType<TransactionResponseTypes>((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).type);
			assertType<RefundReasonTypes>((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).refundRason!);
			assertType<TransactionStatusTypes>(chargeResponse.transactions[0].status);
			assertType<BempaggoAffiliateMinimalResponse>(chargeResponse.transactions[0].affiliate!);
			assertType<PaymentMethodTypes>(chargeResponse.transactions[0].paymentMethod);
			assertType<BempaggoEstablishmentMinimalResponse>(chargeResponse.transactions[0].establishment);
			assertType<BempaggoCardResponse>((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!);
			assertType<ChargeStatusTypes>(chargeResponse.status);
			assertType<BempaggoEstablishmentMinimalResponse>(chargeResponse.transactions[1].establishment);

		});

	});
});
