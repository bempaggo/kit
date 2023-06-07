import { PaymentMethodTypes } from "./Enum";

interface BempaggoCardRequest {
	cardNumber: string;
	holder: BempaggoCardHolderRequest;
	expiration: BempaggoCardExpirationRequest;
}
interface BempaggoTokenCardRequest {
	cvv: string;
	token: string;
}
interface BempaggoCardHolderRequest {
	name: string;
	document?: string | undefined;
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
	birthdate?: string | undefined;
	phone?: BempaggoPhoneRequest | undefined;
	email?: string;
	address?: BempaggoAddressRequest | undefined;
}
interface BempaggoOrderRequest {
	customer: BempaggoCustomerRequest;
	/**
	 * 	 if PaymentMethodTypes.CREDIT_CARD then 
	 * 		assert(payments.length == 1 OR payments.length == 2)
	 * 	 Otherwise 
	 * 		assert(payments.length==1)
	 */
	payments: BempaggoPaymentRequest[];
	// this value is in cents of order.
	amount: number;
	// orderReference is to tracker the order at Bempaggo.
	orderReference: string;
	/* notificationUrl is the url that Bempaggo sends HTTP POST when the order has updates. 
	* The body of request is filled with "Bempaggo"
	*/
	notificationUrl?: string | undefined;
}

type BempaggoPaymentRequest =
	| BempaggoCreditCardPaymentRequest
	| BempaggoPixPaymentRequest
	| BempaggoBankSlipPaymentRequest;


interface BempaggoAbstractPaymentRequest {
	paymentMethod: PaymentMethodTypes,
	// this value is in cents of payment part. It shoud order.amount == sum (order.payments[i].amount)  
	amount: number;
	/** 
	 * The splits are parts that each affiliate (seller) owns. 
	 * However, the amounts are not sent to the affiliate acquirer's account.
	 * The amounts are only sent to the acquirer's account for the affiliate (seller informed in the order authorization, in the order URL).
	 * */
	splits: BempaggoSplitPaymentRequest[];
}

interface BempaggoBankSlipPaymentRequest extends BempaggoAbstractPaymentRequest {
	paymentMethod: PaymentMethodTypes.BANK_SLIP;
	/**
	 * 
	 * Desired expiration date is the timestamp. This is the deadline receive the payment.
	 * Please check the billing transaction for the available payment deadline.
	 *
	 * Example: The value 0 is GMT: Thursday, January 1, 1970 12:00:00 AM.
	 * 
	 *  
	 * Note: This value is ***NOT added*** on the current date.
	 * 
	 * @TIMESTEMP
	 */ 
	
	expirationDate:number
}

interface BempaggoCreditCardPaymentRequest extends BempaggoAbstractPaymentRequest {
	paymentMethod: PaymentMethodTypes.CREDIT_CARD;
	/**
	 * min = 1
	 * max = 12 or according to card brand
	 * 
	 */
	installments: number;
	cardToken: BempaggoTokenCardRequest;
}
interface BempaggoPixPaymentRequest extends BempaggoAbstractPaymentRequest {
	paymentMethod: PaymentMethodTypes.PIX;
	/**
	 * Desired expiration date is the timestamp. This is the deadline receive the payment.
	 * Please check the billing transaction for the available payment deadline.
	 *
	 * Example: The desiredExpirationDate 0 is GMT: Thursday, January 1, 1970 12:00:00 AM.
	 * 
	 *  
	 * Note: The desiredExpirationDate is ***NOT added*** on the current date.
	 * 
	 * @TIMESTEMP
	 */ 
	desiredExpirationDate:number
}

interface BempaggoSplitPaymentRequest {
	
	/**
	 *This value is in cents.
	 * */
	amount: number;
	sellerId: number;
}
export {
	BempaggoSplitPaymentRequest,
	BempaggoPixPaymentRequest,
	BempaggoCreditCardPaymentRequest,
	BempaggoBankSlipPaymentRequest,
	BempaggoAbstractPaymentRequest,
	BempaggoPaymentRequest,
	BempaggoAddressRequest,
	BempaggoCardExpirationRequest,
	BempaggoCardHolderRequest,
	BempaggoCardRequest,
	BempaggoOrderRequest,
	BempaggoCustomerRequest,
	BempaggoPhoneRequest,
	BempaggoTokenCardRequest
};


