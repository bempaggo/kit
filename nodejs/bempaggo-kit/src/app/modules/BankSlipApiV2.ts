import { BempaggoChargeFinderV2 } from "./BempaggoChargeFinder";
import { BempaggoHttp } from "./BempaggoHttp";
import { BempaggoOrderRequest } from "./entity/BempaggoRequest";
import { BempaggoChargeResponse } from "./entity/BempaggoResponse";
import { getByUrlResponse } from "./entity/Exceptions";
import { BankSlipOperable } from "./Transaction";

class BankSlipApiV2 extends BempaggoChargeFinderV2 implements BankSlipOperable {
	constructor(http: BempaggoHttp) {
		super(http);
	}

	async createBankSlipCharge(sellerId: number, order: BempaggoOrderRequest): Promise<BempaggoChargeResponse> { //OK 
		const response = await this.http.httpPost(`/v2/sellers/${sellerId}/orders/boleto`, order);
		return await getByUrlResponse(response, this.http);// /v2/charges/${chargeId} //OK
	}
	
	async cancelBankSlip(chargeId: number): Promise<BempaggoChargeResponse> {
		const response: Response = await this.http.httpPost(`/v2/charges/${chargeId}/boleto/cancel`, {});
		return await getByUrlResponse(response, this.http); // /v2/charges/${chargeId} //OK
	}

}

export { BankSlipApiV2 };

