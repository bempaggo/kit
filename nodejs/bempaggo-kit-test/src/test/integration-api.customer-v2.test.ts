
import { BempaggoFactory } from "bempaggo-kit/lib/app/modules/Bempaggo";
import { BempaggoCardRequest, BempaggoCustomerRequest } from "bempaggo-kit/lib/app/modules/entity/BempaggoRequest";
import { BempaggoCardResponse, BempaggoCustomerResponse } from "bempaggo-kit/lib/app/modules/entity/BempaggoResponse";
import { Environments, CardBrandTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";
import { assert, describe, test } from "vitest";

const customer: BempaggoCustomerRequest = {
	name: "Carlos Cartola",
	document: "06219385993",
	email: "carlos@bempaggo.com",
	phone: {
		areaCode: 11,
		countryCode: 55,
		number: 999999999
	},
	birthdate: "1990-01-01",
	address: {
		street: "Rua do Zé",
		neighborhood: "Centro",
		city: "São Paulo",
		state: "SP",
		zipCode: "12345678",
		streetNumber: "123",
		lineTwo: "apto 123"
	}
}
const card: BempaggoCardRequest = {
	expiration: {
		month: 1, // jan
		year: 2028
	},
	holder: {
		name: "Carlos Cartola",
		document: "06219385993",

	},
	cardNumber: "5448280000000007",// master number
}
const token: string = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODY3NDQ1MjAsImV4cCI6MTY4NjgwNDUyMH0.XqkSuYjwYh-PUKFrjNawKKLivsWZAGJR6-o96qzIgp9YUqqbeJTrnG47CD47h4gMv8wMt4P74V9YFuKpIBUWPw"
const document: string = "06219385993"
const paymentMethod: BempaggoCardRequest = {
	expiration: {
		month: 1, // jan
		year: 2028
	},
	holder: {
		name: "Carlos Cartola",
		document: "06219385993",
	},
	cardNumber: "5448280000000007",// master number
}
describe("customer functions", async () => {

	describe("customer", async () => {
		test("create a customer", async () => {
			const customerResponse: BempaggoCustomerResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).createCustomer(customer);
			assert.equal(7, Object.keys(customerResponse).length);
		});
	});

	describe("customer payment method", async () => {
		test("brands", async () => {
			assert.equal("VISA", CardBrandTypes.VISA);
			assert.equal("MASTERCARD", CardBrandTypes.MASTERCARD);
			assert.equal("ELO", CardBrandTypes.ELO);
			assert.equal("AMEX", CardBrandTypes.AMEX);
			assert.equal("DINERS", CardBrandTypes.DINERS);
			assert.equal("AURA", CardBrandTypes.AURA);
			assert.equal("DISCOVER", CardBrandTypes.DISCOVER);
			assert.equal("JCB", CardBrandTypes.JCB);
			assert.equal("HIPERCARD", CardBrandTypes.HIPERCARD);
			assert.equal("SOROCRED", CardBrandTypes.SOROCRED);
			assert.equal("CABAL", CardBrandTypes.CABAL);
			assert.equal("CREDSYSTEM", CardBrandTypes.CREDSYSTEM);
			assert.equal("BANESCARD", CardBrandTypes.BANESCARD);
			assert.equal("CREDZ", CardBrandTypes.CREDZ);
		});
		test("tokenize a card", async () => {
			// token= rode a classe OneTimeV2EredeSantilanaSetupServiceTest.java e surgira um token
			const cardResponse: BempaggoCardResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).tokenizeCard(card, "no");
			assert.equal(64, cardResponse.token!.length);
		});
		test("create a card", async () => {
			const cardResponse: BempaggoCardResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).createCustomerPaymentMethod(document, paymentMethod);
		});
	});
});