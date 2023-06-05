
import BemPaggoSdk from "bempaggo-kit/lib/app/modules/layers/BemPaggoSDK";
import { LayersCustomerPaymentMethod, LayersTransaction } from "bempaggo-kit/lib/app/modules/layers/interfaces";
import { LayersTransactionGroup } from "bempaggo-kit/lib/app/modules/layers/transactionGroup";
import { describe, expect, test } from "vitest";

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
		total: { amount: 1035, currency: "BRL" }

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

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODU5OTAwMjYsImV4cCI6MTY4NjA1MDAyNn0.NGxRcs7TqGMXHT3LoI86dhnJQCkl4n0RDYZAZMdtLk5rnGZqDUW5p-6RTlgB3_B_NxkV3bNMLI2QnWNbHd0mQA"; // needs to generate a token in portal
const url = "http://localhost:5000/api";//"https://api-sandbox.bempaggo.io/api"
const layers: BemPaggoSdk = new BemPaggoSdk(url, token);

describe("How use it", () => {
	describe("create layers style", () => {
		test("create token from card", async () => {
			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
			expect(cardToken).not.toBeNull();
		});
		test("create authorize", async () => {
			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
			requestLayersStyle.paymentMethods[0].card.token = cardToken;
			requestLayersStyle.code = new Date().getTime().toString();
			const response: LayersTransaction = await layers.createTransaction(requestLayersStyle);
			expect(response.referenceId).not.toBeNull();
			expect(JSON.stringify(response.payments[0])).contains(cardToken);
			expect(JSON.stringify(response.payments[0])).contains("AUTHORIZED");
			expect(JSON.stringify(response.payments[0])).contains("credit_card");
			expect(JSON.stringify(response)).contains("AUTHORIZED");
		});
		test("create authorize and capture", async () => {
			const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
			requestLayersStyle.paymentMethods[0].card.token = cardToken;
			requestLayersStyle.code = new Date().getTime().toString();
			const response: LayersTransaction = await layers.createTransaction(requestLayersStyle);
			const responseCapture: LayersTransaction = await layers.chargeTransaction(response.referenceId);
			console.log(JSON.stringify(responseCapture));
			expect(JSON.stringify(responseCapture.payments[0])).contains(cardToken);
			expect(JSON.stringify(responseCapture.payments[0])).contains("APPROVED");
			expect(JSON.stringify(responseCapture.payments[0])).contains("credit_card");
			expect(JSON.stringify(responseCapture)).contains("PAY");
		});


	});
});