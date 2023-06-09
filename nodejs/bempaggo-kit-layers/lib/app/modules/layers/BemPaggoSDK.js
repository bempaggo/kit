"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseSDK_1 = require("./BaseSDK");
const Layers_1 = require("./Layers");
const Enum_1 = require("bempaggo-kit/lib/app/modules/entity/Enum");
const Bempaggo_1 = require("bempaggo-kit/lib/app/modules/Bempaggo");
class BemPaggoSdk extends BaseSDK_1.BaseSdk {
    constructor(baseURL, auth) {
        super(baseURL, 'bempaggo', auth);
        this.bempaggo = null;
        this.layers = new Layers_1.Layers();
        const factory = new Bempaggo_1.BempaggoFactory();
        this.bempaggo = factory.createByUrl(baseURL, auth);
    }
    async findCustomerByDocument(document) {
        const customer = await this.bempaggo.findCustomerByDocument(document);
        return this.layers.response.from(customer);
    }
    async createCustomer(customer) {
        const customerRequest = this.layers.request.toCustomer(customer);
        const bempaggoCustomer = await this.bempaggo.createCustomer(customerRequest);
        return this.layers.response.from(bempaggoCustomer);
    }
    async updateCustomer(customer) {
        const request = this.layers.request.toCustomer(customer);
        const bempaggoCustomer = await this.bempaggo.updateCustomer(request.document, request);
        return this.layers.response.from(bempaggoCustomer);
    }
    async findCustomerPaymentMethod(customerId) {
        const bempaggoCustomer = await this.bempaggo.findCustomerPaymentMethod(customerId);
        return this.layers.response.fromCards(bempaggoCustomer);
    }
    async createCustomerPaymentMethod(customerId, paymentMethod) {
        const cardRequest = this.layers.response.toCard(paymentMethod);
        const bempaggoCard = await this.bempaggo.createCustomerPaymentMethod(customerId, cardRequest);
        return this.layers.response.fromCards(bempaggoCard);
    }
    async findTransactionsByReferenceId(referenceId) {
        const creditCardService = this.bempaggo.getChargeService().getCreditCardServiceable();
        const response = await creditCardService.findChargesByOrderReferenceId(referenceId);
        return this.layers.response.fromCharge(response[0]);
    }
    async findChargeById(id) {
        const creditCardService = this.bempaggo.getChargeService().getCreditCardServiceable();
        const response = await creditCardService.findChargeById(id);
        return this.layers.response.fromCharge(response);
    }
    async getBankSlipRenderingData(transactionId) {
        const bankSlip = this.bempaggo.getChargeService().getBankSlipServiceable();
        const bempaggoCharge = await bankSlip.findChargeById(Number(transactionId));
        if (bempaggoCharge.transactions[0].paymentMethod == Enum_1.PaymentMethodTypes.BOLETO) {
            return this.layers.response.toBankSlipRenderingData(bempaggoCharge);
        }
        else {
            throw new Error("paymentMethod <> PaymentMethodTypes.BANK_SLIP");
        }
    }
    async createTransaction(transactionGroup) {
        const sellerId = transactionGroup.sourceId;
        let response;
        if (this.isOnly("credit_card", transactionGroup.paymentMethods)) {
            const method = this.bempaggo.getChargeService().getCreditCardServiceable();
            response = await method.createCreditCardCharge(sellerId, this.layers.request.toOrder(transactionGroup));
        }
        else if (this.isOnly("bank_slip", transactionGroup.paymentMethods)) {
            const method = this.bempaggo.getChargeService().getBankSlipServiceable();
            response = await method.createBankSlipCharge(sellerId, this.layers.request.toOrder(transactionGroup));
        }
        else if (this.isOnly("pix", transactionGroup.paymentMethods)) {
            const method = this.bempaggo.getChargeService().getPixServiceable();
            response = await method.createPixCharge(sellerId, this.layers.request.toOrder(transactionGroup));
        }
        else {
            throw Error("Try in another way");
        }
        return this.layers.response.fromCharge(response);
    }
    isOnly(method, paymentMethods) {
        return paymentMethods.filter(menthod => menthod.method != method).length == 0;
    }
    async getOrderCharges(_) {
        throw new Error('Bem paggo does not implement charges');
    }
    async chargeTransaction(transactionId) {
        const creditCardService = this.bempaggo.getChargeService().getCreditCardServiceable();
        const response = await creditCardService.captureCreditCardCharge(Number(transactionId));
        return this.layers.response.fromCharge(response);
    }
    async refundTransaction(transactionId) {
        const creditCardService = this.bempaggo.getChargeService().getCreditCardServiceable();
        const response = await creditCardService.refundCreditCardCharge(Number(transactionId));
        return this.layers.response.fromCharge(response);
    }
    async tokenizeCard(card, hash) {
        const typedCard = card;
        const request = this.layers.response.toCard(typedCard);
        const cardResponse = await this.bempaggo?.tokenizeCard(request, hash);
        return cardResponse?.token;
    }
    shouldFindCustomerBeforeCreating() {
        throw new Error('not implemented');
    }
    getExternalQrCode(transaction) {
        const pix = this.bempaggo.getChargeService().getPixServiceable();
        return pix.createQuickResponseCodeUrlByOrderReference(transaction.referenceId).toString();
    }
    getExternalPaymentType(transaction) {
        if (transaction.payments[0].payment_method == 'boleto') {
            return 'bank_slip';
        }
        else if (transaction.payments[0].payment_method == 'pix') {
            return "pix";
        }
        else if (transaction.payments[0].payment_method == 'credit_card') {
            return "credit_card";
        }
        else {
            throw new Error(transaction.payments[0]);
        }
    }
    async cancelBankSlipTransaction(transaction) {
        const bankSlip = this.bempaggo.getChargeService().getBankSlipServiceable();
        const bempaggoCharge = await bankSlip.findChargesByOrderReferenceId(transaction.referenceId);
        if (bempaggoCharge.length != 1) {
            throw new Error("charges.length <> 1");
        }
        else if (bempaggoCharge[0].transactions[0].paymentMethod == Enum_1.PaymentMethodTypes.BOLETO) {
            await bankSlip.cancelBankSlip(bempaggoCharge[0].id);
        }
        else {
            throw new Error("paymentMethod <> PaymentMethodTypes.BANK_SLIP");
        }
    }
}
BemPaggoSdk.ExternalPaymentType = {
    boleto: Enum_1.PaymentMethodTypes.BOLETO,
    pix: Enum_1.PaymentMethodTypes.PIX,
    credit_card: Enum_1.PaymentMethodTypes.CREDIT_CARD,
};
BemPaggoSdk.availableCardBrands = [Object.values(Enum_1.CardBrandTypes)];
exports.default = BemPaggoSdk;
//# sourceMappingURL=BemPaggoSDK.js.map