//lembrar de atualizar o token, ele expira a cada 24 horas;
//rodar a classe OneTimeV2EredeSantilanaServiceTest para gerar um token novo;
import { BempaggoFactory } from "bempaggo-kit/lib/app/modules/Bempaggo";
import { Environments } from "bempaggo-kit/lib/app/modules/entity/Enum";

export const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODg1ODk3ODksImV4cCI6MTY4ODY0OTc4OX0.cipCgWcJhrmc6S_ynuJfuclLEi15FQ42QTeC7OuL8TBmj0b9YeOCf5_QacYkafcFhtukVl-59D0IZmPEcAn8fA"
export const bempaggoFactory = new BempaggoFactory().create(Environments.DEVELOPMENT, token);
const urlSetup = "http://localhost:5000/api"

export const simulation = async (chargeId: number): Promise<void> => {
	const headers = new Headers();
	headers.set("Content-Type", "application/json");
	headers.set("Authorization", `Bearer ${token}`);
	await fetch(`${urlSetup}/v2/charges/${chargeId}/simulation`, { method: "POST", headers }); // Doesn't work in production.
}
