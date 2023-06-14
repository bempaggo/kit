import { BempaggoCustomerResponse } from "bempaggo-kit/lib/app/modules/entity/BempaggoResponse";
import { ChargeStatusTypes, TransactionStatusTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";
export interface LayersTransaction {
    items: LayersTransactionItem[];
    payments: LayersTransactionPaymentMethod[];
    referenceId: string;
    customer_id: string;
    status: ChargeStatusTypes;
    amount: number;
    refunded_amount?: number;
}
interface LayersTransactionItem {
    amount: number;
    description: string;
    quantity: number;
}
export type LayersTransactionPaymentMethod = LayersCreditCardPaymentMethod | LayersPixPaymentMethod | LayersBankSlipPaymentMethod;
export interface LayersCreditCardPaymentMethod {
    payment_method: 'credit_card';
    amount: number;
    recipient_id: string;
    credit_card: {
        card_id: string;
        token: string;
        operation_type: 'auth_only';
        installments: number;
        statement_descriptor: string;
    };
    refunded_value: number;
    status?: TransactionStatusTypes;
    reference_id: string;
}
export interface LayersPixPaymentMethod {
    payment_method: 'pix';
    amount: number;
    recipient_id: string;
    pix: {
        expires_in: string;
    };
    status?: TransactionStatusTypes;
    emv: string;
    reference_id: string;
}
export interface LayersBankSlipPaymentMethod {
    payment_method: 'boleto';
    recipient_id: string;
    boleto: {
        due_at: string;
    };
    status?: TransactionStatusTypes;
    reference_id: string;
    amount: number;
    paid_amount: number;
    customer: BempaggoCustomerResponse;
}
export interface LayersCustomer {
    name: string;
    alias: string;
    email: string;
    type: 'individual' | 'company';
    document: string;
    phones: {
        mobile_phone: {
            country_code: string;
            number: string;
            area_code: string;
        };
    };
    address: LayersAddress;
    birthdate?: string;
}
export interface LayersAddress {
    address: string;
    address2: string;
    city: string;
    code: string;
    country: string;
    district: string;
    number: string;
    state: string;
}
export interface LayersCustomerPaymentMethod {
    title: string;
    name: string;
    month: number;
    year: number;
    number: string;
    brand: string;
    document?: string;
    token?: string;
}
export {};
