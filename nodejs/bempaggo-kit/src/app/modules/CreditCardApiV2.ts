import { BempaggoHttp } from "./BempaggoHttp";
import { BempaggoChargeRequest, BempaggoRefundRequest } from "./entity/BempaggoRequest";
import { BempaggoChargeResponse } from "./entity/BempaggoResponse";
import { assertNotError, getByUrlResponse } from "./entity/Exceptions";
import { CreditCardOperable } from "./Transaction";

class CreditCardApiV2 implements CreditCardOperable {
  constructor(private http: BempaggoHttp) {
  }

  async createChargeAndCapture(charge: BempaggoChargeRequest): Promise<BempaggoChargeResponse> {
    const response: Response = await this.http.httpPost("/v2/charges/credit/card", charge);
    return await getByUrlResponse(response, this.http);
  }

  async findChargesByReferenceId(referenceId: number): Promise<BempaggoChargeResponse[]> {
    const response: Response = await this.http.httpGet(`/v2/charges/requests/${referenceId}`);
    await assertNotError(response);
    return await response.json();
  }

  async findChargeById(chargeId: number): Promise<BempaggoChargeResponse> {
    const response: Response = await this.http.httpGet(`/v2/charges/${chargeId}/credit/card`);
    await assertNotError(response);
    return await response.json();
  }

  async createCharge(charge: BempaggoChargeRequest): Promise<BempaggoChargeResponse> {
    const response = await this.http.httpPost("/v2/charges/credit/card/authorize", charge);
    return await getByUrlResponse(response, this.http);
  }

  async captureCharge(chargeId: number): Promise<BempaggoChargeResponse> {
    const response: Response = await this.http.httpPost(`/v2/charges/${chargeId}/credit/card/capture`, {});
    return await getByUrlResponse(response, this.http);;
  }

  async refundCharge(chargeId: number, refund: BempaggoRefundRequest): Promise<BempaggoChargeResponse> {
    const response: Response = await this.http.httpPost(`/v2/charges/${chargeId}/credit/card/refund`, refund);
    return await getByUrlResponse(response, this.http);
  }
}

export { CreditCardApiV2 };

