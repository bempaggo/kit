"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BemPaggoSDK_1 = __importDefault(require("@/app/modules/layers/BemPaggoSDK"));
const vitest_1 = require("vitest");
const requestLayersStyle = {
    code: "",
    price: {
        amount: 1035,
        currency: "BRL"
    },
    paymentMethods: [{
            installments: 1,
            method: "credit_card",
            recipients: [{ sourceId: 1, total: { amount: 1035, currency: "BRL" } }],
            card: {
                token: "aot",
                securityCode: "123"
            },
            total: { amount: 1035, currency: "BRL" }
        }],
    sourceId: 1,
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
    urlNotification: null
};
const cardLayers = {
    title: "Non used",
    name: "Douglas Hiura Longo",
    month: 1,
    year: 2028,
    number: "5448280000000007",
    brand: "MASTERCARD",
};
const token = "generates in portal";
const url = "https://api-sandbox.bempaggo.io/api";
const layers = new BemPaggoSDK_1.default(url, token);
(0, vitest_1.describe)("How use it", () => {
    (0, vitest_1.describe)("create layers style", () => {
        (0, vitest_1.test)("create token from card", async () => {
            const cardToken = await layers.tokenizeCard(cardLayers, "Not Used");
            (0, vitest_1.expect)(cardToken).not.toBeNull();
        });
        (0, vitest_1.test)("create authorize", async () => {
            const cardToken = await layers.tokenizeCard(cardLayers, "Not Used");
            requestLayersStyle.paymentMethods[0].card.token = cardToken;
            requestLayersStyle.code = `order-${new Date().getTime().toString()}`;
            const response = await layers.createTransaction(requestLayersStyle);
            (0, vitest_1.expect)(response.referenceId).not.toBeNull();
            (0, vitest_1.expect)(JSON.stringify(response.payments[0])).contains(cardToken);
            (0, vitest_1.expect)(JSON.stringify(response.payments[0])).contains("AUTHORIZED");
            (0, vitest_1.expect)(JSON.stringify(response.payments[0])).contains("credit_card");
            (0, vitest_1.expect)(JSON.stringify(response)).contains("AUTHORIZED");
        });
        (0, vitest_1.test)("create authorize and capture", async () => {
            const cardToken = await layers.tokenizeCard(cardLayers, "Not Used");
            requestLayersStyle.paymentMethods[0].card.token = cardToken;
            requestLayersStyle.code = new Date().getTime().toString();
            const response = await layers.createTransaction(requestLayersStyle);
            const responseCapture = await layers.chargeTransaction(response.referenceId);
            (0, vitest_1.expect)(JSON.stringify(responseCapture.payments[0])).contains(cardToken);
            (0, vitest_1.expect)(JSON.stringify(responseCapture.payments[0])).contains("APPROVED");
            (0, vitest_1.expect)(JSON.stringify(responseCapture.payments[0])).contains("credit_card");
            (0, vitest_1.expect)(JSON.stringify(responseCapture)).contains("PAY");
        });
        (0, vitest_1.test)("create authorize and capture and refund", async () => {
            const cardToken = await layers.tokenizeCard(cardLayers, "Not Used");
            requestLayersStyle.paymentMethods[0].card.token = cardToken;
            requestLayersStyle.code = new Date().getTime().toString();
            const response = await layers.createTransaction(requestLayersStyle);
            const responseCapture = await layers.chargeTransaction(response.referenceId);
            const refund = await layers.refundTransaction(response.referenceId);
            (0, vitest_1.expect)(JSON.stringify(responseCapture.payments[0])).contains(cardToken);
            (0, vitest_1.expect)(JSON.stringify(responseCapture.payments[0])).contains("APPROVED");
            (0, vitest_1.expect)(JSON.stringify(responseCapture.payments[0])).contains("credit_card");
            (0, vitest_1.expect)(JSON.stringify(responseCapture)).contains("PAY");
        });
    });
});
//# sourceMappingURL=integration-layers-api-v2.test.js.map