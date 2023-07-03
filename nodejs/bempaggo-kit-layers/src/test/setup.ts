
/**   Recommendations to the field urlNotification:
	 * First example:
	 * if urlNotification = https://ec90340f030e4657830412c7817b1ccc.m.pipedream.net
	 * We will send a HTTP POST at : https://ec90340f030e4657830412c7817b1ccc.m.pipedream.net/?orderStatus=ACTIVE&lastChargeStatus=PAY
	 *
	 * Second example includes path:
	 * if urlNotification = https://ec90340f030e4657830412c7817b1ccc.m.pipedream.net/webhooks
	 * then:
	 * https://ec90340f030e4657830412c7817b1ccc.m.pipedream.net/webhooks?orderStatus=ACTIVE&lastChargeStatus=PAY
	 *
	 *
	 * Third example includes a query parameter
	 * if urlNotification =  https://ec90340f030e4657830412c7817b1ccc.m.pipedream.net?order=123323232
	 * then:
	 * https://ec90340f030e4657830412c7817b1ccc.m.pipedream.net/?order=123323232&orderStatus=ACTIVE&lastChargeStatus=PAY
	 *
	 * ***********AVOID***********************AVOID***********************************AVOID***************************************
	 * Fourth example includes a extra slash at the end of url:
	 * ***********AVOID***********************AVOID***********************************AVOID***************************************
	 * the follow example, the url might be an invalid URL because of the last slash (/)
	 * if urlNotification = https://ec90340f030e4657830412c7817b1ccc.m.pipedream.net/webhooks/
	 * 	then:
	 * https://ec90340f030e4657830412c7817b1ccc.m.pipedream.net/webhooks/?orderStatus=ACTIVE&lastChargeStatus=PAY
	 *
	 * ***********AVOID***********************AVOID***********************************AVOID***************************************
	 * Fifth example includes a query parameter overload in the url:
	 * ***********AVOID***********************AVOID***********************************AVOID***************************************
	 * In URL, avoid overloading two parameters orderStatus and lastChargeStatus
	 *
	 * if urlNotification = https://ec90340f030e4657830412c7817b1ccc.m.pipedream.net/webhooks/?orderStatus=PP
	 * 	then:
	 * https://ec90340f030e4657830412c7817b1ccc.m.pipedream.net/webhooks/?orderStatus=PP&orderStatus=ACTIVE&lastChargeStatus=PAY
	 *
	 * OBS:
	 * The status types of orderStatus are the values in enum OrderStatusType.
	 * The status types of lastChargeStatus are the enum ChargeStatusTypes.
	 *
	 * */


import fetch, { Headers } from "node-fetch";
import BemPaggoSdk from "../app/modules/layers/BemPaggoSDK";

const tokenLayers = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODgxMzUzODAsImV4cCI6MTY4ODE5NTM4MH0.qwFW8HGOm2IfjWj5oLn5pgJNzocX0Q3epKAHKMPkn5uhv3Ah-aezLxqvSF2MzBIjWsmkGiI3MVQRVqIDUav3ow";
// It is necessary to generate a token in portal
const urlSetup = "http://localhost:5000/api"
const layers: BemPaggoSdk = new BemPaggoSdk(urlSetup, tokenLayers);

const simulation = async (chargeId: number): Promise<void> => {
	const headers = new Headers();
	headers.set("Content-Type", "application/json");
	headers.set("Authorization", `Bearer ${tokenLayers}`);
	await fetch(`${urlSetup}/v2/charges/${chargeId}/simulation`, { method: "POST", headers }); // Doesn't work in production.
}
export { layers, simulation, tokenLayers, urlSetup };

