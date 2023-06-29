import { Response } from "node-fetch";
import { BempaggoOrderRequest } from "./entity/BempaggoRequest";
import { BempaggoChargeResponse } from "./entity/BempaggoResponse";
interface BempaggoTransactionServiceable {
	getCreditCardServiceable(): CreditCardOperable;
	getBankSlipServiceable(): BankSlipOperable;
	getPixServiceable(): PixOperable;
	getChargeFinder(): ChargeFindable;
}

interface ChargeFindable {
	findChargeById(chargeId: number): Promise<BempaggoChargeResponse>;
	findChargesByOrderReferenceId(orderReferenceId: string): Promise<BempaggoChargeResponse[]>;
}

interface CreditCardOperable extends ChargeFindable {
	createCreditCardCharge(sellerId: number, order: BempaggoOrderRequest): Promise<BempaggoChargeResponse>;
	captureCreditCardCharge(chargeId: number): Promise<BempaggoChargeResponse>;
	refundCreditCardCharge(chargeId: number): Promise<BempaggoChargeResponse>;
}

interface BankSlipOperable extends ChargeFindable {
	createBankSlipCharge(sellerId: number, order: BempaggoOrderRequest): Promise<BempaggoChargeResponse>;
	cancelBankSlip(chargeId: number): Promise<BempaggoChargeResponse>;
}

interface PixOperable extends ChargeFindable {
	createPixCharge(sellerId: number, order: BempaggoOrderRequest): Promise<BempaggoChargeResponse>;
	cancelPix(chargeId: number): Promise<BempaggoChargeResponse>;
	createQuickResponseCodeUrlByChargeId(chargeId: number): URL;
	getQuickResponseCodeUrlByChargeId(chargeId: number): Promise<Response>;
}

export {
	BankSlipOperable, BempaggoTransactionServiceable, ChargeFindable,
	CreditCardOperable, PixOperable
};

