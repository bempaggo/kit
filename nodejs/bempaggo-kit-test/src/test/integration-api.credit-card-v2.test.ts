import { BempaggoFactory } from "bempaggo-kit/lib/app/modules/Bempaggo";
import { BempaggoCardRequest, BempaggoCreditCardPaymentRequest, BempaggoCustomerRequest, BempaggoOrderRequest } from "bempaggo-kit/lib/app/modules/entity/BempaggoRequest";
import { BempaggoCardResponse, BempaggoChargeResponse, BempaggoCreditCardTransactionResponse, BempaggoCustomerResponse } from "bempaggo-kit/lib/app/modules/entity/BempaggoResponse";
import { Environments, CardBrandTypes, PaymentMethodTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";
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
const token: string = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODY4MzU0MDEsImV4cCI6MTY4Njg5NTQwMX0.kCGdb5dQicqy3fmfZkDctz2SUCq1H-7Q3ciaAuM8Ong0pVTcPn5NpASn5rGgssrDBE06wx6Phg0hhf-OVc0bAw"
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

const order: BempaggoOrderRequest = {
	customer: {
		phone: {
			countryCode: 55,
			areaCode: 48,
			number: 999999999,
		},
		address: {
			street: "Rua Jair Hamms",
			streetNumber: "38",
			lineTwo: "Sala 101",
			neighborhood: "Pedra Branca",
			city: "Palhoça",
			state: "SC",
			zipCode: "88137084",
		},
		name: "Tony Stark",
		document: "51190844001",
		birthdate: "2000-01-01",
		email: "tony.stark@bempaggo.com",
	},
	orderReference: "order-1",
	payments: [
		{
			paymentMethod: PaymentMethodTypes.CREDIT_CARD,
			installments: 1,
			cardToken: {
				cvv: "123",
				token: "123",
			},
			amount: 1000,
			splits: [{
				amount: 1000,
				sellerId: 1
			}],
		}
	],
	amount: 1000,
	notificationUrl: "https://meusite.com.br/events",
}
describe("credit card functions", async () => {

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
	});

	describe("credit card methods", async () => {
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

		test("create and authorize a card", async () => {
			const customerResponse: BempaggoCustomerResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).createCustomer(customer);
			const cardResponse: BempaggoCardResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).createCustomerPaymentMethod(customerResponse.document!, paymentMethod);
			(order.payments[0] as BempaggoCreditCardPaymentRequest).cardToken.token = cardResponse.token!;
			order.orderReference = `o-${new Date().getTime().toString()}`
			const authorizedCard: BempaggoChargeResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).getChargeService().getCreditCardServiceable().createCreditCardCharge(1, order);

			console.log(authorizedCard);
			assert.equal(8, Object.keys(authorizedCard).length);
			assert.equal(26, Object.keys(authorizedCard.transactions[0]).length);
			assert.equal(3, Object.keys((authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).affiliate!).length);
			assert.equal(1, Object.keys((authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).establishment!).length);
			assert.equal(7, Object.keys((authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).card).length);
			assert.equal(2, Object.keys((authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).card.expiration).length);
			assert.equal(2, Object.keys((authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder).length);
			assert.equal(2, Object.keys(authorizedCard.customer).length);
			assert.equal(3, Object.keys(authorizedCard.order).length);
			assert.equal(3, Object.keys(authorizedCard.order.affiliate!).length);
			
			assert.isNotNull(authorizedCard.id);
			assert.equal("AUTHORIZED", authorizedCard.status);
			assert.equal(1000, authorizedCard.value);
			assert.isNull(authorizedCard.refundedAmount);
			assert.equal("CREDIT_CARD", authorizedCard.transactions[0].paymentMethod);
			assert.isNotNull(authorizedCard.transactions[0].id);
			assert.equal(1000, authorizedCard.transactions[0].value);
			assert.isNull(authorizedCard.transactions[0].paidValue);
			assert.isNull((authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).refundValue);
			assert.equal("LOOSE", (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).type);
			assert.equal("AUTHORIZED", (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).status);
			assert.isNotNull((authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).transactionDate);
			assert.equal(1, (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).affiliate?.id);
			assert.equal("Up Negócios", (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).affiliate?.name);
			assert.equal("Up Negócios LTDA.", (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).affiliate?.businessName);
			assert.equal(1, (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).establishment.id);
			assert.equal("00", (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).returnCode);
			assert.equal("Sucesso.", (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).returnMessage);
			assert.isNotNull((authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).transactionKey);
			assert.isNull((authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).refundRason);
			assert.isNotNull((authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).transactionReference);
			assert.equal("544828", (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).card.bin);
			assert.equal("MASTERCARD", (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).card.brand);
			assert.equal(1, (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).card.expiration.month);
			assert.equal(2028, (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).card.expiration.year);
			assert.equal("Carlos Cartola", (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.name);
			assert.equal("06219385993", (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).card.holder.document);
			assert.equal("0007", (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).card.lastFour);
			assert.isNotNull((authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).card.token);
			assert.equal(1, (authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse).installments);
			assert.equal(2, authorizedCard.customer.id);
			assert.equal("51190844001", authorizedCard.customer.document);
			assert.isNotNull(authorizedCard.order.id);
			assert.isNotNull(authorizedCard.order.orderReference);
			assert.equal(1, authorizedCard.order.affiliate?.id);
			assert.equal("Up Negócios", authorizedCard.order.affiliate?.name);
			assert.equal("Up Negócios LTDA.", authorizedCard.order.affiliate?.businessName);
		});

	});
});