
import { LayersBankSlipPaymentMethod, LayersTransaction } from "@/app/modules/layers/interfaces";
import assert from "assert";
import { ChargeStatusTypes, TransactionStatusTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";
import { BankSlipRenderingData } from "../app/modules/layers/BankSlipRenderinData";
import { LayersTransactionGroup } from "../app/modules/layers/transactionGroup";
import { layers } from "./setup";
// with ❤️ feeling the bad smell on the air
const sellerId: number = 1;
const requestLayersStyle: LayersTransactionGroup = {
	code: "",
	price: {
		amount: 10035,
		currency: "BRL"
	},
	paymentMethods: [{
		method: "bank_slip",
		installments: 0,
		recipients: [{ sourceId: 1, total: { amount: 10035, currency: "BRL" } }],
		total: { amount: 10035, currency: "BRL" },
		card: undefined,
		bank_slip: {
			dueDays: 1,
			lateFee: 1, // TODO ignoring
			lateInterestRate: 1, // TODO ignoring
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
	urlNotification: "https://ec90340f030e4657830412c7817b1ccc.m.pipedream.net"
}

describe("boleto", () => {
	test("create boleto only", async () => {
		requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
		const charge: LayersTransaction = await layers.createTransaction(requestLayersStyle);
		const payment: LayersBankSlipPaymentMethod = charge.payments[0] as LayersBankSlipPaymentMethod;
		assert.equal(1, charge.payments.length);
		assert.equal(10035, charge.amount);
		assert.equal(null, charge.refunded_amount);
		assert.equal(ChargeStatusTypes.PENDING, charge.status);
		assert.equal("06219385993", charge.customer_id);
		assert.equal(10035, payment.amount);
		assert.equal(0, payment.paid_amount);
		assert.equal(TransactionStatusTypes.AWAITING_PAYMENT, payment.status);
		assert.equal('boleto', payment.payment_method);
		assert.equal(sellerId.toString(), payment.recipient_id);
		assert.equal("Douglas Hiuara Longo Customer", payment.customer.name);
		assert.equal("douglas@bempaggo.com.br", payment.customer.email);
		assert.equal("06219385993", payment.customer.document);
		assert.equal("55", payment.customer.phone!.countryCode);
		assert.equal("988657196", payment.customer.phone!.number);
		assert.equal("48", payment.customer.phone!.areaCode);
		assert.equal("Rua Laurindo Januario", payment.customer.address!.street);
		assert.equal("APt01", payment.customer.address!.lineTwo);
		assert.equal("Florianopolis", payment.customer.address!.city);
		assert.equal("88062201", payment.customer.address!.zipCode);
		assert.equal("23344", payment.customer.address!.streetNumber);
		assert.equal("SC", payment.customer.address!.state);
	});

	test("create boleto only find order", async () => {
		requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
		const charge: LayersTransaction = await layers.createTransaction(requestLayersStyle);
		const chargeFind: LayersTransaction = await layers.findTransactionsByReferenceId(requestLayersStyle.code);
		const payment: LayersBankSlipPaymentMethod = chargeFind.payments[0] as LayersBankSlipPaymentMethod;
		assert.equal(1, chargeFind.payments.length);
		assert.equal(10035, chargeFind.amount);
		assert.equal(null, chargeFind.refunded_amount);
		assert.equal(ChargeStatusTypes.PENDING, chargeFind.status);
		assert.equal("06219385993", chargeFind.customer_id);
		assert.equal(10035, chargeFind.amount);
		assert.equal(0, payment.paid_amount);
		assert.equal(TransactionStatusTypes.AWAITING_PAYMENT, payment.status);
		assert.equal('boleto', payment.payment_method);
		assert.equal(sellerId.toString(), payment.recipient_id);
		assert.equal("Douglas Hiuara Longo Customer", payment.customer.name);
		assert.equal("douglas@bempaggo.com.br", payment.customer.email);
		assert.equal("06219385993", payment.customer.document);
		assert.equal("55", payment.customer.phone!.countryCode);
		assert.equal("988657196", payment.customer.phone!.number);
		assert.equal("48", payment.customer.phone!.areaCode);
		assert.equal("Rua Laurindo Januario", payment.customer.address!.street);
		assert.equal("APt01", payment.customer.address!.lineTwo);
		assert.equal("Florianopolis", payment.customer.address!.city);
		assert.equal("88062201", payment.customer.address!.zipCode);
		assert.equal("23344", payment.customer.address!.streetNumber);
		assert.equal("SC", payment.customer.address!.state);
	});

	test("create boleto and cancel", async () => {
		requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
		const charge: LayersTransaction = await layers.createTransaction(requestLayersStyle);
		await layers.cancelBankSlipTransaction(charge);
		const chargeCancel = await layers.findChargeById(Number(charge.referenceId));
		const payment: LayersBankSlipPaymentMethod = chargeCancel.payments[0] as LayersBankSlipPaymentMethod;
		assert.equal(1, chargeCancel.payments.length);
		assert.equal(10035, chargeCancel.amount);
		assert.equal(null, chargeCancel.refunded_amount);
		assert.equal(ChargeStatusTypes.CANCELED, chargeCancel.status);
		assert.equal("06219385993", chargeCancel.customer_id);
		assert.equal(10035, chargeCancel.amount);
		assert.equal(0, payment.paid_amount);
		assert.equal(TransactionStatusTypes.CANCELED, payment.status);
		assert.equal('boleto', payment.payment_method);
		assert.equal(sellerId.toString(), payment.recipient_id);
		assert.equal("Douglas Hiuara Longo Customer", payment.customer.name);
		assert.equal("douglas@bempaggo.com.br", payment.customer.email);
		assert.equal("06219385993", payment.customer.document);
		assert.equal("55", payment.customer.phone!.countryCode);
		assert.equal("988657196", payment.customer.phone!.number);
		assert.equal("48", payment.customer.phone!.areaCode);
		assert.equal("Rua Laurindo Januario", payment.customer.address!.street);
		assert.equal("APt01", payment.customer.address!.lineTwo);
		assert.equal("Florianopolis", payment.customer.address!.city);
		assert.equal("88062201", payment.customer.address!.zipCode);
		assert.equal("23344", payment.customer.address!.streetNumber);
		assert.equal("SC", payment.customer.address!.state);
	});
	test("create boleto and get", async () => {
		requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
		const charge: LayersTransaction = await layers.createTransaction(requestLayersStyle);
		const chargeGet: BankSlipRenderingData = await layers.getBankSlipRenderingData(charge.referenceId);
		assert.equal(47, chargeGet.digitable_line.length);
	});
});