import assert from "assert";
import { BempaggoCardRequest, BempaggoCreditCardPaymentRequest, BempaggoCustomerRequest, BempaggoOrderRequest } from "bempaggo-kit/lib/app/modules/entity/BempaggoRequest";
import { BempaggoCardResponse, BempaggoChargeResponse, BempaggoCreditCardTransactionResponse, BempaggoCustomerResponse } from "bempaggo-kit/lib/app/modules/entity/BempaggoResponse";
import { CardBrandTypes, PaymentMethodTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";
import { bempaggoFactory } from "./setup";

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
describe("credit card functions", () => {

	describe("customer", () => {
		test("create a customer", async () => {
			const customerResponse: BempaggoCustomerResponse = await bempaggoFactory.createCustomer(customer);
			assert.equal(7, Object.keys(customerResponse).length);
			assert.equal(3, Object.keys(customerResponse.phone!).length);
			assert.equal(8, Object.keys(customerResponse.address!).length);
			assert.notEqual(null, customerResponse.id);
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

	describe("credit card methods", () => {
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
			const cardResponse: BempaggoCardResponse = await bempaggoFactory
				.createCustomerPaymentMethod(document, paymentMethod);
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

		test("find order not found", async () => {
			const charge: BempaggoChargeResponse[] = await bempaggoFactory
				.getChargeService().getChargeFinder().findChargesByOrderReferenceId("not-found");

			assert.deepEqual([], charge);
		});
		test("tokenize a card", async () => {
			const cardResponse: BempaggoCardResponse = await bempaggoFactory
				.tokenizeCard(card, "no");
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

		// TODO: response do back retorna atributos a mais que nao possui na nossa interface BempaggoChargeResponse
		test("create and authorize a card", async () => {
			const customerResponse: BempaggoCustomerResponse = await bempaggoFactory
				.createCustomer(customer);
			const cardResponse: BempaggoCardResponse = await bempaggoFactory
				.createCustomerPaymentMethod(customerResponse.document!, paymentMethod);
			const payment: BempaggoCreditCardPaymentRequest = order.payments[0] as BempaggoCreditCardPaymentRequest
			payment.cardToken.token = cardResponse.token!;
			order.orderReference = `o-${new Date().getTime().toString()}`
			const authorizedCard: BempaggoChargeResponse = await bempaggoFactory
				.getChargeService().getCreditCardServiceable().createCreditCardCharge(1, order);
			const transaction = authorizedCard.transactions[0] as BempaggoCreditCardTransactionResponse;

			assert.equal(8, Object.keys(authorizedCard).length);
			assert.equal(26, Object.keys(transaction).length);
			assert.equal(3, Object.keys(transaction.affiliate!).length);
			assert.equal(1, Object.keys(transaction.establishment!).length);
			assert.equal(7, Object.keys(transaction.card).length);
			assert.equal(2, Object.keys(transaction.card.expiration).length);
			assert.equal(2, Object.keys(transaction.card.holder).length);
			assert.equal(2, Object.keys(authorizedCard.customer).length);
			assert.equal(3, Object.keys(authorizedCard.order).length);
			assert.equal(3, Object.keys(authorizedCard.order.affiliate!).length);

			assert.notEqual(null, authorizedCard.id);
			assert.equal("AUTHORIZED", authorizedCard.status);
			assert.equal(1000, authorizedCard.value);
			assert.equal(null, authorizedCard.refundedAmount);
			assert.equal("CREDIT_CARD", transaction.paymentMethod);
			assert.notEqual(null, transaction.id);
			assert.equal(1000, transaction.value);
			assert.equal(null, transaction.paidValue);
			assert.equal(null, transaction.refundValue);
			assert.equal("LOOSE", transaction.type);
			assert.equal("AUTHORIZED", transaction.status);
			assert.notEqual(null, transaction.transactionDate);
			assert.notEqual(null, transaction.affiliate?.id);
			assert.equal("Up Negócios", transaction.affiliate?.name);
			assert.equal("Up Negócios LTDA.", transaction.affiliate?.businessName);
			assert.equal(1, transaction.establishment.id);
			assert.equal("00", transaction.returnCode);
			assert.equal("Sucesso.", transaction.returnMessage);
			assert.notEqual(null, transaction.transactionKey);
			assert.equal(null, transaction.refundReason);
			assert.notEqual(null, transaction.transactionReference);
			assert.equal("544828", transaction.card.bin);
			assert.equal("MASTERCARD", transaction.card.brand);
			assert.equal(1, transaction.card.expiration.month);
			assert.equal(2028, transaction.card.expiration.year);
			assert.equal("Carlos Cartola", transaction.card.holder.name);
			assert.equal("06219385993", transaction.card.holder.document);
			assert.equal("0007", transaction.card.lastFour);
			assert.notEqual(null, transaction.card.token);
			assert.equal(1, transaction.installments);
			assert.notEqual(null, authorizedCard.customer.id);
			assert.equal("51190844001", authorizedCard.customer.document);
			assert.notEqual(null, authorizedCard.order.id);
			assert.notEqual(null, authorizedCard.order.orderReference);
			assert.equal(1, authorizedCard.order.affiliate?.id);
			assert.equal("Up Negócios", authorizedCard.order.affiliate?.name);
			assert.equal("Up Negócios LTDA.", authorizedCard.order.affiliate?.businessName);
		});

		// TODO: response do back retorna atributos a mais que nao possui na nossa interface BempaggoChargeResponse
		test("create, authorize and capture card", async () => {
			const customerResponse: BempaggoCustomerResponse = await bempaggoFactory.createCustomer(customer);
			const cardResponse: BempaggoCardResponse = await bempaggoFactory.createCustomerPaymentMethod(customerResponse.document!, paymentMethod);
			const payment: BempaggoCreditCardPaymentRequest = order.payments[0] as BempaggoCreditCardPaymentRequest
			payment.cardToken.token = cardResponse.token!;
			order.orderReference = `o-${new Date().getTime().toString()}`
			const authorizedCharge: BempaggoChargeResponse = await bempaggoFactory.getChargeService().getCreditCardServiceable().createCreditCardCharge(1, order);
			const capturedCharge: BempaggoChargeResponse = await bempaggoFactory.getChargeService().getCreditCardServiceable().captureCreditCardCharge(authorizedCharge.id);

			const transaction: BempaggoCreditCardTransactionResponse = capturedCharge.transactions[0] as BempaggoCreditCardTransactionResponse;
			assert.equal(8, Object.keys(capturedCharge).length);
			assert.equal(26, Object.keys(transaction).length);
			assert.equal(3, Object.keys(transaction.affiliate!).length);
			assert.equal(1, Object.keys(transaction.establishment!).length);
			assert.equal(7, Object.keys(transaction.card).length);
			assert.equal(2, Object.keys(transaction.card.expiration).length);
			assert.equal(2, Object.keys(transaction.card.holder).length);
			assert.equal(2, Object.keys(capturedCharge.customer).length);
			assert.equal(3, Object.keys(capturedCharge.order).length);
			assert.equal(3, Object.keys(capturedCharge.order.affiliate!).length);

			assert.notEqual(null, capturedCharge.id);
			assert.equal("PAY", capturedCharge.status);
			assert.equal(1000, capturedCharge.value);
			assert.equal(null, capturedCharge.refundedAmount);
			assert.equal("CREDIT_CARD", transaction.paymentMethod);
			assert.notEqual(null, transaction.id);
			assert.equal(1000, transaction.value);
			assert.equal(1000, transaction.paidValue);
			assert.equal(null, transaction.refundValue);
			assert.equal("LOOSE", transaction.type);
			assert.equal("APPROVED", transaction.status);
			assert.notEqual(null, transaction.transactionDate);
			assert.notEqual(null, transaction.affiliate?.id);
			assert.equal("Up Negócios", transaction.affiliate?.name);
			assert.equal("Up Negócios LTDA.", transaction.affiliate?.businessName);
			assert.equal(1, transaction.establishment.id);
			assert.equal("00", transaction.returnCode);
			assert.equal("Sucesso.", transaction.returnMessage);
			assert.notEqual(null, transaction.transactionKey);
			assert.equal(null, transaction.refundReason);
			assert.notEqual(null, transaction.transactionReference);
			assert.equal("544828", transaction.card.bin);
			assert.equal("MASTERCARD", transaction.card.brand);
			assert.equal(1, transaction.card.expiration.month);
			assert.equal(2028, transaction.card.expiration.year);
			assert.equal("Carlos Cartola", transaction.card.holder.name);
			assert.equal("06219385993", transaction.card.holder.document);
			assert.equal("0007", transaction.card.lastFour);
			assert.notEqual(null, transaction.card.token);
			assert.equal(1, transaction.installments);
			assert.notEqual(null, capturedCharge.customer.id);
			assert.equal("51190844001", capturedCharge.customer.document);
			assert.notEqual(null, capturedCharge.order.id);
			assert.notEqual(null, capturedCharge.order.orderReference);
			assert.equal(1, capturedCharge.order.affiliate?.id);
			assert.equal("Up Negócios", capturedCharge.order.affiliate?.name);
			assert.equal("Up Negócios LTDA.", capturedCharge.order.affiliate?.businessName);
		});

		// TODO: response do back retorna atributos a mais que nao possui na nossa interface BempaggoChargeResponse
		test("create authorize and capture and refund", async () => {
			const creditCardServiceable = bempaggoFactory.getChargeService().getCreditCardServiceable();
			const customerResponse: BempaggoCustomerResponse = await bempaggoFactory.createCustomer(customer);
			const cardResponse: BempaggoCardResponse = await bempaggoFactory.createCustomerPaymentMethod(customerResponse.document!, paymentMethod);
			const payment: BempaggoCreditCardPaymentRequest = order.payments[0] as BempaggoCreditCardPaymentRequest
			payment.cardToken.token = cardResponse.token!;
			order.orderReference = `o-${new Date().getTime().toString()}`
			const authorizedCharge: BempaggoChargeResponse = await creditCardServiceable.createCreditCardCharge(1, order);
			const capturedCharge: BempaggoChargeResponse = await creditCardServiceable.captureCreditCardCharge(authorizedCharge.id);
			const refundedCharge: BempaggoChargeResponse = await creditCardServiceable.refundCreditCardCharge(capturedCharge.id);

			const transaction: BempaggoCreditCardTransactionResponse = refundedCharge.transactions[0] as BempaggoCreditCardTransactionResponse;
			assert.equal(8, Object.keys(refundedCharge).length);
			assert.equal(26, Object.keys(transaction).length);
			assert.equal(3, Object.keys(transaction.affiliate!).length);
			assert.equal(1, Object.keys(transaction.establishment!).length);
			assert.equal(7, Object.keys(transaction.card).length);
			assert.equal(2, Object.keys(transaction.card.expiration).length);
			assert.equal(2, Object.keys(transaction.card.holder).length);
			assert.equal(2, Object.keys(refundedCharge.customer).length);
			assert.equal(3, Object.keys(refundedCharge.order).length);
			assert.equal(3, Object.keys(refundedCharge.order.affiliate!).length);

			assert.notEqual(null, refundedCharge.id);
			assert.equal("REFUND", refundedCharge.status);
			assert.equal(1000, refundedCharge.value);
			assert.equal(1000, refundedCharge.refundedAmount);
			assert.equal("CREDIT_CARD", transaction.paymentMethod);

			assert.notEqual(null, transaction.id);
			assert.equal(-1000, transaction.value);
			assert.equal(1000, transaction.paidValue);
			assert.equal(1000, transaction.refundValue);
			assert.equal("REFUND", transaction.type);
			assert.equal("REFUND", transaction.status);
			assert.notEqual(null, transaction.transactionDate);
			assert.notEqual(null, transaction.affiliate?.id);
			assert.equal("Up Negócios", transaction.affiliate?.name);
			assert.equal("Up Negócios LTDA.", transaction.affiliate?.businessName);
			assert.equal(1, transaction.establishment.id);
			assert.equal("00", transaction.returnCode);
			assert.equal("Estorno realizado com sucesso.", transaction.returnMessage);

			assert.notEqual(null, transaction.transactionKey);
			assert.equal("OTHERS", transaction.refundReason);

			assert.notEqual(null, transaction.transactionReference);
			assert.equal("544828", transaction.card.bin);
			assert.equal("MASTERCARD", transaction.card.brand);
			assert.equal(1, transaction.card.expiration.month);
			assert.equal(2028, transaction.card.expiration.year);
			assert.equal("Carlos Cartola", transaction.card.holder.name);
			assert.equal("06219385993", transaction.card.holder.document);
			assert.equal("0007", transaction.card.lastFour);
			assert.notEqual(null, transaction.card.token);
			assert.equal(null, transaction.installments);
			assert.notEqual(null, refundedCharge.customer.id);
			assert.equal("51190844001", refundedCharge.customer.document);
			assert.notEqual(null, refundedCharge.order.id);
			assert.notEqual(null, refundedCharge.order.orderReference);
			assert.equal(1, refundedCharge.order.affiliate?.id);
			assert.equal("Up Negócios", refundedCharge.order.affiliate?.name);
			assert.equal("Up Negócios LTDA.", refundedCharge.order.affiliate?.businessName);
		}, 10000);

		// TODO: response do back retorna atributos a mais que nao possui na nossa interface BempaggoChargeResponse
		test("create unauthorized", async () => {
			const creditCardServiceable = bempaggoFactory.getChargeService().getCreditCardServiceable();
			const customerResponse: BempaggoCustomerResponse = await bempaggoFactory.createCustomer(customer);
			const cardResponse: BempaggoCardResponse = await bempaggoFactory.createCustomerPaymentMethod(customerResponse.document!, paymentMethod);

			const payment: BempaggoCreditCardPaymentRequest = order.payments[0] as BempaggoCreditCardPaymentRequest
			payment.cardToken.token = cardResponse.token!;
			order.payments[0].amount = 58;
			order.payments[0].splits[0].amount = 58;
			order.amount = 58;

			order.orderReference = `o-${new Date().getTime().toString()}`
			const unauthorizedCharge: BempaggoChargeResponse = await creditCardServiceable.createCreditCardCharge(1, order);

			const transaction: BempaggoCreditCardTransactionResponse = unauthorizedCharge.transactions[0] as BempaggoCreditCardTransactionResponse;
			assert.equal(8, Object.keys(unauthorizedCharge).length);
			assert.equal(26, Object.keys(transaction).length);
			assert.equal(3, Object.keys(transaction.affiliate!).length);
			assert.equal(1, Object.keys(transaction.establishment!).length);
			assert.equal(7, Object.keys(transaction.card).length);
			assert.equal(2, Object.keys(transaction.card.expiration).length);
			assert.equal(2, Object.keys(transaction.card.holder).length);
			assert.equal(2, Object.keys(unauthorizedCharge.customer).length);
			assert.equal(3, Object.keys(unauthorizedCharge.order).length);
			assert.equal(3, Object.keys(unauthorizedCharge.order.affiliate!).length);

			assert.notEqual(null, unauthorizedCharge.id);
			assert.equal("PENDING", unauthorizedCharge.status);
			assert.equal(58, unauthorizedCharge.value);
			assert.equal(null, unauthorizedCharge.refundedAmount);
			assert.equal("CREDIT_CARD", transaction.paymentMethod);
			assert.notEqual(null, transaction.id);
			assert.equal(58, transaction.value);
			assert.equal(null, transaction.paidValue);
			assert.equal(null, transaction.refundValue);
			assert.equal("LOOSE", transaction.type);
			assert.equal("NOT_AUTHORIZED", transaction.status);
			assert.notEqual(null, transaction.transactionDate);
			assert.notEqual(null, transaction.affiliate?.id);
			assert.equal("Up Negócios", transaction.affiliate?.name);
			assert.equal("Up Negócios LTDA.", transaction.affiliate?.businessName);
			assert.equal(1, transaction.establishment.id);
			assert.equal("58", transaction.returnCode);
			assert.equal("Não autorizado. Entre em contato com o emissor.", transaction.returnMessage);
			assert.notEqual(null, transaction.transactionKey);
			assert.equal(null, transaction.refundReason);
			assert.notEqual(null, transaction.transactionReference);
			assert.equal("544828", transaction.card.bin);
			assert.equal("MASTERCARD", transaction.card.brand);
			assert.equal(1, transaction.card.expiration.month);
			assert.equal(2028, transaction.card.expiration.year);
			assert.equal("Carlos Cartola", transaction.card.holder.name);
			assert.equal("06219385993", transaction.card.holder.document);
			assert.equal("0007", transaction.card.lastFour);
			assert.notEqual(null, transaction.card.token);
			assert.equal(1, transaction.installments);
			assert.notEqual(null, unauthorizedCharge.customer.id);
			assert.equal("51190844001", unauthorizedCharge.customer.document);
			assert.notEqual(null, unauthorizedCharge.order.id);
			assert.notEqual(null, unauthorizedCharge.order.orderReference);
			assert.notEqual(null, unauthorizedCharge.order.affiliate?.id);
			assert.equal("Up Negócios", unauthorizedCharge.order.affiliate?.name);
			assert.equal("Up Negócios LTDA.", unauthorizedCharge.order.affiliate?.businessName);
		});

		test("bad request", async () => {
			const creditCardServiceable = bempaggoFactory.getChargeService().getCreditCardServiceable();
			const customerResponse: BempaggoCustomerResponse = await bempaggoFactory.createCustomer(customer);
			const cardResponse: BempaggoCardResponse = await bempaggoFactory.createCustomerPaymentMethod(customerResponse.document!, paymentMethod);
			const payment: BempaggoCreditCardPaymentRequest = order.payments[0] as BempaggoCreditCardPaymentRequest;

			payment.cardToken.token = cardResponse.token!;
			order.payments[0].amount = 58;
			order.payments[0].splits[0].amount = 58;
			order.amount = 57;

			order.orderReference = `o-${new Date().getTime().toString()}`

			const errors = {
				status: 400,
				message: "Bad Request",
				errors: [{
					message: "The 'amount' field must be the sum of the 'amount' of payments.",
					field: "invalidAmounts"
				}]
			}
			//TODO: o suite do vitest não consegue testar os valores do 'value' dentro do objeto de erro, ver posteriormente se tem um outro jeito
			try {
				await creditCardServiceable.createCreditCardCharge(1, order);
			} catch (error: any) {
				const errors = JSON.parse(error.value);
				assert.equal("Bad Request", error.message);
				assert.equal(400, error.status);
				assert.equal("The 'amount' field must be the sum of the 'amount' of payments.", errors[0].message);
				assert.equal("invalidAmounts", errors[0].field);
			}
			expect(async () => await creditCardServiceable.createCreditCardCharge(1, order)).rejects.toThrowError("Bad Request");

		});

		describe("credit card two cards", () => {
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
					},
					{
						paymentMethod: PaymentMethodTypes.CREDIT_CARD,
						installments: 2,
						cardToken: {
							cvv: "123",
							token: "123",
						},
						amount: 1500,
						splits: [{
							amount: 1500,
							sellerId: 1
						}],
					}
				],
				amount: 2500,
				notificationUrl: "https://meusite.com.br/events",
			}

			const secondCard: BempaggoCardRequest = {
				expiration: {
					month: 1, // jan
					year: 2029
				},
				holder: {
					name: "Douglas Hiura Longo Visa",
					document: "06219385993",
				},
				cardNumber: "4235647728025682",// master number
			}

			test("create authorize two card", async () => {
				const cardToken = await bempaggoFactory.tokenizeCard(card, "Not used");
				const cardTokenSecond = await bempaggoFactory.tokenizeCard(secondCard, "Not used");

				const payment: BempaggoCreditCardPaymentRequest = order.payments[0] as BempaggoCreditCardPaymentRequest
				const payment2: BempaggoCreditCardPaymentRequest = order.payments[1] as BempaggoCreditCardPaymentRequest
				payment.cardToken.token = cardToken.token!;
				payment2.cardToken.token = cardTokenSecond.token!;
				order.orderReference = `o-${new Date().getTime().toString()}`
				const charge: BempaggoChargeResponse = await bempaggoFactory.getChargeService().getCreditCardServiceable().createCreditCardCharge(1, order);
				const transaction: BempaggoCreditCardTransactionResponse = charge.transactions[1] as BempaggoCreditCardTransactionResponse;
				const secondTransaction: BempaggoCreditCardTransactionResponse = charge.transactions[0] as BempaggoCreditCardTransactionResponse;
				assert.equal(26, Object.keys(transaction).length);
				assert.equal(26, Object.keys(secondTransaction).length);

				assert.equal(2, charge.transactions.length);
				assert.equal(2500, charge.value);
				assert.equal("AUTHORIZED", charge.status);
				assert.equal("CREDIT_CARD", secondTransaction.paymentMethod);
				assert.notEqual(null, secondTransaction.id);
				assert.equal(1500, secondTransaction.value);
				assert.equal(null, secondTransaction.paidValue);
				assert.equal(null, secondTransaction.refundValue);
				assert.equal("LOOSE", secondTransaction.type);
				assert.equal("AUTHORIZED", secondTransaction.status);
				assert.notEqual(null, secondTransaction.transactionDate);
				assert.notEqual(null, secondTransaction.affiliate?.id);
				assert.equal("Up Negócios", secondTransaction.affiliate?.name);
				assert.equal("Up Negócios LTDA.", secondTransaction.affiliate?.businessName);
				assert.equal(1, secondTransaction.establishment.id);
				assert.equal("00", secondTransaction.returnCode);
				assert.equal("Sucesso.", secondTransaction.returnMessage);
				assert.notEqual(null, secondTransaction.transactionKey);
				assert.equal(null, secondTransaction.refundReason);
				assert.notEqual(null, secondTransaction.transactionReference);
				assert.equal("423564", secondTransaction.card.bin);
				assert.equal("VISA", secondTransaction.card.brand);
				assert.equal(1, secondTransaction.card.expiration.month);
				assert.equal(2029, secondTransaction.card.expiration.year);
				assert.equal("Douglas Hiura Longo Visa", secondTransaction.card.holder.name);
				assert.equal("06219385993", secondTransaction.card.holder.document);
				assert.equal("5682", secondTransaction.card.lastFour);
				assert.notEqual(null, secondTransaction.card.token);
				assert.equal(2, secondTransaction.installments);

				assert.equal("CREDIT_CARD", transaction.paymentMethod);
				assert.notEqual(null, transaction.id);
				assert.equal(1000, transaction.value);
				assert.equal(null, transaction.paidValue);
				assert.equal(null, transaction.refundValue);
				assert.equal("LOOSE", transaction.type);
				assert.equal("AUTHORIZED", transaction.status);
				assert.notEqual(null, transaction.transactionDate);
				assert.notEqual(null, transaction.affiliate?.id);
				assert.equal("Up Negócios", transaction.affiliate?.name);
				assert.equal("Up Negócios LTDA.", transaction.affiliate?.businessName);
				assert.equal(1, transaction.establishment.id);
				assert.equal("00", transaction.returnCode);
				assert.equal("Sucesso.", transaction.returnMessage);
				assert.notEqual(null, transaction.transactionKey);
				assert.equal(null, transaction.refundReason);
				assert.notEqual(null, transaction.transactionReference);
				assert.equal("544828", transaction.card.bin);
				assert.equal("MASTERCARD", transaction.card.brand);
				assert.equal(1, transaction.card.expiration.month);
				assert.equal(2028, transaction.card.expiration.year);
				assert.equal("Carlos Cartola", transaction.card.holder.name);
				assert.equal("06219385993", transaction.card.holder.document);
				assert.equal("0007", transaction.card.lastFour);
				assert.notEqual(null, transaction.card.token);
				assert.equal(1, transaction.installments);
			});

			test("create authorize and capture two cards", async () => {
				const cardToken = await bempaggoFactory.tokenizeCard(card, "Not used");
				const cardTokenSecond = await bempaggoFactory.tokenizeCard(secondCard, "Not used");

				const payment: BempaggoCreditCardPaymentRequest = order.payments[0] as BempaggoCreditCardPaymentRequest
				const payment2: BempaggoCreditCardPaymentRequest = order.payments[1] as BempaggoCreditCardPaymentRequest
				payment.cardToken.token = cardToken.token!;
				payment2.cardToken.token = cardTokenSecond.token!;
				order.orderReference = `o-${new Date().getTime().toString()}`
				const charge: BempaggoChargeResponse = await bempaggoFactory.getChargeService().getCreditCardServiceable().createCreditCardCharge(1, order);
				const responseCapture: BempaggoChargeResponse = await bempaggoFactory.getChargeService().getCreditCardServiceable().captureCreditCardCharge(charge.id);
				const firstTransaction: BempaggoCreditCardTransactionResponse = responseCapture.transactions[1] as BempaggoCreditCardTransactionResponse;
				const secondTransaction: BempaggoCreditCardTransactionResponse = responseCapture.transactions[0] as BempaggoCreditCardTransactionResponse;
				assert.equal(26, Object.keys(firstTransaction).length);
				assert.equal(26, Object.keys(secondTransaction).length);

				assert.equal(2, responseCapture.transactions.length);
				assert.equal(2500, responseCapture.value);
				assert.equal("PAY", responseCapture.status);
				assert.equal("CREDIT_CARD", firstTransaction.paymentMethod);
				assert.notEqual(null, firstTransaction.id);
				assert.equal(1000, firstTransaction.value);
				assert.equal(1000, firstTransaction.paidValue);
				assert.equal(null, firstTransaction.refundValue);
				assert.equal("LOOSE", firstTransaction.type);
				assert.equal("APPROVED", firstTransaction.status);
				assert.notEqual(null, firstTransaction.transactionDate);
				assert.notEqual(null, firstTransaction.affiliate?.id);
				assert.equal("Up Negócios", firstTransaction.affiliate?.name);
				assert.equal("Up Negócios LTDA.", firstTransaction.affiliate?.businessName);
				assert.equal(1, firstTransaction.establishment.id);
				assert.equal("00", firstTransaction.returnCode);
				assert.equal("Sucesso.", firstTransaction.returnMessage);
				assert.notEqual(null, firstTransaction.transactionKey);
				assert.equal(null, firstTransaction.refundReason);
				assert.notEqual(null, firstTransaction.transactionReference);
				assert.equal("544828", firstTransaction.card.bin);
				assert.equal("MASTERCARD", firstTransaction.card.brand);
				assert.equal(1, firstTransaction.card.expiration.month);
				assert.equal(2028, firstTransaction.card.expiration.year);
				assert.equal("Carlos Cartola", firstTransaction.card.holder.name);
				assert.equal("06219385993", firstTransaction.card.holder.document);
				assert.equal("0007", firstTransaction.card.lastFour);
				assert.equal(cardToken.token, firstTransaction.card.token!);
				assert.equal(1, firstTransaction.installments);

				assert.equal("CREDIT_CARD", secondTransaction.paymentMethod);
				assert.notEqual(null, secondTransaction.id);
				assert.equal(1500, secondTransaction.value);
				assert.equal(1500, secondTransaction.paidValue);
				assert.equal(null, secondTransaction.refundValue);
				assert.equal("LOOSE", secondTransaction.type);
				assert.equal("APPROVED", secondTransaction.status);
				assert.notEqual(null, secondTransaction.transactionDate);
				assert.notEqual(null, secondTransaction.affiliate?.id);
				assert.equal("Up Negócios", secondTransaction.affiliate?.name);
				assert.equal("Up Negócios LTDA.", secondTransaction.affiliate?.businessName);
				assert.equal(1, secondTransaction.establishment.id);
				assert.equal("00", secondTransaction.returnCode);
				assert.equal("Sucesso.", secondTransaction.returnMessage);
				assert.notEqual(null, secondTransaction.transactionKey);
				assert.equal(null, secondTransaction.refundReason);
				assert.notEqual(null, secondTransaction.transactionReference);
				assert.equal("423564", secondTransaction.card.bin);
				assert.equal("VISA", secondTransaction.card.brand);
				assert.equal(1, secondTransaction.card.expiration.month);
				assert.equal(2029, secondTransaction.card.expiration.year);
				assert.equal("Douglas Hiura Longo Visa", secondTransaction.card.holder.name);
				assert.equal("06219385993", secondTransaction.card.holder.document);
				assert.equal("5682", secondTransaction.card.lastFour);
				assert.equal(cardTokenSecond.token, secondTransaction.card.token!);
				assert.equal(2, secondTransaction.installments);
			});

			test("create authorize and capture and refund two cards", async () => {
				const creditCardServiceable = bempaggoFactory.getChargeService().getCreditCardServiceable()
				const cardToken = await bempaggoFactory.tokenizeCard(card, "Not used");
				const cardTokenSecond = await bempaggoFactory.tokenizeCard(secondCard, "Not used");

				const payment: BempaggoCreditCardPaymentRequest = order.payments[0] as BempaggoCreditCardPaymentRequest
				const payment2: BempaggoCreditCardPaymentRequest = order.payments[1] as BempaggoCreditCardPaymentRequest
				payment.cardToken.token = cardToken.token!;
				payment2.cardToken.token = cardTokenSecond.token!;
				order.orderReference = `o-${new Date().getTime().toString()}`
				const charge: BempaggoChargeResponse = await creditCardServiceable.createCreditCardCharge(1, order);
				const responseCapture: BempaggoChargeResponse = await creditCardServiceable.captureCreditCardCharge(charge.id);
				const refundResponse = await creditCardServiceable.refundCreditCardCharge(responseCapture.id);
				const firstTransaction: BempaggoCreditCardTransactionResponse = refundResponse.transactions[3] as BempaggoCreditCardTransactionResponse;
				const secondTransaction: BempaggoCreditCardTransactionResponse = refundResponse.transactions[2] as BempaggoCreditCardTransactionResponse;
				const transactionRefund: BempaggoCreditCardTransactionResponse = refundResponse.transactions[1] as BempaggoCreditCardTransactionResponse;
				const transactionRefund2: BempaggoCreditCardTransactionResponse = refundResponse.transactions[0] as BempaggoCreditCardTransactionResponse;
				assert.equal(26, Object.keys(firstTransaction).length);
				assert.equal(26, Object.keys(secondTransaction).length);
				assert.equal(26, Object.keys(transactionRefund).length);
				assert.equal(26, Object.keys(transactionRefund2).length);

				assert.equal(4, refundResponse.transactions.length);
				assert.equal(2500, refundResponse.value);
				assert.equal("REFUND", refundResponse.status);
				assert.equal(2500, refundResponse.refundedAmount);
				assert.equal("REFUND", refundResponse.status);

				assert.equal("CREDIT_CARD", transactionRefund.paymentMethod);
				assert.notEqual(null, transactionRefund.id);
				assert.equal(-1000, transactionRefund.value);
				assert.equal(1000, transactionRefund.paidValue);
				assert.equal(1000, transactionRefund.refundValue);
				assert.equal("REFUND", transactionRefund.type);
				assert.equal("REFUND", transactionRefund.status);
				assert.notEqual(null, transactionRefund.transactionKey);
				assert.equal("OTHERS", transactionRefund.refundReason);
				assert.notEqual(null, transactionRefund.transactionReference);
				assert.equal(cardToken.token, transactionRefund.card.token!);
				assert.equal(null, transactionRefund.installments);

				assert.equal("CREDIT_CARD", transactionRefund2.paymentMethod);
				assert.notEqual(null, transactionRefund2.id);
				assert.equal(-1500, transactionRefund2.value);
				assert.equal(1500, transactionRefund2.paidValue);
				assert.equal(1500, transactionRefund2.refundValue);
				assert.equal("REFUND", transactionRefund2.type);
				assert.equal("REFUND", transactionRefund2.status);
				assert.notEqual(null, transactionRefund2.transactionKey);
				assert.equal("OTHERS", transactionRefund2.refundReason);
				assert.notEqual(null, transactionRefund2.transactionReference);
				assert.equal(cardTokenSecond.token, transactionRefund2.card.token!);
				assert.equal(null, transactionRefund2.installments);

				assert.equal("CREDIT_CARD", firstTransaction.paymentMethod);
				assert.notEqual(null, firstTransaction.id);
				assert.equal(1000, firstTransaction.value);
				assert.equal(1000, firstTransaction.paidValue);
				assert.equal(1000, firstTransaction.refundValue);
				assert.equal("LOOSE", firstTransaction.type);
				assert.equal("APPROVED", firstTransaction.status);
				assert.notEqual(null, firstTransaction.transactionKey);
				assert.equal(null, firstTransaction.refundReason);
				assert.notEqual(null, firstTransaction.transactionReference);
				assert.equal(cardToken.token, firstTransaction.card.token!);
				assert.equal(1, firstTransaction.installments);

				assert.equal("CREDIT_CARD", secondTransaction.paymentMethod);
				assert.notEqual(null, secondTransaction.id);
				assert.equal(1500, secondTransaction.value);
				assert.equal(1500, secondTransaction.paidValue);
				assert.equal(1500, secondTransaction.refundValue);
				assert.equal("LOOSE", secondTransaction.type);
				assert.equal("APPROVED", secondTransaction.status);
				assert.notEqual(null, secondTransaction.transactionKey);
				assert.equal(null, secondTransaction.refundReason);
				assert.notEqual(null, secondTransaction.transactionReference);
				assert.equal(cardTokenSecond.token, secondTransaction.card.token!);
				assert.equal(2, secondTransaction.installments);
			});
		});
	})
});