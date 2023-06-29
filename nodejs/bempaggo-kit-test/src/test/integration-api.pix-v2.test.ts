import { BempaggoFactory } from "bempaggo-kit/lib/app/modules/Bempaggo";
import { BempaggoOrderRequest, BempaggoPixPaymentRequest } from "bempaggo-kit/lib/app/modules/entity/BempaggoRequest";
import { BempaggoBankSlipTransactionResponse, BempaggoChargeResponse, BempaggoPixTransactionResponse } from "bempaggo-kit/lib/app/modules/entity/BempaggoResponse";
import { Environments, PaymentMethodTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";

import assert from "assert";
import { token } from "./setup";

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
			paymentMethod: PaymentMethodTypes.PIX,
			desiredExpirationDate: 1686681565342,
			amount: 1000,
			splits: [],
			description: "Pagamento de teste",
		}
	],
	amount: 1000,
	notificationUrl: "https://meusite.com.br/events",
}
describe("pix functions", () => {
	test("create pix", async () => {
		order.orderReference = `o-${new Date().getTime().toString()}`;
		const pixResponse: BempaggoChargeResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).getChargeService().getPixServiceable().createPixCharge(1, order);
		const transaction: BempaggoPixTransactionResponse = pixResponse.transactions[0] as BempaggoPixTransactionResponse;
		assert.equal(8, Object.keys(pixResponse).length);
		assert.notEqual(null, pixResponse.id);
		assert.equal("PENDING", pixResponse.status);
		assert.equal(1000, pixResponse.value);
		assert.equal(null, pixResponse.refundedAmount);
		assert.equal("PIX", transaction.paymentMethod);
		assert.notEqual(null, transaction.id);

		assert.equal(1000, transaction.value);
		assert.equal(null, transaction.paidValue);

		assert.equal("LOOSE", transaction.type);
		assert.equal("AWAITING_PAYMENT", transaction.status);
		assert.notEqual(null, transaction.transactionDate);


		assert.equal(1, transaction.affiliate?.id);
		assert.equal("Up Negócios", transaction.affiliate?.name);
		assert.equal("Up Negócios LTDA.", transaction.affiliate?.businessName);
		assert.equal(3, transaction.establishment.id);
		assert.notEqual(null, pixResponse.customer.id);

		assert.equal("51190844001", pixResponse.customer.document);
		assert.notEqual(null, pixResponse.order.id);
		assert.notEqual(null, pixResponse.order.orderReference);
	});

	test("create pix and cancel", async () => {
		order.orderReference = `o-${new Date().getTime().toString()}`;
		const pixResponse: BempaggoChargeResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).getChargeService().getPixServiceable().createPixCharge(1, order);
		const canceledPix: BempaggoChargeResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).getChargeService().getPixServiceable().cancelPix(pixResponse.id);
		const transaction: BempaggoBankSlipTransactionResponse = canceledPix.transactions[0] as BempaggoBankSlipTransactionResponse;
		assert.equal(8, Object.keys(canceledPix).length);


		assert.notEqual(null, canceledPix.id);

		assert.equal("CANCELED", canceledPix.status);
		assert.equal(1000, canceledPix.value);


		assert.equal(null, canceledPix.refundedAmount);

		assert.equal("BOLETO", transaction.paymentMethod);


		assert.notEqual(null, transaction.id);

		assert.equal(1000, transaction.value);


		assert.equal(null, transaction.paidValue);

		assert.equal("LOOSE", transaction.type);
		assert.equal("CANCELED", transaction.status);


		assert.notEqual(null, transaction.transactionDate);

		assert.equal(1, transaction.affiliate?.id);
		assert.equal("Up Negócios", transaction.affiliate?.name);
		assert.equal("Up Negócios LTDA.", transaction.affiliate?.businessName);
		assert.equal(2, transaction.establishment.id);


		assert.notEqual(null, canceledPix.customer.id);

		assert.equal("51190844001", canceledPix.customer.document);


		assert.notEqual(null, canceledPix.order.id);
		assert.notEqual(null, canceledPix.order.orderReference);

	});

	test("create pix and get urls of qrcode", async () => {
		order.orderReference = `o-${new Date().getTime().toString()}`;
		const pixResponse: BempaggoChargeResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT, token).getChargeService().getPixServiceable().createPixCharge(1, order);
		const urlResponse = new BempaggoFactory().create(Environments.DEVELOPMENT, token).getChargeService().getPixServiceable().createQuickResponseCodeUrlByChargeId(pixResponse.id);
		assert.equal(`http://localhost:5000/api/v2/charges/${pixResponse.id}/qrcode`, String(urlResponse));
	});

	test("bad request", async () => {
		const bempaggo = new BempaggoFactory().create(Environments.DEVELOPMENT, token);
		const pixServiceable = bempaggo.getChargeService().getPixServiceable();
		const payment: BempaggoPixPaymentRequest = order.payments[0] as BempaggoPixPaymentRequest;
		payment.amount = 58;
		order.amount = 57;
		order.orderReference = `o-${new Date().getTime().toString()}`
		//TODO: o suite do vitest não consegue testar os valores do 'value' dentro do objeto de erro, ver posteriormente se tem um outro jeito
		try {
			await pixServiceable.createPixCharge(1, order);
		} catch (error: any) {
			const errors = JSON.parse(error.value);
			assert.equal("Bad Request", error.message);
			assert.equal(400, error.status);
			assert.equal("The 'amount' field must be the sum of the 'amount' of payments.", errors[0].message);
			assert.equal("invalidAmounts", errors[0].field);
		}
		expect(async () => await pixServiceable.createPixCharge(1, order)).rejects.toThrowError("Bad Request");

	});
});