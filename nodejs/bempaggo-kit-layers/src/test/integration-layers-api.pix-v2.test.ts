
import assert from "assert";
import { ChargeStatusTypes, TransactionStatusTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";
import fetch, { Headers } from "node-fetch";
import { LayersPixPaymentMethod, LayersTransaction } from "../app/modules//layers/interfaces";
import { LayersTransactionGroup } from "../app/modules//layers/transactionGroup";

import { layers, simulation, tokenLayers, urlSetup } from "./setup";
// with ❤️ feeling the bad smell on the air
const sellerId: number = 1;
const requestLayersStyle: LayersTransactionGroup = {
	code: "",
	price: {
		amount: 1035,
		currency: "BRL"
	},
	paymentMethods: [{
		installments: 0,
		method: "pix",
		recipients: [{ sourceId: 1, total: { amount: 1035, currency: "BRL" } }],
		bank_slip: undefined,
		card: undefined,
		total: { amount: 1035, currency: "BRL" }
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
		addresses: [],
	},
	urlNotification: "https://ec90340f030e4657830412c7817b1ccc.m.pipedream.net/webhooks"

}


describe("pix", () => {

	test("create pix only", async () => {
		requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
		const charge: LayersTransaction = await layers.createTransaction(requestLayersStyle);

		const payment: LayersPixPaymentMethod = charge.payments[0] as LayersPixPaymentMethod;

		assert.equal(1, charge.payments.length);
		assert.equal(1035, charge.amount);
		assert.equal(null, charge.refunded_amount);
		assert.equal(ChargeStatusTypes.PENDING, charge.status);
		/*
		payment.referenceId is the reference of the bempaggo transaction,
		this value is the same sent to the acquirer (rede, cielo) and used for reconciliation;
		This number is repeated only when there are refunds, disputes...
		*/
		assert.equal(1035, payment.amount);
		assert.equal(TransactionStatusTypes.AWAITING_PAYMENT, payment.status);
		assert.equal('pix', payment.payment_method);
		assert.equal(sellerId.toString(), payment.recipient_id);
		assert.equal("06219385993", charge.customer_id);
		assert.equal(175, payment.emv.length);
	});

	test("create pix only find order", async () => {
		requestLayersStyle.code = `op-${new Date().getTime().toString()}`;
		await layers.createTransaction(requestLayersStyle);
		const chargeFind: LayersTransaction = await layers.findTransactionsByReferenceId(requestLayersStyle.code);

		const payment: LayersPixPaymentMethod = chargeFind.payments[0] as LayersPixPaymentMethod;

		assert.equal(1, chargeFind.payments.length);
		assert.equal(1035, chargeFind.amount);
		assert.equal(null, chargeFind.refunded_amount);
		assert.equal(ChargeStatusTypes.PENDING, chargeFind.status);
		/*
		payment.referenceId is the reference of the bempaggo transaction,
		this value is the same sent to the acquirer (rede, cielo) and used for reconciliation;
		This number is repeated only when there are refunds, disputes...
		*/
		assert.equal(1035, payment.amount);
		assert.equal(TransactionStatusTypes.AWAITING_PAYMENT, payment.status);
		assert.equal('pix', payment.payment_method);
		assert.equal(sellerId.toString(), payment.recipient_id);
		assert.equal("06219385993", chargeFind.customer_id);
		assert.equal(175, payment.emv.length);
	});
	test("create pix paid simulation", async () => {
		requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
		const charge: LayersTransaction = await layers.createTransaction(requestLayersStyle);
		await simulation(Number(charge.referenceId))
		const chargePaid: LayersTransaction = await layers.findChargeById(Number(charge.referenceId));
		const payment: LayersPixPaymentMethod = chargePaid.payments[0] as LayersPixPaymentMethod;
		assert.equal(1, chargePaid.payments.length);
		assert.equal(1035, chargePaid.amount);
		assert.equal(null, chargePaid.refunded_amount);
		assert.equal(ChargeStatusTypes.PAY, chargePaid.status);
		assert.equal(1035, payment.amount);
		assert.equal(TransactionStatusTypes.APPROVED, payment.status);
		assert.equal('pix', payment.payment_method);
		assert.equal(sellerId.toString(), payment.recipient_id);
		assert.equal("06219385993", chargePaid.customer_id);
		assert.equal(175, payment.emv.length);
	});

	test("create pix and get url of qr code", async () => {
		requestLayersStyle.code = new Date().getTime().toString();
		const response: LayersTransaction = await layers.createTransaction(requestLayersStyle);
		const urlCreated: string = layers.getExternalQrCode(response);
		assert.equal(`${urlSetup}/v2/charges/${response.referenceId}/qrcode`, urlCreated);
	});

	test("create pix and get qr code", async () => {
		requestLayersStyle.code = new Date().getTime().toString();
		const response: LayersTransaction = await layers.createTransaction(requestLayersStyle);
		const url: string = layers.getExternalQrCode(response);
		const headers = new Headers();
		headers.set("Authorization", `Bearer ${tokenLayers}`);
		const responseQuickResponseCode = await fetch(url, { method: "GET", headers });
		assert.equal(200, responseQuickResponseCode.status);
	});
});