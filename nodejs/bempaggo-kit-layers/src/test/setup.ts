import BemPaggoSdk from "@/app/modules/layers/BemPaggoSDK";

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODY1MTU0NDIsImV4cCI6MTY4NjU3NTQ0Mn0.DqwX40qVyhvlqJKgHIkfOsnmKuR37FGOi9ItdgXLN-jnoBum-HYl8d96eqfQ3GitzFIg5oFP5vsgavz9_pHdow";
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

