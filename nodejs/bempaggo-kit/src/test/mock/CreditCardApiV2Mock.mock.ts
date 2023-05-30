import { CreditCardOperable } from "@/app/modules/Transaction";
import { BempaggoChargeRequest } from "@/app/modules/entity/BempaggoRequest";
import { BempaggoChargeResponse, BempaggoTransactionResponse } from "@/app/modules/entity/BempaggoResponse";
import { CardBrandTypes, ChargeStatusTypes, PaymentMethodTypes, RefundReasonTypes, TransactionResponseTypes, TransactionStatusTypes } from "@/app/modules/entity/Enum";


export class CreditCardApiV2Mock implements CreditCardOperable {
  async findChargesByReferenceId(
    referenceId: number
  ): Promise<BempaggoChargeResponse[]> {
    const transaction: BempaggoTransactionResponse = {
      id: 1,
      returnCode: "00",
      returnMessage: "Transação autorizada",
      nsuCapture: "123456",
      nsuNumber: "123456",
      authorizationNumber: "123456",
      tid: "123456",
      uniqueSequenceNumber: "123456",
      authenticationNumber: "123456",
      pan: "5448280000000007",
      returnAutCode: "123456",
      value: 1000,
      paidValue: 1000,
      refundValue: 0,
      transactionKey: "123456",
      refundRason: RefundReasonTypes.DUPLICATE_CHARGE,
      type: TransactionResponseTypes.LOOSE,
      status: TransactionStatusTypes.APPROVED,
      transactionReference: String(123456),
      yourReferenceId: referenceId.toString(),
      transactionDate: new Date().getTime(),
      affiliate: {
        id: 1,
        name: "Tony Stark",
        businessName: "Stark Industries",
      },
      paymentMethod: PaymentMethodTypes.CREDIT_CARD,
      establishment: {
        id: 1,
      },
      card: {
        id: 1,
        holder: {
          name: "Tony Stark",
          document: "51190844001",
        },
        bin: "544828",
        lastFour: "0007",
        expiration: {
          year: 2035,
          month: 1,
        },
        brand: CardBrandTypes.MASTERCARD,
      },
    };

    const chargeResponse: BempaggoChargeResponse = {
      id: 1,
      referenceId: String(referenceId),
      customer: {
        id: 1,
        document: "51190844001",
      },
      status: ChargeStatusTypes.AUTHORIZED,
      value: 1000,
      refundedAmount: 0,
      transactions: [transaction],
      installments: 1,
    };

    return new Promise((resolve) => resolve([chargeResponse]));
  }

  async findChargeById(chargeId: number): Promise<BempaggoChargeResponse> {
    const charges = await this.findChargesByReferenceId(chargeId);
    const charge: BempaggoChargeResponse = charges[0];
    return new Promise((resolve) => resolve(charge));
  }
  async createCharge(
    charge: BempaggoChargeRequest
  ): Promise<BempaggoChargeResponse> {
    return new Promise((resolve) =>
      resolve({ value: charge.value } as BempaggoChargeResponse)
    );
  }
  async captureCharge(chargeId: number): Promise<BempaggoChargeResponse> {
    return new Promise((resolve) =>
      resolve({ id: chargeId } as BempaggoChargeResponse)
    );
  }
  async refundCharge(chargeId: number): Promise<BempaggoChargeResponse> {
    return new Promise((resolve) =>
      resolve({ id: chargeId } as BempaggoChargeResponse)
    );
  }
  async createChargeAndCapture(
    charge: BempaggoChargeRequest
  ): Promise<BempaggoChargeResponse> {
    return new Promise((resolve) =>
      resolve({ value: charge.value } as BempaggoChargeResponse)
    );
  }
}