import { Response } from "node-fetch";
import { BempaggoChargeFinderV2 } from "./BempaggoChargeFinder";
import { BempaggoHttp } from "./BempaggoHttp";
import { CreditCardOperable } from "./Transaction";
import { BempaggoOrderRequest } from "./entity/BempaggoRequest";
import { BempaggoChargeResponse } from "./entity/BempaggoResponse";
import { getByUrlResponse } from "./entity/Exceptions";
class CreditCardApiV2 extends BempaggoChargeFinderV2 implements CreditCardOperable {
	constructor(http: BempaggoHttp) {
		super(http);
	}
	async createCreditCardCharge(sellerId: number, order: BempaggoOrderRequest): Promise<BempaggoChargeResponse> {
		const response = await this.http.httpPost(`/v2/sellers/${sellerId}/orders/credit-card/authorize`, order); // OK
		return await getByUrlResponse(response, this.http); // /v2/charges/${chargeId}
	}

	async captureCreditCardCharge(chargeId: number): Promise<BempaggoChargeResponse> {
		const response: Response = await this.http.httpPost(`/v2/charges/${chargeId}/credit-card/capture`, {});
		return await getByUrlResponse(response, this.http); //v2/charges/${chargeId}
	}

	async refundCreditCardCharge(chargeId: number): Promise<BempaggoChargeResponse> {
		const response: Response = await this.http.httpPost(`/v2/charges/${chargeId}/credit/card/refund`, { reason: "OTHERS" });
		return await getByUrlResponse(response, this.http); // //v2/charges/${chargeId}/credit/card
	}
}

export { CreditCardApiV2 };

