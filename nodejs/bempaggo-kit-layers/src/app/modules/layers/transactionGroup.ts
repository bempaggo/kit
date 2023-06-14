// The model we use to store info to create gateway transactions
// With some internal data ommited for simplicity
type ObjectId = /*unknown*/ number
export interface LayersTransactionGroup {
	// The transaction group code, following the pattern: saleGroup:${saleGroup}:${kind}:${paymentMethod}:${installment}:${paymentIndex}
	code: string
	//	saleKind: 'order' // | 'recurrence'

	// Transaction group total price
	price: {
		amount: number
		currency: 'BRL'
	}

	// Source for the transaction main seller
	sourceId: ObjectId

	urlNotification: string | undefined;// TODO Bempaggo
	/**
	 * Payment Method used in this transaction group
	 */
	paymentMethods: {
		//key: string

		// custom: boolean

		//   gateway: string

		method: 'credit_card' | 'bank_slip' | 'pix' //| 'multi_card'

		// Strategy for this payment
		//  strategy: 'installment' //| 'recurrence'

		// How many installments this transaction should have on the gateway
		installments: number

		//    discounts: {
		//      kind: 'percent' | 'fixed'
		//      percent: number
		//      fixed: {
		//        amount: number
		//        currency: 'BRL'
		//      }
		//
		//      discountedAmount: {
		//        amount: number
		//        currency: 'BRL'
		//      }
		//    }[]
		//
		//    taxes: {
		//      kind: 'percent' | 'fixed'
		//      percent: number
		//      fixed: {
		//        amount: number
		//        currency: 'BRL'
		//      }
		//      type: 'interest'
		//      addedAmount: {
		//        amount: number
		//        currency: 'BRL'
		//      }
		//    }[]

		card?: {
			//      name: string
			token: string
			//      tokenValidUntil: Date
			//      hash: string
			//      last_digits: string
			//      first_digits: string
			//      brand: string
			//      brandPretty: string
			//      expirationMonth: number | null
			//      expirationYear: number | null
			securityCode: string //| null
		}
		bank_slip?: {
			url: string
			dueDays: number | null
			lateFee: number | null
			lateInterestRate: number | null // TODO DAY, MONTH ??? PERCENTAGE, FLAT ?
		}
		total: {
			amount: number
			currency: 'BRL'
		}
		recipients: [
			{
				sourceId: ObjectId
				total: {
					amount: number
					currency: 'BRL'
				}
			}
		]

	}[]

	/*
	 * Transaction group status
	 * - pending: waiting for the flushTransactionGroup process to create the transactions
	 * - ready: the transaction group is ready to be created(flush process has finished)
	 * - created: the transaction group was created on the gateway
	 * - failed: the transaction group creation failed on the gateway
	 */
	//	status: 'pending' | 'ready' | 'created' | 'failed'

	/*
	 * The currency used in this transactionGroup
	 */
	//	currency: 'BRL'

	/*
	 * Transaction group recipients
	 */

	// The external transaction payload
	// externalTransactionPayload: any

	// The error returned by the gateway
	//error: any

	// The gateway used to create the transaction group
	// gateway: 'pagarme' | 'zoop' | 'iugu' | 'maxipago' | 'bempaggo'



	// The amount of installments
	//  totalInstallments: number

	// Customer data at the time of the purchase
	customerPayload: {
		name: string
		email: string
		phone:/*string*/ { areaCode: number, countryCode: number, phoneNumber: number }
		birth: Date
		document: {
			kind: 'cpf' | 'cnpj'
			value: string //TODO only numbers
		}
		//    active: boolean

		//    token: string

		// array containing user payment methods
		//    paymentMethods: {
		//      alias: string
		//      sourceId: ObjectId
		//      // exact snapshot of the payload that exists inside source
		//      payload: any
		//      kind: 'credit_card' | 'bank_slip' | 'pix' | 'multi_card'
		//      title: string
		//      hash: string
		//    }[]

		// list of addresses associated with this user
		addresses: {
			code: string
			state: string
			city: string
			district: string
			address: string
			address2: string
			number: string
			country: string
			title: string
		}[]

		// map this customer to account on external sources
		//		sources: {
		//			alias: string
		//			sourceId: ObjectId
		//			// exact snapshot of the payload that exists inside source
		//			payload: any
		//			kind: 'credit_card' | 'bank_slip' | 'pix' | 'multi_card'
		//		}[]
	}

	// Due date for the transaction
	//  dueAt: Date
}
