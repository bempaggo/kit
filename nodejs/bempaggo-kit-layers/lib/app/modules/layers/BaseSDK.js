"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSdk = void 0;
class BaseSdk {
    constructor(baseURL, gateway, auth) {
        this.gateway = gateway;
    }
    async findCustomerByDocument(document) {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
    async createCustomer(customer) {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
    async updateCustomer(customer) {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
    async findCustomerPaymentMethod(customerId) {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
    async createCustomerPaymentMethod(customerId, paymentMethod) {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
    async findTransactionsByReferenceId(referenceId) {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
    async getBankSlipRenderingData(transactionId) {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
    async createTransaction(transactionGroup) {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
    async getOrderCharges(transactionId) {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
    async chargeTransaction(transactionId) {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
    async refundTransaction(transactionId) {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
    async tokenizeCard(card, hash) {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
    shouldFindCustomerBeforeCreating() {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
    getTransactionQrCode(transaction) {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
    getTransactionPaymentType(transaction) {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
    async cancelBankSlipTransaction(transaction) {
        throw new Error(`Not implemented for ${this.gateway}`);
    }
}
exports.BaseSdk = BaseSdk;
//# sourceMappingURL=BaseSDK.js.map