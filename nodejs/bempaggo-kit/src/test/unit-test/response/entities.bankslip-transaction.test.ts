import assert from "assert";
import { BempaggoBankSlipTransactionResponse } from "../../../../src/app/modules/entity/BempaggoResponse";
import { PaymentMethodTypes, TransactionResponseTypes, TransactionStatusTypes } from "../../../../src/app/modules/entity/Enum";
describe("Bankslip transaction", () => {
	describe("Response", () => {
		test("Valid response", async () => {
			const bankSlip: BempaggoBankSlipTransactionResponse = {
				bank: {
					account: "123456",
					code: "001",
					agency: "1234",
				},
				paymentDate: undefined,
				dueDate: 1620000000000,
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
						lineTwo: undefined
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
				barCode: "12345678901234567890123456789012345678901234567890",
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

			assert.equal(23, Object.keys(bankSlip).length);
			assert.equal(3, Object.keys(bankSlip.bank).length);
			assert.equal(7, Object.keys(bankSlip.customer).length);
			assert.equal(7, Object.keys(bankSlip.customer.address!).length);
			assert.equal(3, Object.keys(bankSlip.customer.phone!).length);
			assert.equal(1, Object.keys(bankSlip.establishment).length);
			assert.equal(3, Object.keys(bankSlip.affiliate!).length);


			assert.equal("123456", bankSlip.bank.account);
			assert.equal("001", bankSlip.bank.code);
			assert.equal("1234", bankSlip.bank.agency);
			assert.equal(1620000000000, bankSlip.dueDate);
			assert.equal("Pagar até o vencimento", bankSlip.paymentInstructions);
			assert.equal("Bempaggo", bankSlip.communityLegalName);
			assert.equal("12345678901234", bankSlip.communityLegalDocument);
			assert.equal("12345678901234567890", bankSlip.ourNumber);
			assert.equal("12323424", bankSlip.documentNumber);
			assert.equal(1, bankSlip.customer.id);
			assert.equal("João da Silva", bankSlip.customer.name);
			assert.equal("São Paulo", bankSlip.customer.address!.city);
			assert.equal("Centro", bankSlip.customer.address!.neighborhood);
			assert.equal("SP", bankSlip.customer.address!.state);
			assert.equal("Rua da Consolação", bankSlip.customer.address!.street);
			assert.equal("123", bankSlip.customer.address!.streetNumber);
			assert.equal("12345678", bankSlip.customer.address!.zipCode);
			assert.equal("12345678901", bankSlip.customer.document);
			assert.equal("1620000000000", bankSlip.customer.birthdate);
			assert.equal("joaodasilva@bempaggo.com", bankSlip.customer.email);
			assert.equal("11", bankSlip.customer.phone!.areaCode);
			assert.equal("55", bankSlip.customer.phone!.countryCode);
			assert.equal("123456789", bankSlip.customer.phone!.number);
			assert.equal("12345678901234567890123456789012345678901234567890", bankSlip.digitableLine);
			assert.equal("BOLETO", bankSlip.paymentMethod);
			assert.equal(1, bankSlip.id);
			assert.equal(1, bankSlip.establishment!.id);
			assert.equal("00", bankSlip.returnCode);
			assert.equal("Transação autorizada", bankSlip.returnMessage);
			assert.equal("AUTHORIZED", bankSlip.status);
			assert.equal(1000, bankSlip.value);
			assert.equal(1620000000000, bankSlip.transactionDate);
			assert.equal("12345678901234567890", bankSlip.transactionReference);
			assert.equal("LOOSE", bankSlip.type);
			assert.equal(1, bankSlip.affiliate!.id);
			assert.equal("Bempaggo", bankSlip.affiliate!.name);
			assert.equal("Bempaggo", bankSlip.affiliate!.businessName);
			assert.equal(1000, bankSlip.paidValue);
			assert.deepEqual([], bankSlip.splits);
		});
	});
});

