import { BankSlipRenderingData } from "./BankSlipRenderinData";
import { LayersTransactionGroup } from './transactionGroup';
export declare abstract class BaseSdk<GatewayCustomer, GatewayTransaction, GatewayCustomerPaymentMethod, GatewayCharge> {
    protected readonly gateway: string;
    constructor(baseURL: string, gateway: string, auth: any);
    findCustomerByDocument(document: string): Promise<GatewayCustomer>;
    createCustomer(customer: GatewayCustomer): Promise<GatewayCustomer>;
    updateCustomer(customer: GatewayCustomer): Promise<GatewayCustomer>;
    findCustomerPaymentMethod(customerId: string): Promise<GatewayCustomerPaymentMethod>;
    createCustomerPaymentMethod(customerId: string, paymentMethod: GatewayCustomerPaymentMethod): Promise<GatewayCustomerPaymentMethod>;
    findTransactionsByReferenceId(referenceId: string): Promise<GatewayTransaction>;
    getBankSlipRenderingData(transactionId: string): Promise<BankSlipRenderingData>;
    createTransaction(transactionGroup: LayersTransactionGroup): Promise<GatewayTransaction>;
    getOrderCharges(transactionId: string): Promise<GatewayCharge[]>;
    chargeTransaction(transactionId: string): Promise<GatewayTransaction>;
    refundTransaction(transactionId: string): Promise<GatewayTransaction>;
    tokenizeCard(card: any, hash: string): Promise<any>;
    shouldFindCustomerBeforeCreating(): void;
    getTransactionQrCode(transaction: GatewayTransaction): string;
    getTransactionPaymentType(transaction: GatewayTransaction): 'bank_slip' | 'pix' | 'credit_card' | undefined;
    cancelBankSlipTransaction(transaction: GatewayTransaction): Promise<void>;
}
