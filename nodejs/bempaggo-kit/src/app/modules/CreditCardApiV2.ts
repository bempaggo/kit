import { BempaggoHttp } from "./BempaggoHttp";
import { BempaggoOrderRequest } from "./entity/BempaggoRequest";
import { BempaggoChargeResponse } from "./entity/BempaggoResponse";
import { assertNotError, getByUrlResponse } from "./entity/Exceptions";
import { CreditCardOperable } from "./Transaction";

class CreditCardApiV2 implements CreditCardOperable {
	constructor(private http: BempaggoHttp) {
	}

	async findChargesByOrderReferenceId(orderReferenceId: string): Promise<BempaggoChargeResponse[]> {
		const response: Response = await this.http.httpGetBy(`/v2/charges`, [{ name: "orderReference", value: orderReferenceId }]);
		await assertNotError(response);
		return await response.json();
	}

	async findChargeById(chargeId: number): Promise<BempaggoChargeResponse> {
		const response: Response = await this.http.httpGet(`/v2/charges/${chargeId}/credit/card`);
		await assertNotError(response);
		return await response.json();
	}

	async createCharge(sellerId: number, order: BempaggoOrderRequest): Promise<BempaggoChargeResponse> {
		const response = await this.http.httpPost(`/v2/sellers/${sellerId}/orders/multi-credit-card/authorize`, order);
		return await getByUrlResponse(response, this.http);
	}

	async captureCharge(chargeId: number): Promise<BempaggoChargeResponse> {
		const response: Response = await this.http.httpPost(`/v2/charges/${chargeId}/multi-credit-card/capture`, {});
		return await getByUrlResponse(response, this.http);;
	}

	async refundCharge(chargeId: number): Promise<BempaggoChargeResponse> {
		const response: Response = await this.http.httpPost(`/v2/charges/${chargeId}/credit/card/refund`, { reason: "OTHERS" });
		return await getByUrlResponse(response, this.http);
	}
}

export { CreditCardApiV2 };

