
import BemPaggoSdk from "bempaggo-kit/lib/app/modules/layers/BemPaggoSDK";
import { LayersTransactionGroup } from "bempaggo-kit/lib/app/modules/layers/transactionGroup";
import { describe, expect, test } from "vitest";
import { LayersCustomerPaymentMethod, LayersTransaction } from "bempaggo-kit/lib/app/modules/layers/interfaces";

const requestLayersStyle: LayersTransactionGroup = {
	code: "",
	price: {
		amount: 1035,
		currency: "BRL"
	},
	paymentMethods: [{
		installments: 1,
		method: "credit_card",
		recipients: [{ sourceId: 1, total: { amount: 1035, currency: "BRL" } }],
		card: {
			token: "aot",
			securityCode: "123"
		},
	}],
	sourceId: 1,
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

const token = "https://sandbox.bempaggo.io/#/configurations/token"; // needs to generate a token in portal


describe("How use it", () => {
	describe("create layers style", () => {
		test("create token from card", async () => {
			const layers: BemPaggoSdk = new BemPaggoSdk("https://api-sandbox.bempaggo.io/api", token);
			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
			expect(cardToken).not.toBeNull();
		});
		test("create authorize", async () => {
			const layers: BemPaggoSdk = new BemPaggoSdk("https://api-sandbox.bempaggo.io/api", token);
			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
			requestLayersStyle.paymentMethods[0].card.token = cardToken;
			requestLayersStyle.code = new Date().getTime().toString();
			const response: LayersTransaction = await layers.createTransaction(requestLayersStyle);
			expect(response.referenceId).not.toBeNull();
			expect(response.payments[0].payment_method).toBe("credit_card");
			expect(JSON.stringify(response.payments[0])).contains(cardToken);
			expect(JSON.stringify(response)).contains("AUTHORIZED");
		});
		test("create authorize and capture", async () => {
			const layers: BemPaggoSdk = new BemPaggoSdk("https://api-sandbox.bempaggo.io/api", token);
			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
			requestLayersStyle.paymentMethods[0].card.token = cardToken;
			requestLayersStyle.code = new Date().getTime().toString();
			const response: LayersTransaction = await layers.createTransaction(requestLayersStyle);
			console.log(response.referenceId);
			const responseCapture: LayersTransaction = await layers.chargeTransaction(response.referenceId);
			expect(JSON.stringify(responseCapture)).contains("PAY");
		});


	});
});