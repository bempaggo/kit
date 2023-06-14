type ObjectId = number;
export interface LayersTransactionGroup {
    code: string;
    price: {
        amount: number;
        currency: 'BRL';
    };
    sourceId: ObjectId;
    urlNotification: string | undefined;
    paymentMethods: {
        method: 'credit_card' | 'bank_slip' | 'pix';
        installments: number;
        card?: {
            token: string;
            securityCode: string;
        };
        bank_slip?: {
            url: string;
            dueDays: number | null;
            lateFee: number | null;
            lateInterestRate: number | null;
        };
        total: {
            amount: number;
            currency: 'BRL';
        };
        recipients: [
            {
                sourceId: ObjectId;
                total: {
                    amount: number;
                    currency: 'BRL';
                };
            }
        ];
    }[];
    customerPayload: {
        name: string;
        email: string;
        phone: {
            areaCode: number;
            countryCode: number;
            phoneNumber: number;
        };
        birth: Date;
        document: {
            kind: 'cpf' | 'cnpj';
            value: string;
        };
        addresses: {
            code: string;
            state: string;
            city: string;
            district: string;
            address: string;
            address2: string;
            number: string;
            country: string;
            title: string;
        }[];
    };
}
export {};
