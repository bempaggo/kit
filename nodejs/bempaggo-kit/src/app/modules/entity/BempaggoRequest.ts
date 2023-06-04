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
	payments: BempaggoPaymentRequest[];
	// this value is in cents of order.
	value: number;
	// orderReference is to tracker the order at Bempaggo.
	orderReference: string;
	// notificationUrl is the url that Bempaggo sends HTTP POST when the order has updates. The body of request is filled with "Bempaggo"
	notificationUrl?: string | undefined;
}

interface SplitPaymentRequest {
	// this value is in cents.
	amount: number; 
	sellerId: number;
}

interface BempaggoPaymentRequest {
	installments: number;
	amount: number;
	cardToken: BempaggoTokenCardRequest;
	/** 
	 * The splits are parts that each affiliate (seller) owns. 
	 * However, the amounts are not sent to the affiliate acquirer's account.
	 * The amounts are only sent to the acquirer's account for the affiliate (seller informed in the order authorization, in the order URL).
	 * */
	splits: SplitPaymentRequest[];

}

export {
	SplitPaymentRequest,
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


