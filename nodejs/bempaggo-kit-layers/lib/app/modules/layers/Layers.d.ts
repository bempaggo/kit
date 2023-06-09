import { BempaggoAddressRequest, BempaggoCardRequest, BempaggoCreditCardPaymentRequest, BempaggoCustomerRequest, BempaggoOrderRequest, BempaggoSplitPaymentRequest, BempaggoTokenCardRequest } from "bempaggo-kit/lib/app/modules/entity/BempaggoRequest";
import { BankSlipRenderingData } from "./BankSlipRenderinData";
import { LayersAddress, LayersCustomer, LayersCustomerPaymentMethod, LayersTransaction } from "./interfaces";
import { LayersTransactionGroup } from "./transactionGroup";
import { BempaggoCardResponse, BempaggoChargeResponse, BempaggoCustomerResponse } from "bempaggo-kit/lib/app/modules/entity/BempaggoResponse";
declare class Layers {
    request: RequestsToBempaggo;
    response: ResponsesFromBempaggo;
    constructor();
}
declare class RequestsToBempaggo {
    toAddress(address: LayersAddress): BempaggoAddressRequest | undefined;
    toOrder(transactionGroup: LayersTransactionGroup): BempaggoOrderRequest;
    createCreditCard(splits: BempaggoSplitPaymentRequest[], payment: {
        total: {
            amount: number;
        };
        card: {
            token: string;
            securityCode: string;
        };
        installments: number;
    }): BempaggoCreditCardPaymentRequest;
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
