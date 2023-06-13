import { BempaggoAffiliateMinimalResponse, BempaggoCardExpirationResponse, BempaggoCardHolderResponse, BempaggoCardResponse, BempaggoChargeResponse, BempaggoCreditCardTransactionResponse, BempaggoEstablishmentMinimalResponse, BempaggoPixTransactionResponse, BempaggoTransactionResponse } from "@/app/modules/entity/BempaggoResponse";
import { CardBrandTypes, ChargeStatusTypes, PaymentMethodTypes, RefundReasonTypes, TransactionResponseTypes, TransactionStatusTypes } from "@/app/modules/entity/Enum";
import { assert, assertType, describe, test } from "vitest";

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
					id: 123, 
					orderReference: "123456",
					affiliate: {
						id: 1,
						businessName: "Mega Loja",
						name: "Selo A"
					}
				}
				
			};
			assert.equal(1, chargeResponse.id);
			assert.equal(1, chargeResponse.customer.id);
			assert.equal("51190844001", chargeResponse.customer.document);
			assert.equal("AUTHORIZED", chargeResponse.status);
			assert.equal(1000, chargeResponse.value);
			assert.equal(0, chargeResponse.refundedAmount);

			assert.equal(1000, (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).refundValue);
			assert.equal("12345678901234567890", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).transactionKey);
			assert.equal("OTHERS", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).refundRason);
			assert.equal("12345678901234567890", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.token);
			assert.equal("Teste", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.holder.name);
			assert.equal("12345678901", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.holder.document);
			assert.equal("123456", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.bin);
			assert.equal("1234", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.lastFour);
			assert.equal(12, (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.expiration.month);
			assert.equal(2021, (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.expiration.year);
			assert.equal("VISA", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.brand);
			assert.equal(1, (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).installments);
			assert.equal("CREDIT_CARD", chargeResponse.transactions[0].paymentMethod);
			assert.equal(1, chargeResponse.transactions[0].id);
			assert.equal(1, chargeResponse.transactions[0].establishment.id);
			assert.equal("00", chargeResponse.transactions[0].returnCode);
			assert.equal("Transação autorizada", chargeResponse.transactions[0].returnMessage);
			assert.equal("AUTHORIZED", chargeResponse.transactions[0].status);
			assert.equal(1000, chargeResponse.transactions[0].value);
			assert.equal(1620000000000, chargeResponse.transactions[0].transactionDate);
			assert.equal("12345678901234567890", chargeResponse.transactions[0].transactionReference);
			assert.equal("LOOSE", chargeResponse.transactions[0].type);
			assert.equal(1, chargeResponse.transactions[0].affiliate!.id);
			assert.equal("Bempaggo", chargeResponse.transactions[0].affiliate!.name);
			assert.equal("Bempaggo", chargeResponse.transactions[0].affiliate!.businessName);
			assert.equal(1000, chargeResponse.transactions[0].paidValue);
			assert.deepEqual([], (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).splits);
			
			assert.equal(123, chargeResponse.order.id);
			assert.equal("123456", chargeResponse.order.orderReference);
			assert.equal(1, chargeResponse.order.affiliate?.id);
			assert.equal("Mega Loja", chargeResponse.order.affiliate?.businessName);
			assert.equal("Selo A", chargeResponse.order.affiliate?.name);
			
			assert.equal(18, Object.keys(chargeResponse.transactions[0]).length);
			assert.equal(6, Object.keys((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!).length);
			assert.equal(2, Object.keys((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.holder).length);
			assert.equal(2, Object.keys((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card!.expiration).length);
			assert.equal(1, Object.keys(chargeResponse.transactions[0].establishment).length);
			assert.equal(3, Object.keys(chargeResponse.transactions[0].affiliate!).length);
			assert.equal(2, Object.keys(chargeResponse.customer).length);
			assert.equal(3, Object.keys(chargeResponse.order).length);
			assert.equal(3, Object.keys(chargeResponse.order.affiliate!).length);
			
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
				transactionDate: 1686666750792,
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
					id: 123,
					orderReference: "123456",
					affiliate: {
						id: 1,
						businessName: "Mega Loja",
						name: "Selo A"
					}
				}
			};

			assert.equal(12, Object.keys(chargeResponse.transactions[0]).length);
			assert.equal(1, chargeResponse.id);
			assert.equal(1, chargeResponse.customer.id);
			assert.equal("51190844001", chargeResponse.customer.document);
			assert.equal("AUTHORIZED", chargeResponse.status);
			assert.equal(1000, chargeResponse.value);
			assert.equal(1, chargeResponse.transactions[0].id);
			assert.equal("00", chargeResponse.transactions[0].returnCode);
			assert.equal(1000, chargeResponse.transactions[0].value);
			assert.equal("123456", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).transactionKey);
			assert.equal("LOOSE", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).type);
			assert.equal("APPROVED", chargeResponse.transactions[0].status);
			assert.equal(1686666750792, chargeResponse.transactions[0].transactionDate);
			assert.equal("CREDIT_CARD", chargeResponse.transactions[0].paymentMethod);
			assert.equal(1, chargeResponse.transactions[0].establishment.id);
			assert.equal(1, (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).installments);
			assert.equal("Teste", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.name);
			assert.equal("12345678901", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.document);
			assert.equal("123456", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.bin);
			assert.equal("1234", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.lastFour);
			assert.equal(12, (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.expiration.month);
			assert.equal(2021, (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.expiration.year);
			assert.equal("VISA", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.brand);
			assert.deepEqual([], chargeResponse.transactions[0].splits);
			assert.equal(123, chargeResponse.order.id);
			assert.equal("123456", chargeResponse.order.orderReference);
			assert.equal(1, chargeResponse.order.affiliate?.id);
			assert.equal("Mega Loja", chargeResponse.order.affiliate?.businessName);
			assert.equal("Selo A", chargeResponse.order.affiliate?.name);


			assert.equal(2, Object.keys(chargeResponse.customer).length);
			assert.equal(3, Object.keys(chargeResponse.order).length);
			assert.equal(3, Object.keys(chargeResponse.order.affiliate!).length);
			assert.equal(1, Object.keys(chargeResponse.transactions[0].establishment).length);
			assert.equal(5, Object.keys((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card).length);
			assert.equal(2, Object.keys((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder).length);
			assert.equal(2, Object.keys((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.expiration).length);

			assertType<BempaggoChargeResponse>(chargeResponse);
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
				transactionDate: 1520000000000,
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
					id: 123, 
					orderReference: "123456",
					affiliate: {
						id: 1,
						name: "Selo A",
						businessName: "Mega Loja",
					}
				}
			};

			assert.equal(1, chargeResponse.id);
			assert.equal(1, chargeResponse.customer.id);
			assert.equal("51190844001", chargeResponse.customer.document);
			assert.equal("AUTHORIZED", chargeResponse.status);
			assert.equal(1000, chargeResponse.value);

			assert.equal(1, chargeResponse.transactions[0].id);
			assert.equal("00", chargeResponse.transactions[0].returnCode);
			assert.equal("Transação autorizada", chargeResponse.transactions[0].returnMessage);
			assert.equal(1000, chargeResponse.transactions[0].value);
			assert.equal("123456", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).transactionKey);
			assert.equal("LOOSE", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).type);
			assert.equal("APPROVED", chargeResponse.transactions[0].status);
			assert.equal("123456", chargeResponse.transactions[0].transactionReference);
			assert.equal(1520000000000, chargeResponse.transactions[0].transactionDate);
			assert.equal("CREDIT_CARD", chargeResponse.transactions[0].paymentMethod);
			assert.equal(1, chargeResponse.transactions[0].establishment.id);
			assert.equal(1, (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).installments);
			assert.equal("Teste", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.name);
			assert.equal("12345678901", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.document);
			assert.equal("123456", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.bin);
			assert.equal("1234", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.lastFour);
			assert.equal(12, (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.expiration.month);
			assert.equal(2021, (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.expiration.year);
			assert.equal("VISA", (chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.brand);
			assert.deepEqual([], chargeResponse.transactions[0].splits);
			
			assert.equal(1620000000000, (chargeResponse.transactions[1] as BempaggoPixTransactionResponse).expirationDate);
			assert.equal("PIX", chargeResponse.transactions[1].paymentMethod);
			assert.equal(1, chargeResponse.transactions[1].id);
			assert.equal(1, chargeResponse.transactions[1].establishment.id);
			assert.equal("00", chargeResponse.transactions[1].returnCode);
			assert.equal("AUTHORIZED", chargeResponse.transactions[1].status);
			assert.equal(1000, chargeResponse.transactions[1].value);
			assert.equal(1620000000000, chargeResponse.transactions[1].transactionDate);
			assert.equal("LOOSE", chargeResponse.transactions[1].type);
			assert.deepEqual([], chargeResponse.transactions[1].splits);

			assert.equal(123, chargeResponse.order.id);
			assert.equal("123456", chargeResponse.order.orderReference);
			assert.equal(1, chargeResponse.order.affiliate?.id);
			assert.equal("Selo A", chargeResponse.order.affiliate?.name);
			assert.equal("Mega Loja", chargeResponse.order.affiliate?.businessName);

			assert.equal(2, Object.keys(chargeResponse.customer).length);
			assert.equal(3, Object.keys(chargeResponse.order).length);
			assert.equal(3, Object.keys(chargeResponse.order.affiliate!).length);
			assert.equal(14, Object.keys(chargeResponse.transactions[0]).length);
			assert.equal(1, Object.keys(chargeResponse.transactions[0].establishment).length);
			assert.equal(5, Object.keys((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card).length);
			assert.equal(2, Object.keys((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder).length);
			assert.equal(2, Object.keys((chargeResponse.transactions[0] as BempaggoCreditCardTransactionResponse).card.expiration).length);
			assert.equal(10, Object.keys(chargeResponse.transactions[1]).length);
			assert.equal(1, Object.keys(chargeResponse.transactions[1].establishment).length);
			
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
