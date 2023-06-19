
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


import BemPaggoSdk from "@/app/modules/layers/BemPaggoSDK";

<<<<<<< HEAD
const tokenLayers = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODY5MjA5MTQsImV4cCI6MTY4Njk4MDkxNH0.YjfUXYdWKfgpIIO1TF58J5p1uxRT3YEH5Q2DrEUTuOjZNQ6ieu8DMfYkvcOuu2ME2eMyNxxaSPmZ8IASblRIhA";
=======
const tokenLayers = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODY5MjY2ODQsImV4cCI6MTY4Njk4NjY4NH0.V_Y_HKbxkbWru1vMFfzpHc225jCS1B9DMGLtOw5_A9SQ7gVPhubbz2nsnrjT7l9sATTDnv2Fnk3UxZYC5RNdtA";
>>>>>>> branch 'main' of https://github.com/bempaggo/kit.git
// It is necessary to generate a token in portal
const url = "http://localhost:5000/api"
const layers: BemPaggoSdk = new BemPaggoSdk(url, tokenLayers);

const simulation = async (chargeId: number): Promise<void> => {
	const headers = new Headers();
	headers.set("Content-Type", "application/json");
	headers.set("Authorization", `Bearer ${tokenLayers}`);
	await fetch(`${url}/v2/charges/${chargeId}/simulation`, { method: "POST", headers }); // Doesn't work in production.
}
export { layers, simulation, tokenLayers };
