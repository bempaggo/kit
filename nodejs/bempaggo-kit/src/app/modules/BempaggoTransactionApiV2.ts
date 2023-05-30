import { BempaggoHttp } from "./BempaggoHttp";
import { CreditCardApiV2 } from "./CreditCardApiV2";
import {
  BempaggoTransactionServiceable,
  CreditCardOperable
} from "./Transaction";
class BempaggoTransactionApiV2
  implements BempaggoTransactionServiceable {
  constructor(private http: BempaggoHttp) { }

  getCreditCardServiceable(): CreditCardOperable {
    return new CreditCardApiV2(this.http);
  }
}
export { BempaggoTransactionApiV2 };

