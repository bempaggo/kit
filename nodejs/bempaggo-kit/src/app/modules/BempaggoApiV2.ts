import { Bempaggo } from "./Bempaggo";
import { BempaggoHttp } from "./BempaggoHttp";
import { BempaggoTransactionApiV2 } from "./BempaggoTransactionApiV2";
import { BempaggoTransactionServiceable } from "./Transaction";
import {
	BempaggoCardRequest,
	BempaggoCustomerRequest
} from "./entity/BempaggoRequest.js";
import {
	BempaggoCardResponse,
	BempaggoCustomerResponse,
} from "./entity/BempaggoResponse.js";
import { getByUrlResponse } from "./entity/Exceptions";

class BempaggoApiV2 implements Bempaggo {
	private http: BempaggoHttp;

	constructor(baseUrl: string, token: string) {
		this.http = new BempaggoHttp(baseUrl, token);
	}
	getChargeService(): BempaggoTransactionServiceable {
		return new BempaggoTransactionApiV2(this.http);
	}
	// OK
	async findCustomerPaymentMethod(document: string): Promise<BempaggoCardResponse> {
		const response: Response = await this.http.httpGet(`/v2/customers/document/${document}/credit/cards/best`);
		return response.json();
	}
	// OK
	async findCustomerByDocument(document: string): Promise<BempaggoCustomerResponse> {
		const response: Response = await this.http.httpGet(`/v2/customers/document/${document}`);
		return await response.json();
	}
	// OK
	async updateCustomer(document: string, customer: BempaggoCustomerRequest): Promise<BempaggoCustomerResponse> {
		await this.http.httpPut(`/v2/customers/document/${document}`, customer);
		return await this.findCustomerByDocument(document);
	}
	// OK
	async tokenizeCard(card: BempaggoCardRequest): Promise<BempaggoCardResponse> {
		const response: Response = await this.http.httpPost("/v2/cards/tokens", card);
		return await getByUrlResponse(response, this.http); // /v2/cards/tokens/${token}
	}
	// OK
	async createCustomer(customer: BempaggoCustomerRequest): Promise<BempaggoCustomerResponse> {
		const response: Response = await this.http.httpPost("/v2/customers", customer);
		return await getByUrlResponse(response, this.http); // /v2/customers/document/${document}
	}
	// OK
	async createCustomerPaymentMethod(document: string, paymentMethod: BempaggoCardRequest): Promise<BempaggoCardResponse> {
		const response: Response = await this.http.httpPost(`/v2/customers/document/${document}/credit/cards`, paymentMethod);
		return await getByUrlResponse(response, this.http); // /v2/customers/document/${document}/credit/cards/best
	}

	public getUrl(): string {
		return this.http.getUrl()
	}
}

export { BempaggoApiV2 };

