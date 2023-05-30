import { BankSlipRenderingData } from "./BankSlipRenderinData"
import { TransactionGroup } from './transactionGroup'

/**
 * @class BaseSdk
 * @description Class implementing interface with gateway APIs
 * @param {string} baseUrl - the url for BemPaggo's API
 * @param {string} gateway - the gateway name
 * @param {any} auth - the auth object used on axios
 * @var axios - the Axios instance
 * @method findCustomerByDocument - Find Customer passing the document(cpf, cnpj) at gateway API.
 * @method createCustomer - Create a customer at gateway API.
 * @method updateCustomer - Update a customer at gateway API.
 * @method findCustomerPaymentMethod - Find Customer Payment Method passing the customer_id at gateway API.
 * @method createCustomerPaymentMethod - Create a customer payment method at gateway API.
 * @method findTransactionsByReferenceId - Find transactions by Reference id at gateway API.
 * @method getBankSlipRenderingData - Gets html for customized bank slip of a transaction
 * @method createTransaction - Create a transaction at gateway API.
 * @method getOrderCharges - Get order charges at gateway API.
 * @method chargeTransaction - Charge a transaction at gateway API.
 * @method refundTransaction - Refund a transaction at gateway API.
 * @method tokenizeCard - Tokenize a card at gateway API.
 * @method shouldFindCustomerBeforeCreating - Check if should find customer before creating.
 * @method getTransactionQrCode - Get Transaction qr code.
 * @method getTransactionPaymentType - Get Transaction payment type.
 * @method cancelBankSlipTransaction - Cancel a bank slip on the gateway API.
 * @static @var availableCardBrands - Get available card brands.
 * @static @var availableMethods - Get available methods.
 */
export abstract class BaseSdk<GatewayCustomer, GatewayTransaction, GatewayCustomerPaymentMethod, GatewayCharge> {
  protected readonly gateway: string
  constructor(baseURL: string, gateway: string, auth: any) {
    this.gateway = gateway
  }

  /**
   *  Find Customer passing the document(cpf, cnpj) at API
   * @param {string} document - The document number.
   * @return {Promise<GatewayCustomer>}
   */
  async findCustomerByDocument(document: string): Promise<GatewayCustomer> {
    throw new Error(`Not implemented for ${this.gateway}`)
  }

  /**
   *  Create a customer at Gateway API.
   * @param {GatewayCustomer} customer - The customer object.
   * @return {Promise<GatewayCustomer>}
   */
  async createCustomer(customer: GatewayCustomer): Promise<GatewayCustomer> {
    throw new Error(`Not implemented for ${this.gateway}`)
  }

  /**
   *  Update a customer at Gateway API.
   * @param {GatewayCustomer} customer - The External customer object.
   * @return {Promise<GatewayCustomer>}
   */
  async updateCustomer(customer: GatewayCustomer): Promise<GatewayCustomer> {
    throw new Error(`Not implemented for ${this.gateway}`)
  }

  /**
   * Gets a customer's payment methods
   * @param customerId
   * @returns GatewayPaymentMethod
   */
  async findCustomerPaymentMethod(customerId: string): Promise<GatewayCustomerPaymentMethod> {
    throw new Error(`Not implemented for ${this.gateway}`)
  }

  /**
   *  Add a new payment method to a customer at Gateway API.
   * @param {string} customerId
   * @param {GatewayPaymentMethod} paymentMethod -
   * @returns {Promise<any>}
   */
  async createCustomerPaymentMethod(
    customerId: string,
    paymentMethod: GatewayCustomerPaymentMethod
  ): Promise<GatewayCustomerPaymentMethod> {
    throw new Error(`Not implemented for ${this.gateway}`)
  }

  /**
   * Find a transaction by a reference id we send to gateway on creation
   * @param {string} referenceId Id sent by our backend on creation
   * @returns { Promise<GatewayTransaction> }
   */
  async findTransactionsByReferenceId(referenceId: string): Promise<GatewayTransaction> {
    throw new Error(`Not implemented for ${this.gateway}`)
  }

  /**
   * Gets html for customized bank slip of a transaction
   * @param {string} transactionId
   * @returns { Promise<BankSlipRenderingData> }
   */
  async getBankSlipRenderingData(transactionId: string): Promise<BankSlipRenderingData> {
    throw new Error(`Not implemented for ${this.gateway}`)
  }

  /**
   *
   * @param {TransactionGroup} transactionGroup
   * @returns { GatewayTransaction }
   */
  async createTransaction(transactionGroup: TransactionGroup): Promise<GatewayTransaction> {
    throw new Error(`Not implemented for ${this.gateway}`)
  }

  /**
   * Returns all charges of a transaction
   * @param { string } transactionId
   * @returns { GatewayCharge[] } - An array of charges
   */
  async getOrderCharges(transactionId: string): Promise<GatewayCharge[]> {
    throw new Error(`Not implemented for ${this.gateway}`)
  }

  /**
   * Captures the transaction given an id
   * @param { string } transactionId
   * @returns { GatewayTransaction }
   */
  async chargeTransaction(transactionId: string): Promise<GatewayTransaction> {
    throw new Error(`Not implemented for ${this.gateway}`)
  }

  /**
   * Refunds a given transaction
   * @param { string } transactionId
   * @returns { Promise<GatewayTransaction> }
   */
  async refundTransaction(transactionId: string): Promise<GatewayTransaction> {
    throw new Error(`Not implemented for ${this.gateway}`)
  }
  /**
   * Tokenize the card data.
   * @param card - The card data.
   * @param hash - The card hash.
   * @returns {Promise<any>} - the tokenized card
   */
  async tokenizeCard(card: any, hash: string): Promise<any> {
    throw new Error(`Not implemented for ${this.gateway}`)
  }

  /**
   * Returns wether we should query for a customer before updating it
   */
  shouldFindCustomerBeforeCreating() {
    throw new Error(`Not implemented for ${this.gateway}`)
  }

  /**
   * Returns an url to a transaction's Qr code, if it is a pix
   * @param {GatewayTransaction} transaction
   * @returns
   */
  getTransactionQrCode(transaction: GatewayTransaction): string {
    throw new Error(`Not implemented for ${this.gateway}`)
  }

  /**
   * Returns a string describing the payment type
   * @throws if no payment type is found
   * @param {GatewayTransaction} transaction
   * @returns { 'bank_slip' | 'pix' | 'credit_card'}
   */
  getTransactionPaymentType(transaction: GatewayTransaction): 'bank_slip' | 'pix' | 'credit_card' | undefined {
    throw new Error(`Not implemented for ${this.gateway}`)
  }

  /**
   * Cancels a bank slip transaction, if it can be cancelled
   * @param {GatewayTransaction} transaction
   */
  async cancelBankSlipTransaction(transaction: GatewayTransaction): Promise<void> {
    throw new Error(`Not implemented for ${this.gateway}`)
  }
}
