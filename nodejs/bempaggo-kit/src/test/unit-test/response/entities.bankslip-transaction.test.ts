import { BempaggoBankSlipTransactionResponse } from "@/app/modules/entity/BempaggoResponse";
import { PaymentMethodTypes, TransactionResponseTypes, TransactionStatusTypes } from "@/app/modules/entity/Enum";
import { assert, describe, test } from "vitest";

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
				documentNumber: "12323424",
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
				paymentMethod: PaymentMethodTypes.BOLETO,
				id: 1,
				establishment: {
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

			assert.equal(Object.keys(bankSlip).length, 22);
			assert.equal(Object.keys(bankSlip.bank).length, 3);
			assert.equal(Object.keys(bankSlip.customer).length, 7);
			assert.equal(Object.keys(bankSlip.customer.address!).length, 6);
			assert.equal(Object.keys(bankSlip.customer.phone!).length, 3);
			assert.equal(Object.keys(bankSlip.establishment).length, 1);
			assert.equal(Object.keys(bankSlip.affiliate!).length, 3);
			assert.equal(bankSlip.expirationDate, 1620000000000);
			assert.equal(bankSlip.paymentInstructions, "Pagar até o vencimento");
			assert.equal(bankSlip.communityLegalName, "Bempaggo");
			assert.equal(bankSlip.communityLegalDocument, "12345678901234");
			assert.equal(bankSlip.ourNumber, "12345678901234567890");
			assert.equal(bankSlip.customer.id, 1);
			assert.equal(bankSlip.customer.name, "João da Silva");
			assert.property(bankSlip.customer.address, "city");
			assert.property(bankSlip.customer.address, "neighborhood");
			assert.property(bankSlip.customer.address, "state");
			assert.property(bankSlip.customer.address, "street");
			assert.property(bankSlip.customer.address, "streetNumber");
			assert.property(bankSlip.customer.address, "zipCode");
			assert.equal(bankSlip.customer.address?.city, "São Paulo");
			assert.equal(bankSlip.customer.address?.neighborhood, "Centro");
			assert.equal(bankSlip.customer.address?.state, "SP");
			assert.equal(bankSlip.customer.address?.street, "Rua da Consolação");
			assert.equal(bankSlip.customer.address?.streetNumber, "123");
			assert.equal(bankSlip.customer.address?.zipCode, "12345678");
			assert.equal(bankSlip.customer.document, "12345678901");
			assert.equal(bankSlip.customer.birthdate, "1620000000000");
			assert.equal(bankSlip.customer.email, "joaodasilva@bempaggo.com");
			assert.equal(bankSlip.customer.phone?.number, "123456789");
			assert.equal(bankSlip.customer.phone?.areaCode, "11");
			assert.equal(bankSlip.customer.phone?.countryCode, "55");
			assert.equal(bankSlip.digitableLine, "12345678901234567890123456789012345678901234567890");
			assert.equal(bankSlip.paymentMethod, PaymentMethodTypes.BOLETO);
			assert.equal(bankSlip.id, 1);
			assert.equal(bankSlip.documentNumber, "12323424");
			assert.equal(bankSlip.transactionReference, "12345678901234567890");
			assert.equal(bankSlip.returnCode, "00");
			assert.equal(bankSlip.value, 1000);
			assert.equal(bankSlip.paidValue, 1000);
			assert.equal(bankSlip.returnMessage, "Transação autorizada");
			assert.equal(bankSlip.status, TransactionStatusTypes.AUTHORIZED);
			assert.equal(bankSlip.transactionDate, 1620000000000);
			assert.equal(bankSlip.type, TransactionResponseTypes.LOOSE);
			assert.equal(bankSlip.affiliate?.id, 1);
			assert.equal(bankSlip.affiliate?.name, "Bempaggo");
			assert.equal(bankSlip.affiliate?.businessName, "Bempaggo");
			assert.property(bankSlip.affiliate, "id");
			assert.equal(bankSlip.affiliate?.id, 1);
			assert.equal(bankSlip.establishment?.id, 1);
			assert.lengthOf(bankSlip.splits, 0);
		});
	});
});

