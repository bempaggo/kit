

import { BempaggoAddressRequest, BempaggoOrderRequest, BempaggoCustomerRequest, BempaggoPhoneRequest, BempaggoTokenCardRequest, BempaggoCreditCardPaymentRequest } from "@/app/modules/entity/BempaggoRequest";
import { PaymentMethodTypes } from "@/app/modules/entity/Enum";
import { assert, assertType, describe, expect, test } from "vitest";

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

			assert.notEqual(charge.customer, null);
			assertType<BempaggoCustomerRequest>(charge.customer);
			assertType<BempaggoOrderRequest>(charge);
			assertType<BempaggoAddressRequest | undefined>(charge.customer.address);
			assertType<BempaggoPhoneRequest | undefined>(charge.customer.phone);
			assertType<BempaggoTokenCardRequest>((charge.payments[0] as BempaggoCreditCardPaymentRequest).cardToken!);

			assert.equal(Object.keys(charge).length, 5);
			assert.equal(charge.amount, 1000);
			assert.equal((charge.payments[0] as BempaggoCreditCardPaymentRequest).installments, 1);
			assert.equal(charge.orderReference, "order-1");
			assert.equal(charge.notificationUrl, "https://meusite.com.br/events");

			assert.equal(Object.keys(charge.customer).length, 6);
			assert.equal(charge.customer.name, "Tony Stark");
			assert.equal(charge.customer.document, "51190844001");
			assert.equal(charge.customer.birthdate, "2000-01-01");
			assert.equal(charge.customer.email, "tony.stark@bempaggo.com");
			assert.equal(Object.keys(charge.customer?.address ?? {}).length, 7);
			assert.equal(charge.customer.address?.street, "Rua Jair Hamms");
			assert.equal(charge.customer.address?.streetNumber, "38");
			assert.equal(charge.customer.address?.lineTwo, "Sala 101");
			assert.equal(charge.customer.address?.neighborhood, "Pedra Branca");
			assert.equal(charge.customer.address?.city, "Palhoça");
			assert.equal(charge.customer.address?.state, "SC");
			assert.equal(charge.customer.address?.zipCode, "88137084");
			assert.equal(Object.keys(charge.customer?.phone ?? {}).length, 3);
			assert.equal(charge.customer.phone?.countryCode, 55);
			assert.equal(charge.customer.phone?.areaCode, 48);
			assert.equal(charge.customer.phone?.number, 999999999);
			assert.equal(Object.keys((charge.payments[0] as BempaggoCreditCardPaymentRequest).cardToken!).length, 2);
			assert.equal((charge.payments[0] as BempaggoCreditCardPaymentRequest).cardToken!.cvv, "123");
			assert.equal((charge.payments[0] as BempaggoCreditCardPaymentRequest).cardToken!.token, "123");
			assert.equal(charge.payments[0].splits[0].amount, 1000);
			assert.equal(charge.payments[0].splits[0].sellerId, 1);
		});
	});
});

