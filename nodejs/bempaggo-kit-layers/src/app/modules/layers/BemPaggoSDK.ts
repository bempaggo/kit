import { Bempaggo, BempaggoFactory } from "bempaggo-kit/lib/app/modules/Bempaggo";
import { BankSlipOperable, ChargeFindable, CreditCardOperable, PixOperable } from "bempaggo-kit/lib/app/modules/Transaction";
import { BempaggoCardRequest, BempaggoCustomerRequest } from "bempaggo-kit/lib/app/modules/entity/BempaggoRequest";
import { BempaggoCardResponse, BempaggoChargeResponse, BempaggoCustomerResponse } from "bempaggo-kit/lib/app/modules/entity/BempaggoResponse";
import { CardBrandTypes, PaymentMethodTypes } from "bempaggo-kit/lib/app/modules/entity/Enum";
import { BankSlipRenderingData } from "./BankSlipRenderinData";
import { BaseSdk } from './BaseSDK';
import { Layers } from "./Layers";
import { LayersCustomer, LayersCustomerPaymentMethod, LayersTransaction } from './interfaces';
import { LayersTransactionGroup } from './transactionGroup';

/**
 * @class BemPaggoSdk
 * @description Class implementing interface with BemPaggo API
 * @param {string} baseUrl - the url for BemPaggo's API
 * @param {any} auth - the auth object used on axios
 * @var axios - the Axios instance
 * @method findCustomerByDocument - Find Customer passing the document(cpf, cnpj) at BemPaggo API.
 * @method createCustomer - Create a customer at BemPaggo API.
 * @method updateCustomer - Update a customer at BemPaggo API.
 * @method findCustomerPaymentMethod - Find Customer Payment Method passing the customer_id at BemPaggo API.
 * @method createCustomerPaymentMethod - Create a customer payment method at BemPaggo API.
 * @method findTransactionsByReferenceId - Find transactions by Reference id at BemPaggo API.
 * @method getBankSlipRenderingData - Gets html for customized bank slip of a transaction
 * @method createTransaction - Create a transaction at BemPaggo API.
 * @method getOrderCharges - Get order charges at BemPaggo API.
 * @method chargeTransaction - Charge a transaction at BemPaggo API.
 * @method refundTransaction - Refund a transaction at BemPaggo API.
 * @method tokenizeCard - Tokenize a card at BemPaggo API.
 * @method shouldFindCustomerBeforeCreating - Check if should find customer before creating.
 * @method getTransactionQrCode - Get Transaction qr code.
 * @method getTransactionPaymentType - Get Transaction payment type.
 * @method cancelBankSlipTransaction - Cancel a bank slip on the BemPaggo API.
 * @static @var availableCardBrands - Get available card brands.
 * @static @var availableMethods - Get available methods.
 */
class BemPaggoSdk extends BaseSdk<LayersCustomer, LayersTransaction, LayersCustomerPaymentMethod, never> {
	private bempaggo: Bempaggo | null = null;
	private layers: Layers;
	constructor(baseURL: string, auth: string) {
		super(baseURL, 'bempaggo', auth);
		this.layers = new Layers();
		const factory: BempaggoFactory = new BempaggoFactory();
		this.bempaggo = factory.createByUrl(baseURL, auth);
	}

	/**
	 *  Find Customer passing the document(cpf, cnpj) at BemPaggo API.
	 * @param {string} document - The document number.
	 * @return {Promise<BemPaggoCustomer>}
	 */
	async findCustomerByDocument(document: string): Promise<LayersCustomer> {
		const customer: BempaggoCustomerResponse = await this.bempaggo!.findCustomerByDocument(document);
		return this.layers.response.from(customer);
	}

	/**
	 *  Create a customer at BemPaggo API.
	 * @param {BemPaggoCustomer} customer - The customer object.
	 * @return {Promise<BemPaggoCustomer>}
	 */
	async createCustomer(customer: LayersCustomer): Promise<LayersCustomer> {
		const customerRequest: BempaggoCustomerRequest = this.layers.request.toCustomer(customer);
		const bempaggoCustomer: BempaggoCustomerResponse = await this.bempaggo!.createCustomer(customerRequest);
		return this.layers.response.from(bempaggoCustomer);
	}

	/**
	 *  Update a customer at BemPaggo API.
	 * @param {BemPaggoCustomer} customer - The External customer object.
	 * @return {Promise<BemPaggoCustomer>}
	 */
	async updateCustomer(customer: LayersCustomer): Promise<LayersCustomer> {
		const request = this.layers.request.toCustomer(customer);
		const bempaggoCustomer: BempaggoCustomerResponse = await this.bempaggo!.updateCustomer(request.document, request);
		return this.layers.response.from(bempaggoCustomer);
	}

	/**
	 * Gets a customer's payment methods
	 * @param customerId // TODO cpf/cnpj? 06219385993 ok
	 * @returns BemPaggoPaymentMethod
	 */
	async findCustomerPaymentMethod(customerId: string): Promise<LayersCustomerPaymentMethod> {
		const bempaggoCustomer: BempaggoCardResponse = await this.bempaggo!.findCustomerPaymentMethod(customerId);
		return this.layers.response.fromCards(bempaggoCustomer);
	}

	/**
	 *  Add a new payment method to a customer at BemPaggo API.
	 * @param {string} customerId
	 * @param {BemPaggoPaymentMethod} paymentMethod -
	 * @returns {Promise<any>}
	 */
	async createCustomerPaymentMethod(
		customerId: string,  // cpf/cnpj?
		paymentMethod: LayersCustomerPaymentMethod
	): Promise<LayersCustomerPaymentMethod> {
		const cardRequest: BempaggoCardRequest = this.layers.response.toCard(paymentMethod);
		const bempaggoCard: BempaggoCardResponse = await this.bempaggo!.createCustomerPaymentMethod(customerId, cardRequest);
		return this.layers.response.fromCards(bempaggoCard);
	}

	/**
	 * Find a transaction by a reference id we send to bem paggo on creation
	 * @param {string} referenceId Id sent by our backend on creation // TODO is orderReference
	 * @returns { Promise<LayersTransaction> }
	 */
	async findTransactionsByReferenceId(referenceId: string): Promise<LayersTransaction> {
		const finder: ChargeFindable = this.bempaggo!.getChargeService().getChargeFinder();
		const response: BempaggoChargeResponse[] = await finder.findChargesByOrderReferenceId(referenceId);
		if (response.length === 0) {
			throw new Error("No transaction found");
		}
		return this.layers.response.fromCharge(response[0]);
	}

	/**
	 * Find a charge by id received from bempaggo on creation
	 * @param {number} id get from bempaggo on creation
	 * @returns { Promise<LayersTransaction> }
	 */
	async findChargeById(id: number): Promise<LayersTransaction> {
		const finder: ChargeFindable = this.bempaggo!.getChargeService().getChargeFinder();
		const response: BempaggoChargeResponse = await finder.findChargeById(id);
		return this.layers.response.fromCharge(response);
	}


	/**
	 * Gets html for customized bank slip of a transaction
	 * @param {string} transactionId //TODO is the charge id?
	 * @returns { Promise<BankSlipRenderingData> }
	 */
	async getBankSlipRenderingData(transactionId: string): Promise<BankSlipRenderingData> {
		const bankSlip: BankSlipOperable = this.bempaggo!.getChargeService().getBankSlipServiceable();
		const bempaggoCharge: BempaggoChargeResponse = await bankSlip.findChargeById(Number(transactionId));
		if (bempaggoCharge.transactions[0].paymentMethod == PaymentMethodTypes.BOLETO) {
			return this.layers.response.toBankSlipRenderingData(bempaggoCharge);
		} else {
			throw new Error("paymentMethod <> PaymentMethodTypes.BOLETO");
		}
	}


	/**
	 *
	 * @param {LayersTransactionGroup} transactionGroup
	 * @returns { LayersTransaction }
	 */
	async createTransaction(transactionGroup: LayersTransactionGroup): Promise<LayersTransaction> {

		const sellerId: number = transactionGroup.sourceId as number;

		let response: BempaggoChargeResponse;

		if (this.isOnly("credit_card", transactionGroup.paymentMethods)) {
			const method: CreditCardOperable = this.bempaggo!.getChargeService().getCreditCardServiceable();
			response = await method.createCreditCardCharge(sellerId, this.layers.request.toOrderCreditCard(transactionGroup));
		}

		else if (this.isOnly("bank_slip", transactionGroup.paymentMethods)) {
			const method: BankSlipOperable = this.bempaggo!.getChargeService().getBankSlipServiceable();
			response = await method.createBankSlipCharge(sellerId, this.layers.request.toOrderBankSlip(transactionGroup));
		}

		else if (this.isOnly("pix", transactionGroup.paymentMethods)) {
			const method: PixOperable = this.bempaggo!.getChargeService().getPixServiceable();
			response = await method.createPixCharge(sellerId, this.layers.request.toOrderPix(transactionGroup));
		}

		else {
			throw Error("Try in another way");
		}

		return this.layers.response.fromCharge(response);
	}

	private isOnly(method: string, paymentMethods: { method: "credit_card" | "pix" | "bank_slip" }[]): boolean {
		return paymentMethods.filter(menthod => menthod.method != method).length == 0;
	}

	/**
	 * Bem paggo does not implement charges. So this method should just throw
	 */
	async getOrderCharges(_: never): Promise<never> {
		throw new Error('Bem paggo does not implement charges')
	}

	/**
	 * Captures the transaction given an id
	 * @param { string } transactionId //TODO charge.id
	 * @returns { LayersTransaction }
	 */
	async chargeTransaction(transactionId: string): Promise<LayersTransaction> {
		const creditCardService: CreditCardOperable = this.bempaggo!.getChargeService().getCreditCardServiceable();
		const response: BempaggoChargeResponse = await creditCardService.captureCreditCardCharge(Number(transactionId));
		return this.layers.response.fromCharge(response);
	}

	/**
	 * Refunds a given transaction
	 * @param { string } transactionId  // TODO charge.id ?
	 * @returns { Promise<LayersTransaction> }
	 */
	async refundTransaction(transactionId: string): Promise<LayersTransaction> {
		const creditCardService: CreditCardOperable = this.bempaggo!.getChargeService().getCreditCardServiceable();
		const response: BempaggoChargeResponse = await creditCardService.refundCreditCardCharge(Number(transactionId));
		return this.layers.response.fromCharge(response);
	}
	/**
	 * Tokenize the card data.
	 * @param card - The card data.
	 * @param hash - The card hash.
	 * @returns {Promise<any>}
	 */
	async tokenizeCard(card: any, hash: string): Promise<any> {
		const typedCard: LayersCustomerPaymentMethod = card as LayersCustomerPaymentMethod;
		const request: BempaggoCardRequest = this.layers.response.toCard(typedCard);
		const cardResponse: BempaggoCardResponse | undefined = await this.bempaggo?.tokenizeCard(request, hash)
		return cardResponse?.token;
	}

	/**
	 * Returns wether we should query for a customer before updating it
	 */
	shouldFindCustomerBeforeCreating() {
		// You may to send the customer (address) in order, she will updated or created. 
		// You may to use the document (cpf or cnpj) as customer id. The document shoud be only number, but it needs to keep left zeros (01 <> 1)     
		throw new Error('not implemented')
	}

	/**
	 * Returns an url to a transaction's Qr code, if it is a pix
	 * @param {LayersTransaction} transaction
	 * @returns
	 */
	getExternalQrCode(transaction: LayersTransaction): string {
		const pix: PixOperable = this.bempaggo!.getChargeService().getPixServiceable();
		return pix.createQuickResponseCodeUrlByChargeId(Number(transaction.referenceId)).toString()

	}

	/**
	 * Returns a string describing the payment type
	 * @throws if no payment type is found
	 * @param {LayersTransaction} transaction
	 * @returns { 'bank_slip' | 'pix' | 'credit_card'}
	 */
	getExternalPaymentType(transaction: LayersTransaction): 'bank_slip' | 'pix' | 'credit_card' | undefined {
		if (transaction.payments[0].payment_method == 'boleto') {
			return 'bank_slip';
		} else if (transaction.payments[0].payment_method == 'pix') {
			return "pix"
		} else if (transaction.payments[0].payment_method == 'credit_card') {
			return "credit_card";
		} else {
			throw new Error(transaction.payments[0]);
		}
	}

	/**
	 * Cancels a bank slip transaction, if it can be cancelled
	 * @param {LayersTransaction} transaction
	 */
	async cancelBankSlipTransaction(transaction: LayersTransaction): Promise<void> {
		const bankSlip: BankSlipOperable = this.bempaggo!.getChargeService().getBankSlipServiceable();
		const bempaggoCharge: BempaggoChargeResponse = await bankSlip.findChargeById(Number(transaction.referenceId));
		if (bempaggoCharge.transactions.length==1 && bempaggoCharge.transactions[0].paymentMethod == PaymentMethodTypes.BOLETO) {
			await bankSlip.cancelBankSlip(bempaggoCharge.id);
		} else {
			throw new Error("paymentMethod <> PaymentMethodTypes.BOLETO");
		}
	}

		/**
	 * Cancels a pix transaction, if it can be cancelled
	 * @param {LayersTransaction} transaction
	 */
		async cancelPixTransaction(transaction: LayersTransaction): Promise<void> {
			const pix: PixOperable = this.bempaggo!.getChargeService().getPixServiceable();
			const bempaggoCharge: BempaggoChargeResponse = await pix.findChargeById(Number(transaction.referenceId));
			if (bempaggoCharge.transactions.length==1 && bempaggoCharge.transactions[0].paymentMethod == PaymentMethodTypes.PIX) {
				await pix.cancelPix(bempaggoCharge.id);
			} else {
				throw new Error("paymentMethod <> PaymentMethodTypes.PIX");
			}
		}
	

	/**
	 * Just an example
	 * We need this static attribute, to map BemPaggo's name to our names
	 *  */
	static ExternalPaymentType = {
		boleto: PaymentMethodTypes.BOLETO,
		pix: PaymentMethodTypes.PIX,
		credit_card: PaymentMethodTypes.CREDIT_CARD,
	} as const;

	/**
	 * Another example
	 * We need to know all available card brands on BemPaggo
	 */
	static availableCardBrands = [...Object.values(CardBrandTypes)] as const
}


export type BemPaggoCardBrands = typeof BemPaggoSdk.availableCardBrands[number]

export default BemPaggoSdk
