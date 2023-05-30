import { BempaggoAddressRequest, BempaggoCardRequest, BempaggoChargeRequest, BempaggoCustomerRequest, BempaggoPhoneRequest, BempaggoTokenCardRequest } from "../entity/BempaggoRequest";
import { BempaggoCardResponse, BempaggoChargeResponse, BempaggoCustomerResponse } from "../entity/BempaggoResponse";
import { Address, BemPaggoCustomer, BemPaggoCustomerPaymentMethod, BemPaggoTransaction } from "./interfaces";
import { TransactionGroup } from "./transactionGroup";

class Util {

    static getPhoneNumbers(phone: string): BempaggoPhoneRequest | undefined {
        const regex = /\(\d{2}\)\s?\d{4,5}-\d{4}/g;
        const matches = phone.match(regex);
        if (matches) {
            const phoneNumbers = matches.map((match: string) => {
                const cleanNumber = match.replace(/\D/g, "");
                const areaCode = cleanNumber.slice(0, 2);
                const phoneNumber = cleanNumber.slice(2);
                return {
                    countryCode: 55,
                    areaCode,
                    phoneNumber,
                };
            });

        }
        return undefined;
    }
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

    static toCharge(transactionGroup: TransactionGroup): BempaggoChargeRequest {
        const phone: BempaggoPhoneRequest | undefined = Util.getPhoneNumbers(transactionGroup.customerPayload.phone);
        const address: BempaggoAddressRequest | undefined = this.toAddress(transactionGroup.customerPayload.addresses[0]);
        const birthday: string | undefined = Util.getDateAsString(transactionGroup.customerPayload.birth);
        const token: BempaggoTokenCardRequest = this.toCardTransaction(transactionGroup.paymentMethod.card);
        return {
            customer: {
                document: transactionGroup.customerPayload.document.value,
                name: transactionGroup.customerPayload.name,
                email: transactionGroup.customerPayload.email,
                phone: phone,
                address: address,
                birthdate: birthday
            },
            cardToken: token,
            value: transactionGroup.price.amount, // is this in cents?
            installments: transactionGroup.paymentMethod.installments,
            yourReferenceId: Number(transactionGroup.code),
            affiliateId: transactionGroup.sourceId as number
            
        };
    }
    static fromCharge(response: BempaggoChargeResponse): BemPaggoTransaction {
        return {
            customer_id: response.customer.document,
            referenceId: response.referenceId,
            items: [],
            payment: {
                payment_method: 'credit_card',
                amount: response.value,
                recipient_id: response.id.toString(),
                credit_card: {
                    card_id: response.transactions[0].card?.id ? response.transactions[0].card.id.toString() : "",
                    operation_type: 'auth_only',
                    installments: response.installments,
                    statement_descriptor: "?software descriptor?"
                },
                refundedValue: response.refundedAmount ? response.refundedAmount : 0,
                status: response.status
            }
        };
    }
    static toCard(paymentMethod: BemPaggoCustomerPaymentMethod): BempaggoCardRequest {
        return {
            cardNumber: paymentMethod.number,
            cvv: paymentMethod.cvv,
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
    static toCardTransaction(card: {
        name: string
        token: string
        tokenValidUntil: Date
        hash: string
        last_digits: string
        first_digits: string
        brand: string
        brandPretty: string
        expirationMonth: number | null
        expirationYear: number | null
        securityCode: string | null
    }): BempaggoTokenCardRequest {
        return {
            token: card.token,
            cvv: card.securityCode ? card.securityCode : "",
        }
    }


    static toAddress(address: Address): BempaggoAddressRequest | undefined {
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

    static toCustomer(customer: BemPaggoCustomer): BempaggoCustomerRequest {
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
    static fromCards(card: BempaggoCardResponse): BemPaggoCustomerPaymentMethod {
        return {
            title: card.holder.name,
            name: card.holder.name,
            month: card.expiration.month,
            year: card.expiration.year,
            number: "",
            brand: card.brand
        };
    }
    static from(customer: BempaggoCustomerResponse): BemPaggoCustomer {
        const layer: BemPaggoCustomer = {
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

export { Layers };

