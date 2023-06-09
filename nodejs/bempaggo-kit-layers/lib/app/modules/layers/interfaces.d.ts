import { ChargeStatusTypes, TransactionStatusTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";
export interface LayersTransaction {
    items: LayersTransactionItem[];
    payments: LayersTransactionPaymentMethod[];
    referenceId: string;
    customer_id: string;
    status: ChargeStatusTypes;
}
interface LayersTransactionItem {
    amount: number;
    description: string;
    quantity: number;
}
export type LayersTransactionPaymentMethod = LayersCreditCardPaymentMethod | LayersPixPaymentMethod | LayersBankSlipPaymentMethod;
interface LayersCreditCardPaymentMethod {
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
    refundedValue: number;
    status?: TransactionStatusTypes;
}
interface LayersPixPaymentMethod {
    payment_method: 'pix';
    amount: number;
    recipient_id: string;
    pix: {
        expires_in: string;
    };
}
interface LayersBankSlipPaymentMethod {
    payment_method: 'boleto';
    recipient_id: string;
    boleto: {
        due_at: string;
    };
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
}
export {};
