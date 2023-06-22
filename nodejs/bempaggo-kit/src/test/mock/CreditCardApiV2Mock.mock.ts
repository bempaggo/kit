import { CreditCardOperable } from "@/app/modules/Transaction";
import { BempaggoOrderRequest } from "@/app/modules/entity/BempaggoRequest";
import { BempaggoChargeResponse, BempaggoTransactionResponse } from "@/app/modules/entity/BempaggoResponse";
import { CardBrandTypes, ChargeStatusTypes, PaymentMethodTypes, RefundReasonTypes, TransactionResponseTypes, TransactionStatusTypes } from "@/app/modules/entity/Enum";


export class CreditCardApiV2Mock implements CreditCardOperable {
	async findChargesByOrderReferenceId(
		orderReferenceId: string
	): Promise<BempaggoChargeResponse[]> {
		const transaction: BempaggoTransactionResponse = {
			id: 1,
			returnCode: "00",
			returnMessage: "Transação autorizada",
			value: 1000,
			paidValue: 1000,
			refundValue: 0,
			transactionKey: "123456",
			refundReason: RefundReasonTypes.DUPLICATE_CHARGE,
			type: TransactionResponseTypes.LOOSE,
			status: TransactionStatusTypes.APPROVED,
			transactionReference: String(123456),
			transactionDate: new Date().getTime(),
			installments: 1,
			splits: [],
			affiliate: {
				id: 1,
				name: "Tony Stark",
				businessName: "Stark Industries",
			},
			paymentMethod: PaymentMethodTypes.CREDIT_CARD,
			establishment: {
				id: 1,
			},
			card: {
				holder: {
					name: "Tony Stark",
					document: "51190844001",
				},
				bin: "544828",
				lastFour: "0007",
				expiration: {
					year: 2035,
					month: 1,
				},
				brand: CardBrandTypes.MASTERCARD,
				token: "token_2929292929"
			},
		};

		const chargeResponse: BempaggoChargeResponse = {
			id: 1,
			customer: {
				id: 1,
				document: "51190844001",
			},
			status: ChargeStatusTypes.AUTHORIZED,
			value: 1000,
			refundedAmount: 0,
			transactions: [transaction],
			order: {
				id: 123,
				orderReference: orderReferenceId,
				affiliate: {
					businessName: "",
					name: "",
					id: 1923929929292
				}
			}
		};

		return [chargeResponse];
	}

	async findChargeById(chargeId: number): Promise<BempaggoChargeResponse> {
		const transaction: BempaggoTransactionResponse = {
			id: 1,
			returnCode: "00",
			returnMessage: "Transação autorizada",
			value: 1000,
			paidValue: 1000,
			refundValue: 0,
			transactionKey: "123456",
			refundReason: RefundReasonTypes.DUPLICATE_CHARGE,
			type: TransactionResponseTypes.LOOSE,
			status: TransactionStatusTypes.APPROVED,
			transactionReference: String(123456),
			transactionDate: new Date().getTime(),
			installments: 1,
			splits: [],
			affiliate: {
				id: 1,
				name: "Tony Stark",
				businessName: "Stark Industries",
			},
			paymentMethod: PaymentMethodTypes.CREDIT_CARD,
			establishment: {
				id: 1,
			},
			card: {
				holder: {
					name: "Tony Stark",
					document: "51190844001",
				},
				bin: "544828",
				lastFour: "0007",
				expiration: {
					year: 2035,
					month: 1,
				},
				brand: CardBrandTypes.MASTERCARD,
				token: "token_2929292929"
			},
		};

		const chargeResponse: BempaggoChargeResponse = {
			id: chargeId,
			customer: {
				id: 1,
				document: "51190844001",
			},
			status: ChargeStatusTypes.AUTHORIZED,
			value: 1000,
			refundedAmount: 0,
			transactions: [transaction],
			order: {
				id: 123,
				orderReference: "order_id",
				affiliate: {
					businessName: "",
					name: "",
					id: 1923929929292
				}
			}
		};

		return chargeResponse;
	}
	async createCreditCardCharge(sellerId: number, order: BempaggoOrderRequest): Promise<BempaggoChargeResponse> {
		const transaction: BempaggoTransactionResponse = {
			id: 1,
			returnCode: "00",
			returnMessage: "Transação autorizada",
			value: 100,
			paidValue: 1000,
			refundValue: 0,
			transactionKey: "123456",
			refundReason: RefundReasonTypes.DUPLICATE_CHARGE,
			type: TransactionResponseTypes.LOOSE,
			status: TransactionStatusTypes.APPROVED,
			transactionReference: String(123456),
			transactionDate: new Date().getTime(),
			installments: 1,
			splits: [],
			affiliate: {
				id: 1,
				name: "Tony Stark",
				businessName: "Stark Industries",
			},
			paymentMethod: PaymentMethodTypes.CREDIT_CARD,
			establishment: {
				id: 1,
			},
			card: {
				holder: {
					name: "Tony Stark",
					document: "51190844001",
				},
				bin: "544828",
				lastFour: "0007",
				expiration: {
					year: 2035,
					month: 1,
				},
				brand: CardBrandTypes.MASTERCARD,
				token: "token_2929292929"
			},
		};

		const chargeResponse: BempaggoChargeResponse = {
			id: 1,
			customer: {
				id: 1,
				document: "51190844001",
			},
			status: ChargeStatusTypes.AUTHORIZED,
			value: 1000,
			refundedAmount: 0,
			transactions: [transaction],
			order: {
				id: 123,
				orderReference: order.orderReference,
				affiliate: {
					businessName: "",
					name: "",
					id: sellerId
				}
			}
		};

		return chargeResponse;
	}
	async captureCreditCardCharge(chargeId: number): Promise<BempaggoChargeResponse> {
		const transaction: BempaggoTransactionResponse = {
			id: 1,
			returnCode: "00",
			returnMessage: "Transação autorizada",
			value: 1000,
			paidValue: 1000,
			refundValue: 0,
			transactionKey: "123456",
			refundReason: RefundReasonTypes.DUPLICATE_CHARGE,
			type: TransactionResponseTypes.LOOSE,
			status: TransactionStatusTypes.APPROVED,
			transactionReference: String(123456),
			transactionDate: new Date().getTime(),
			installments: 1,
			splits: [],
			affiliate: {
				id: 1,
				name: "Tony Stark",
				businessName: "Stark Industries",
			},
			paymentMethod: PaymentMethodTypes.CREDIT_CARD,
			establishment: {
				id: 1,
			},
			card: {
				holder: {
					name: "Tony Stark",
					document: "51190844001",
				},
				bin: "544828",
				lastFour: "0007",
				expiration: {
					year: 2035,
					month: 1,
				},
				brand: CardBrandTypes.MASTERCARD,
				token: "token_2929292929"
			},
		};

		const chargeResponse: BempaggoChargeResponse = {
			id: chargeId,
			customer: {
				id: 1,
				document: "51190844001",
			},
			status: ChargeStatusTypes.AUTHORIZED,
			value: 1000,
			refundedAmount: 0,
			transactions: [transaction],
			order: {
				id: 123,
				orderReference: "order_id",
				affiliate: {
					businessName: "",
					name: "",
					id: 1923929929292
				}
			}
		};

		return chargeResponse;
	}
	async refundCreditCardCharge(chargeId: number): Promise<BempaggoChargeResponse> {
		const transaction: BempaggoTransactionResponse = {
			id: 1,
			returnCode: "00",
			returnMessage: "Transação autorizada",
			value: 1000,
			paidValue: 1000,
			refundValue: 0,
			transactionKey: "123456",
			refundReason: RefundReasonTypes.DUPLICATE_CHARGE,
			type: TransactionResponseTypes.LOOSE,
			status: TransactionStatusTypes.APPROVED,
			transactionReference: String(123456),
			transactionDate: new Date().getTime(),
			installments: 1,
			splits: [],
			affiliate: {
				id: 1,
				name: "Tony Stark",
				businessName: "Stark Industries",
			},
			paymentMethod: PaymentMethodTypes.CREDIT_CARD,
			establishment: {
				id: 1,
			},
			card: {
				holder: {
					name: "Tony Stark",
					document: "51190844001",
				},
				bin: "544828",
				lastFour: "0007",
				expiration: {
					year: 2035,
					month: 1,
				},
				brand: CardBrandTypes.MASTERCARD,
				token: "token_2929292929"
			},
		};

		const chargeResponse: BempaggoChargeResponse = {
			id: chargeId,
			customer: {
				id: 1,
				document: "51190844001",
			},
			status: ChargeStatusTypes.REFUND,
			value: 1000,
			refundedAmount: 0,
			transactions: [transaction],
			order: {
				id: 123,
				orderReference: "order_id",
				affiliate: {
					businessName: "",
					name: "",
					id: 1923929929292
				}
			}
		};

		return chargeResponse;
	}
}