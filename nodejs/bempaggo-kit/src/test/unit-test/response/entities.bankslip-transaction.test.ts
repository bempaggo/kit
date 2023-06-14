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
				dueDate: 1620000000000,
				paymentInstructions: "Pagar até o vencimento",
				communityLegalName: "Bempaggo",
				communityLegalDocument: "12345678901234",
				ourNumber: "12345678901234567890",
				documentNumber:"12323424",
				
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


			expect(Object.keys(bankSlip).length).toBe(22);
			expect(Object.keys(bankSlip.bank).length).toBe(3);
			expect(Object.keys(bankSlip.customer).length).toBe(7);
			expect(Object.keys(bankSlip.customer.address!).length).toBe(6);
			expect(Object.keys(bankSlip.customer.phone!).length).toBe(3);
			expect(Object.keys(bankSlip.establishment).length).toBe(1);
			expect(Object.keys(bankSlip.affiliate!).length).toBe(3);


			expect(bankSlip.dueDate).toBe(1620000000000);

			expect(bankSlip.paymentInstructions).toBe("Pagar até o vencimento");

			expect(bankSlip.communityLegalName).toBe("Bempaggo");

			expect(bankSlip.communityLegalDocument).toBe("12345678901234");

			expect(bankSlip.ourNumber).toBe("12345678901234567890");


			expect(bankSlip.customer.id).toBe(1);

			expect(bankSlip.customer.name).toBe("João da Silva");

			expect(bankSlip.customer.address).toHaveProperty("city");
			expect(bankSlip.customer.address).toHaveProperty("neighborhood");
			expect(bankSlip.customer.address).toHaveProperty("state");
			expect(bankSlip.customer.address).toHaveProperty("street");
			expect(bankSlip.customer.address).toHaveProperty("streetNumber");
			expect(bankSlip.customer.address).toHaveProperty("zipCode");

			expect(bankSlip.customer.address?.city).toBe("São Paulo");

			expect(bankSlip.customer.address?.neighborhood).toBe("Centro");

			expect(bankSlip.customer.address?.state).toBe("SP");

			expect(bankSlip.customer.address?.street).toBe("Rua da Consolação");

			expect(bankSlip.customer.address?.streetNumber).toBe("123");

			expect(bankSlip.customer.address?.zipCode).toBe("12345678");

			expect(bankSlip.customer.document).toBe("12345678901");

			expect(bankSlip.customer.birthdate).toBe("1620000000000");

			expect(bankSlip.customer.email).toBe("joaodasilva@bempaggo.com");

			expect(bankSlip.customer.phone?.number).toBe("123456789");
			expect(bankSlip.customer.phone?.areaCode).toBe("11");
			expect(bankSlip.customer.phone?.countryCode).toBe("55");

			expect(bankSlip.digitableLine).toBe("12345678901234567890123456789012345678901234567890");

			expect(bankSlip.paymentMethod).toBe(PaymentMethodTypes.BOLETO);

			expect(bankSlip.id).toBe(1);

			expect(bankSlip.documentNumber).toBe("12323424");
			expect(bankSlip.transactionReference).toBe("12345678901234567890");

			expect(bankSlip.returnCode).toBe("00");

			expect(bankSlip.value).toBe(1000);

			expect(bankSlip.paidValue).toBe(1000);

			expect(bankSlip.returnMessage).toBe("Transação autorizada");

			expect(bankSlip.status).toBe(TransactionStatusTypes.AUTHORIZED);

			expect(bankSlip.transactionDate).toBe(1620000000000);

			expect(bankSlip.type).toBe(TransactionResponseTypes.LOOSE);



			expect(bankSlip.affiliate?.id).toBe(1);

			expect(bankSlip.affiliate?.name).toBe("Bempaggo");

			expect(bankSlip.affiliate?.businessName).toBe("Bempaggo");

			expect(bankSlip.affiliate).toHaveProperty("id");

			expect(bankSlip.affiliate?.id).toBe(1);


			expect(bankSlip.establishment?.id).toBe(1);

			expect(bankSlip.splits).toHaveLength(0);

		});

	});
});
