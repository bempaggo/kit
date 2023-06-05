import bempaggo from "bempaggo-kit";
import { Bempaggo, BempaggoFactory } from "bempaggo-kit/lib/app/modules/Bempaggo";
import { BempaggoTransactionServiceable, CreditCardOperable } from "bempaggo-kit/lib/app/modules/Transaction";
import { BempaggoCustomerRequest, BempaggoOrderRequest } from "bempaggo-kit/lib/app/modules/entity/BempaggoRequest";
import { Environments } from "bempaggo-kit/lib/app/modules/entity/Enum";
import { BempaggoError } from "bempaggo-kit/lib/app/modules/entity/Exceptions";
import bodyParser from 'body-parser';
import express, { Express, Request, Response } from "express";
const factory: BempaggoFactory = new BempaggoFactory();
console.log(BempaggoFactory === bempaggo.BempaggoModule.BempaggoFactory);
const app: Express = express();
app.use(bodyParser.json());
const errorHandler = (e: any, res: Response) => {
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

app.get('/orders/:id', (req: Request, res: Response) => {
	const id = req.params.id;
	cardService(req).findChargeById(Number(id))
		.then(value => send(value, res))
		.catch((e) => errorHandler(e, res));
});

app.post('/charges/:id/multi-credit-card/refund', (req: Request, res: Response) => {
	const id = req.params.id;
	cardService(req).refundCharge(Number(id))
		.then(value => send(value, res))
		.catch((e) => errorHandler(e, res));
});

app.post('/orders/:id/multi-credit-card/capture', (req: Request, res: Response) => {
	const id = req.params.id;
	cardService(req).captureCharge(Number(id))
		.then(value => send(value, res))
		.catch((e) => errorHandler(e, res));
});

app.post('/sellers/:sellerId/orders/multi-credit-card/authorize', (req: Request, res: Response) => {
	const charge: BempaggoOrderRequest = req.body;
	const sellerId = req.params.sellerId;
	cardService(req).createCharge(Number(sellerId), charge)
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

app.post('/tokens', (req: Request, res: Response) => {
	gateway(req).tokenizeCard(req.body, "")
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