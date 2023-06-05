import { BempaggoOrderRequest } from "./entity/BempaggoRequest";
import { BempaggoChargeResponse } from "./entity/BempaggoResponse";


interface BempaggoTransactionServiceable {
	getCreditCardServiceable(): CreditCardOperable;
}
interface CreditCardOperable {
	findChargeById(chargeId: number): Promise<BempaggoChargeResponse>;

	findChargesByOrderReferenceId(orderReferenceId: string): Promise<BempaggoChargeResponse[]>;

	createCharge(sellerId: number, order: BempaggoOrderRequest): Promise<BempaggoChargeResponse>;

	captureCharge(chargeId: number): Promise<BempaggoChargeResponse>;

	refundCharge(chargeId: number): Promise<BempaggoChargeResponse>;

}

export { CreditCardOperable, BempaggoTransactionServiceable };

