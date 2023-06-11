
// import BemPaggoSdk from "@/app/modules/layers/BemPaggoSDK";
// import { LayersCreditCardPaymentMethod, LayersCustomerPaymentMethod, LayersTransaction } from "@/app/modules/layers/interfaces";
// import { LayersTransactionGroup } from "@/app/modules/layers/transactionGroup";
// import { ChargeStatusTypes, TransactionStatusTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";
// import { assert, describe, test } from "vitest";
// // with ❤️ feeling the bad smell on the air
// const sellerId: number = 1;
// const requestLayersStyle: LayersTransactionGroup = {
// 	code: "",
// 	price: {
// 		amount: 1035,
// 		currency: "BRL"
// 	},
// 	paymentMethods: [{
// 		installments: 2,
// 		method: "pix",
// 		recipients: [{ sourceId: 1, total: { amount: 1035, currency: "BRL" } }],
// 		card: {
// 			token: "aot",
// 			securityCode: "123"
// 		},
// 		total: { amount: 1035, currency: "BRL" }

// 	}],

// 	sourceId: sellerId,
// 	customerPayload: {
// 		name: "Douglas Hiuara Longo Customer",
// 		email: "douglas@bempaggo.com.br",
// 		phone: { areaCode: 48, countryCode: 55, phoneNumber: 988657196 },
// 		birth: new Date("1992-02-29"),
// 		document: {
// 			kind: "cpf",
// 			value: "06219385993"
// 		},
// 		addresses: [],
// 	},
// 	urlNotification: null
// }


// const cardLayers: LayersCustomerPaymentMethod = {
// 	title: "Non used",
// 	name: "Douglas Hiura Longo",
// 	month: 1,
// 	year: 2028,
// 	number: "5448280000000007",
// 	brand: "MASTERCARD",
// }

// const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODY0MzUxMzUsImV4cCI6MTY4NjQ5NTEzNX0.cn4_dlAOq2pFCcwfN8MP6DA0N2BNi1RcHWzR3iv8c5ZFC0ROk7B8Clrww62mRSBNmYuGOAxZkRamrNtMmnTDmw"; // needs to generate a token in portal
// const url = "http://localhost:5000/api"
// const layers: BemPaggoSdk = new BemPaggoSdk(url, token);

// describe("How use credit card charge", () => {

// 	describe("credit card", () => {

// 		test("brands", async () => {
// 			assert.equal(14, BemPaggoSdk.availableCardBrands.length);
// 			assert.equal("VISA", BemPaggoSdk.availableCardBrands[0]);
// 			assert.equal("MASTERCARD", BemPaggoSdk.availableCardBrands[1]);
// 			assert.equal("ELO", BemPaggoSdk.availableCardBrands[2]);
// 			assert.equal("AMEX", BemPaggoSdk.availableCardBrands[3]);
// 			assert.equal("DINERS", BemPaggoSdk.availableCardBrands[4]);
// 			assert.equal("AURA", BemPaggoSdk.availableCardBrands[5]);
// 			assert.equal("DISCOVER", BemPaggoSdk.availableCardBrands[6]);
// 			assert.equal("JCB", BemPaggoSdk.availableCardBrands[7]);
// 			assert.equal("HIPERCARD", BemPaggoSdk.availableCardBrands[8]);
// 			assert.equal("SOROCRED", BemPaggoSdk.availableCardBrands[9]);
// 			assert.equal("CABAL", BemPaggoSdk.availableCardBrands[10]);
// 			assert.equal("CREDSYSTEM", BemPaggoSdk.availableCardBrands[11]);
// 			assert.equal("BANESCARD", BemPaggoSdk.availableCardBrands[12]);
// 			assert.equal("CREDZ", BemPaggoSdk.availableCardBrands[13]);
// 		});

// 		test("create token from card", async () => {
// 			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
// 			assert.equal(64, cardToken.length);
// 		});


// 		test("create authorize", async () => {
// 			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
// 			requestLayersStyle.paymentMethods[0].card.token = cardToken;
// 			requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
// 			const charge: LayersTransaction = await layers.createTransaction(requestLayersStyle);

// 			const payment: LayersCreditCardPaymentMethod = charge.payments[0] as LayersCreditCardPaymentMethod;

// 			assert.equal(1, charge.payments.length);
// 			assert.equal(1035, charge.amount);
// 			assert.equal(null, charge.refunded_amount);
// 			assert.equal(ChargeStatusTypes.AUTHORIZED, charge.status);
// 			assert.isNotNull(charge.referenceId); // charge.referenceId is the charge reference from bempaggo
// 			assert.isNotNull(payment.reference_id);
// 			/*
// 			payment.referenceId is the reference of the bempaggo transaction,
// 			this value is the same sent to the acquirer (rede, cielo) and used for reconciliation;
// 			This number is repeated only when there are refunds, disputes...
// 			*/
// 			assert.equal(1035, payment.amount);
// 			assert.equal(TransactionStatusTypes.AUTHORIZED, payment.status);
// 			assert.equal(0, payment.refunded_value);
// 			assert.equal('credit_card', payment.payment_method);
// 			assert.equal(sellerId.toString(), payment.recipient_id);
// 			assert.equal(2, payment.credit_card.installments);
// 			assert.equal(cardToken, payment.credit_card.token);
// 			assert.equal("06219385993", charge.customer_id);
// 		});
// 		test("create authorize and capture one card", async () => {
// 			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
// 			requestLayersStyle.paymentMethods[0].card.token = cardToken;
// 			requestLayersStyle.code = new Date().getTime().toString();
// 			const response: LayersTransaction = await layers.createTransaction(requestLayersStyle);
// 			const responseCapture: LayersTransaction = await layers.chargeTransaction(response.referenceId);
// 			const payment: LayersCreditCardPaymentMethod = responseCapture.payments[0] as LayersCreditCardPaymentMethod;
// 			assert.equal(1, responseCapture.payments.length);
// 			assert.isNotNull(response.referenceId);
// 			assert.equal(1035, responseCapture.amount);
// 			assert.equal(null, responseCapture.refunded_amount);
// 			assert.equal(ChargeStatusTypes.PAY, responseCapture.status);
// 			assert.equal('credit_card', responseCapture.payments[0].payment_method);
// 			assert.equal(sellerId.toString(), responseCapture.payments[0].recipient_id);
// 			assert.equal(1035, payment.amount);
// 			assert.equal(TransactionStatusTypes.APPROVED, payment.status);
// 			assert.equal(0, payment.refunded_value);
// 			assert.equal(sellerId.toString(), payment.recipient_id);
// 			assert.equal(2, payment.credit_card.installments);
// 			assert.equal(cardToken, payment.credit_card.token);
// 			assert.equal("06219385993", responseCapture.customer_id);
// 		});

// 		test("create authorize and capture and refund", async () => {
// 			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
// 			requestLayersStyle.paymentMethods[0].card.token = cardToken;
// 			requestLayersStyle.code = new Date().getTime().toString();
// 			const response: LayersTransaction = await layers.createTransaction(requestLayersStyle);
// 			await layers.chargeTransaction(response.referenceId);
// 			const refund = await layers.refundTransaction(response.referenceId)
// 			const paymentRefund: LayersCreditCardPaymentMethod = refund.payments[0] as LayersCreditCardPaymentMethod;
// 			const payment: LayersCreditCardPaymentMethod = refund.payments[1] as LayersCreditCardPaymentMethod;

// 			assert.equal(2, refund.payments.length);
// 			assert.equal(1035, refund.amount);
// 			assert.equal(1035, refund.refunded_amount);

// 			assert.isNotNull(response.referenceId);
// 			assert.equal("06219385993", refund.customer_id);
// 			assert.equal(ChargeStatusTypes.REFUND, refund.status);
// 			assert.equal('credit_card', payment.payment_method);
// 			assert.equal(sellerId.toString(), payment.recipient_id);

// 			assert.equal(1035, payment.amount);
// 			assert.equal(TransactionStatusTypes.APPROVED, payment.status);
// 			assert.equal(1035, payment.refunded_value);

// 			assert.equal(sellerId.toString(), payment.recipient_id);
// 			assert.equal(2, payment.credit_card.installments);
// 			assert.equal(cardToken, payment.credit_card.token);
// 			assert.equal('credit_card', paymentRefund.payment_method);
// 			assert.equal(sellerId.toString(), paymentRefund.recipient_id);
// 			assert.equal(-1035, paymentRefund.amount);
// 			assert.equal(TransactionStatusTypes.REFUND, paymentRefund.status);
// 			assert.equal(1035, paymentRefund.refunded_value);
// 			assert.equal(sellerId.toString(), paymentRefund.recipient_id);
// 			assert.equal(null, paymentRefund.credit_card.installments);
// 			assert.equal(cardToken, paymentRefund.credit_card.token);
// 		});
// 	});
// });