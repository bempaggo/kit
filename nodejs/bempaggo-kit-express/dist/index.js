"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bempaggo_kit_1 = __importDefault(require("bempaggo-kit"));
const Bempaggo_1 = require("bempaggo-kit/lib/app/modules/Bempaggo");
const Enum_1 = require("bempaggo-kit/lib/app/modules/entity/Enum");
const Exceptions_1 = require("bempaggo-kit/lib/app/modules/entity/Exceptions");
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const factory = new Bempaggo_1.BempaggoFactory();
console.log(Bempaggo_1.BempaggoFactory === bempaggo_kit_1.default.BempaggoModule.BempaggoFactory);
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const errorHandler = (e, res) => {
    console.log("error ", JSON.stringify(e));
    if (e instanceof Exceptions_1.BempaggoError) {
        res.status(e.getStatus());
        try {
            res.json(JSON.parse(e.getValue()));
        }
        catch (eJson) {
            if (e.getValue() != null) {
                res.send(e.getValue());
            }
            else {
                res.send(e.message);
            }
        }
    }
    else {
        console.log("error ", JSON.stringify(e));
        res.status(500);
        res.end();
    }
};
const send = (value, res) => {
    console.log("send ", JSON.stringify(value));
    res.json(value);
};
const gateway = (req) => {
    const bearer = req.headers.authorization;
    if (process.env.NODE_ENV) {
        const gateway = factory.createAsBuild(bearer);
        console.log("Bempaggo environment", process.env.NODE_ENV, gateway.getUrl());
        return gateway;
    }
    const gateway = factory.create(Enum_1.Environments.DEVELOPMENT, bearer);
    console.log("Bempaggo environment", Enum_1.Environments.DEVELOPMENT, gateway.getUrl());
    return gateway;
};
const transactor = (req) => {
    return gateway(req).getChargeService();
};
const cardService = (req) => {
    return transactor(req).getCreditCardServiceable();
};
app.post('/charges', (req, res) => {
    console.log("body ", JSON.stringify(req.body));
    const charge = req.body;
    cardService(req).createChargeAndCapture(charge)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
    ;
});
app.get('/charges/:id', (req, res) => {
    const id = req.params.id;
    cardService(req).findChargeById(Number(id))
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});
app.post('/charges/:id/refund', (req, res) => {
    const refund = req.body;
    const id = req.params.id;
    cardService(req).refundCharge(Number(id), refund)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});
app.post('/customers', (req, res) => {
    const customer = req.body;
    gateway(req).createCustomer(customer)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});
app.post('/addresses/:document', (req, res) => {
    gateway(req).createAddress(req.params.document, req.body)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});
app.post('/customers/:document', async (req, res) => {
    gateway(req).findCustomerByDocument(req.params.document)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});
app.put('/customers/:document', async (req, res) => {
    gateway(req).updateCustomer(req.params.document, req.body)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});
app.get('/customers/:document/cards', (req, res) => {
    gateway(req).findCustomerPaymentMethod(req.params.document)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});
app.post('/customers/:document/cards', (req, res) => {
    gateway(req).createCustomerPaymentMethod(req.params.document, req.body)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});
app.post('/charges/authorize', (req, res) => {
    const charge = req.body;
    cardService(req).createCharge(charge)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
    ;
});
app.post('/charges/:id/capture', (req, res) => {
    const charge = req.body;
    cardService(req).captureCharge(Number(req.params.id))
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
    ;
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=index.js.map