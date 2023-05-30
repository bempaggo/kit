import { RefundReasonTypes } from "./Enum";

interface BempaggoCardRequest {
  cardNumber: string;
  cvv?: string;
  holder: BempaggoCardHolderRequest;
  expiration: BempaggoCardExpirationRequest;
}
interface BempaggoTokenCardRequest {
  cvv: string;
  token: string;
}
interface BempaggoCardHolderRequest {
  name: string;
  document?: string|null;
}

interface BempaggoCardExpirationRequest {
  year: number;
  month: number;
}

interface BempaggoPhoneRequest {
  countryCode: number;
  areaCode: number;
  number: number;
}

interface BempaggoAddressRequest {
  street: string;
  streetNumber: string;
  lineTwo?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}
interface BempaggoCustomerRequest {
  name: string;
  document: string;
  birthdate? : string|undefined;
  phone?: BempaggoPhoneRequest|undefined;
  email?: string;
  address?: BempaggoAddressRequest|undefined;
}
interface BempaggoChargeRequest {
  customer: BempaggoCustomerRequest;
  card?: BempaggoCardRequest|undefined;
  cardToken?: BempaggoTokenCardRequest|undefined;
  value: number;
  installments: number;
  yourReferenceId: number;
  notificationUrl?: string|undefined;
  affiliateId: number;
}

interface BempaggoRefundRequest {
  reason: RefundReasonTypes;
  amount?: number|undefined;
}

export {
  BempaggoAddressRequest,
  BempaggoCardExpirationRequest,
  BempaggoCardHolderRequest,
  BempaggoCardRequest,
  BempaggoChargeRequest,
  BempaggoCustomerRequest,
  BempaggoPhoneRequest,
  BempaggoRefundRequest,
  BempaggoTokenCardRequest
};


