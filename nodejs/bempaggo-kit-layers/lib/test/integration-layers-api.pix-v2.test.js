"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enum_1 = require("bempaggo-kit/lib/app/modules/entity/Enum");
const vitest_1 = require("vitest");
const setup_1 = require("./setup");
const sellerId = 1;
const requestLayersStyle = {
    code: "",
    price: {
        amount: 1035,
        currency: "BRL"
    },
    paymentMethods: [{
            installments: 0,
            method: "pix",
            recipients: [{ sourceId: 1, total: { amount: 1035, currency: "BRL" } }],
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
    urlNotification: "https://webhook.site/6d4af021-511a-4f77-b7ce-a73961c90d3e"
};
(0, vitest_1.describe)("pix", () => {
    (0, vitest_1.test)("create pix only", async () => {
        requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
        const charge = await setup_1.layers.createTransaction(requestLayersStyle);
        const payment = charge.payments[0];
        vitest_1.assert.equal(1, charge.payments.length);
        vitest_1.assert.equal(1035, charge.amount);
        vitest_1.assert.equal(null, charge.refunded_amount);
        vitest_1.assert.equal(Enum_1.ChargeStatusTypes.PENDING, charge.status);
        vitest_1.assert.isNotNull(charge.referenceId);
        vitest_1.assert.isNotNull(payment.reference_id);
        vitest_1.assert.equal(1035, payment.amount);
        vitest_1.assert.equal(Enum_1.TransactionStatusTypes.AWAITING_PAYMENT, payment.status);
        vitest_1.assert.equal('pix', payment.payment_method);
        vitest_1.assert.isNotNull(payment.pix.expires_in);
        vitest_1.assert.equal(sellerId.toString(), payment.recipient_id);
        vitest_1.assert.isNotNull(payment.reference_id);
        vitest_1.assert.equal("06219385993", charge.customer_id);
    });
    (0, vitest_1.test)("create pix paid simulation", async () => {
        requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
        const charge = await setup_1.layers.createTransaction(requestLayersStyle);
        await (0, setup_1.simulation)(Number(charge.referenceId));
        const chargePaid = await setup_1.layers.findChargeById(Number(charge.referenceId));
        const payment = chargePaid.payments[0];
        vitest_1.assert.equal(1, chargePaid.payments.length);
        vitest_1.assert.equal(1035, chargePaid.amount);
        vitest_1.assert.equal(null, chargePaid.refunded_amount);
        vitest_1.assert.equal(Enum_1.ChargeStatusTypes.PAY, chargePaid.status);
        vitest_1.assert.isNotNull(chargePaid.referenceId);
        vitest_1.assert.isNotNull(payment.reference_id);
        vitest_1.assert.equal(1035, payment.amount);
        vitest_1.assert.equal(Enum_1.TransactionStatusTypes.APPROVED, payment.status);
        vitest_1.assert.equal('pix', payment.payment_method);
        vitest_1.assert.isNotNull(payment.pix.expires_in);
        vitest_1.assert.equal(sellerId.toString(), payment.recipient_id);
        vitest_1.assert.isNotNull(payment.reference_id);
        vitest_1.assert.equal("06219385993", chargePaid.customer_id);
    });
    (0, vitest_1.test)("create pix and get qr cod", async () => {
        requestLayersStyle.code = new Date().getTime().toString();
        const response = await setup_1.layers.createTransaction(requestLayersStyle);
        const qrCode = await setup_1.layers.getExternalQrCode(response);
        vitest_1.assert.equal(`http://localhost:5000/api/v2/charges/${response.referenceId}/qrcode`, qrCode);
    });
});
//# sourceMappingURL=integration-layers-api.pix-v2.test.js.map