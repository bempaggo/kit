import assert from "assert";
import { BempaggoBankSlipPaymentRequest, BempaggoOrderRequest } from "bempaggo-kit/lib/app/modules/entity/BempaggoRequest";
import { BempaggoBankSlipTransactionResponse, BempaggoChargeResponse } from "bempaggo-kit/lib/app/modules/entity/BempaggoResponse";
import { MathTypes, PaymentMethodTypes, PeriodicityTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";
import { bempaggoFactory } from "./setup";

const bankslipServiceable = bempaggoFactory.getChargeService().getBankSlipServiceable();

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
			paymentMethod: PaymentMethodTypes.BOLETO,
			dueDate: 1686683096030,
			amount: 1000,
			paymentLimitDate: 1686683096030,
			splits: [],
			ourNumber: 123456789,
			fine: {
				days: 1,
				type: MathTypes.FLAT,
				amount: 100,
			},
			interest: {
				amount: 100,
				type: MathTypes.FLAT,
				days: 1,
				frequency: PeriodicityTypes.MONTHLY,
			},
		}
	],
	amount: 1000,
	notificationUrl: "https://meusite.com.br/events",
}
describe("bankslip functions", () => {
	test("create bankslip", async () => {
		order.orderReference = `o-${new Date().getTime().toString()}`;
		const bankslipResponse: BempaggoChargeResponse = await bankslipServiceable.createBankSlipCharge(1, order);
		const transaction: BempaggoBankSlipTransactionResponse = bankslipResponse.transactions[0] as BempaggoBankSlipTransactionResponse;
		assert.equal(8, Object.keys(bankslipResponse).length);
		assert.notEqual(null, bankslipResponse.id);
		assert.equal("PENDING", bankslipResponse.status);
		assert.equal(1000, bankslipResponse.value);
		assert.equal(null, bankslipResponse.refundedAmount);
		assert.equal("BOLETO", transaction.paymentMethod);
		assert.notEqual(null, transaction.id);
		assert.equal(1000, transaction.value);
		assert.equal(null, transaction.paidValue);
		assert.equal("LOOSE", transaction.type);
		assert.equal("AWAITING_PAYMENT", transaction.status);
		assert.notEqual(null, transaction.transactionDate);
		assert.equal(1, transaction.affiliate?.id);
		assert.equal("Up Negócios", transaction.affiliate?.name);
		assert.equal("Up Negócios LTDA.", transaction.affiliate?.businessName);
		assert.notEqual(null, transaction.establishment.id);
		assert.notEqual(null, bankslipResponse.customer.id);
		assert.equal("51190844001", bankslipResponse.customer.document);
		assert.notEqual(null, bankslipResponse.order.id);
		assert.notEqual(null, bankslipResponse.order.orderReference);
	});

	test("create bankslip and cancel", async () => {
		order.orderReference = `o-${new Date().getTime().toString()}`;
		const bankslipResponse: BempaggoChargeResponse = await bankslipServiceable.createBankSlipCharge(1, order);
		const canceledBankslip: BempaggoChargeResponse = await bankslipServiceable.cancelBankSlip(bankslipResponse.id);
		const transaction: BempaggoBankSlipTransactionResponse = canceledBankslip.transactions[0] as BempaggoBankSlipTransactionResponse;
		assert.equal(8, Object.keys(canceledBankslip).length);
		assert.notEqual(null, canceledBankslip.id);
		assert.equal("CANCELED", canceledBankslip.status);
		assert.equal(1000, canceledBankslip.value);
		assert.equal(null, canceledBankslip.refundedAmount);
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
		assert.notEqual(null, transaction.establishment.id);
		assert.notEqual(null, canceledBankslip.customer.id);
		assert.equal("51190844001", canceledBankslip.customer.document);
		assert.notEqual(null, canceledBankslip.order.id);
		assert.notEqual(null, canceledBankslip.order.orderReference);
	});

	test("create bankslip without address", async () => {
		order.orderReference = `o-${new Date().getTime().toString()}`;
		order.customer.address = undefined;
		try {
			await bankslipServiceable.createBankSlipCharge(1, order);
		} catch (error: any) {
			const errors = JSON.parse(error.value);
			assert.equal("Bad Request", error.message);
			assert.equal(400, error.status);
			assert.equal("Address is required!", errors[0].message);
			assert.equal("customer.address", errors[0].field);
		}
	});


	test("bad request", async () => {
		const payment: BempaggoBankSlipPaymentRequest = order.payments[0] as BempaggoBankSlipPaymentRequest;
		payment.amount = 58;
		order.amount = 57;
		order.orderReference = `o-${new Date().getTime().toString()}`
		//TODO: o suite do vitest não consegue testar os valores do 'value' dentro do objeto de erro, ver posteriormente se tem um outro jeito
		try {
			await bankslipServiceable.createBankSlipCharge(1, order);
		} catch (error: any) {
			const errors = JSON.parse(error.value);
			assert.equal("Bad Request", error.message);
			assert.equal(400, error.status);
			assert.equal("The 'amount' field must be the sum of the 'amount' of payments.", errors[0].message);
			assert.equal("invalidAmounts", errors[0].field);
		}
		expect(async () => await bankslipServiceable.createBankSlipCharge(1, order)).rejects.toThrowError("Bad Request");

	});
});