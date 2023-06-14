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
			assert.equal(3, Object.keys(customerResponse.phone!).length);
			assert.equal(8, Object.keys(customerResponse.address!).length);
			assert.isNotNull(customerResponse.id);
			assert.equal("Carlos Cartola", customerResponse.name);
			assert.equal("carlos@bempaggo.com", customerResponse.email);
			assert.equal("06219385993", customerResponse.document);
			assert.equal("55", customerResponse.phone?.countryCode);
			assert.equal("999999999", customerResponse.phone?.number);
			assert.equal("11", customerResponse.phone?.areaCode);
			assert.equal("1990-01-01", customerResponse.birthdate);
			assert.equal("Rua do Zé", customerResponse.address?.street);
			assert.equal("apto 123", customerResponse.address?.lineTwo);
			assert.equal("São Paulo", customerResponse.address?.city);
			assert.equal("12345678", customerResponse.address?.zipCode);
			assert.equal("123", customerResponse.address?.streetNumber);
			assert.equal("SP", customerResponse.address?.state);
			assert.equal("Centro", customerResponse.address?.neighborhood);
		});
		test("find a customer by document", async () => {
			const customerResponse: BempaggoCustomerResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).createCustomer(customer);
			const foundCustomerResponse: BempaggoCustomerResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).findCustomerByDocument(customerResponse.document as string);
			assert.equal(7, Object.keys(foundCustomerResponse).length);
			assert.equal(3, Object.keys(foundCustomerResponse.phone!).length);
			assert.equal(8, Object.keys(foundCustomerResponse.address!).length);
			assert.isNotNull(foundCustomerResponse.id);
			assert.equal("Carlos Cartola", foundCustomerResponse.name);
			assert.equal("carlos@bempaggo.com", foundCustomerResponse.email);
			assert.equal("06219385993", foundCustomerResponse.document);
			assert.equal("55", foundCustomerResponse.phone?.countryCode);
			assert.equal("999999999", foundCustomerResponse.phone?.number);
			assert.equal("11", foundCustomerResponse.phone?.areaCode);
			assert.equal("1990-01-01", foundCustomerResponse.birthdate);
			assert.equal("Rua do Zé", foundCustomerResponse.address?.street);
			assert.equal("apto 123", foundCustomerResponse.address?.lineTwo);
			assert.equal("São Paulo", foundCustomerResponse.address?.city);
			assert.equal("12345678", foundCustomerResponse.address?.zipCode);
			assert.equal("123", foundCustomerResponse.address?.streetNumber);
			assert.equal("SP", foundCustomerResponse.address?.state);
			assert.equal("Centro", foundCustomerResponse.address?.neighborhood);
		});
		test("update customer", async () => {
			const newCustomer: BempaggoCustomerRequest = {
				name: "Carlos Cartolasso",
				document: "06219385993",
				email: "carlota@bempaggo.bol",
				phone: {
					areaCode: 31,
					countryCode: 55,
					number: 991881234
				},
				birthdate: "1994-10-12",
				address: {
					street: "Rua Ramalhete",
					neighborhood: "Meio",
					city: "Beaga",
					state: "BH",
					zipCode: "31570120",
					streetNumber: "343",
					lineTwo: "casa 2"
				}
			};
			const customerResponse: BempaggoCustomerResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).createCustomer(customer);
			const updatedCustomer: BempaggoCustomerResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).updateCustomer(customerResponse.document!, newCustomer);

			assert.equal(7, Object.keys(updatedCustomer).length);
			assert.equal(3, Object.keys(updatedCustomer.phone!).length);
			assert.equal(8, Object.keys(updatedCustomer.address!).length);
			assert.isNotNull(updatedCustomer.id);
			assert.equal(customerResponse.id, updatedCustomer.id);
			assert.equal("Carlos Cartolasso", updatedCustomer.name);
			assert.equal("carlota@bempaggo.bol", updatedCustomer.email);
			assert.equal("06219385993", updatedCustomer.document);
			assert.equal("55", updatedCustomer.phone?.countryCode);
			assert.equal("991881234", updatedCustomer.phone?.number);
			assert.equal("31", updatedCustomer.phone?.areaCode);
			assert.equal("1994-10-12", updatedCustomer.birthdate);
			assert.equal("Rua Ramalhete", updatedCustomer.address?.street);
			assert.equal("casa 2", updatedCustomer.address?.lineTwo);
			assert.equal("Beaga", updatedCustomer.address?.city);
			assert.equal("31570120", updatedCustomer.address?.zipCode);
			assert.equal("343", updatedCustomer.address?.streetNumber);
			assert.equal("BH", updatedCustomer.address?.state);
			assert.equal("Meio", updatedCustomer.address?.neighborhood);
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
		test("create a card", async () => {
			const cardResponse: BempaggoCardResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).createCustomerPaymentMethod(document, paymentMethod);
			//TODO: o response que vem é na verdade o response do CardV2Response e não do BempaggoCardResponse. Id, year e month diferem. 
			assert.equal(7, Object.keys(cardResponse).length);
			assert.equal(2, Object.keys(cardResponse.holder).length);
			assert.equal(2, Object.keys(cardResponse.expiration).length);
			assert.equal("Carlos Cartola", cardResponse.holder.name);
			assert.equal("06219385993", cardResponse.holder.document);
			assert.equal("544828", cardResponse.bin);
			assert.equal("0007", cardResponse.lastFour);
			assert.equal(2028, cardResponse.expiration.year);
			assert.equal(1, cardResponse.expiration.month);
			assert.equal("MASTERCARD", cardResponse.brand);
			assert.equal(64, cardResponse.token!.length);
		});
		test("tokenize a card", async () => {
			const cardResponse: BempaggoCardResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).tokenizeCard(card, "no");
			//TODO: o tokenizeCard devolve um cardResponse sem id. Seria o certo devolver so o token? Ou fazer igual o createCustomerPaymentMethod e devolver um CardResponse completo?
			assert.equal(7, Object.keys(cardResponse).length);
			assert.equal(2, Object.keys(cardResponse.holder).length);
			assert.equal(2, Object.keys(cardResponse.expiration).length);
			assert.equal("Carlos Cartola", cardResponse.holder.name);
			assert.equal("06219385993", cardResponse.holder.document);
			assert.equal("544828", cardResponse.bin);
			assert.equal("0007", cardResponse.lastFour);
			assert.equal(2028, cardResponse.expiration.year);
			assert.equal(1, cardResponse.expiration.month);
			assert.equal("MASTERCARD", cardResponse.brand);
			assert.equal(64, cardResponse.token!.length);
			assert.equal(64, cardResponse.token!.length);
		});

	});
});