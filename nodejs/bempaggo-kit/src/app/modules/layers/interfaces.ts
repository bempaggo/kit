import { ChargeStatusTypes } from "../entity/Enum";

export interface BemPaggoTransaction {
  items: BemPaggoTransactionItem[];
  payment: BemPaggoTransactionPaymentMethod;
  referenceId: string;
  customer_id: string;

}

interface BemPaggoTransactionItem {
  amount: number
  description: string
  quantity: number
}

export type BemPaggoTransactionPaymentMethod =
  | BemPaggoCreditCardPaymentMethod
  | BemPaggoPixPaymentMethod
  | BemPaggoBankSlipPaymentMethod

interface BemPaggoCreditCardPaymentMethod {
  payment_method: 'credit_card';
  amount: number;
  recipient_id: string;
  credit_card: {
    card_id: string;
    operation_type: 'auth_only';
    installments: number;
    statement_descriptor: string;
  };
  refundedValue?:number; // --Bempaggo adding this field; in cents such as 1000 = R$ 10,00
  status?:ChargeStatusTypes; // --Bempaggo adding this field; "PAY"
}

interface BemPaggoPixPaymentMethod {
  payment_method: 'pix'
  amount: number
  recipient_id: string
  pix: {
    expires_in: string
  }
}

interface BemPaggoBankSlipPaymentMethod {
  payment_method: 'boleto'
  recipient_id: string
  boleto: {
    due_at: string
  }
}

export interface BemPaggoCustomer {
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
  address: Address,

  birthdate?: string // YYYY-MM-DD --Bempaggo adding this field
}

export interface Address {
  address: string
  address2: string
  city: string
  code: string
  country: string
  district: string
  number: string
  state: string
}

export interface BemPaggoCustomerPaymentMethod {
  title: string
  name: string
  month: number
  year: number
  number: string
  brand: string,
  cvv?: string // --Bempaggo adding this field
  document?: string // --Bempaggo adding this field
}
