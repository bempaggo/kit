import { Response } from "node-fetch";
import { BempaggoHttp } from "./BempaggoHttp";
import { ChargeFindable } from "./Transaction";
import { BempaggoChargeResponse } from "./entity/BempaggoResponse";
import { assertNotError } from "./entity/Exceptions";
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
};
