import { Bempaggo } from "./Bempaggo";
import { BempaggoHttp } from "./BempaggoHttp";
import { BempaggoTransactionApiV2 } from "./BempaggoTransactionApiV2";
import { BempaggoTransactionServiceable } from "./Transaction";
import {
  BempaggoAddressRequest,
  BempaggoCardRequest,
  BempaggoCustomerRequest
} from "./entity/BempaggoRequest.js";
import {
  BempaggoCardResponse,
  BempaggoCardTokenResponse,
  BempaggoCustomerResponse,
} from "./entity/BempaggoResponse.js";
import { getByUrlResponse } from "./entity/Exceptions";

class BempaggoApiV2 implements Bempaggo {
  private http: BempaggoHttp;

  constructor(private baseUrl: string, token: string) {
    this.http = new BempaggoHttp(baseUrl, token);
  }
  getChargeService(): BempaggoTransactionServiceable {
    return new BempaggoTransactionApiV2(this.http);
  }

  async createAddress(document: string, address: BempaggoAddressRequest) {
    await this.http.httpPost(
      `/v2/customers/document/${document}/addresses`,
      address
    );
  }

  async updateAddress(document: string, address: BempaggoAddressRequest) {
    await this.http.httpPut(
      `/v2/customers/document/${document}/addresses`,
      address
    );
  }
  async findCustomerPaymentMethod(
    document: string
  ): Promise<BempaggoCardResponse> {
    const response: Response = await this.http.httpGet(
      `/v2/customers/document/${document}/credit/cards/best`
    );
    return response.json();
  }
  async findCustomerByDocument(
    document: string
  ): Promise<BempaggoCustomerResponse> {
    const response: Response = await this.http.httpGet(`/v2/customers/document/${document}`);
    return await response.json();
  }

  async updateCustomer(document: string,
    customer: BempaggoCustomerRequest
  ): Promise<BempaggoCustomerResponse> {
    await this.http.httpPut(`/v2/customers/document/${document}`, customer);
    if (customer.address) {
      await this.updateAddress(document, customer.address);
    }
    return await this.findCustomerByDocument(document);
  }
  async tokenizeCard(card: BempaggoCardRequest): Promise<BempaggoCardTokenResponse> {
    const response: Response = await this.http.httpPost("/v2/cards/tokens", card);
    return await getByUrlResponse(response, this.http);
  }

  async createCustomer(customer: BempaggoCustomerRequest): Promise<BempaggoCustomerResponse> {
    const response: Response = await this.http.httpPost("/v2/customers", customer);
    return await getByUrlResponse(response, this.http);
  }

  async createCustomerPaymentMethod(document: string, paymentMethod: BempaggoCardRequest): Promise<BempaggoCardResponse> {
    const response: Response = await this.http.httpPost(`/v2/customers/document/${document}/credit/cards`, paymentMethod);
    return await getByUrlResponse(response, this.http);
  }

  public getUrl(): string {
    return this.http.getUrl()
  }
}

export { BempaggoApiV2 };

