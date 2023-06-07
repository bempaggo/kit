import { BempaggoAddressRequest, BempaggoCardRequest, BempaggoCreditCardPaymentRequest, BempaggoCustomerRequest, BempaggoOrderRequest, BempaggoPaymentRequest, BempaggoPhoneRequest, BempaggoSplitPaymentRequest, BempaggoTokenCardRequest } from "../entity/BempaggoRequest";
import { BempaggoCardResponse, BempaggoChargeResponse, BempaggoCustomerResponse } from "../entity/BempaggoResponse";
import { PaymentMethodTypes } from "../entity/Enum";
import { LayersAddress, LayersCustomer, LayersCustomerPaymentMethod, LayersTransaction, LayersTransactionPaymentMethod } from "./interfaces";
import { LayersTransactionGroup } from "./transactionGroup";
class Util {

	static getDateAsString(data: Date): string | undefined {
		if (data) {
			const year = data.getFullYear().toString();
			const month = (data.getMonth() + 1).toString().padStart(2, "0");
			const day = data.getDate().toString().padStart(2, "0");
			return `${year}-${month}-${day}`;
		} else {
			return undefined
		}
	}
}

class Layers {
	request: RequestsToBempaggo;
	response: ResponsesFromBempaggo;
	constructor() {
		this.response = new ResponsesFromBempaggo();
		this.request = new RequestsToBempaggo();
	}
}


class RequestsToBempaggo {
	toAddress(address: LayersAddress): BempaggoAddressRequest | undefined {
		if (!address) return undefined;
		return {
			city: address.city,
			zipCode: address.code,
			street: address.address,
			streetNumber: address.address,
			lineTwo: address.address2,
			neighborhood: address.country,
			state: address.state,
		}
	}
	toOrder(transactionGroup: LayersTransactionGroup): BempaggoOrderRequest {
		const phoneLayers = transactionGroup.customerPayload.phone;
		const phone: BempaggoPhoneRequest = {
			areaCode: phoneLayers.areaCode,
			countryCode: phoneLayers.countryCode,
			number: phoneLayers.phoneNumber
		};
		const address: BempaggoAddressRequest | undefined = this.toAddress(transactionGroup.customerPayload.addresses[0]);
		const birthday: string | undefined = Util.getDateAsString(transactionGroup.customerPayload.birth);
		const payments: BempaggoPaymentRequest[] = []
		for (const payment of transactionGroup.paymentMethods) {
			const splits: BempaggoSplitPaymentRequest[] = [];
			for (const split of payment.recipients) {
				splits.push({
					amount: split.total.amount,
					sellerId: split.sourceId
				});
			}
			const request: BempaggoCreditCardPaymentRequest = this.createCreditCard(splits, payment);
			payments.push(request);
		}
		return {
			customer: {
				document: transactionGroup.customerPayload.document.value,
				name: transactionGroup.customerPayload.name,
				email: transactionGroup.customerPayload.email,
				phone: phone,
				address: address,
				birthdate: birthday
			},
			amount: transactionGroup.price.amount, // is this in cents?
			payments: payments,
			orderReference: transactionGroup.code

		};
	}
	createCreditCard(splits: BempaggoSplitPaymentRequest[], payment:
		{
			total: {
				amount: number
			},
			card: {
				token: string
				securityCode: string
			},
			installments: number
		}
	): BempaggoCreditCardPaymentRequest {
		return {
			paymentMethod: PaymentMethodTypes.CREDIT_CARD,
			amount: payment.total.amount,
			cardToken: {
				token: payment.card.token,
				cvv: payment.card.securityCode
			},
			installments: payment.installments,
			splits: splits
		};
	}
	toCustomer(customer: LayersCustomer): BempaggoCustomerRequest {
		const address: BempaggoAddressRequest | undefined = this.toAddress(customer.address);
		const bempaggo: BempaggoCustomerRequest = {
			name: customer.name,
			document: customer.document,
			birthdate: customer.birthdate,
			phone: {
				areaCode: Number(customer.phones.mobile_phone.area_code),
				countryCode: Number(customer.phones.mobile_phone.country_code),
				number: Number(customer.phones.mobile_phone.number)
			},
			email: customer.email,
			address: address,
		}
		return bempaggo;
	}

}




class ResponsesFromBempaggo {

	fromCharge(response: BempaggoChargeResponse): LayersTransaction {
		const payments: LayersTransactionPaymentMethod[] = [];
		for (const transaction of response.transactions) {
			if (PaymentMethodTypes.CREDIT_CARD == transaction.paymentMethod) {
				const payment: LayersTransactionPaymentMethod = {
					payment_method: 'credit_card',
					amount: transaction.value,
					recipient_id: response.order.affiliate ? response.order.affiliate.id.toString() : "-",
					credit_card: {
						token: transaction.card?.token ? transaction.card.token : "",
						card_id: transaction.card?.token ? transaction.card.token : "",
						operation_type: 'auth_only',
						installments: transaction.installments,
						statement_descriptor: "?need setup in gateway?"
					},
					refundedValue: response.refundedAmount ? response.refundedAmount : 0,
					status: transaction.status
				};
				payments.push(payment);
			} else if (PaymentMethodTypes.PIX == transaction.paymentMethod) {

			}
		}
		return {
			customer_id: response.customer.document,
			referenceId: response.id.toString(),
			items: [],
			payments: payments,
			status: response.status,
		};
	}
	toCard(paymentMethod: LayersCustomerPaymentMethod): BempaggoCardRequest {
		return {
			cardNumber: paymentMethod.number,
			holder: {
				name: paymentMethod.name,
				document: paymentMethod.document
			},
			expiration: {
				month: paymentMethod.month,
				year: paymentMethod.year
			}
		}
	}
	toCardTransaction(card: {
		token: string
		securityCode: string
	}): BempaggoTokenCardRequest {
		return {
			token: card.token,
			cvv: card.securityCode,
		}
	}





	fromCards(card: BempaggoCardResponse): LayersCustomerPaymentMethod {
		return {
			title: card.holder.name,
			name: card.holder.name,
			month: card.expiration.month,
			year: card.expiration.year,
			number: "",
			brand: card.brand
		};
	}
	from(customer: BempaggoCustomerResponse): LayersCustomer {
		const layer: LayersCustomer = {
			name: customer.name,
			alias: customer.name,
			email: customer.email ? customer.email : "",
			type: "individual",
			document: customer.document ? customer.document : "",
			phones: {
				mobile_phone: {
					country_code: customer.phone?.countryCode ? customer.phone.countryCode : "",
					number: customer.phone?.number ? customer.phone.number : "",
					area_code: customer.phone?.areaCode ? customer.phone.areaCode : ""
				}
			},
			address: {
				address: customer.address?.street ? customer.address.street : "",
				address2: customer.address?.lineTwo ? customer.address.lineTwo : "",
				city: customer.address?.city ? customer.address.city : "",
				code: customer.address?.zipCode ? customer.address.zipCode : "",
				country: "BRA",
				district: customer.address?.neighborhood ? customer.address.neighborhood : "",
				number: customer.address?.streetNumber ? customer.address.streetNumber : "",
				state: customer.address?.state ? customer.address.state : "",
			}
		};
		return layer
	}

}

export { Layers, RequestsToBempaggo, ResponsesFromBempaggo };

