
import { LayersBankSlipPaymentMethod, LayersTransaction } from "@/app/modules/layers/interfaces";
import { LayersTransactionGroup } from "@/app/modules/layers/transactionGroup";
import { ChargeStatusTypes, TransactionStatusTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";
import { assert, describe, test } from "vitest";
import { layers } from "./setup";
// with ❤️ feeling the bad smell on the air
const sellerId: number = 1;
const requestLayersStyle: LayersTransactionGroup = {
	code: "",


	price: {
		amount: 1035,
		currency: "BRL"
	},
	paymentMethods: [{
		method: "bank_slip",
		installments: 0,
		recipients: [{ sourceId: 1, total: { amount: 1035, currency: "BRL" } }],
		total: { amount: 1035, currency: "BRL" },

		bank_slip: {
			dueDays: new Date().getTime(),
			lateFee: 1,
			lateInterestRate: 1,
			url: "not used?"
		}

	}],

	sourceId: sellerId,
	customerPayload: {
		name: "Douglas Hiuara Longo Customer",
		email: "douglas@bempaggo.com.br",
		phone: { areaCode: 48, countryCode: 55, phoneNumber: 988657196 },
		birth: new Date("1992-02-29"),
		document: {
			kind: "cpf",
			value: "06219385993"
		},
		addresses: [{
			title: "no used",
			address: "Rua Laurindo Januario",
			address2: "APt01",
			city: "Florianopolis",
			code: "88062201",
			country: "BR",
			district: "Lagoa da Conceicao",
			number: "23344",
			state: "SC"
		}],
	},
	urlNotification: "https://webhook.site/6d4af021-511a-4f77-b7ce-a73961c90d3e"
}


describe("boleto", () => {
	test("create boleto", async () => {
		requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
		const charge: LayersTransaction = await layers.createTransaction(requestLayersStyle);
		const payment: LayersBankSlipPaymentMethod = charge.payments[0] as LayersBankSlipPaymentMethod;
		assert.equal(1, charge.payments.length);
		assert.equal(1035, charge.amount);
		assert.equal(null, charge.refunded_amount);
		assert.equal(ChargeStatusTypes.PENDING, charge.status);
		assert.isNotNull(charge.referenceId); // charge.referenceId is the charge reference from bempaggo
		assert.isNotNull(payment.reference_id);
		assert.equal("06219385993", charge.customer_id);
		assert.equal(1035, payment.amount);
		assert.equal(null, payment.paid_amount);
		assert.equal(TransactionStatusTypes.AWAITING_PAYMENT, payment.status);
		assert.equal('bank_slip', payment.payment_method);
		assert.equal(sellerId.toString(), payment.recipient_id);
		assert.isNotNull(payment.reference_id);
		assert.equal("Carlos Melo", payment.customer.name);
		assert.equal("calos@bempaggo.com.br", payment.customer.email);
		assert.equal("06219385993", payment.customer.document);
		assert.equal("55", payment.customer.phone!.countryCode);
		assert.equal("998761234", payment.customer.phone!.number);
		assert.equal("48", payment.customer.phone!.areaCode);
		assert.equal("Rua Laurindo Januario", payment.customer.address!.street);
		assert.equal("APt01", payment.customer.address?.lineTwo);
		assert.equal("Florianopolis", payment.customer.address!.city);
		assert.equal("88062201", payment.customer.address!.zipCode);
		assert.equal("23344", payment.customer.address!.streetNumber);
		assert.equal("SC", payment.customer.address!.state);

	});
});