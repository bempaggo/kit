"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BemPaggoSDK_1 = __importDefault(require("@/app/modules/layers/BemPaggoSDK"));
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
            installments: 2,
            method: "credit_card",
            recipients: [{ sourceId: 1, total: { amount: 1035, currency: "BRL" } }],
            card: {
                token: "aot",
                securityCode: "123"
            },
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
    urlNotification: undefined
};
const cardLayers = {
    title: "Non used",
    name: "Douglas Hiura Longo",
    month: 1,
    year: 2028,
    number: "5448280000000007",
    brand: "MASTERCARD",
};
const cardLayersInvalid = {
    title: "Non used",
    name: "Douglas Hiura Longo",
    month: 1,
    year: 2028,
    number: "5448280000040807",
    brand: "MASTERCARD",
};
vitest_1.describe.concurrent.only("How use credit card charge", () => {
    (0, vitest_1.test)("brands", async () => {
        vitest_1.assert.equal(14, BemPaggoSDK_1.default.availableCardBrands.length);
        vitest_1.assert.equal("VISA", BemPaggoSDK_1.default.availableCardBrands[0]);
        vitest_1.assert.equal("MASTERCARD", BemPaggoSDK_1.default.availableCardBrands[1]);
        vitest_1.assert.equal("ELO", BemPaggoSDK_1.default.availableCardBrands[2]);
        vitest_1.assert.equal("AMEX", BemPaggoSDK_1.default.availableCardBrands[3]);
        vitest_1.assert.equal("DINERS", BemPaggoSDK_1.default.availableCardBrands[4]);
        vitest_1.assert.equal("AURA", BemPaggoSDK_1.default.availableCardBrands[5]);
        vitest_1.assert.equal("DISCOVER", BemPaggoSDK_1.default.availableCardBrands[6]);
        vitest_1.assert.equal("JCB", BemPaggoSDK_1.default.availableCardBrands[7]);
        vitest_1.assert.equal("HIPERCARD", BemPaggoSDK_1.default.availableCardBrands[8]);
        vitest_1.assert.equal("SOROCRED", BemPaggoSDK_1.default.availableCardBrands[9]);
        vitest_1.assert.equal("CABAL", BemPaggoSDK_1.default.availableCardBrands[10]);
        vitest_1.assert.equal("CREDSYSTEM", BemPaggoSDK_1.default.availableCardBrands[11]);
        vitest_1.assert.equal("BANESCARD", BemPaggoSDK_1.default.availableCardBrands[12]);
        vitest_1.assert.equal("CREDZ", BemPaggoSDK_1.default.availableCardBrands[13]);
    });
    (0, vitest_1.test)("create token from card", async () => {
        const cardToken = await setup_1.layers.tokenizeCard(cardLayers, "Not Used");
        vitest_1.assert.equal(64, cardToken.length);
    });
    (0, vitest_1.describe)("credit card one card", () => {
        (0, vitest_1.test)("create authorize one card", async () => {
            const cardToken = await setup_1.layers.tokenizeCard(cardLayers, "Not Used");
            requestLayersStyle.paymentMethods[0].card.token = cardToken;
            requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
            const charge = await setup_1.layers.createTransaction(requestLayersStyle);
            const payment = charge.payments[0];
            vitest_1.assert.equal(1, charge.payments.length);
            vitest_1.assert.equal(1035, charge.amount);
            vitest_1.assert.equal(null, charge.refunded_amount);
            vitest_1.assert.equal(Enum_1.ChargeStatusTypes.AUTHORIZED, charge.status);
            vitest_1.assert.isNotNull(charge.referenceId);
            vitest_1.assert.isNotNull(payment.reference_id);
            vitest_1.assert.equal(1035, payment.amount);
            vitest_1.assert.equal(Enum_1.TransactionStatusTypes.AUTHORIZED, payment.status);
            vitest_1.assert.equal(0, payment.refunded_value);
            vitest_1.assert.equal('credit_card', payment.payment_method);
            vitest_1.assert.equal(sellerId.toString(), payment.recipient_id);
            vitest_1.assert.equal(2, payment.credit_card.installments);
            vitest_1.assert.equal(cardToken, payment.credit_card.token);
            vitest_1.assert.equal("06219385993", charge.customer_id);
        });
        (0, vitest_1.test)("create authorize and capture one card", async () => {
            const cardToken = await setup_1.layers.tokenizeCard(cardLayers, "Not Used");
            requestLayersStyle.paymentMethods[0].card.token = cardToken;
            requestLayersStyle.code = new Date().getTime().toString();
            const response = await setup_1.layers.createTransaction(requestLayersStyle);
            const responseCapture = await setup_1.layers.chargeTransaction(response.referenceId);
            const payment = responseCapture.payments[0];
            vitest_1.assert.equal(1, responseCapture.payments.length);
            vitest_1.assert.isNotNull(response.referenceId);
            vitest_1.assert.equal(1035, responseCapture.amount);
            vitest_1.assert.equal(null, responseCapture.refunded_amount);
            vitest_1.assert.equal(Enum_1.ChargeStatusTypes.PAY, responseCapture.status);
            vitest_1.assert.equal('credit_card', responseCapture.payments[0].payment_method);
            vitest_1.assert.equal(sellerId.toString(), responseCapture.payments[0].recipient_id);
            vitest_1.assert.equal(1035, payment.amount);
            vitest_1.assert.equal(Enum_1.TransactionStatusTypes.APPROVED, payment.status);
            vitest_1.assert.equal(0, payment.refunded_value);
            vitest_1.assert.equal(sellerId.toString(), payment.recipient_id);
            vitest_1.assert.equal(2, payment.credit_card.installments);
            vitest_1.assert.equal(cardToken, payment.credit_card.token);
            vitest_1.assert.equal("06219385993", responseCapture.customer_id);
        });
        (0, vitest_1.test)("create authorize and capture and refund", async () => {
            const cardToken = await setup_1.layers.tokenizeCard(cardLayers, "Not Used");
            requestLayersStyle.paymentMethods[0].card.token = cardToken;
            requestLayersStyle.code = new Date().getTime().toString();
            const response = await setup_1.layers.createTransaction(requestLayersStyle);
            await setup_1.layers.chargeTransaction(response.referenceId);
            const refund = await setup_1.layers.refundTransaction(response.referenceId);
            const paymentRefund = refund.payments[0];
            const payment = refund.payments[1];
            vitest_1.assert.equal(2, refund.payments.length);
            vitest_1.assert.equal(1035, refund.amount);
            vitest_1.assert.equal(1035, refund.refunded_amount);
            vitest_1.assert.isNotNull(response.referenceId);
            vitest_1.assert.equal("06219385993", refund.customer_id);
            vitest_1.assert.equal(Enum_1.ChargeStatusTypes.REFUND, refund.status);
            vitest_1.assert.equal('credit_card', payment.payment_method);
            vitest_1.assert.equal(sellerId.toString(), payment.recipient_id);
            vitest_1.assert.equal(1035, payment.amount);
            vitest_1.assert.equal(Enum_1.TransactionStatusTypes.APPROVED, payment.status);
            vitest_1.assert.equal(1035, payment.refunded_value);
            vitest_1.assert.equal(sellerId.toString(), payment.recipient_id);
            vitest_1.assert.equal(2, payment.credit_card.installments);
            vitest_1.assert.equal(cardToken, payment.credit_card.token);
            vitest_1.assert.equal('credit_card', paymentRefund.payment_method);
            vitest_1.assert.equal(sellerId.toString(), paymentRefund.recipient_id);
            vitest_1.assert.equal(-1035, paymentRefund.amount);
            vitest_1.assert.equal(Enum_1.TransactionStatusTypes.REFUND, paymentRefund.status);
            vitest_1.assert.equal(1035, paymentRefund.refunded_value);
            vitest_1.assert.equal(sellerId.toString(), paymentRefund.recipient_id);
            vitest_1.assert.equal(null, paymentRefund.credit_card.installments);
            vitest_1.assert.equal(cardToken, paymentRefund.credit_card.token);
        });
        (0, vitest_1.test)("create not Unauthorized", async () => {
            const cardToken = await setup_1.layers.tokenizeCard(cardLayers, "Not Used");
            requestLayersStyle.paymentMethods[0].card.token = cardToken;
            requestLayersStyle.paymentMethods[0].total.amount = 58;
            requestLayersStyle.paymentMethods[0].recipients[0].total.amount = 58;
            requestLayersStyle.price.amount = 58;
            requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
            const charge = await setup_1.layers.createTransaction(requestLayersStyle);
            const payment = charge.payments[0];
            vitest_1.assert.equal(1, charge.payments.length);
            vitest_1.assert.equal(58, charge.amount);
            vitest_1.assert.equal(null, charge.refunded_amount);
            vitest_1.assert.equal(Enum_1.ChargeStatusTypes.PENDING, charge.status);
            vitest_1.assert.isNotNull(charge.referenceId);
            vitest_1.assert.isNotNull(payment.reference_id);
            vitest_1.assert.equal(58, payment.amount);
            vitest_1.assert.equal(Enum_1.TransactionStatusTypes.NOT_AUTHORIZED, payment.status);
            vitest_1.assert.equal(0, payment.refunded_value);
            vitest_1.assert.equal('credit_card', payment.payment_method);
            vitest_1.assert.equal(sellerId.toString(), payment.recipient_id);
            vitest_1.assert.equal(2, payment.credit_card.installments);
            vitest_1.assert.equal(cardToken, payment.credit_card.token);
            vitest_1.assert.equal("06219385993", charge.customer_id);
        });
        (0, vitest_1.test)("create bad request", async () => {
            const cardToken = await setup_1.layers.tokenizeCard(cardLayers, "Not Used");
            requestLayersStyle.paymentMethods[0].card.token = cardToken;
            requestLayersStyle.paymentMethods[0].total.amount = 58;
            requestLayersStyle.paymentMethods[0].recipients[0].total.amount = 58;
            requestLayersStyle.price.amount = 59;
            requestLayersStyle.code = `o-${new Date().getTime().toString()}`;
        });
        (0, vitest_1.describe)("credit card two cards", () => {
            const requestLayersStyleTwoCards = {
                code: "",
                price: {
                    amount: 2035,
                    currency: "BRL"
                },
                paymentMethods: [{
                        installments: 2,
                        method: "credit_card",
                        recipients: [{ sourceId: 1, total: { amount: 1035, currency: "BRL" } }],
                        card: {
                            token: "aot",
                            securityCode: "123"
                        },
                        total: { amount: 1035, currency: "BRL" }
                    },
                    {
                        installments: 1,
                        method: "credit_card",
                        recipients: [{ sourceId: 1, total: { amount: 1000, currency: "BRL" } }],
                        card: {
                            token: "aot",
                            securityCode: "123"
                        },
                        total: { amount: 1000, currency: "BRL" }
                    }
                ],
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
                urlNotification: undefined
            };
            const cardLayersSecond = {
                title: "Non used",
                name: "Douglas Hiura Longo Visa",
                month: 1,
                year: 2029,
                number: "4235647728025682",
                brand: "VISA",
            };
            (0, vitest_1.test)("create authorize two card", async () => {
                const cardToken = await setup_1.layers.tokenizeCard(cardLayers, "Not Used");
                const cardTokenSecond = await setup_1.layers.tokenizeCard(cardLayersSecond, "Not Used");
                requestLayersStyleTwoCards.paymentMethods[0].card.token = cardToken;
                requestLayersStyleTwoCards.paymentMethods[1].card.token = cardTokenSecond;
                requestLayersStyleTwoCards.code = `o-${new Date().getTime().toString()}`;
                const charge = await setup_1.layers.createTransaction(requestLayersStyleTwoCards);
                const payment = charge.payments[1];
                const paymentSecond = charge.payments[0];
                vitest_1.assert.equal(2, charge.payments.length);
                vitest_1.assert.equal(2035, charge.amount);
                vitest_1.assert.equal(null, charge.refunded_amount);
                vitest_1.assert.equal(Enum_1.ChargeStatusTypes.AUTHORIZED, charge.status);
                vitest_1.assert.equal("06219385993", charge.customer_id);
                vitest_1.assert.isNotNull(charge.referenceId);
                vitest_1.assert.isNotNull(payment.reference_id);
                vitest_1.assert.equal(1035, payment.amount);
                vitest_1.assert.equal(0, payment.refunded_value);
                vitest_1.assert.equal(Enum_1.TransactionStatusTypes.AUTHORIZED, paymentSecond.status);
                vitest_1.assert.equal('credit_card', payment.payment_method);
                vitest_1.assert.equal(sellerId.toString(), payment.recipient_id);
                vitest_1.assert.equal(2, payment.credit_card.installments);
                vitest_1.assert.equal(cardToken, payment.credit_card.token);
                vitest_1.assert.equal(1000, paymentSecond.amount);
                vitest_1.assert.equal(0, paymentSecond.refunded_value);
                vitest_1.assert.equal(Enum_1.TransactionStatusTypes.AUTHORIZED, paymentSecond.status);
                vitest_1.assert.equal('credit_card', paymentSecond.payment_method);
                vitest_1.assert.equal(sellerId.toString(), paymentSecond.recipient_id);
                vitest_1.assert.equal(1, paymentSecond.credit_card.installments);
                vitest_1.assert.equal(cardTokenSecond, paymentSecond.credit_card.token);
            });
            (0, vitest_1.test)("create authorize and capture two cards", async () => {
                const cardToken = await setup_1.layers.tokenizeCard(cardLayers, "Not Used");
                const cardTokenSecond = await setup_1.layers.tokenizeCard(cardLayersSecond, "Not Used");
                requestLayersStyleTwoCards.paymentMethods[0].card.token = cardToken;
                requestLayersStyleTwoCards.paymentMethods[1].card.token = cardTokenSecond;
                requestLayersStyleTwoCards.code = `o-${new Date().getTime().toString()}`;
                const charge = await setup_1.layers.createTransaction(requestLayersStyleTwoCards);
                const responseCapture = await setup_1.layers.chargeTransaction(charge.referenceId);
                const payment = responseCapture.payments[1];
                const paymentSecond = responseCapture.payments[0];
                vitest_1.assert.equal(2, responseCapture.payments.length);
                vitest_1.assert.isNotNull(charge.referenceId);
                vitest_1.assert.equal(2035, responseCapture.amount);
                vitest_1.assert.equal(null, responseCapture.refunded_amount);
                vitest_1.assert.equal("06219385993", responseCapture.customer_id);
                vitest_1.assert.equal(Enum_1.ChargeStatusTypes.PAY, responseCapture.status);
                vitest_1.assert.equal('credit_card', responseCapture.payments[0].payment_method);
                vitest_1.assert.equal(sellerId.toString(), responseCapture.payments[0].recipient_id);
                vitest_1.assert.equal(1035, payment.amount);
                vitest_1.assert.equal(Enum_1.TransactionStatusTypes.APPROVED, payment.status);
                vitest_1.assert.equal(0, payment.refunded_value);
                vitest_1.assert.equal(sellerId.toString(), payment.recipient_id);
                vitest_1.assert.equal(2, payment.credit_card.installments);
                vitest_1.assert.equal(cardToken, payment.credit_card.token);
                vitest_1.assert.equal(1000, paymentSecond.amount);
                vitest_1.assert.equal(0, paymentSecond.refunded_value);
                vitest_1.assert.equal(Enum_1.TransactionStatusTypes.APPROVED, paymentSecond.status);
                vitest_1.assert.equal('credit_card', paymentSecond.payment_method);
                vitest_1.assert.equal(sellerId.toString(), paymentSecond.recipient_id);
                vitest_1.assert.equal(1, paymentSecond.credit_card.installments);
                vitest_1.assert.equal(cardTokenSecond, paymentSecond.credit_card.token);
            });
            (0, vitest_1.test)("create authorize and capture and refund two cards", async () => {
                const cardToken = await setup_1.layers.tokenizeCard(cardLayers, "Not Used");
                const cardTokenSecond = await setup_1.layers.tokenizeCard(cardLayersSecond, "Not Used");
                requestLayersStyleTwoCards.paymentMethods[0].card.token = cardToken;
                requestLayersStyleTwoCards.paymentMethods[1].card.token = cardTokenSecond;
                requestLayersStyleTwoCards.code = `o-${new Date().getTime().toString()}`;
                const charge = await setup_1.layers.createTransaction(requestLayersStyleTwoCards);
                await setup_1.layers.chargeTransaction(charge.referenceId);
                const refund = await setup_1.layers.refundTransaction(charge.referenceId);
                const paymentRefundSecond = refund.payments[0];
                const paymentRefund = refund.payments[1];
                const paymentSecond = refund.payments[2];
                const payment = refund.payments[3];
                vitest_1.assert.equal(4, refund.payments.length);
                vitest_1.assert.isNotNull(charge.referenceId);
                vitest_1.assert.equal(2035, refund.amount);
                vitest_1.assert.equal(2035, refund.refunded_amount);
                vitest_1.assert.equal("06219385993", refund.customer_id);
                vitest_1.assert.equal(Enum_1.ChargeStatusTypes.REFUND, refund.status);
                vitest_1.assert.equal(-1035, paymentRefund.amount);
                vitest_1.assert.equal(Enum_1.TransactionStatusTypes.REFUND, paymentRefund.status);
                vitest_1.assert.equal(1035, paymentRefund.refunded_value);
                vitest_1.assert.equal(sellerId.toString(), paymentRefund.recipient_id);
                vitest_1.assert.equal(null, paymentRefund.credit_card.installments);
                vitest_1.assert.equal(cardToken, paymentRefund.credit_card.token);
                vitest_1.assert.equal(-1000, paymentRefundSecond.amount);
                vitest_1.assert.equal(1000, paymentRefundSecond.refunded_value);
                vitest_1.assert.equal(Enum_1.TransactionStatusTypes.REFUND, paymentRefundSecond.status);
                vitest_1.assert.equal('credit_card', paymentRefundSecond.payment_method);
                vitest_1.assert.equal(sellerId.toString(), paymentRefundSecond.recipient_id);
                vitest_1.assert.equal(null, paymentRefundSecond.credit_card.installments);
                vitest_1.assert.equal(cardTokenSecond, paymentRefundSecond.credit_card.token);
                vitest_1.assert.equal(1035, payment.amount);
                vitest_1.assert.equal(Enum_1.TransactionStatusTypes.APPROVED, payment.status);
                vitest_1.assert.equal(1035, payment.refunded_value);
                vitest_1.assert.equal(sellerId.toString(), payment.recipient_id);
                vitest_1.assert.equal(2, payment.credit_card.installments);
                vitest_1.assert.equal(cardToken, payment.credit_card.token);
                vitest_1.assert.equal('credit_card', payment.payment_method);
                vitest_1.assert.equal(1000, paymentSecond.amount);
                vitest_1.assert.equal(1000, paymentSecond.refunded_value);
                vitest_1.assert.equal(Enum_1.TransactionStatusTypes.APPROVED, paymentSecond.status);
                vitest_1.assert.equal('credit_card', paymentSecond.payment_method);
                vitest_1.assert.equal(sellerId.toString(), paymentSecond.recipient_id);
                vitest_1.assert.equal(1, paymentSecond.credit_card.installments);
                vitest_1.assert.equal(cardTokenSecond, paymentSecond.credit_card.token);
            });
        });
    });
});
//# sourceMappingURL=integration-layers-api.credit-card-v2.test.js.map