import { BankSlipApiV2 } from "./BankSlipApiV2";
import { BempaggoChargeFinderV2 } from "./BempaggoChargeFinder";
import { BempaggoHttp } from "./BempaggoHttp";
import { CreditCardApiV2 } from "./CreditCardApiV2";
import { PixApiV2 } from "./PixApiV2";
import { BankSlipOperable, BempaggoTransactionServiceable, ChargeFindable, CreditCardOperable, PixOperable } from "./Transaction";

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
	getChargeFinder(): ChargeFindable {
		return new BempaggoChargeFinderV2(this.http);
	}

}
export { BempaggoTransactionApiV2 };

