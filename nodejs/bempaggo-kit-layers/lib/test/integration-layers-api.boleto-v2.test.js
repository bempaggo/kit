"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enum_1 = require("bempaggo-kit/lib/app/modules/entity/Enum");
const vitest_1 = require("vitest");
const setup_1 = require("./setup");
const sellerId = 1;
const requestLayersStyle = {
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
};
(0, vitest_1.describe)("boleto", () => {
    (0, vitest_1.test)("create boleto", async () => {
        requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
        const charge = await setup_1.layers.createTransaction(requestLayersStyle);
        const payment = charge.payments[0];
        vitest_1.assert.equal(1, charge.payments.length);
        vitest_1.assert.equal(10035, charge.amount);
        vitest_1.assert.equal(null, charge.refunded_amount);
        vitest_1.assert.equal(Enum_1.ChargeStatusTypes.PENDING, charge.status);
        vitest_1.assert.isNotNull(charge.referenceId);
        vitest_1.assert.isNotNull(payment.reference_id);
        vitest_1.assert.equal("06219385993", charge.customer_id);
        vitest_1.assert.equal(10035, payment.amount);
        vitest_1.assert.equal(0, payment.paid_amount);
        vitest_1.assert.equal(Enum_1.TransactionStatusTypes.AWAITING_PAYMENT, payment.status);
        vitest_1.assert.equal('boleto', payment.payment_method);
        vitest_1.assert.equal(sellerId.toString(), payment.recipient_id);
        vitest_1.assert.isNotNull(payment.reference_id);
        vitest_1.assert.equal("Douglas Hiuara Longo Customer", payment.customer.name);
        vitest_1.assert.equal("douglas@bempaggo.com.br", payment.customer.email);
        vitest_1.assert.equal("06219385993", payment.customer.document);
        vitest_1.assert.equal("55", payment.customer.phone.countryCode);
        vitest_1.assert.equal("988657196", payment.customer.phone.number);
        vitest_1.assert.equal("48", payment.customer.phone.areaCode);
        vitest_1.assert.equal("Rua Laurindo Januario", payment.customer.address.street);
        vitest_1.assert.equal("APt01", payment.customer.address?.lineTwo);
        vitest_1.assert.equal("Florianopolis", payment.customer.address.city);
        vitest_1.assert.equal("88062201", payment.customer.address.zipCode);
        vitest_1.assert.equal("23344", payment.customer.address.streetNumber);
        vitest_1.assert.equal("SC", payment.customer.address.state);
    });
});
//# sourceMappingURL=integration-layers-api.boleto-v2.test.js.map