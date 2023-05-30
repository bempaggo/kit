import { CardBrandTypes, ChargeStatusTypes, PaymentMethodTypes, RefundReasonTypes, TransactionResponseTypes, TransactionStatusTypes } from "./Enum";

interface BempaggoCustomerResponse {
  id: number;
  phone?: BempaggoPhoneResponse;
  birthdate?: string;
  email?: string;
  document?: string;
  name: string;
  address?: BempaggoAddressResponse;
}

interface BempaggoMinimalCustomerResponse {
  id: number;
  document: string
}
interface BempaggoAddressResponse {
  street: string;
  streetNumber: string;
  lineTwo?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

interface BempaggoPhoneResponse {
  countryCode: string;
  areaCode: string;
  number: string;
}
interface BempaggoEstablishmentMinimalResponse {
  id: number;
}

interface BempaggoCardHolderResponse {
  name: string;
  document?: string;
}
interface BempaggoAffiliateMinimalResponse {
  id: number;
  name: string;
  businessName: string;
}

interface BempaggoCardExpirationResponse {
  year: number;
  month: number;
}
interface BempaggoCardResponse {
  id: number;
  holder: BempaggoCardHolderResponse;
  bin: string;
  lastFour: string;
  expiration: BempaggoCardExpirationResponse;
  brand: CardBrandTypes;
}
interface BempaggoChargeResponse {
  id: number;
  status: ChargeStatusTypes;
  value: number;
  refundedAmount?: number;
  transactions: BempaggoTransactionResponse[];
  installments: number;
  customer: BempaggoMinimalCustomerResponse;
  referenceId: string;
}

interface BempaggoMinimalCustomerResponse {
  id: number;
  document: string
}

interface BempaggoCardTokenResponse{
  token:string
  bin:string
}
interface BempaggoTransactionResponse {
  id: number;
  returnCode: string;
  returnMessage: string;
  nsuCapture: string;
  nsuNumber: string;
  authorizationNumber: string;
  tid: string;
  uniqueSequenceNumber: string;
  authenticationNumber: string;
  pan: string;
  returnAutCode: string;
  value: number;
  paidValue?: number;
  refundValue?: number;
  transactionKey: string;
  refundRason?: RefundReasonTypes;
  type: TransactionResponseTypes;
  status: TransactionStatusTypes;
  transactionReference: string;
  yourReferenceId?: string;
  transactionDate: number;
  affiliate?: BempaggoAffiliateMinimalResponse;
  paymentMethod: PaymentMethodTypes;
  establishment: BempaggoEstablishmentMinimalResponse;
  card?: BempaggoCardResponse
}
export {
  BempaggoAddressResponse,
  BempaggoTransactionResponse,
  BempaggoChargeResponse,
  BempaggoCustomerResponse,
  BempaggoPhoneResponse,
  BempaggoCardHolderResponse,
  BempaggoCardExpirationResponse,
  BempaggoCardResponse,
  BempaggoAffiliateMinimalResponse,
  BempaggoEstablishmentMinimalResponse,
  BempaggoMinimalCustomerResponse,
  BempaggoCardTokenResponse,

};

