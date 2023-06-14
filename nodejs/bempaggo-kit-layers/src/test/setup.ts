
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

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODY2NzA2NjksImV4cCI6MTY4NjczMDY2OX0.MYnnG2jOPY7khETUzZLSq1O_TIeEs1WE2wb8opUAX4pzyjgfZk4VgZqcdJJKKOgxwryDSowfI9BmJD4SlhrOBg";
// needs to generate a token in portal
const url = "http://localhost:5000/api"
const layers: BemPaggoSdk = new BemPaggoSdk(url, token);

const simulation = async (chargeId: number): Promise<void> => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${token}`);
    await fetch(`${url}/v2/charges/${chargeId}/simulation`, { method: "POST", headers }); // Don`t works in production.
}
export { layers, simulation };
