import { BempaggoBankSlipTransactionResponse } from "@/app/modules/entity/BempaggoResponse";
import { PaymentMethodTypes, TransactionResponseTypes, TransactionStatusTypes } from "@/app/modules/entity/Enum";
import { describe, expect, test } from "vitest";

describe("Bankslip transaction", () => {
  describe("Response", () => {
    test("Valid response", async () => {
      const bankSlip: BempaggoBankSlipTransactionResponse = {
        bank: {
          account: "123456",
          code: "001",
          agency: "1234",
        },
        expirationDate: 1620000000000,
        paymentInstructions: "Pagar até o vencimento",
        communityLegalName: "Bempaggo",
        communityLegalDocument: "12345678901234",
        ourNumber: "12345678901234567890",
        customer: {
          id: 1,
          name: "João da Silva",
          address: {
            city: "São Paulo",
            neighborhood: "Centro",
            state: "SP",
            street: "Rua da Consolação",
            streetNumber: "123",
            zipCode: "12345678",
          },
          document: "12345678901",
          birthdate: "1620000000000",
          email: "joaodasilva@bempaggo.com",
          phone: {
            areaCode: "11",
            countryCode: "55",
            number: "123456789"
          }
        },  
        digitableLine: "12345678901234567890123456789012345678901234567890",
        source: {
          kind: "BANK_SLIP",
          name: "Banco do Brasil",
        },
        paymentMethod: PaymentMethodTypes.BANK_SLIP,
        id: 1,
        establishment:{
          id: 1,
        },
        returnCode: "00",
        returnMessage: "Transação autorizada",
        status: TransactionStatusTypes.AUTHORIZED,
        value: 1000,
        transactionDate: 1620000000000,
        transactionReference: "12345678901234567890",
        type: TransactionResponseTypes.LOOSE,
        affiliate: {
          id: 1,
          name: "Bempaggo",
          businessName: "Bempaggo",
        },
        paidValue: 1000,
        splits: []
      };

      expect(bankSlip).not.toBeNull();
      expect(bankSlip).not.toBeUndefined();

      expect(Object.keys(bankSlip).length).toBe(22);
      expect(Object.keys(bankSlip.bank).length).toBe(3);
      expect(Object.keys(bankSlip.customer).length).toBe(7);
      expect(Object.keys(bankSlip.customer.address!).length).toBe(6);
      expect(Object.keys(bankSlip.customer.phone!).length).toBe(3);
      expect(Object.keys(bankSlip.source).length).toBe(2);
      expect(Object.keys(bankSlip.establishment).length).toBe(1);
      expect(Object.keys(bankSlip.affiliate!).length).toBe(3);

      expect(bankSlip).toHaveProperty("bank");
      expect(bankSlip).toHaveProperty("expirationDate");
      expect(bankSlip).toHaveProperty("paymentInstructions");
      expect(bankSlip).toHaveProperty("communityLegalName");
      expect(bankSlip).toHaveProperty("communityLegalDocument");
      expect(bankSlip).toHaveProperty("ourNumber");
      expect(bankSlip).toHaveProperty("customer");
      expect(bankSlip).toHaveProperty("digitableLine");
      expect(bankSlip).toHaveProperty("source");
      expect(bankSlip).toHaveProperty("paymentMethod");
      expect(bankSlip).toHaveProperty("id");
      expect(bankSlip).toHaveProperty("establishment");
      expect(bankSlip).toHaveProperty("returnCode");
      expect(bankSlip).toHaveProperty("returnMessage");
      expect(bankSlip).toHaveProperty("status");
      expect(bankSlip).toHaveProperty("value");
      expect(bankSlip).toHaveProperty("transactionDate");
      expect(bankSlip).toHaveProperty("transactionReference");
      expect(bankSlip).toHaveProperty("type");
      expect(bankSlip).toHaveProperty("affiliate");
      expect(bankSlip).toHaveProperty("paidValue");
      expect(bankSlip).toHaveProperty("splits");

      expect(bankSlip.bank).not.toBeNull();
      expect(bankSlip.bank).not.toBeUndefined();
      expect(bankSlip.bank).toHaveProperty("account");
      expect(bankSlip.bank).toHaveProperty("code");
      expect(bankSlip.bank).toHaveProperty("agency");

      expect(bankSlip.expirationDate).not.toBeNull();
      expect(bankSlip.expirationDate).not.toBeUndefined();
      expect(bankSlip.expirationDate).not.toBeNaN();
      expect(bankSlip.expirationDate).toBe(1620000000000);

      expect(bankSlip.paymentInstructions).not.toBeNull();
      expect(bankSlip.paymentInstructions).not.toBeUndefined();
      expect(bankSlip.paymentInstructions).not.toBeNaN();
      expect(bankSlip.paymentInstructions).toBe("Pagar até o vencimento");

      expect(bankSlip.communityLegalName).not.toBeNull();
      expect(bankSlip.communityLegalName).not.toBeUndefined();
      expect(bankSlip.communityLegalName).not.toBeNaN();
      expect(bankSlip.communityLegalName).toBe("Bempaggo");

      expect(bankSlip.communityLegalDocument).not.toBeNull();
      expect(bankSlip.communityLegalDocument).not.toBeUndefined();
      expect(bankSlip.communityLegalDocument).not.toBeNaN();
      expect(bankSlip.communityLegalDocument).toBe("12345678901234");

      expect(bankSlip.ourNumber).not.toBeNull();
      expect(bankSlip.ourNumber).not.toBeUndefined();
      expect(bankSlip.ourNumber).not.toBeNaN();
      expect(bankSlip.ourNumber).toBe("12345678901234567890");

      expect(bankSlip.customer).not.toBeNull();
      expect(bankSlip.customer).not.toBeUndefined();
      expect(bankSlip.customer).toHaveProperty("id");
      expect(bankSlip.customer).toHaveProperty("name");
      expect(bankSlip.customer).toHaveProperty("address");
      expect(bankSlip.customer).toHaveProperty("document");
      expect(bankSlip.customer).toHaveProperty("birthdate");
      expect(bankSlip.customer).toHaveProperty("email");
      expect(bankSlip.customer).toHaveProperty("phone");

      expect(bankSlip.customer.id).not.toBeNull();
      expect(bankSlip.customer.id).not.toBeUndefined();
      expect(bankSlip.customer.id).not.toBeNaN();
      expect(bankSlip.customer.id).toBe(1);

      expect(bankSlip.customer.name).not.toBeNull();
      expect(bankSlip.customer.name).not.toBeUndefined();
      expect(bankSlip.customer.name).not.toBeNaN();
      expect(bankSlip.customer.name).toBe("João da Silva");

      expect(bankSlip.customer.address).not.toBeNull();
      expect(bankSlip.customer.address).not.toBeUndefined();
      expect(bankSlip.customer.address).toHaveProperty("city");
      expect(bankSlip.customer.address).toHaveProperty("neighborhood");
      expect(bankSlip.customer.address).toHaveProperty("state");
      expect(bankSlip.customer.address).toHaveProperty("street");
      expect(bankSlip.customer.address).toHaveProperty("streetNumber");
      expect(bankSlip.customer.address).toHaveProperty("zipCode");

      expect(bankSlip.customer.address?.city).not.toBeNull();
      expect(bankSlip.customer.address?.city).not.toBeUndefined();
      expect(bankSlip.customer.address?.city).not.toBeNaN();
      expect(bankSlip.customer.address?.city).toBe("São Paulo");

      expect(bankSlip.customer.address?.neighborhood).not.toBeNull();
      expect(bankSlip.customer.address?.neighborhood).not.toBeUndefined();
      expect(bankSlip.customer.address?.neighborhood).not.toBeNaN();
      expect(bankSlip.customer.address?.neighborhood).toBe("Centro");

      expect(bankSlip.customer.address?.state).not.toBeNull();
      expect(bankSlip.customer.address?.state).not.toBeUndefined();
      expect(bankSlip.customer.address?.state).not.toBeNaN();
      expect(bankSlip.customer.address?.state).toBe("SP");

      expect(bankSlip.customer.address?.street).not.toBeNull();
      expect(bankSlip.customer.address?.street).not.toBeUndefined();
      expect(bankSlip.customer.address?.street).not.toBeNaN();
      expect(bankSlip.customer.address?.street).toBe("Rua da Consolação");

      expect(bankSlip.customer.address?.streetNumber).not.toBeNull();
      expect(bankSlip.customer.address?.streetNumber).not.toBeUndefined();
      expect(bankSlip.customer.address?.streetNumber).not.toBeNaN();
      expect(bankSlip.customer.address?.streetNumber).toBe("123");

      expect(bankSlip.customer.address?.zipCode).not.toBeNull();
      expect(bankSlip.customer.address?.zipCode).not.toBeUndefined();
      expect(bankSlip.customer.address?.zipCode).not.toBeNaN();
      expect(bankSlip.customer.address?.zipCode).toBe("12345678");

      expect(bankSlip.customer.document).not.toBeNull();
      expect(bankSlip.customer.document).not.toBeUndefined();
      expect(bankSlip.customer.document).not.toBeNaN();
      expect(bankSlip.customer.document).toBe("12345678901");

      expect(bankSlip.customer.birthdate).not.toBeNull();
      expect(bankSlip.customer.birthdate).not.toBeUndefined();
      expect(bankSlip.customer.birthdate).not.toBeNaN();
      expect(bankSlip.customer.birthdate).toBe("1620000000000");

      expect(bankSlip.customer.email).not.toBeNull();
      expect(bankSlip.customer.email).not.toBeUndefined();
      expect(bankSlip.customer.email).not.toBeNaN();
      expect(bankSlip.customer.email).toBe("joaodasilva@bempaggo.com");

      expect(bankSlip.customer.phone).not.toBeNull();
      expect(bankSlip.customer.phone).not.toBeUndefined();
      expect(bankSlip.customer.phone).not.toBeNaN();
      expect(bankSlip.customer.phone?.number).toBe("123456789");
      expect(bankSlip.customer.phone?.areaCode).toBe("11");
      expect(bankSlip.customer.phone?.countryCode).toBe("55");

      expect(bankSlip.digitableLine).not.toBeNull();
      expect(bankSlip.digitableLine).not.toBeUndefined();
      expect(bankSlip.digitableLine).not.toBeNaN();
      expect(bankSlip.digitableLine).toBe("12345678901234567890123456789012345678901234567890");

      expect(bankSlip.source).not.toBeNull();
      expect(bankSlip.source).not.toBeUndefined();
      expect(bankSlip.source).not.toBeNaN();

      expect(bankSlip.source).toHaveProperty("kind");
      expect(bankSlip.source).toHaveProperty("name");

      expect(bankSlip.source.kind).not.toBeNull();
      expect(bankSlip.source.kind).not.toBeUndefined();
      expect(bankSlip.source.kind).not.toBeNaN();
      expect(bankSlip.source.kind).toBe("BANK_SLIP");

      expect(bankSlip.source.name).not.toBeNull();
      expect(bankSlip.source.name).not.toBeUndefined();
      expect(bankSlip.source.name).not.toBeNaN();
      expect(bankSlip.source.name).toBe("Banco do Brasil");

      expect(bankSlip.paymentMethod).not.toBeNull();
      expect(bankSlip.paymentMethod).not.toBeUndefined();
      expect(bankSlip.paymentMethod).not.toBeNaN();

      expect(bankSlip.paymentMethod).toBe(PaymentMethodTypes.BANK_SLIP);

      expect(bankSlip.id).not.toBeNull();
      expect(bankSlip.id).not.toBeUndefined();
      expect(bankSlip.id).not.toBeNaN();
      expect(bankSlip.id).toBe(1);

      expect(bankSlip.transactionReference).not.toBeNull();
      expect(bankSlip.transactionReference).not.toBeUndefined();
      expect(bankSlip.transactionReference).not.toBeNaN();
      expect(bankSlip.transactionReference).toBe("12345678901234567890");

      expect(bankSlip.returnCode).not.toBeNull();
      expect(bankSlip.returnCode).not.toBeUndefined();
      expect(bankSlip.returnCode).not.toBeNaN();
      expect(bankSlip.returnCode).toBe("00");

      expect(bankSlip.value).not.toBeNull();
      expect(bankSlip.value).not.toBeUndefined();
      expect(bankSlip.value).not.toBeNaN();
      expect(bankSlip.value).toBe(1000);

      expect(bankSlip.paidValue).not.toBeNull();
      expect(bankSlip.paidValue).not.toBeUndefined();
      expect(bankSlip.paidValue).not.toBeNaN();
      expect(bankSlip.paidValue).toBe(1000);

      expect(bankSlip.returnMessage).not.toBeNull();
      expect(bankSlip.returnMessage).not.toBeUndefined();
      expect(bankSlip.returnMessage).not.toBeNaN();
      expect(bankSlip.returnMessage).toBe("Transação autorizada");

      expect(bankSlip.status).not.toBeNull();
      expect(bankSlip.status).not.toBeUndefined();
      expect(bankSlip.status).not.toBeNaN();
      expect(bankSlip.status).toBe(TransactionStatusTypes.AUTHORIZED);

      expect(bankSlip.transactionDate).not.toBeNull();
      expect(bankSlip.transactionDate).not.toBeUndefined();
      expect(bankSlip.transactionDate).not.toBeNaN();
      expect(bankSlip.transactionDate).toBe(1620000000000);

      expect(bankSlip.type).not.toBeNull();
      expect(bankSlip.type).not.toBeUndefined();
      expect(bankSlip.type).not.toBeNaN();
      expect(bankSlip.type).toBe(TransactionResponseTypes.LOOSE);

      expect(bankSlip.affiliate).not.toBeNull();
      expect(bankSlip.affiliate).not.toBeUndefined();
      expect(bankSlip.affiliate).not.toBeNaN();

      expect(bankSlip.affiliate).toHaveProperty("id");
      expect(bankSlip.affiliate).toHaveProperty("name");
      expect(bankSlip.affiliate).toHaveProperty("businessName");

      expect(bankSlip.affiliate?.id).not.toBeNull();
      expect(bankSlip.affiliate?.id).not.toBeUndefined();
      expect(bankSlip.affiliate?.id).not.toBeNaN();
      expect(bankSlip.affiliate?.id).toBe(1);

      expect(bankSlip.affiliate?.name).not.toBeNull();
      expect(bankSlip.affiliate?.name).not.toBeUndefined();
      expect(bankSlip.affiliate?.name).not.toBeNaN();
      expect(bankSlip.affiliate?.name).toBe("Bempaggo");

      expect(bankSlip.affiliate?.businessName).not.toBeNull();
      expect(bankSlip.affiliate?.businessName).not.toBeUndefined();
      expect(bankSlip.affiliate?.businessName).not.toBeNaN();
      expect(bankSlip.affiliate?.businessName).toBe("Bempaggo");

      expect(bankSlip.affiliate).toHaveProperty("id");

      expect(bankSlip.affiliate?.id).not.toBeNull();
      expect(bankSlip.affiliate?.id).not.toBeUndefined();
      expect(bankSlip.affiliate?.id).not.toBeNaN();
      expect(bankSlip.affiliate?.id).toBe(1);

      expect(bankSlip.establishment).not.toBeNull();
      expect(bankSlip.establishment).not.toBeUndefined();
      expect(bankSlip.establishment).not.toBeNaN();

      expect(bankSlip.establishment).toHaveProperty("id");

      expect(bankSlip.establishment?.id).not.toBeNull();
      expect(bankSlip.establishment?.id).not.toBeUndefined();
      expect(bankSlip.establishment?.id).not.toBeNaN();
      expect(bankSlip.establishment?.id).toBe(1);

      expect(bankSlip.splits).not.toBeNull();
      expect(bankSlip.splits).not.toBeUndefined();
      expect(bankSlip.splits).not.toBeNaN();
      expect(bankSlip.splits).toHaveLength(0);
    
    });

  });
});
