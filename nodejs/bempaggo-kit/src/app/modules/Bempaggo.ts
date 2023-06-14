import { BempaggoApiV2 } from "./BempaggoApiV2";
import { BempaggoTransactionServiceable } from "./Transaction";
import {
	BempaggoCardRequest,
	BempaggoCustomerRequest,
} from "./entity/BempaggoRequest";
import {
	BempaggoCardResponse,
	BempaggoCustomerResponse
} from "./entity/BempaggoResponse";
import { Environments } from "./entity/Enum";

class BempaggoFactory {
	private configuration: Map<Environments, string> = new Map<Environments, string>();
	public constructor() {
		this.configuration.set(Environments.DEVELOPMENT, "http://localhost:5000/api");
		this.configuration.set(Environments.PRODUCTION, "https://api.bempaggo.io/api");
		this.configuration.set(Environments.SANDBOX, "https://api-sandbox.bempaggo.io/api");
	}

	public create(environment: Environments, bearer: string): Bempaggo {
		const baseUrl: string | undefined = this.configuration.get(environment);
		return new BempaggoApiV2(baseUrl!, bearer);
	}
	public createByUrl(url: string, bearer: string): Bempaggo {
		return new BempaggoApiV2(url!, bearer);
	}
	public createAsBuild(bearer: string): Bempaggo {
		const environment: Environments = this.isProduction() ? Environments.PRODUCTION : Environments.SANDBOX;
		return this.create(environment, bearer);
	}
	private isProduction(): boolean {
		return process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod";;
	}
}

interface Bempaggo {
	getUrl(): string;
	getChargeService(): BempaggoTransactionServiceable;
	findCustomerByDocument(document: string): Promise<BempaggoCustomerResponse>;
	createCustomer(customer: BempaggoCustomerRequest): Promise<BempaggoCustomerResponse>;
	updateCustomer(document: string, customer: BempaggoCustomerRequest): Promise<BempaggoCustomerResponse>;
	findCustomerPaymentMethod(document: string): Promise<BempaggoCardResponse>;
	createCustomerPaymentMethod(document: string, paymentMethod: BempaggoCardRequest): Promise<BempaggoCardResponse>;
	tokenizeCard(card: BempaggoCardRequest, hash: string): Promise<BempaggoCardResponse>;
}

export {
	Bempaggo,
	BempaggoFactory,
	BempaggoTransactionServiceable
};

