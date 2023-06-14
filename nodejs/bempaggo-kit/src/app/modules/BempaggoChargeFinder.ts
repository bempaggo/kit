import { BempaggoChargeResponse } from "./entity/BempaggoResponse";
import { ChargeFindable } from "./Transaction";
import { assertNotError } from "./entity/Exceptions";
import { BempaggoHttp } from "./BempaggoHttp";
class BempaggoChargeFinderV2 implements ChargeFindable {

	constructor(protected http: BempaggoHttp) {
	}
	
	async findChargesByOrderReferenceId(orderReferenceId: string): Promise<BempaggoChargeResponse[]> {
		const response: Response = await this.http.httpGetBy(`/v2/charges`, [{ name: "orderReference", value: orderReferenceId }]); //OK
		await assertNotError(response);
		return await response.json();
	}

	async findChargeById(chargeId: number): Promise<BempaggoChargeResponse> {
		const response: Response = await this.http.httpGet(`/v2/charges/${chargeId}`); // OK
		await assertNotError(response);
		return await response.json();
	}
}
export {
	BempaggoChargeFinderV2
}