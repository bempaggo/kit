"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enum_1 = require("bempaggo-kit/lib/app/modules/entity/Enum");
const vitest_1 = require("vitest");
const setup_1 = require("./setup");
const card = {
    brand: Enum_1.CardBrandTypes.AMEX,
    year: 2028,
    month: 3,
    name: "Carlos Cartola",
    number: "5448280000000007",
    title: "discarded",
    document: "06219385993",
};
(0, vitest_1.describe)("How use it extra", () => {
    (0, vitest_1.describe)("credit card extra", async () => {
        (0, vitest_1.test)("create customer", async () => {
            const carlos = {
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
            const customer = await setup_1.layers.createCustomer(carlos);
            vitest_1.assert.equal("Carlos Melo", customer.name);
            vitest_1.assert.equal("calos@bempaggo.com.br", customer.email);
            vitest_1.assert.equal("Carlos Melo", customer.alias);
            vitest_1.assert.equal("individual", customer.type);
            vitest_1.assert.equal("06219385993", customer.document);
            vitest_1.assert.equal("55", customer.phones.mobile_phone.country_code);
            vitest_1.assert.equal("998761234", customer.phones.mobile_phone.number);
            vitest_1.assert.equal("48", customer.phones.mobile_phone.area_code);
            vitest_1.assert.equal("Rua Laurindo Januario", customer.address.address);
            vitest_1.assert.equal("APt01", customer.address.address2);
            vitest_1.assert.equal("Florianopolis", customer.address.city);
            vitest_1.assert.equal("88062201", customer.address.code);
            vitest_1.assert.equal("BRA", customer.address.country);
            vitest_1.assert.equal("23344", customer.address.number);
            vitest_1.assert.equal("SC", customer.address.state);
        });
        (0, vitest_1.test)("create customer and find by document", async () => {
            const carlos = {
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
            await setup_1.layers.createCustomer(carlos);
            const customer = await setup_1.layers.findCustomerByDocument(card.document);
            vitest_1.assert.equal("Carlos Melo", customer.name);
            vitest_1.assert.equal("calos@bempaggo.com.br", customer.email);
            vitest_1.assert.equal("Carlos Melo", customer.alias);
            vitest_1.assert.equal("individual", customer.type);
            vitest_1.assert.equal("06219385993", customer.document);
            vitest_1.assert.equal("55", customer.phones.mobile_phone.country_code);
            vitest_1.assert.equal("998761234", customer.phones.mobile_phone.number);
            vitest_1.assert.equal("48", customer.phones.mobile_phone.area_code);
            vitest_1.assert.equal("Rua Laurindo Januario", customer.address.address);
            vitest_1.assert.equal("APt01", customer.address.address2);
            vitest_1.assert.equal("Florianopolis", customer.address.city);
            vitest_1.assert.equal("88062201", customer.address.code);
            vitest_1.assert.equal("BRA", customer.address.country);
            vitest_1.assert.equal("23344", customer.address.number);
            vitest_1.assert.equal("SC", customer.address.state);
        });
        (0, vitest_1.test)("update customer", async () => {
            const carlos = {
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
            await setup_1.layers.createCustomer(carlos);
            carlos.name = "Carlos Almeida";
            carlos.phones.mobile_phone.area_code = "34";
            const customer = await setup_1.layers.updateCustomer(carlos);
            vitest_1.assert.equal("Carlos Almeida", customer.name);
            vitest_1.assert.equal("calos@bempaggo.com.br", customer.email);
            vitest_1.assert.equal("Carlos Almeida", customer.alias);
            vitest_1.assert.equal("individual", customer.type);
            vitest_1.assert.equal("06219385993", customer.document);
            vitest_1.assert.equal("34", customer.phones.mobile_phone.area_code);
            vitest_1.assert.equal("55", customer.phones.mobile_phone.country_code);
            vitest_1.assert.equal("998761234", customer.phones.mobile_phone.number);
            vitest_1.assert.equal("Rua Laurindo Januario", customer.address.address);
            vitest_1.assert.equal("APt01", customer.address.address2);
            vitest_1.assert.equal("Florianopolis", customer.address.city);
            vitest_1.assert.equal("88062201", customer.address.code);
            vitest_1.assert.equal("BRA", customer.address.country);
            vitest_1.assert.equal("23344", customer.address.number);
            vitest_1.assert.equal("SC", customer.address.state);
        });
        (0, vitest_1.test)("create card from customer", async () => {
            const carlos = {
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
            await setup_1.layers.createCustomer(carlos);
            const cardResponse = await setup_1.layers.createCustomerPaymentMethod(carlos.document, card);
            vitest_1.assert.equal("Carlos Cartola", cardResponse.name);
            vitest_1.assert.equal("06219385993", cardResponse.document);
            vitest_1.assert.equal(Enum_1.CardBrandTypes.MASTERCARD, cardResponse.brand);
            vitest_1.assert.equal(3, cardResponse.month);
            vitest_1.assert.equal("544828...0007", cardResponse.number);
            vitest_1.assert.equal("Carlos Cartola", cardResponse.title);
            vitest_1.assert.equal(64, cardResponse.token?.length);
            vitest_1.assert.equal(2028, cardResponse.year);
        });
        (0, vitest_1.test)("get payment method", async () => {
            const carlos = {
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
            await setup_1.layers.createCustomer(carlos);
            await setup_1.layers.createCustomerPaymentMethod(carlos.document, card);
            const cardResponse = await setup_1.layers.findCustomerPaymentMethod(carlos.document);
            vitest_1.assert.equal("Carlos Cartola", cardResponse.name);
            vitest_1.assert.equal("06219385993", cardResponse.document);
            vitest_1.assert.equal(Enum_1.CardBrandTypes.MASTERCARD, cardResponse.brand);
            vitest_1.assert.equal(3, cardResponse.month);
            vitest_1.assert.equal("544828...0007", cardResponse.number);
            vitest_1.assert.equal(64, cardResponse.token?.length);
            vitest_1.assert.equal("Carlos Cartola", cardResponse.title);
            vitest_1.assert.equal(2028, cardResponse.year);
        });
    });
}, {});
//# sourceMappingURL=integration-layers-api.customer-v2.test.js.map