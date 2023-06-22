import { CardBrandTypes, ChargeStatusTypes, PaymentMethodTypes, RefundReasonTypes, TransactionResponseTypes, TransactionStatusTypes } from "./Enum";

interface BempaggoCustomerResponse {
	id: number;
	phone: BempaggoPhoneResponse | undefined;
	birthdate: string | undefined;
	email: string | undefined;
	document: string | undefined;
	name: string;
	address: BempaggoAddressResponse | undefined;
}

interface BempaggoMinimalCustomerResponse {
	id: number;
	document: string
}
interface BempaggoAddressResponse {
	street: string;
	streetNumber: string;
	lineTwo: string | undefined;
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
	document: string | undefined;
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
	token: string | undefined;
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
	refundedAmount: number | undefined;
	transactions: BempaggoTransactionResponse[];
	customer: BempaggoMinimalCustomerResponse;
	order: BempaggoMinimalOrderResponse;
}
type BempaggoTransactionResponse =
	| BempaggoCreditCardTransactionResponse
	| BempaggoPixTransactionResponse
	| BempaggoBankSlipTransactionResponse;

interface BempaggoMinimalOrderResponse {
	id: number;
	orderReference: string | undefined;
	affiliate: BempaggoAffiliateMinimalResponse | undefined;
}

interface BempaggoMinimalCustomerResponse {
	id: number;
	document: string;
}
interface BempaggoBankResponse {
	code: string;
	agency: string;
	account: string;
}


interface BempaggoBankSlipTransactionResponse extends BempaggoAbstractTransactionResponse {
	paymentMethod: PaymentMethodTypes.BOLETO;
	bank: BempaggoBankResponse;
	/**
	 * dueDate is the timestamp. This is the deadline receive the payment.
	 *
	 * Example: The value 0 is GMT: Thursday, January 1, 1970 12:00:00 AM.
	 *
	 *
	 * Note: This value is ***NOT added*** on the current date.
	 *
	 * @TIMESTEMP
	 */
	dueDate: number;
	paymentDate: number | undefined;
	paymentInstructions: string;
	communityLegalName: string;
	communityLegalDocument: string;
	ourNumber: string;
	documentNumber: string;
	customer: BempaggoCustomerResponse;
	digitableLine: string;
}
interface BempaggoPixTransactionResponse extends BempaggoAbstractTransactionResponse {
	paymentMethod: PaymentMethodTypes.PIX;
	quickResponseCode: string | undefined;
	/**
	 * expirationDate is the timestamp. This is the deadline receive the payment.
	 */
	expirationDate: number;
	paymentDate: number | undefined;
	emv: string;
}

interface BempaggoCreditCardTransactionResponse extends BempaggoAbstractTransactionResponse {
	paymentMethod: PaymentMethodTypes.CREDIT_CARD;
	refundValue: number | undefined;
	/**
	 * transactionKey is the value generated by the acquirer (Rede, Cielo ...) 
	 */
	transactionKey: string;

	refundReason: RefundReasonTypes | undefined;

	card: BempaggoCardResponse;

	installments: number;
}

interface BempaggoAbstractTransactionResponse {
	paymentMethod: PaymentMethodTypes;
	/**
	 * id is the value from Bempaggo. 
	 *
	 * */
	id: number;

	/**
	* transactionReference is the value to send to the acquirer (Rede, Cielo ...) to tracer the transaction.
	* This value is generally used to reconcile the transaction, or to trace
	*/
	transactionReference: string | undefined;

	returnCode: string;
	value: number;
	paidValue: number | undefined;
	returnMessage: string | undefined;

	status: TransactionStatusTypes;
	/**
	 * transactionDate is the timestamp from transaction
	 */
	transactionDate: number;
	type: TransactionResponseTypes;

	/**
	 * affiliate is the seller. This is the account the payment was sent to.
	 */
	affiliate: BempaggoAffiliateMinimalResponse | undefined;


	/**
	 * establishment is a specific account of the affiliate that the payment was sent to.
	 */
	establishment: BempaggoEstablishmentMinimalResponse;
	/**
	 * The splits are parts that each affiliate (seller) owns.
	 * However, the amounts are not sent to the affiliate acquirer's account.
	 * The amounts are only sent to the acquirer's account for the affiliate (seller informed in the order authorization, in the order URL).
	 */
	splits: BempaggoSplitResponse[];

}


interface BempaggoSplitResponse {
	affiliate: BempaggoAffiliateMinimalResponse;
	/** Value in cents  */
	amount: number
}
export {
	BempaggoAddressResponse, BempaggoAffiliateMinimalResponse, BempaggoBankResponse, BempaggoBankSlipTransactionResponse, BempaggoCardExpirationResponse, BempaggoCardHolderResponse, BempaggoCardResponse, BempaggoChargeResponse, BempaggoCreditCardTransactionResponse, BempaggoCustomerResponse, BempaggoEstablishmentMinimalResponse,
	BempaggoMinimalCustomerResponse, BempaggoPhoneResponse, BempaggoPixTransactionResponse, BempaggoSplitResponse, BempaggoTransactionResponse
};

