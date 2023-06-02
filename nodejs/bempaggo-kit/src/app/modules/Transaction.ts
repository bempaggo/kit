import { BempaggoChargeRequest } from "./entity/BempaggoRequest";
import { BempaggoChargeResponse } from "./entity/BempaggoResponse";


interface BempaggoTransactionServiceable {
  getCreditCardServiceable(): CreditCardOperable;
}
interface CreditCardOperable {
  findChargeById(sellerId: number, orderId: number): Promise<BempaggoChargeResponse>;

  findChargesByReferenceId(sellerId: number, orderReferenceId: number): Promise<BempaggoChargeResponse>;

  createCharge(sellerId:number, order: BempaggoChargeRequest): Promise<BempaggoChargeResponse>;

  captureCharge(sellerId: number, orderId: number): Promise<BempaggoChargeResponse>;

  refundCharge(sellerId: number, orderId: number): Promise<BempaggoChargeResponse>;

}

export { CreditCardOperable, BempaggoTransactionServiceable };

