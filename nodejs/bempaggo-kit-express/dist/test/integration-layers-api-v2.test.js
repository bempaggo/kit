"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bempaggo_1 = require("bempaggo-kit/lib/app/modules/Bempaggo");
const Enum_1 = require("bempaggo-kit/lib/app/modules/entity/Enum");
const BemPaggoSDK_1 = __importDefault(require("bempaggo-kit/lib/app/modules/layers/BemPaggoSDK"));
const vitest_1 = require("vitest");
const requestBempaggoStyle = {
    "installments": 1,
    "value": 1035,
    "card": {
        "cvv": "123",
        "holder": { "document": "06219385993", "name": "Douglas Hiura" },
        "expiration": { "month": 1, "year": 2028 },
        "cardNumber": "5448280000000007"
    },
    "customer": {
        "birthdate": "1992-02-29",
        "document": "06219385993", "name": "Douglas Hiura Longo"
    },
    yourReferenceId: new Date().getTime(),
    affiliateId: 1
};
const requestLayersStyle = {
    code: "",
    saleKind: "order",
    price: {
        amount: 1035,
        currency: "BRL"
    },
    paymentMethod: {
        key: "1",
        custom: false,
        sourceId: 1,
        gateway: "bempaggo",
        method: "credit_card",
        strategy: "installment",
        installments: 1,
        discounts: [],
        taxes: [],
        card: {
            name: "Douglas Hiura Longo",
            token: "",
            tokenValidUntil: undefined,
            hash: "",
            last_digits: "",
            first_digits: "",
            brand: "",
            brandPretty: "",
            expirationMonth: 0,
            expirationYear: 0,
            securityCode: "123"
        },
        bank_slip: {
            url: "",
            dueDays: 0,
            lateFee: 0,
            lateInterestRate: 0
        }
    },
    status: "pending",
    currency: "BRL",
    recipients: [{
            sourceId: 1,
            total: {
                amount: 1035,
                currency: 'BRL'
            }
        }],
    externalTransactionPayload: undefined,
    error: undefined,
    gateway: "bempaggo",
    sourceId: 1,
    totalInstallments: 0,
    customerPayload: {
        name: "Douglas Hiuara Longo Customer",
        email: "douglas@bempaggo.com.br",
        phone: "(48) 98865-7196",
        birth: new Date("1992-02-29"),
        document: {
            kind: "cpf",
            value: "06219385993"
        },
        active: true,
        token: "",
        paymentMethods: [],
        addresses: [],
        sources: []
    },
    dueAt: undefined
};
const cardLayers = {
    title: "Non used",
    name: "Douglas Hiura Longo",
    month: 1,
    year: 2028,
    number: "5448280000000007",
    brand: "MASTERCARD",
};
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDcwIiwidGVuYW50IjoiYmVtcGFnZ29fZW1wcmVzYWV4ZW1wbG9sdGRhXzEwMjAiLCJpYXQiOjE2ODU0NTA4MTIsImV4cCI6NDEwMjM1ODM5OSwiaXNNYXN0ZXIiOnRydWV9.IY6iDldxuD9Msh32A1weaTxVSDDsLldy1Rma3bVnLZyIM-qhwE-GdrUBXLDFAJvhn5ZKqqzGPu1FsdtbbAJv_g";
(0, vitest_1.describe)("How use it", () => {
    (0, vitest_1.describe)("create", () => {
        (0, vitest_1.test)("Bempaggo Factory Development monolithic call style in two steps", async () => {
            requestBempaggoStyle.yourReferenceId = new Date().getTime();
            const bempaggo = new Bempaggo_1.BempaggoFactory().create(Enum_1.Environments.SANDBOX, token);
            const chargeService = bempaggo.getChargeService();
            const creditCard = chargeService.getCreditCardServiceable();
            const response = await creditCard.createCharge(requestBempaggoStyle);
            (0, vitest_1.expect)(response.status).equals("AUTHORIZED");
        });
        (0, vitest_1.test)("Bempaggo Factory Development monolithic call style in one step", async () => {
            requestBempaggoStyle.yourReferenceId = new Date().getTime();
            const bempaggo = new Bempaggo_1.BempaggoFactory().create(Enum_1.Environments.SANDBOX, token);
            const chargeService = bempaggo.getChargeService();
            const creditCard = chargeService.getCreditCardServiceable();
            const response = await creditCard.createChargeAndCapture(requestBempaggoStyle);
            (0, vitest_1.expect)(response.status).equals("PAY");
        });
    });
    (0, vitest_1.describe)("create layers style", () => {
        (0, vitest_1.test)("create token from card", async () => {
            const layers = new BemPaggoSDK_1.default("https://api-sandbox.bempaggo.io/api", token);
            const cardToken = await layers.tokenizeCard(cardLayers, "Not Used");
            (0, vitest_1.expect)(cardToken).not.toBeNull();
        });
        (0, vitest_1.test)("create authorize", async () => {
            const layers = new BemPaggoSDK_1.default("https://api-sandbox.bempaggo.io/api", token);
            const cardToken = await layers.tokenizeCard(cardLayers, "Not Used");
            requestLayersStyle.paymentMethod.card.token = cardToken;
            requestLayersStyle.code = new Date().getTime().toString();
            const response = await layers.createTransaction(requestLayersStyle);
            (0, vitest_1.expect)(response.payment.recipient_id).not.toBeNull();
            (0, vitest_1.expect)(JSON.stringify(response)).contains("AUTHORIZED");
        });
        (0, vitest_1.test)("create authorize and capture", async () => {
            const layers = new BemPaggoSDK_1.default("https://api-sandbox.bempaggo.io/api", token);
            const cardToken = await layers.tokenizeCard(cardLayers, "Not Used");
            requestLayersStyle.paymentMethod.card.token = cardToken;
            requestLayersStyle.code = new Date().getTime().toString();
            const response = await layers.createTransaction(requestLayersStyle);
            console.log(response.payment.recipient_id);
            const responseCapture = await layers.chargeTransaction(response.payment.recipient_id);
            (0, vitest_1.expect)(response.payment.recipient_id).not.toBeNull();
            (0, vitest_1.expect)(JSON.stringify(responseCapture)).contains("PAY");
        });
    });
});
//# sourceMappingURL=integration-layers-api-v2.test.js.map