
import { Bempaggo, BempaggoFactory } from "bempaggo-kit/lib/app/modules/Bempaggo";
import { BempaggoTransactionServiceable, CreditCardOperable } from "bempaggo-kit/lib/app/modules/Transaction";
import { BempaggoChargeRequest } from "bempaggo-kit/lib/app/modules/entity/BempaggoRequest";
import { BempaggoChargeResponse } from "bempaggo-kit/lib/app/modules/entity/BempaggoResponse";
import { Environments } from "bempaggo-kit/lib/app/modules/entity/Enum";
import BemPaggoSdk from "bempaggo-kit/lib/app/modules/layers/BemPaggoSDK";
import { BemPaggoCustomerPaymentMethod, BemPaggoTransaction } from "bempaggo-kit/lib/app/modules/layers/interfaces";
import { TransactionGroup } from "bempaggo-kit/lib/app/modules/layers/transactionGroup";
import { describe, expect, test } from "vitest";

const requestBempaggoStyle: BempaggoChargeRequest = {
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
}

const requestLayersStyle: TransactionGroup = {
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
}


const cardLayers: BemPaggoCustomerPaymentMethod = {
  title: "Non used",
  name: "Douglas Hiura Longo",
  month: 1,
  year: 2028,
  number: "5448280000000007",
  brand: "MASTERCARD",
  
}
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDcwIiwidGVuYW50IjoiYmVtcGFnZ29fZW1wcmVzYWV4ZW1wbG9sdGRhXzEwMjAiLCJpYXQiOjE2ODU0NTA4MTIsImV4cCI6NDEwMjM1ODM5OSwiaXNNYXN0ZXIiOnRydWV9.IY6iDldxuD9Msh32A1weaTxVSDDsLldy1Rma3bVnLZyIM-qhwE-GdrUBXLDFAJvhn5ZKqqzGPu1FsdtbbAJv_g";

describe("How use it", () => {
  describe("create", () => {
    test("Bempaggo Factory Development monolithic call style in two steps", async () => {
      requestBempaggoStyle.yourReferenceId = new Date().getTime();
      const bempaggo: Bempaggo = new BempaggoFactory().create(Environments.SANDBOX, token);
      const chargeService: BempaggoTransactionServiceable = bempaggo.getChargeService();
      const creditCard:CreditCardOperable = chargeService.getCreditCardServiceable();
      const response: BempaggoChargeResponse = await creditCard.createCharge(requestBempaggoStyle);
      expect(response.status).equals("AUTHORIZED");
    });
    
    test("Bempaggo Factory Development monolithic call style in one step", async () => {
      requestBempaggoStyle.yourReferenceId = new Date().getTime();
      const bempaggo: Bempaggo = new BempaggoFactory().create(Environments.SANDBOX, token);
      const chargeService: BempaggoTransactionServiceable = bempaggo.getChargeService();
      const creditCard:CreditCardOperable = chargeService.getCreditCardServiceable();
      const response: BempaggoChargeResponse = await creditCard.createChargeAndCapture(requestBempaggoStyle);
      expect(response.status).equals("PAY");
    });
  });

  describe("create layers style", () => {

    test("create token from card", async () => {
      const layers: BemPaggoSdk = new BemPaggoSdk("https://api-sandbox.bempaggo.io/api", token);
      const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
      expect(cardToken).not.toBeNull();
    });
    test("create authorize", async () => {
      const layers: BemPaggoSdk = new BemPaggoSdk("https://api-sandbox.bempaggo.io/api", token);
      const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
      requestLayersStyle.paymentMethod.card.token = cardToken;
      requestLayersStyle.code= new Date().getTime().toString();
      const response: BemPaggoTransaction = await layers.createTransaction(requestLayersStyle);
      expect(response.payment.recipient_id).not.toBeNull();
      expect(JSON.stringify(response)).contains("AUTHORIZED");
    });
    test("create authorize and capture", async () => {
      const layers: BemPaggoSdk = new BemPaggoSdk("https://api-sandbox.bempaggo.io/api", token);
      const cardToken: string = await layers.tokenizeCard(cardLayers, "Not Used");
      requestLayersStyle.paymentMethod.card.token = cardToken;
      requestLayersStyle.code= new Date().getTime().toString();
      const response: BemPaggoTransaction = await layers.createTransaction(requestLayersStyle);
      console.log(response.payment.recipient_id);
      const responseCapture: BemPaggoTransaction = await layers.chargeTransaction(response.payment.recipient_id);
      expect(response.payment.recipient_id).not.toBeNull();
      expect(JSON.stringify(responseCapture)).contains("PAY");
    });

  });
});