"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsesFromBempaggo = exports.RequestsToBempaggo = exports.Layers = void 0;
const Enum_1 = require("bempaggo-kit/lib/app/modules/entity/Enum");
class Util {
    static getDateAsString(data) {
        if (data) {
            const year = data.getFullYear().toString();
            const month = (data.getMonth() + 1).toString().padStart(2, "0");
            const day = data.getDate().toString().padStart(2, "0");
            return `${year}-${month}-${day}`;
        }
        else {
            return undefined;
        }
    }
}
class Layers {
    constructor() {
        this.response = new ResponsesFromBempaggo();
        this.request = new RequestsToBempaggo();
    }
}
exports.Layers = Layers;
class RequestsToBempaggo {
    toAddress(address) {
        if (!address)
            return undefined;
        return {
            city: address.city,
            zipCode: address.code,
            street: address.address,
            streetNumber: address.number,
            lineTwo: address.address2,
            neighborhood: address.district,
            state: address.state
        };
    }
    toAbstractOrder(transactionGroup, payments) {
        const phoneLayers = transactionGroup.customerPayload.phone;
        const phone = {
            areaCode: phoneLayers.areaCode,
            countryCode: phoneLayers.countryCode,
            number: phoneLayers.phoneNumber
        };
        const address = this.toAddress(transactionGroup.customerPayload.addresses[0]);
        const birthday = Util.getDateAsString(transactionGroup.customerPayload.birth);
        return {
            customer: {
                document: transactionGroup.customerPayload.document.value,
                name: transactionGroup.customerPayload.name,
                email: transactionGroup.customerPayload.email,
                phone: phone,
                address: address,
                birthdate: birthday
            },
            amount: transactionGroup.price.amount,
            payments: payments,
            orderReference: transactionGroup.code,
            notificationUrl: transactionGroup.urlNotification
        };
    }
    toOrderCreditCard(transactionGroup) {
        const payments = [];
        for (const payment of transactionGroup.paymentMethods) {
            const request = this.createCreditCard(payment);
            payments.push(request);
        }
        return this.toAbstractOrder(transactionGroup, payments);
    }
    toOrderBankSlip(transactionGroup) {
        const payments = [];
        for (const payment of transactionGroup.paymentMethods) {
            const request = this.createBankSlip(payment);
            payments.push(request);
        }
        return this.toAbstractOrder(transactionGroup, payments);
    }
    toOrderPix(transactionGroup) {
        const payments = [];
        for (const payment of transactionGroup.paymentMethods) {
            const request = this.createPix(payment);
            payments.push(request);
        }
        return this.toAbstractOrder(transactionGroup, payments);
    }
    createPix(payment) {
        const desiredExpirationDate = new Date();
        desiredExpirationDate.setMinutes(desiredExpirationDate.getMinutes() + 30);
        return {
            paymentMethod: Enum_1.PaymentMethodTypes.PIX,
            amount: payment.total.amount,
            splits: this.toSplits(payment.recipients),
            description: "",
            desiredExpirationDate: desiredExpirationDate.getTime()
        };
    }
    ;
    createBankSlip(payment) {
        const desiredExpirationDate = new Date();
        return {
            paymentMethod: Enum_1.PaymentMethodTypes.BOLETO,
            amount: payment.total.amount,
            splits: this.toSplits(payment.recipients),
            dueDate: payment.bank_slip.dueDays,
            paymentLimitDate: payment.bank_slip.dueDays,
        };
    }
    ;
    createCreditCard(payment) {
        return {
            paymentMethod: Enum_1.PaymentMethodTypes.CREDIT_CARD,
            amount: payment.total.amount,
            cardToken: {
                token: payment.card.token,
                cvv: payment.card.securityCode
            },
            installments: payment.installments,
            splits: this.toSplits(payment.recipients)
        };
    }
    toSplits(recipients) {
        const splits = [];
        for (const split of recipients) {
            splits.push({
                amount: split.total.amount,
                sellerId: split.sourceId
            });
        }
        return splits;
    }
    toCustomer(customer) {
        const address = this.toAddress(customer.address);
        const bempaggo = {
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
        };
        return bempaggo;
    }
}
exports.RequestsToBempaggo = RequestsToBempaggo;
class ResponsesFromBempaggo {
    toBankSlipRenderingData(bempaggoCharge) {
        if (bempaggoCharge.transactions[0].paymentMethod == Enum_1.PaymentMethodTypes.BOLETO) {
            const transaction = bempaggoCharge.transactions[0];
            return {
                bank_account: transaction.bank.account,
                bank_agency: transaction.bank.agency,
                bank_code: transaction.bank.code,
                community_legal_document: "?",
                community_legal_name: "TODO let me know ",
                creation_date: new Date(transaction.transactionDate).toDateString(),
                customer_address_1: transaction.customer.address?.street ? transaction.customer.address?.street : "",
                customer_address_2: transaction.customer.address?.lineTwo ? transaction.customer.address?.lineTwo : "",
                customer_document: transaction.customer.document ? transaction.customer.document : "",
                customer_name: transaction.customer.name,
                digitable_line: transaction.digitableLine,
                document_number: transaction.documentNumber,
                expiration_date: new Date(transaction.dueDate).toDateString(),
                our_number: transaction.ourNumber,
                payment_instructions: transaction.customer.address?.street ? transaction.customer.address?.street : "",
                source: {
                    kind: "?????TODO let me know ",
                    name: " TODO let me know "
                },
                total_value: transaction.value.toString()
            };
        }
        else {
            throw Error("Try in another way");
        }
    }
    fromCharge(response) {
        const payments = [];
        for (const transaction of response.transactions) {
            if (Enum_1.PaymentMethodTypes.CREDIT_CARD == transaction.paymentMethod) {
                const payment = {
                    payment_method: 'credit_card',
                    amount: transaction.value,
                    recipient_id: transaction.affiliate ? transaction.affiliate.id.toString() : "-",
                    credit_card: {
                        token: transaction.card?.token ? transaction.card.token : "",
                        card_id: transaction.card?.token ? transaction.card.token : "",
                        operation_type: 'auth_only',
                        installments: transaction.installments,
                        statement_descriptor: "?need setup in gateway?"
                    },
                    refunded_value: transaction.refundValue ? transaction.refundValue : 0,
                    status: transaction.status,
                    reference_id: transaction.transactionReference ? transaction.transactionReference : "not created",
                };
                payments.push(payment);
            }
            else if (Enum_1.PaymentMethodTypes.PIX == transaction.paymentMethod) {
                const options = {
                    dateStyle: 'short',
                    timeStyle: 'short',
                };
                const payment = {
                    payment_method: 'pix',
                    amount: transaction.value,
                    recipient_id: transaction.affiliate ? transaction.affiliate.id.toString() : "-",
                    status: transaction.status,
                    reference_id: transaction.transactionReference ? transaction.transactionReference : "not created",
                    pix: {
                        expires_in: new Date(transaction.expirationDate).toLocaleString(undefined, options)
                    },
                    emv: transaction.emv
                };
                payments.push(payment);
            }
            else if (Enum_1.PaymentMethodTypes.BOLETO == transaction.paymentMethod) {
                const options = {
                    dateStyle: 'short',
                    timeStyle: 'short',
                };
                const payment = {
                    payment_method: 'boleto',
                    customer: transaction.customer,
                    paid_amount: transaction.paidValue ? transaction.paidValue : 0,
                    amount: transaction.value,
                    recipient_id: transaction.affiliate ? transaction.affiliate.id.toString() : "-",
                    status: transaction.status,
                    reference_id: transaction.transactionReference ? transaction.transactionReference : "not created",
                    boleto: {
                        due_at: new Date(transaction.dueDate).toLocaleString(undefined, options),
                    },
                };
                payments.push(payment);
            }
        }
        return {
            customer_id: response.customer.document,
            referenceId: response.id.toString(),
            items: [],
            payments: payments,
            status: response.status,
            refunded_amount: response.refundedAmount,
            amount: response.value
        };
    }
    toCard(paymentMethod) {
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
        };
    }
    toCardTransaction(card) {
        return {
            token: card.token,
            cvv: card.securityCode,
        };
    }
    fromCards(card) {
        return {
            title: card.holder.name,
            name: card.holder.name,
            month: card.expiration.month,
            year: card.expiration.year,
            number: `${card.bin}...${card.lastFour}`,
            brand: card.brand,
            document: card.holder.document,
            token: card.token
        };
    }
    from(customer) {
        const layer = {
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
        return layer;
    }
}
exports.ResponsesFromBempaggo = ResponsesFromBempaggo;
//# sourceMappingURL=Layers.js.map