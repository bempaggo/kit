import BemPaggoSdk from "@/app/modules/layers/BemPaggoSDK";

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODY1NzYzMjcsImV4cCI6MTY4NjYzNjMyN30.QfnKFVP_1x4DtQ5EGIkAu3Hqm61kV3p9lUgxYRNN5-W7lNeLxYUI482LtpRXw5NqOk_yrEoQC2R4102bi-T0ng";
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

