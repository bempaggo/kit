import bempaggo from "bempaggo-kit";
import { Bempaggo, BempaggoFactory } from "bempaggo-kit/lib/app/modules/Bempaggo";
import { BankSlipOperable, BempaggoTransactionServiceable, CreditCardOperable, PixOperable } from "bempaggo-kit/lib/app/modules/Transaction";
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
const bankSlipService = (req: Request): BankSlipOperable => {
	return transactor(req).getBankSlipServiceable();
}

const pix = (req: Request): PixOperable => {
	return transactor(req).getPixServiceable();
}


app.get('/orders/:chargeId', (req: Request, res: Response) => {
	const chargeId = req.params.chargeId;
	cardService(req).findChargeById(Number(chargeId))
		.then(value => send(value, res))
		.catch((e) => errorHandler(e, res));
});

app.post('/charges/:id/bank-slip/cancel', (req: Request, res: Response) => {
	const id = req.params.id;
	bankSlipService(req).cancelBankSlip(Number(id))
		.then(value => send(value, res))
		.catch((e) => errorHandler(e, res));
});

app.post('/charges/:id/pix/cancel', (req: Request, res: Response) => {
	const id = req.params.id;
	pix(req).cancelPix(Number(id))
		.then(value => send(value, res))
		.catch((e) => errorHandler(e, res));
});

app.post('/sellers/:sellerId/orders/pix', (req: Request, res: Response) => {
	const charge: BempaggoOrderRequest = req.body;
	const sellerId = req.params.sellerId;
	pix(req).createPixCharge(Number(sellerId), charge)
		.then(value => send(value, res))
		.catch((e) => errorHandler(e, res));
});

// TODO testar
// app.get('/charges/pix/qrcode', (req: Request, res: Response) => {
// 	const orderReference = req.query.orderReference;
// 	console.log(orderReference, "orderReference")
// 	const url = pix(req).createQuickResponseCodeUrlByOrderReference(orderReference as string);
// 	fetch(url, { method: "GET" })
// 		.then(value => send(value, res))
// 		.catch((e) => errorHandler(e, res));
// });

app.get('/charges/pix/qrcode', (req: Request, res: Response) => {
	const orderReference = req.query.orderReference;
	pix(req).createQuickResponseCodeUrlByOrderReference(orderReference as string)
		.then(value => send(value, res))
		.catch((e) => errorHandler(e, res));	
});

app.post('/charges/:id/credit-card/refund', (req: Request, res: Response) => {
	const id = req.params.id;
	cardService(req).refundCreditCardCharge(Number(id))
		.then(value => send(value, res))
		.catch((e) => errorHandler(e, res));
});

app.post('/orders/:chargeId/credit-card/capture', (req: Request, res: Response) => {
	const chargeId = req.params.chargeId;
	cardService(req).captureCreditCardCharge(Number(chargeId))
		.then(value => send(value, res))
		.catch((e) => errorHandler(e, res));
});

app.post('/sellers/:sellerId/orders/credit-card/authorize', (req: Request, res: Response) => {
	const charge: BempaggoOrderRequest = req.body;
	const sellerId = req.params.sellerId;
	cardService(req).createCreditCardCharge(Number(sellerId), charge)
		.then(value => send(value, res))
		.catch((e) => errorHandler(e, res));
});

app.post('/sellers/:sellerId/orders/bank-slip', (req: Request, res: Response) => {
	const charge: BempaggoOrderRequest = req.body;
	const sellerId = req.params.sellerId;
	bankSlipService(req).createBankSlipCharge(Number(sellerId), charge)
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

app.get('/customers/:document/cards/best', (req: Request, res: Response) => {
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


app.listen(3000, () => {
	console.log('Server is running on port 3000');
});