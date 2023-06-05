

import { BempaggoAddressRequest, BempaggoOrderRequest, BempaggoCustomerRequest, BempaggoPhoneRequest, BempaggoTokenCardRequest } from "@/app/modules/entity/BempaggoRequest";
import { assertType, describe, expect, test } from "vitest";

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
						amount: 1000,
						cardToken: {
							cvv: "123", token: "asas-car-toke"
						},
						installments: 1, splits: [{ amount: 1000, sellerId: 1 }]
					}
				],
				amount: 1000,
				notificationUrl: "https://meusite.com.br/events",
			};

			expect(charge.customer).not.toBeNull();
			assertType<BempaggoCustomerRequest>(charge.customer);
			assertType<BempaggoOrderRequest>(charge);
			assertType<BempaggoAddressRequest | undefined>(charge.customer.address);
			assertType<BempaggoPhoneRequest | undefined>(charge.customer.phone);
			assertType<BempaggoTokenCardRequest>(charge.payments[0].cardToken!);

			expect(Object.keys(charge).length).toBe(7);
			expect(charge.amount).toBe(1000);
			expect(charge.payments[0].installments).toBe(1);
			expect(charge.orderReference).toBe(123456);
			expect(charge.notificationUrl).toBe("https://meusite.com.br/events");

			expect(Object.keys(charge.customer).length).toBe(6);
			expect(charge.customer.name).toBe("Tony Stark");
			expect(charge.customer.document).toBe("51190844001");
			expect(charge.customer.birthdate).toBe("2000-01-01");
			expect(charge.customer.email).toBe("tony.stark@bempaggo.com");
			expect(Object.keys(charge.customer?.address ?? {}).length).toBe(7);
			expect(charge.customer.address?.street).toBe("Rua Jair Hamms");
			expect(charge.customer.address?.streetNumber).toBe("38");
			expect(charge.customer.address?.lineTwo).toBe("Sala 101");
			expect(charge.customer.address?.neighborhood).toBe("Pedra Branca");
			expect(charge.customer.address?.city).toBe("Palhoça");
			expect(charge.customer.address?.state).toBe("SC");
			expect(charge.customer.address?.zipCode).toBe("88137084");
			expect(Object.keys(charge.customer?.phone ?? {}).length).toBe(3);
			expect(charge.customer.phone?.countryCode).toBe(55);
			expect(charge.customer.phone?.areaCode).toBe(48);
			expect(charge.customer.phone?.number).toBe(999999999);
			expect(Object.keys(charge.payments[0].cardToken!).length).toBe(2);
			expect(charge.payments[0].cardToken!.cvv).toBe("123");

		});


	});

});
