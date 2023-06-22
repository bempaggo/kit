

import assert from "assert";
import { BempaggoCreditCardPaymentRequest, BempaggoOrderRequest } from "../../../../src/app/modules/entity/BempaggoRequest";
describe("Charge Entity", () => {
	describe("Request", () => {

		test("charge", async () => {
			const charge: BempaggoOrderRequest = {
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
					} as BempaggoCreditCardPaymentRequest
				],
				amount: 1000,
				notificationUrl: "https://meusite.com.br/events",
			};

			assert.equal(5, Object.keys(charge).length);
			assert.equal(6, Object.keys(charge.customer).length);
			assert.equal(3, Object.keys(charge.customer!.phone as {}).length);
			assert.equal(7, Object.keys(charge.customer!.address as {}).length);
			assert.equal(2, Object.keys((charge.payments[0] as BempaggoCreditCardPaymentRequest).cardToken!).length);
			assert.equal(2, Object.keys((charge.payments[0] as BempaggoCreditCardPaymentRequest).splits[0]).length);

			assert.equal(55, charge.customer.phone!.countryCode);
			assert.equal(48, charge.customer.phone!.areaCode);
			assert.equal(999999999, charge.customer.phone!.number);
			assert.equal("Rua Jair Hamms", charge.customer.address!.street);
			assert.equal("38", charge.customer.address!.streetNumber);
			assert.equal("Sala 101", charge.customer.address!.lineTwo);
			assert.equal("Pedra Branca", charge.customer.address!.neighborhood);
			assert.equal("Palhoça", charge.customer.address!.city);
			assert.equal("SC", charge.customer.address!.state);
			assert.equal("88137084", charge.customer.address!.zipCode);
			assert.equal("Tony Stark", charge.customer.name);
			assert.equal("51190844001", charge.customer.document);
			assert.equal("2000-01-01", charge.customer.birthdate);
			assert.equal("tony.stark@bempaggo.com", charge.customer.email);
			assert.equal("order-1", charge.orderReference);
			assert.equal("CREDIT_CARD", charge.payments[0].paymentMethod);
			assert.equal(1, (charge.payments[0] as BempaggoCreditCardPaymentRequest).installments);
			assert.equal("123", (charge.payments[0] as BempaggoCreditCardPaymentRequest).cardToken!.cvv);
			assert.equal("123", (charge.payments[0] as BempaggoCreditCardPaymentRequest).cardToken!.token);
			assert.equal(1000, charge.payments[0].amount);
			assert.equal(2, charge.payments[0].splits.length);
			assert.equal(1000, charge.payments[0].splits[0].amount);
			assert.equal(1, charge.payments[0].splits[0].sellerId);
			assert.equal(1000, charge.amount);
			assert.equal("https://meusite.com.br/events", charge.notificationUrl);
		});
	});
});

