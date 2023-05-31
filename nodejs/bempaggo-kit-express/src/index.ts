import bempaggo from "bempaggo-kit";
import { Bempaggo, BempaggoFactory } from "bempaggo-kit/lib/app/modules/Bempaggo";
import { BempaggoTransactionServiceable, CreditCardOperable } from "bempaggo-kit/lib/app/modules/Transaction";
import { BempaggoChargeRequest, BempaggoCustomerRequest, BempaggoRefundRequest } from "bempaggo-kit/lib/app/modules/entity/BempaggoRequest";
import { Environments } from "bempaggo-kit/lib/app/modules/entity/Enum";
import { BempaggoError } from "bempaggo-kit/lib/app/modules/entity/Exceptions";
import bodyParser from 'body-parser';
import express, { Express, Request, Response } from "express";
const factory: BempaggoFactory = new BempaggoFactory();
console.log(BempaggoFactory === bempaggo.BempaggoModule.BempaggoFactory);
const app: Express = express();
app.use(bodyParser.json());
const errorHandler = (e: any, res: Response) => {
    console.log("error ", JSON.stringify(e));
    if (e instanceof BempaggoError) {
        res.status(e.getStatus());
        try {
            res.json(JSON.parse(e.getValue()));
        } catch (eJson) {
            if (e.getValue() != null) {
                res.send(e.getValue());
            } else {
                res.send(e.message);
            }
        }
    } else {
        console.log("error ", JSON.stringify(e));
        res.status(500);
        res.end();
    }
}
const send = (value: any, res: Response) => {
    console.log("send ", JSON.stringify(value));
    res.json(value);
};
const gateway = (req: Request): Bempaggo => {
    const bearer: string | undefined = req.headers.authorization;
    if (process.env.NODE_ENV) {
        const gateway: Bempaggo = factory.createAsBuild(bearer);
        console.log("Bempaggo environment", process.env.NODE_ENV, gateway.getUrl());
        return gateway;
    }
    const gateway: Bempaggo = factory.create(Environments.DEVELOPMENT, bearer);
    console.log("Bempaggo environment", Environments.DEVELOPMENT, gateway.getUrl());
    return gateway
}
const transactor = (req: Request): BempaggoTransactionServiceable => {
    return gateway(req).getChargeService();
}
const cardService = (req: Request): CreditCardOperable => {
    return transactor(req).getCreditCardServiceable();
}

app.post('/charges', (req: Request, res: Response) => {
    console.log("body ", JSON.stringify(req.body));
    const charge: BempaggoChargeRequest = req.body;
    cardService(req).createChargeAndCapture(charge)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});

app.get('/charges/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    cardService(req).findChargeById(Number(id))
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});

app.post('/charges/:id/refund', (req: Request, res: Response) => {
    const refund: BempaggoRefundRequest = req.body;
    const id = req.params.id;
    cardService(req).refundCharge(Number(id), refund)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});

app.post('/charges/authorize', (req: Request, res: Response) => {
    const charge: BempaggoChargeRequest = req.body;
    cardService(req).createCharge(charge)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});

app.post('/charges/:id/capture', (req: Request, res: Response) => {
    const charge: BempaggoChargeRequest = req.body;
    cardService(req).captureCharge(Number(req.params.id))
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});

app.post('/customers', (req: Request, res: Response) => {
    const customer: BempaggoCustomerRequest = req.body;
    gateway(req).createCustomer(customer)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});

app.get('/customers/:document', async (req: Request, res: Response) => {
    gateway(req).findCustomerByDocument(req.params.document)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});

app.put('/customers/:document', async (req: Request, res: Response) => {
    gateway(req).updateCustomer(req.params.document, req.body)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});

app.get('/customers/:document/cards', (req: Request, res: Response) => {
    gateway(req).findCustomerPaymentMethod(req.params.document)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});

app.post('/customers/:document/cards', (req: Request, res: Response) => {
    gateway(req).createCustomerPaymentMethod(req.params.document, req.body)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});

app.post('/addresses/:document', (req: Request, res: Response) => {
    gateway(req).createAddress(req.params.document, req.body)
        .then(value => send(value, res))
        .catch((e) => errorHandler(e, res));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});