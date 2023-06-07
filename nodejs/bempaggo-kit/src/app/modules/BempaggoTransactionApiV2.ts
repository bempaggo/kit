import { BankSlipApiV2 } from "./BankSlipApiV2";
import { BempaggoHttp } from "./BempaggoHttp";
import { CreditCardApiV2 } from "./CreditCardApiV2";
import { PixApiV2 } from "./PixApiV2";
import { BankSlipOperable, BempaggoTransactionServiceable, CreditCardOperable, PixOperable } from "./Transaction";

class BempaggoTransactionApiV2 implements BempaggoTransactionServiceable {
	constructor(private http: BempaggoHttp) { }

	getBankSlipServiceable(): BankSlipOperable {
		return new BankSlipApiV2(this.http);
	}
	
	getPixServiceable(): PixOperable {
		return new PixApiV2(this.http);
	}
	
	getCreditCardServiceable(): CreditCardOperable {
		return new CreditCardApiV2(this.http);
	}
}
export { BempaggoTransactionApiV2 };

