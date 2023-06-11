import { BempaggoAddressRequest, BempaggoCardRequest, BempaggoCreditCardPaymentRequest, BempaggoCustomerRequest, BempaggoOrderRequest, BempaggoTokenCardRequest } from "bempaggo-kit/lib/app/modules/entity/BempaggoRequest";
import { BempaggoCardResponse, BempaggoChargeResponse, BempaggoCustomerResponse } from "bempaggo-kit/lib/app/modules/entity/BempaggoResponse";
import { BankSlipRenderingData } from "./BankSlipRenderinData";
import { LayersAddress, LayersCustomer, LayersCustomerPaymentMethod, LayersTransaction } from "./interfaces";
import { LayersTransactionGroup } from "./transactionGroup";
declare class Layers {
    request: RequestsToBempaggo;
    response: ResponsesFromBempaggo;
    constructor();
}
declare class RequestsToBempaggo {
    toAddress(address: LayersAddress): BempaggoAddressRequest | undefined;
    private toAbstractOrder;
    toOrderCreditCard(transactionGroup: LayersTransactionGroup): BempaggoOrderRequest;
    toOrderBankSlip(transactionGroup: LayersTransactionGroup): BempaggoOrderRequest;
    toOrderPix(transactionGroup: LayersTransactionGroup): BempaggoOrderRequest;
    private createPix;
    private createBankSlip;
    createCreditCard(payment: {
        total: {
            amount: number;
        };
        card?: {
            token: string;
            securityCode: string;
        };
        installments: number;
        recipients: [
            {
                sourceId: any;
                total: {
                    amount: number;
                    currency: 'BRL';
                };
            }
        ];
    }): BempaggoCreditCardPaymentRequest;
    private toSplits;
    toCustomer(customer: LayersCustomer): BempaggoCustomerRequest;
}
declare class ResponsesFromBempaggo {
    toBankSlipRenderingData(bempaggoCharge: BempaggoChargeResponse): BankSlipRenderingData;
    fromCharge(response: BempaggoChargeResponse): LayersTransaction;
    toCard(paymentMethod: LayersCustomerPaymentMethod): BempaggoCardRequest;
    toCardTransaction(card: {
        token: string;
        securityCode: string;
    }): BempaggoTokenCardRequest;
    fromCards(card: BempaggoCardResponse): LayersCustomerPaymentMethod;
    from(customer: BempaggoCustomerResponse): LayersCustomer;
}
export { Layers, RequestsToBempaggo, ResponsesFromBempaggo };
