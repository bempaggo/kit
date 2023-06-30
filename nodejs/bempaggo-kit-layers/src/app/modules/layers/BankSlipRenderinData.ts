/**
 * The data we need to render our custom bank slip
 */
export type BankSlipRenderingData =
  | { custom_html: string; digitable_line: string }
  | {
      bank_code: string
      expiration_date: string
      total_value: string
      creation_date: string
      payment_instructions: string
      community_legal_name: string
      community_legal_document: string
      bank_agency: string
      bank_account: string
      our_number: string
      document_number: string
      customer_name: string
      customer_document: string
      customer_address_1: string
      customer_address_2: string
      digitable_line: string
      bar_code: string // TODO bempaggo adding 
      source: {
        kind: string
        name: string
      }
    }
