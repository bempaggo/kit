
import { BempaggoFactory } from "bempaggo-kit/lib/app/modules/Bempaggo";
import { BempaggoCardRequest } from "bempaggo-kit/lib/app/modules/entity/BempaggoRequest";
import { BempaggoCardResponse } from "bempaggo-kit/lib/app/modules/entity/BempaggoResponse";
import { Environments } from "bempaggo-kit/lib/app/modules/entity/Enum";
import { assert, describe, test } from "vitest";
const card: BempaggoCardRequest = {
	expiration: {
		month: 1, // jan
		year: 2028
	},
	holder: {
		name: "Carlos Cartola",
		document: "06219385993",

	},
	cardNumber: "5448280000000007",// master number
}
describe("create token", async () => {
		test("create customer", async () => {
			// token= rode a classe OneTimeV2EredeSantilanaSetupServiceTest.java e surgira um token
			const token :string ="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODY3NDQ1MjAsImV4cCI6MTY4NjgwNDUyMH0.XqkSuYjwYh-PUKFrjNawKKLivsWZAGJR6-o96qzIgp9YUqqbeJTrnG47CD47h4gMv8wMt4P74V9YFuKpIBUWPw"
			const cardResponse:BempaggoCardResponse = await new BempaggoFactory().create(Environments.DEVELOPMENT,token).tokenizeCard(card,"no");
			assert.equal(64, cardResponse.token!.length);
		});
});