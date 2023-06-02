import { BempaggoHttp } from "./BempaggoHttp";
import { BempaggoChargeRequest } from "./entity/BempaggoRequest";
import { BempaggoChargeResponse } from "./entity/BempaggoResponse";
import { assertNotError, getByUrlResponse } from "./entity/Exceptions";
import { CreditCardOperable } from "./Transaction";

class CreditCardApiV2 implements CreditCardOperable {
  constructor(private http: BempaggoHttp) {
  }

  async findChargesByReferenceId(sellerId:number, orderReferenceId: number): Promise<BempaggoChargeResponse> {
    const response: Response = await this.http.httpGetBy(`/v2/sellers/${sellerId}/orders`, [{ name: "orderReference", value: orderReferenceId }]);
    await assertNotError(response);
    return await response.json();
  }

  async findChargeById(chargeId: number): Promise<BempaggoChargeResponse> {
    const response: Response = await this.http.httpGet(`/v2/charges/${chargeId}/credit/card`);
    await assertNotError(response);
    return await response.json();
  }

  async createCharge(sellerId:number, charge: BempaggoChargeRequest): Promise<BempaggoChargeResponse> {
    const response = await this.http.httpPost(`/v2/sellers/${sellerId}/orders/multi-credit-card/authorize`, charge);
    return await getByUrlResponse(response, this.http);
  }

  async captureCharge(sellerId: number, orderId: number): Promise<BempaggoChargeResponse> {
    const response: Response = await this.http.httpPost(`/v2/sellers/${sellerId}/orders/${orderId}/multi-credit-card/capture`, {});
    return await getByUrlResponse(response, this.http);;
  }

  async refundCharge(sellerId: number, orderId: number): Promise<BempaggoChargeResponse> {
    const response: Response = await this.http.httpPost(`/v2/sellers/${sellerId}/orders/${orderId}/multi-credit-card/refund`, {});
    return await getByUrlResponse(response, this.http);
  }
}

export { CreditCardApiV2 };

