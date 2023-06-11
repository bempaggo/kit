import { CardBrandTypes, PaymentMethodTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";
import { BankSlipRenderingData } from "./BankSlipRenderinData";
import { BaseSdk } from './BaseSDK';
import { LayersCustomer, LayersCustomerPaymentMethod, LayersTransaction } from './interfaces';
import { LayersTransactionGroup } from './transactionGroup';
declare class BemPaggoSdk extends BaseSdk<LayersCustomer, LayersTransaction, LayersCustomerPaymentMethod, never> {
    private bempaggo;
    private layers;
    constructor(baseURL: string, auth: string);
    findCustomerByDocument(document: string): Promise<LayersCustomer>;
    createCustomer(customer: LayersCustomer): Promise<LayersCustomer>;
    updateCustomer(customer: LayersCustomer): Promise<LayersCustomer>;
    findCustomerPaymentMethod(customerId: string): Promise<LayersCustomerPaymentMethod>;
    createCustomerPaymentMethod(customerId: string, paymentMethod: LayersCustomerPaymentMethod): Promise<LayersCustomerPaymentMethod>;
    findTransactionsByReferenceId(referenceId: string): Promise<LayersTransaction>;
    findChargeById(id: number): Promise<LayersTransaction>;
    getBankSlipRenderingData(transactionId: string): Promise<BankSlipRenderingData>;
    createTransaction(transactionGroup: LayersTransactionGroup): Promise<LayersTransaction>;
    private isOnly;
    getOrderCharges(_: never): Promise<never>;
    chargeTransaction(transactionId: string): Promise<LayersTransaction>;
    refundTransaction(transactionId: string): Promise<LayersTransaction>;
    tokenizeCard(card: any, hash: string): Promise<any>;
    shouldFindCustomerBeforeCreating(): void;
    getExternalQrCode(transaction: LayersTransaction): string;
    getExternalPaymentType(transaction: LayersTransaction): 'bank_slip' | 'pix' | 'credit_card' | undefined;
    cancelBankSlipTransaction(transaction: LayersTransaction): Promise<void>;
    static ExternalPaymentType: {
        readonly boleto: PaymentMethodTypes.BOLETO;
        readonly pix: PaymentMethodTypes.PIX;
        readonly credit_card: PaymentMethodTypes.CREDIT_CARD;
    };
    static availableCardBrands: readonly CardBrandTypes[];
}
export type BemPaggoCardBrands = typeof BemPaggoSdk.availableCardBrands[number];
export default BemPaggoSdk;
