
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

const tokenLayers = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDI1IiwidGVuYW50IjoiYmVtcGFnZ29fbGF5ZXJzbHRkYV8iLCJpYXQiOjE2ODgwNzM5MzEsImV4cCI6NDEwMjM1ODM5OSwiaXNNYXN0ZXIiOnRydWV9.Mw41cNwT0QViz6Vb6NDi01CHTfqFPjiH0qd1NiIVzCvCVsJPfmdRebc73p6GyLrUxHHusee2_IhH_tDeIrth6A";
// local const tokenLayers = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDI1IiwidGVuYW50IjoiYmVtcGFnZ29fbGF5ZXJzbHRkYV8iLCJpYXQiOjE2ODgwNjM1MDEsImV4cCI6NDEwMjM1ODM5OSwiaXNNYXN0ZXIiOnRydWV9.PNIRaWLagdyN0I51XFin_D4z6v6J0BzWf8GVfmi8pxIZn0B3PyfzqZF7ElB3VRunboXtq0hW4kO53gvCLSYyXA";
// It is necessary to generate a token in portal
const urlSetup = "https://api-sandbox.bempaggo.io/api"
const layers: BemPaggoSdk = new BemPaggoSdk(urlSetup, tokenLayers);

const simulation = async (chargeId: number): Promise<void> => {
	const headers = new Headers();
	headers.set("Content-Type", "application/json");
	headers.set("Authorization", `Bearer ${tokenLayers}`);
	await fetch(`${urlSetup}/v2/charges/${chargeId}/simulation`, { method: "POST", headers }); // Doesn't work in production.
}
export { layers, simulation, tokenLayers, urlSetup };

