
import { LayersCustomer, LayersCustomerPaymentMethod } from "@/app/modules/layers/interfaces";
import { CardBrandTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";
import { layers } from "./setup";
// with ❤️ feeling the bad smell on the air
const card: LayersCustomerPaymentMethod = {
	brand: CardBrandTypes.AMEX,
	year: 2028,
	month: 3, // mar
	name: "Carlos Cartola",
	number: "5448280000000007",// master number
	title: "discarded",
	document: "06219385993",
}
describe("How use it extra", () => {
	describe("credit card extra", async () => {
		test("create customer", async () => {
			const carlos: LayersCustomer = {
				document: "06219385993",
				address: {
					address: "Rua Laurindo Januario",
					address2: "APt01",
					city: "Florianopolis",
					code: "88062201",
					country: "BR",
					district: "Lagoa da Conceicao",
					number: "23344",
					state: "SC"
				},
				alias: "individual",
				email: "calos@bempaggo.com.br",
				name: "Carlos Melo",
				phones: {
					mobile_phone: {
						area_code: "48", country_code: "55",
						number: "998761234"
					}
				},
				type: "individual",
				birthdate: "1992-02-29",
			};
			const customer = await layers.createCustomer(carlos);
			assert.equal("Carlos Melo", customer.name);
			assert.equal("calos@bempaggo.com.br", customer.email);
			assert.equal("Carlos Melo", customer.alias);
			assert.equal("individual", customer.type);
			assert.equal("06219385993", customer.document);
			assert.equal("55", customer.phones.mobile_phone.country_code);
			assert.equal("998761234", customer.phones.mobile_phone.number);
			assert.equal("48", customer.phones.mobile_phone.area_code);
			assert.equal("Rua Laurindo Januario", customer.address.address);
			assert.equal("APt01", customer.address.address2);
			assert.equal("Florianopolis", customer.address.city);
			assert.equal("88062201", customer.address.code);
			assert.equal("BRA", customer.address.country);
			assert.equal("23344", customer.address.number);
			assert.equal("SC", customer.address.state);
		});

		test("create customer and find by document", async () => {
			const carlos: LayersCustomer = {

				document: "06219385993",
				address: {
					address: "Rua Laurindo Januario",
					address2: "APt01",
					city: "Florianopolis",
					code: "88062201",
					country: "BR",
					district: "Lagoa da Conceicao",
					number: "23344",
					state: "SC"
				},
				alias: "individual",
				email: "calos@bempaggo.com.br",
				name: "Carlos Melo",
				phones: {
					mobile_phone: {
						area_code: "48", country_code: "55",
						number: "998761234"
					}
				},
				type: "individual",
				birthdate: "1992-02-29",
			};
			await layers.createCustomer(carlos);
			const customer = await layers.findCustomerByDocument(card.document!);
			assert.equal("Carlos Melo", customer.name);
			assert.equal("calos@bempaggo.com.br", customer.email);
			assert.equal("Carlos Melo", customer.alias);
			assert.equal("individual", customer.type);
			assert.equal("06219385993", customer.document);
			assert.equal("55", customer.phones.mobile_phone.country_code);
			assert.equal("998761234", customer.phones.mobile_phone.number);
			assert.equal("48", customer.phones.mobile_phone.area_code);
			assert.equal("Rua Laurindo Januario", customer.address.address);
			assert.equal("APt01", customer.address.address2);
			assert.equal("Florianopolis", customer.address.city);
			assert.equal("88062201", customer.address.code);
			assert.equal("BRA", customer.address.country);
			assert.equal("23344", customer.address.number);
			assert.equal("SC", customer.address.state);
		});
		test("update customer", async () => {
			const carlos: LayersCustomer = {
				document: "06219385993",
				address: {
					address: "Rua Laurindo Januario",
					address2: "APt01",
					city: "Florianopolis",
					code: "88062201",
					country: "BR",
					district: "Lagoa da Conceicao",
					number: "23344",
					state: "SC"
				},
				alias: "individual",
				email: "calos@bempaggo.com.br",
				name: "Carlos Melo",
				phones: {
					mobile_phone: {
						area_code: "48", country_code: "55",
						number: "998761234"
					}
				},
				type: "individual",
				birthdate: "1992-02-29",
			};
			await layers.createCustomer(carlos);
			carlos.name = "Carlos Almeida";
			carlos.phones.mobile_phone.area_code = "34";
			const customer = await layers.updateCustomer(carlos)
			assert.equal("Carlos Almeida", customer.name);
			assert.equal("calos@bempaggo.com.br", customer.email);
			assert.equal("Carlos Almeida", customer.alias);
			assert.equal("individual", customer.type);
			assert.equal("06219385993", customer.document);
			assert.equal("34", customer.phones.mobile_phone.area_code);
			assert.equal("55", customer.phones.mobile_phone.country_code);
			assert.equal("998761234", customer.phones.mobile_phone.number);
			assert.equal("Rua Laurindo Januario", customer.address.address);
			assert.equal("APt01", customer.address.address2);
			assert.equal("Florianopolis", customer.address.city);
			assert.equal("88062201", customer.address.code);
			assert.equal("BRA", customer.address.country);
			assert.equal("23344", customer.address.number);
			assert.equal("SC", customer.address.state);
		});

		test("create card from customer", async () => {
			const carlos: LayersCustomer = {
				document: "06219385993",
				address: {
					address: "Rua Laurindo Januario",
					address2: "APt01",
					city: "Florianopolis",
					code: "88062201",
					country: "BR",
					district: "Lagoa da Conceicao",
					number: "23344",
					state: "SC"
				},
				alias: "individual",
				email: "calos@bempaggo.com.br",
				name: "Carlos Melo",
				phones: {
					mobile_phone: {
						area_code: "48", country_code: "55",
						number: "998761234"
					}
				},
				type: "individual",
				birthdate: "1992-02-29",
			};
			await layers.createCustomer(carlos);
			const cardResponse = await layers.createCustomerPaymentMethod(carlos.document, card);
			assert.equal("Carlos Cartola", cardResponse.name);
			assert.equal("06219385993", cardResponse.document);
			assert.equal(CardBrandTypes.MASTERCARD, cardResponse.brand);
			assert.equal(3, cardResponse.month);
			assert.equal("544828...0007", cardResponse.number);
			assert.equal("Carlos Cartola", cardResponse.title);
			assert.equal(64, cardResponse.token?.length);
			assert.equal(2028, cardResponse.year);
		});


		test("get payment method", async () => {
			const carlos: LayersCustomer = {
				document: "06219385993",
				address: {
					address: "Rua Laurindo Januario",
					address2: "APt01",
					city: "Florianopolis",
					code: "88062201",
					country: "BR",
					district: "Lagoa da Conceicao",
					number: "23344",
					state: "SC"
				},
				alias: "individual",
				email: "calos@bempaggo.com.br",
				name: "Carlos Melo",
				phones: {
					mobile_phone: {
						area_code: "48", country_code: "55",
						number: "998761234"
					}
				},
				type: "individual",
				birthdate: "1992-02-29",
			};
			await layers.createCustomer(carlos);
			await layers.createCustomerPaymentMethod(carlos.document, card);
			const cardResponse = await layers.findCustomerPaymentMethod(carlos.document);
			assert.equal("Carlos Cartola", cardResponse.name);
			assert.equal("06219385993", cardResponse.document);
			assert.equal(CardBrandTypes.MASTERCARD, cardResponse.brand);
			assert.equal(3, cardResponse.month);
			assert.equal("544828...0007", cardResponse.number);
			assert.equal(64, cardResponse.token?.length);
			assert.equal("Carlos Cartola", cardResponse.title);
			assert.equal(2028, cardResponse.year);
		});
	});
},{});