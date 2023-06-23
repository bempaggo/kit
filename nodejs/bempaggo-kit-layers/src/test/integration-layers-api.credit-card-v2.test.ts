
import BemPaggoSdk from "../app/modules/layers/BemPaggoSDK";
import { LayersCreditCardPaymentMethod, LayersCustomerPaymentMethod, LayersTransaction } from "../app/modules/layers/interfaces";
import { LayersTransactionGroup } from "../app/modules/layers/transactionGroup";
import { fail } from "assert";
import assert from "assert";
import { ChargeStatusTypes, TransactionStatusTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";
import { layers } from "./setup";
// with ❤️ feeling the bad smell on the air
const sellerId: number = 1;
const requestLayersStyle: LayersTransactionGroup = {
	code: "",
	price: {
		amount: 1035,
		currency: "BRL"
	},
	paymentMethods: [{
		bank_slip: undefined,
		installments: 2,
		method: "credit_card",
		recipients: [{ sourceId: 1, total: { amount: 1035, currency: "BRL" } }],
		card: {
			token: "aot",
			securityCode: "123"
		},
		total: { amount: 1035, currency: "BRL" }
	}],

	sourceId: sellerId,
	customerPayload: {
		name: "Douglas Hiuara Longo Customer",
		email: "douglas@bempaggo.com.br",
		phone: { areaCode: 48, countryCode: 55, phoneNumber: 988657196 },
		birth: new Date("1992-02-29"),
		document: {
			kind: "cpf",
			value: "06219385993"
		},
		addresses: [],
	},
	urlNotification: undefined
}


const cardLayers: LayersCustomerPaymentMethod = {
	title: "Non used",
	name: "Douglas Hiura Longo",
	month: 1,
	year: 2028,
	number: "5448280000000007",
	brand: "MASTERCARD",
	token: undefined,
	document: undefined
}
const cardLayersInvalid: LayersCustomerPaymentMethod = {
	title: "Non used",
	name: "Douglas Hiura Longo",
	month: 1,
	year: 2028,
	number: "5448280000040807",
	brand: "MASTERCARD",
	document: undefined,
	token: undefined
}
describe("How use credit card charge", () => {
	test("brands", async () => {
		assert.equal(14, BemPaggoSdk.availableCardBrands.length);
		assert.equal("VISA", BemPaggoSdk.availableCardBrands[0]);
		assert.equal("MASTERCARD", BemPaggoSdk.availableCardBrands[1]);
		assert.equal("ELO", BemPaggoSdk.availableCardBrands[2]);
		assert.equal("AMEX", BemPaggoSdk.availableCardBrands[3]);
		assert.equal("DINERS", BemPaggoSdk.availableCardBrands[4]);
		assert.equal("AURA", BemPaggoSdk.availableCardBrands[5]);
		assert.equal("DISCOVER", BemPaggoSdk.availableCardBrands[6]);
		assert.equal("JCB", BemPaggoSdk.availableCardBrands[7]);
		assert.equal("HIPERCARD", BemPaggoSdk.availableCardBrands[8]);
		assert.equal("SOROCRED", BemPaggoSdk.availableCardBrands[9]);
		assert.equal("CABAL", BemPaggoSdk.availableCardBrands[10]);
		assert.equal("CREDSYSTEM", BemPaggoSdk.availableCardBrands[11]);
		assert.equal("BANESCARD", BemPaggoSdk.availableCardBrands[12]);
		assert.equal("CREDZ", BemPaggoSdk.availableCardBrands[13]);
	});

	test("create token from card", async () => {
		const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
		assert.equal(64, cardToken.length);
	});

	describe("credit card one card", () => {

		test("create authorize one card", async () => {
			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
			requestLayersStyle.paymentMethods[0].card!.token = cardToken;
			requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
			const charge: LayersTransaction = await layers.createTransaction(requestLayersStyle);

			const payment: LayersCreditCardPaymentMethod = charge.payments[0] as LayersCreditCardPaymentMethod;

			assert.equal(1, charge.payments.length);
			assert.equal(1035, charge.amount);
			assert.equal(null, charge.refunded_amount);
			assert.equal(ChargeStatusTypes.AUTHORIZED, charge.status);
			/*
			payment.referenceId is the reference of the bempaggo transaction,
			this value is the same sent to the acquirer (rede, cielo) and used for reconciliation;
			This number is repeated only when there are refunds, disputes...
			*/
			assert.equal(1035, payment.amount);
			assert.equal(TransactionStatusTypes.AUTHORIZED, payment.status);
			assert.equal(0, payment.refunded_value);
			assert.equal('credit_card', payment.payment_method);
			assert.equal(sellerId.toString(), payment.recipient_id);
			assert.equal(2, payment.credit_card.installments);
			assert.equal(cardToken, payment.credit_card.token);
			assert.equal("06219385993", charge.customer_id);
		});
		test("create authorize and capture one card", async () => {
			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
			requestLayersStyle.paymentMethods[0].card!.token = cardToken;
			requestLayersStyle.code = new Date().getTime().toString();
			const response: LayersTransaction = await layers.createTransaction(requestLayersStyle);
			const responseCapture: LayersTransaction = await layers.chargeTransaction(response.referenceId);
			const payment: LayersCreditCardPaymentMethod = responseCapture.payments[0] as LayersCreditCardPaymentMethod;
			assert.equal(1, responseCapture.payments.length);
			assert.equal(1035, responseCapture.amount);
			assert.equal(null, responseCapture.refunded_amount);
			assert.equal(ChargeStatusTypes.PAY, responseCapture.status);
			assert.equal('credit_card', responseCapture.payments[0].payment_method);
			assert.equal(sellerId.toString(), responseCapture.payments[0].recipient_id);
			assert.equal(1035, payment.amount);
			assert.equal(TransactionStatusTypes.APPROVED, payment.status);
			assert.equal(0, payment.refunded_value);
			assert.equal(sellerId.toString(), payment.recipient_id);
			assert.equal(2, payment.credit_card.installments);
			assert.equal(cardToken, payment.credit_card.token);
			assert.equal("06219385993", responseCapture.customer_id);
		});

		test("create authorize and capture and refund", async () => {
			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
			requestLayersStyle.paymentMethods[0].card!.token = cardToken;
			requestLayersStyle.code = new Date().getTime().toString();
			const response: LayersTransaction = await layers.createTransaction(requestLayersStyle);
			await layers.chargeTransaction(response.referenceId);
			const refund = await layers.refundTransaction(response.referenceId)
			const paymentRefund: LayersCreditCardPaymentMethod = refund.payments[0] as LayersCreditCardPaymentMethod;
			const payment: LayersCreditCardPaymentMethod = refund.payments[1] as LayersCreditCardPaymentMethod;

			assert.equal(2, refund.payments.length);
			assert.equal(1035, refund.amount);
			assert.equal(1035, refund.refunded_amount);

			assert.equal("06219385993", refund.customer_id);
			assert.equal(ChargeStatusTypes.REFUND, refund.status);
			assert.equal('credit_card', payment.payment_method);
			assert.equal(sellerId.toString(), payment.recipient_id);

			assert.equal(1035, payment.amount);
			assert.equal(TransactionStatusTypes.APPROVED, payment.status);
			assert.equal(1035, payment.refunded_value);

			assert.equal(sellerId.toString(), payment.recipient_id);
			assert.equal(2, payment.credit_card.installments);
			assert.equal(cardToken, payment.credit_card.token);
			assert.equal('credit_card', paymentRefund.payment_method);
			assert.equal(sellerId.toString(), paymentRefund.recipient_id);
			assert.equal(-1035, paymentRefund.amount);
			assert.equal(TransactionStatusTypes.REFUND, paymentRefund.status);
			assert.equal(1035, paymentRefund.refunded_value);
			assert.equal(sellerId.toString(), paymentRefund.recipient_id);
			assert.equal(null, paymentRefund.credit_card.installments);
			assert.equal(cardToken, paymentRefund.credit_card.token);
		});

		test("create not Unauthorized", async () => {
			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
			requestLayersStyle.paymentMethods[0].card!.token = cardToken;
			requestLayersStyle.paymentMethods[0].total.amount = 58;
			requestLayersStyle.paymentMethods[0].recipients[0].total.amount = 58;
			requestLayersStyle.price.amount = 58;

			requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
			const charge: LayersTransaction = await layers.createTransaction(requestLayersStyle);

			const payment: LayersCreditCardPaymentMethod = charge.payments[0] as LayersCreditCardPaymentMethod;

			assert.equal(1, charge.payments.length);
			assert.equal(58, charge.amount);
			assert.equal(null, charge.refunded_amount);
			assert.equal(ChargeStatusTypes.PENDING, charge.status);
			assert.equal(58, payment.amount);
			assert.equal(TransactionStatusTypes.NOT_AUTHORIZED, payment.status);
			assert.equal(0, payment.refunded_value);
			assert.equal('credit_card', payment.payment_method);
			assert.equal(sellerId.toString(), payment.recipient_id);
			assert.equal(2, payment.credit_card.installments);
			assert.equal(cardToken, payment.credit_card.token);
			assert.equal("06219385993", charge.customer_id);
		});

		test("create bad request", async () => {
			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
			requestLayersStyle.paymentMethods[0].card!.token = cardToken;
			requestLayersStyle.paymentMethods[0].total.amount = 58;
			requestLayersStyle.paymentMethods[0].recipients[0].total.amount = 58;
			requestLayersStyle.price.amount = 59;

			requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
			try {
				await layers.createTransaction(requestLayersStyle);
				fail("error");
			} catch (error: any) {
				const errors = JSON.parse(error.value);
				assert.equal("Bad Request", error.message);
				assert.equal(400, error.status);
				assert.equal("The 'amount' field must be the sum of the 'amount' of payments.", errors[0].message);
				assert.equal("invalidAmounts", errors[0].field);
			}
			expect(async () => await layers.createTransaction(requestLayersStyle)).rejects.toThrowError("Bad Request");

		});


		describe("credit card two cards", () => {
			const requestLayersStyleTwoCards: LayersTransactionGroup = {
				code: "",
				price: {
					amount: 2035,
					currency: "BRL"
				},
				paymentMethods: [{
					installments: 2,
					bank_slip: undefined,
					method: "credit_card",
					recipients: [{ sourceId: 1, total: { amount: 1035, currency: "BRL" } }],
					card: {
						token: "aot",
						securityCode: "123"
					},
					total: { amount: 1035, currency: "BRL" }
				},
				{
					installments: 1,
					method: "credit_card",
					recipients: [{ sourceId: 1, total: { amount: 1000, currency: "BRL" } }],
					card: {
						token: "aot",
						securityCode: "123"
					},
					bank_slip: undefined,
					total: { amount: 1000, currency: "BRL" }
				}
				],

				sourceId: sellerId,
				customerPayload: {
					name: "Douglas Hiuara Longo Customer",
					email: "douglas@bempaggo.com.br",
					phone: { areaCode: 48, countryCode: 55, phoneNumber: 988657196 },
					birth: new Date("1992-02-29"),
					document: {
						kind: "cpf",
						value: "06219385993"
					},
					addresses: [],
				},
				urlNotification: undefined
			};

			const cardLayersSecond: LayersCustomerPaymentMethod = {
				document: undefined,
				token: undefined,
				title: "Non used",
				name: "Douglas Hiura Longo Visa",
				month: 1,
				year: 2029,
				number: "4235647728025682",
				brand: "VISA",
			}
			test("create authorize two card", async () => {
				const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
				const cardTokenSecond: string = await layers.tokenizeCard(cardLayersSecond, "Not Used");
				requestLayersStyleTwoCards.paymentMethods[0].card!.token = cardToken;
				requestLayersStyleTwoCards.paymentMethods[1].card!.token = cardTokenSecond;
				requestLayersStyleTwoCards.code = `o-${new Date().getTime().toString()}`;
				const charge: LayersTransaction = await layers.createTransaction(requestLayersStyleTwoCards);
				const payment: LayersCreditCardPaymentMethod = charge.payments[1] as LayersCreditCardPaymentMethod;
				const paymentSecond: LayersCreditCardPaymentMethod = charge.payments[0] as LayersCreditCardPaymentMethod;
				assert.equal(2, charge.payments.length);
				assert.equal(2035, charge.amount);
				assert.equal(null, charge.refunded_amount);
				assert.equal(ChargeStatusTypes.AUTHORIZED, charge.status);
				assert.equal("06219385993", charge.customer_id);
				/*
				payment.referenceId is the reference of the bempaggo transaction,
				this value is the same sent to the acquirer (rede, cielo) and used for reconciliation;
				This number is repeated only when there are refunds, disputes...
				*/
				assert.equal(1035, payment.amount);
				assert.equal(0, payment.refunded_value);
				assert.equal(TransactionStatusTypes.AUTHORIZED, paymentSecond.status);
				assert.equal('credit_card', payment.payment_method);
				assert.equal(sellerId.toString(), payment.recipient_id);
				assert.equal(2, payment.credit_card.installments);
				assert.equal(cardToken, payment.credit_card.token);

				assert.equal(1000, paymentSecond.amount);
				assert.equal(0, paymentSecond.refunded_value);
				assert.equal(TransactionStatusTypes.AUTHORIZED, paymentSecond.status);
				assert.equal('credit_card', paymentSecond.payment_method);
				assert.equal(sellerId.toString(), paymentSecond.recipient_id);
				assert.equal(1, paymentSecond.credit_card.installments);
				assert.equal(cardTokenSecond, paymentSecond.credit_card.token);


			});
			test("create authorize and capture two cards", async () => {
				const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
				const cardTokenSecond: string = await layers.tokenizeCard(cardLayersSecond, "Not Used");
				requestLayersStyleTwoCards.paymentMethods[0].card!.token = cardToken;
				requestLayersStyleTwoCards.paymentMethods[1].card!.token = cardTokenSecond;
				requestLayersStyleTwoCards.code = `o-${new Date().getTime().toString()}`;
				const charge: LayersTransaction = await layers.createTransaction(requestLayersStyleTwoCards);
				const responseCapture: LayersTransaction = await layers.chargeTransaction(charge.referenceId);
				const payment: LayersCreditCardPaymentMethod = responseCapture.payments[1] as LayersCreditCardPaymentMethod;
				const paymentSecond: LayersCreditCardPaymentMethod = responseCapture.payments[0] as LayersCreditCardPaymentMethod;
				assert.equal(2, responseCapture.payments.length);
				assert.equal(2035, responseCapture.amount);
				assert.equal(null, responseCapture.refunded_amount);
				assert.equal("06219385993", responseCapture.customer_id);
				assert.equal(ChargeStatusTypes.PAY, responseCapture.status);
				assert.equal('credit_card', responseCapture.payments[0].payment_method);
				assert.equal(sellerId.toString(), responseCapture.payments[0].recipient_id);
				assert.equal(1035, payment.amount);
				assert.equal(TransactionStatusTypes.APPROVED, payment.status);
				assert.equal(0, payment.refunded_value);
				assert.equal(sellerId.toString(), payment.recipient_id);
				assert.equal(2, payment.credit_card.installments);
				assert.equal(cardToken, payment.credit_card.token);

				assert.equal(1000, paymentSecond.amount);
				assert.equal(0, paymentSecond.refunded_value);
				assert.equal(TransactionStatusTypes.APPROVED, paymentSecond.status);
				assert.equal('credit_card', paymentSecond.payment_method);
				assert.equal(sellerId.toString(), paymentSecond.recipient_id);
				assert.equal(1, paymentSecond.credit_card.installments);
				assert.equal(cardTokenSecond, paymentSecond.credit_card.token);


			});

			test("create authorize and capture and refund two cards", async () => {
				const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
				const cardTokenSecond: string = await layers.tokenizeCard(cardLayersSecond, "Not Used");
				requestLayersStyleTwoCards.paymentMethods[0].card!.token = cardToken;
				requestLayersStyleTwoCards.paymentMethods[1].card!.token = cardTokenSecond;
				requestLayersStyleTwoCards.code = `o-${new Date().getTime().toString()}`;
				const charge: LayersTransaction = await layers.createTransaction(requestLayersStyleTwoCards);
				await layers.chargeTransaction(charge.referenceId);
				const refund = await layers.refundTransaction(charge.referenceId);
				const paymentRefundSecond: LayersCreditCardPaymentMethod = refund.payments[0] as LayersCreditCardPaymentMethod;
				const paymentRefund: LayersCreditCardPaymentMethod = refund.payments[1] as LayersCreditCardPaymentMethod;

				const paymentSecond: LayersCreditCardPaymentMethod = refund.payments[2] as LayersCreditCardPaymentMethod;
				const payment: LayersCreditCardPaymentMethod = refund.payments[3] as LayersCreditCardPaymentMethod;

				assert.equal(4, refund.payments.length);
				assert.equal(2035, refund.amount);
				assert.equal(2035, refund.refunded_amount);
				assert.equal("06219385993", refund.customer_id);
				assert.equal(ChargeStatusTypes.REFUND, refund.status);

				assert.equal(-1035, paymentRefund.amount);
				assert.equal(TransactionStatusTypes.REFUND, paymentRefund.status);
				assert.equal(1035, paymentRefund.refunded_value);
				assert.equal(sellerId.toString(), paymentRefund.recipient_id);
				assert.equal(null, paymentRefund.credit_card.installments);
				assert.equal(cardToken, paymentRefund.credit_card.token);


				assert.equal(-1000, paymentRefundSecond.amount);
				assert.equal(1000, paymentRefundSecond.refunded_value);
				assert.equal(TransactionStatusTypes.REFUND, paymentRefundSecond.status);
				assert.equal('credit_card', paymentRefundSecond.payment_method);
				assert.equal(sellerId.toString(), paymentRefundSecond.recipient_id);
				assert.equal(null, paymentRefundSecond.credit_card.installments);
				assert.equal(cardTokenSecond, paymentRefundSecond.credit_card.token);

				assert.equal(1035, payment.amount);
				assert.equal(TransactionStatusTypes.APPROVED, payment.status);
				assert.equal(1035, payment.refunded_value);
				assert.equal(sellerId.toString(), payment.recipient_id);
				assert.equal(2, payment.credit_card.installments);
				assert.equal(cardToken, payment.credit_card.token);
				assert.equal('credit_card', payment.payment_method);

				assert.equal(1000, paymentSecond.amount);
				assert.equal(1000, paymentSecond.refunded_value);
				assert.equal(TransactionStatusTypes.APPROVED, paymentSecond.status);
				assert.equal('credit_card', paymentSecond.payment_method);
				assert.equal(sellerId.toString(), paymentSecond.recipient_id);
				assert.equal(1, paymentSecond.credit_card.installments);
				assert.equal(cardTokenSecond, paymentSecond.credit_card.token);

			});
		});
	});
});