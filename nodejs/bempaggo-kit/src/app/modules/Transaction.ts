import { BempaggoChargeRequest, BempaggoRefundRequest } from "./entity/BempaggoRequest";
import { BempaggoChargeResponse } from "./entity/BempaggoResponse";


interface BempaggoTransactionServiceable {
  getCreditCardServiceable(): CreditCardOperable;
}
interface CreditCardOperable {
  findChargeById(chargeId: number): Promise<BempaggoChargeResponse>;

  findChargesByReferenceId(referenceId: number): Promise<BempaggoChargeResponse[]>;

  createCharge(charge: BempaggoChargeRequest): Promise<BempaggoChargeResponse>;

  captureCharge(chargeId: number): Promise<BempaggoChargeResponse>;

  refundCharge(transactionId: number, refund: BempaggoRefundRequest): Promise<BempaggoChargeResponse>;

  createChargeAndCapture(charge: BempaggoChargeRequest): Promise<BempaggoChargeResponse>;
}

export { CreditCardOperable, BempaggoTransactionServiceable };

