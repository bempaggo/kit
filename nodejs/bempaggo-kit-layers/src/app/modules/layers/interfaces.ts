import { BempaggoCustomerResponse } from "bempaggo-kit/lib/app/modules/entity/BempaggoResponse";
import { ChargeStatusTypes, TransactionStatusTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";

export interface LayersTransaction {
	items: LayersTransactionItem[];
	payments: LayersTransactionPaymentMethod[];
	referenceId: string;
	customer_id: string;
	status: ChargeStatusTypes; // Bempaggo add this fields
	amount: number;// Bempaggo add this fields
	refunded_amount?: number;// Bempaggo add this fields
}

interface LayersTransactionItem {
	amount: number
	description: string
	quantity: number
}

export type LayersTransactionPaymentMethod =
	| LayersCreditCardPaymentMethod
	| LayersPixPaymentMethod
	| LayersBankSlipPaymentMethod

export interface LayersCreditCardPaymentMethod {
	payment_method: 'credit_card';
	amount: number;
	recipient_id: string;
	credit_card: {
		card_id: string;
		token: string;// TODO -- Bempaggo adding this field; "PAY"
		operation_type: 'auth_only';
		installments: number;
		statement_descriptor: string;
	};
	refunded_value: number; // --Bempaggo adding this field; in cents such as 1000 = R$ 10,00
	status?: TransactionStatusTypes; // --Bempaggo adding this field; "PAY"
	reference_id: string; // --Bempaggo adding this field
	

}

export interface LayersPixPaymentMethod {
	payment_method: 'pix'
	amount: number
	recipient_id: string
	pix: {
		expires_in: string
	}
	status?: TransactionStatusTypes; // --Bempaggo adding this field; "PAY"
	emv: string; // TODO --Bempaggo adding this field
	reference_id: string; // --Bempaggo adding this field

}

export interface LayersBankSlipPaymentMethod {
	payment_method: 'boleto'
	recipient_id: string
	boleto: {
		due_at: string
	}
	status?: TransactionStatusTypes; // TODO--Bempaggo adding this field; "PAY"
	reference_id: string; // --Bempaggo adding this field
	amount: number;// --Bempaggo adding this field
	paid_amount: number;// --Bempaggo adding this field
	customer: BempaggoCustomerResponse;// --Bempaggo adding this field
	
}

export interface LayersCustomer {
	name: string
	alias: string
	email: string
	type: 'individual' | 'company'
	document: string
	phones: {
		mobile_phone: {
			country_code: string
			number: string
			area_code: string
		}
	}
	address: LayersAddress,

	birthdate?: string // YYYY-MM-DD --Bempaggo adding this field
}

export interface LayersAddress {
	address: string
	address2: string
	city: string
	code: string
	country: string
	district: string
	number: string
	state: string
}

export interface LayersCustomerPaymentMethod {
	title: string
	name: string
	month: number
	year: number
	number: string
	brand: string,
	document?: string, // --Bempaggo adding this field
	token?:string // --Bempaggo adding this field
}
