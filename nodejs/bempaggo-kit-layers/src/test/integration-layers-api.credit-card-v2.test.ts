
import BemPaggoSdk from "@/app/modules/layers/BemPaggoSDK";
import { LayersCreditCardPaymentMethod, LayersCustomerPaymentMethod, LayersTransaction } from "@/app/modules/layers/interfaces";
import { LayersTransactionGroup } from "@/app/modules/layers/transactionGroup";
import { ChargeStatusTypes, TransactionStatusTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";
import { assert, describe, test } from "vitest";
const sellerId: number = 1;
const requestLayersStyle: LayersTransactionGroup = {
	code: "",
	price: {
		amount: 1035,
		currency: "BRL"
	},
	paymentMethods: [{
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
	urlNotification: null
}


const cardLayers: LayersCustomerPaymentMethod = {
	title: "Non used",
	name: "Douglas Hiura Longo",
	month: 1,
	year: 2028,
	number: "5448280000000007",
	brand: "MASTERCARD",
}

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODYzNTMzOTgsImV4cCI6MTY4NjQxMzM5OH0.kQMwRw28siUo3PhnUWSi_Nqoi50CTSOypT8917X-Tm3YMhKNbrSOuYTtTu05iJZyI-xGl8OJB1fymc8LEun4Qg"; // needs to generate a token in portal
const url = "http://localhost:5000/api"
const layers: BemPaggoSdk = new BemPaggoSdk(url, token);

describe("How use it", () => {
	describe("create layers style", () => {

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


		test("create authorize", async () => {
			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
			requestLayersStyle.paymentMethods[0].card.token = cardToken;
			requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
			const response: LayersTransaction = await layers.createTransaction(requestLayersStyle);

			const payment: LayersCreditCardPaymentMethod = response.payments[0] as LayersCreditCardPaymentMethod;
			assert.equal(1, response.payments.length);
			assert.equal(ChargeStatusTypes.AUTHORIZED, response.status);
			assert.isNotNull(response.referenceId); // referenceId is the from bempaggo
			assert.equal('credit_card', payment.payment_method);
			assert.equal(sellerId.toString(), payment.recipient_id);
			assert.equal(sellerId.toString(), payment.);

			assert.equal(1035, payment.amount);
			assert.equal(TransactionStatusTypes.AUTHORIZED, payment.status);
			assert.equal(0, payment.refundedValue);
			assert.equal(sellerId.toString(), payment.recipient_id);
			assert.equal(2, payment.credit_card.installments);
			assert.equal(cardToken, payment.credit_card.token);
			assert.equal("06219385993", response.customer_id);
		});
		test("create authorize and capture one card", async () => {
			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
			requestLayersStyle.paymentMethods[0].card.token = cardToken;
			requestLayersStyle.code = new Date().getTime().toString();
			const response: LayersTransaction = await layers.createTransaction(requestLayersStyle);
			const responseCapture: LayersTransaction = await layers.chargeTransaction(response.referenceId);
			const payment: LayersCreditCardPaymentMethod = responseCapture.payments[0] as LayersCreditCardPaymentMethod;
			assert.equal(1, responseCapture.payments.length);
			assert.isNotNull(response.referenceId);
			assert.equal(ChargeStatusTypes.PAY, responseCapture.status);
			assert.equal('credit_card', responseCapture.payments[0].payment_method);
			assert.equal(sellerId.toString(), responseCapture.payments[0].recipient_id);
			assert.equal(1035, payment.amount);
			assert.equal(TransactionStatusTypes.APPROVED, payment.status);
			assert.equal(0, payment.refundedValue);
			assert.equal(sellerId.toString(), payment.recipient_id);
			assert.equal(2, payment.credit_card.installments);
			assert.equal(cardToken, payment.credit_card.token);
			assert.equal("06219385993", responseCapture.customer_id);
		});

		test("create authorize and capture and refund", async () => {
			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
			requestLayersStyle.paymentMethods[0].card.token = cardToken;
			requestLayersStyle.code = new Date().getTime().toString();
			const response: LayersTransaction = await layers.createTransaction(requestLayersStyle);
			await layers.chargeTransaction(response.referenceId);

			const refund = await layers.refundTransaction(response.referenceId)


			const paymentRefund: LayersCreditCardPaymentMethod = refund.payments[0] as LayersCreditCardPaymentMethod;
			const payment: LayersCreditCardPaymentMethod = refund.payments[1] as LayersCreditCardPaymentMethod;
			assert.equal(2, refund.payments.length);
			assert.isNotNull(response.referenceId);
			assert.equal("06219385993", refund.customer_id);
			assert.equal(ChargeStatusTypes.REFUND, refund.status);
			assert.equal('credit_card', payment.payment_method);
			assert.equal(sellerId.toString(), payment.recipient_id);
			assert.equal(1035, payment.amount);
			assert.equal(TransactionStatusTypes.APPROVED, payment.status);
			assert.equal(1035, payment.refundedValue);
			assert.equal(sellerId.toString(), payment.recipient_id);
			assert.equal(2, payment.credit_card.installments);
			assert.equal(cardToken, payment.credit_card.token);
			assert.equal('credit_card', paymentRefund.payment_method);
			assert.equal(sellerId.toString(), paymentRefund.recipient_id);
			assert.equal(-1035, paymentRefund.amount);
			assert.equal(TransactionStatusTypes.REFUND, paymentRefund.status);
			assert.equal(1035, paymentRefund.refundedValue);
			assert.equal(sellerId.toString(), paymentRefund.recipient_id);
			assert.equal(null, paymentRefund.credit_card.installments);
			assert.equal(cardToken, paymentRefund.credit_card.token);
		});


	});
});