enum PaymentMethodTypes {
	CREDIT_CARD = "CREDIT_CARD",
	PIX = "PIX",
	BOLETO = "BOLETO" /* Boleto is a common payment method in Brazil.*/,
	TRANSFER = "TRANSFER"
}

enum ChargeStatusTypes {
	PAY = "PAY",
	PENDING = "PENDING",
	SCHEDULE = "SCHEDULE",
	ACCREDIT = "ACCREDIT",
	REFUND = "REFUND",
	MANUAL_DISCHARGE = "MANUAL_DISCHARGE",
	CHARGEBACK = "CHARGEBACK",
	COUNTERCHARGE = "COUNTERCHARGE",
	IN_PROGRESS = "IN_PROGRESS",
	AUTHORIZED = "AUTHORIZED",
	FAIL = "FAIL",
	CANCELED = "CANCELED"
}


enum RefundReasonTypes {
	DUPLICATE_CHARGE = "DUPLICATE_CHARGE",
	IMPROPER_CHARGE = "IMPROPER_CHARGE",
	COSTUMER_WITHDRAWAL = "COSTUMER_WITHDRAWAL",
	OTHERS = "OTHERS"
}

enum TransactionStatusTypes {
	IN_PROGRESS = "IN_PROGRESS",
	APPROVED = "APPROVED",
	REFUND = "REFUND",
	AUTHORIZED = "AUTHORIZED",
	MANUAL_DISCHARGE = "MANUAL_DISCHARGE",
	MANUAL_REFUND = "MANUAL_REFUND",
	NOT_AUTHORIZED = "NOT_AUTHORIZED",
	NOT_APPROVED = "NOT_APPROVED",
	CHARGEBACK = "CHARGEBACK",
	COUNTERCHARGE = "COUNTERCHARGE",
	CANCELED = "CANCELED",
	AWAITING_PAYMENT = "AWAITING_PAYMENT",
	UNDER_PAYMENT = "UNDER_PAYMENT",
	OVER_PAYMENT = "OVER_PAYMENT",
	FAIL = "FAIL",
	INVALID = "INVALID"
}

enum Environments {
	PRODUCTION = "PRODUCTION",
	SANDBOX = "SANDBOX",
	DEVELOPMENT = "DEVELOPMENT"

}

enum TransactionResponseTypes {
	ACCESSION = "ACCESSION",
	RECURRENT = "RECURRENT",
	LOOSE = "LOOSE",
	MANUAL_DISCHARGE = "MANUAL_DISCHARGE",
	REFUND = "REFUND",
	CHARGEBACK = "CHARGEBACK",
	COUNTERCHARGE = "COUNTERCHARGE"
}

enum CardBrandTypes {
	VISA = "VISA",
	MASTERCARD = "MASTERCARD",
	ELO = "ELO",
	AMEX = "AMEX",
	DINERS = "DINERS",
	AURA = "AURA",
	DISCOVER = "DISCOVER",
	JCB = "JCB",
	HIPERCARD = "HIPERCARD",
	SOROCRED = "SOROCRED",
	CABAL = "CABAL",
	CREDSYSTEM = "CREDSYSTEM",
	BANESCARD = "BANESCARD",
	CREDZ = "CREDZ"
}
enum OrderStatusType {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
	OVERDUE = "OVERDUE",
	PENDING = "PENDING",
	CANCELED = "CANCELED",
	CHARGEBACK = "CHARGEBACK",
	COUNTERCHARGE = "COUNTERCHARGE"
}
enum MathTypes {
	FLAT = "FLAT",
	/**When FLAT use the amount in cents	*/
	PERCENTAGE = "PERCENTAGE"
	/**When PERCENTAGE use the amount, using five position to the decimal
	 * Examples:
	 * 	percent		= amount to send bempaggo
	 * 	0.50%  		= 5000
	 *  1.00%  		= 100000
	 *  1.50%  		= 150000
	 *  5.00%  		= 500000
	 *  10.00% 		= 1000000
	 *  10.98% 		= 1098000
	 *  10.987% 	= 1098700
	*/

}
enum PeriodicityTypes {
	DAILY = "DAILY", MONTHLY = "MONTHLY", ANNUAL = "ANNUAL"
}
export {
	CardBrandTypes, ChargeStatusTypes, Environments, MathTypes, OrderStatusType, PaymentMethodTypes, PeriodicityTypes, RefundReasonTypes, TransactionResponseTypes, TransactionStatusTypes
};

