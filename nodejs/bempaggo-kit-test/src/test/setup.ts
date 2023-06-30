//lembrar de atualizar o token, ele expira a cada 24 horas;
//rodar a classe OneTimeV2EredeSantilanaServiceTest para gerar um token novo;
import { BempaggoFactory } from "bempaggo-kit/lib/app/modules/Bempaggo";
import { Environments } from "bempaggo-kit/lib/app/modules/entity/Enum";

export const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODgxMjkxNjIsImV4cCI6MTY4ODE4OTE2Mn0.ak1Own6t0fvkghl-BIgIKPDNVVxAUZnUoj0QZzBTRpNC8iBB-XipvSzbUygCYJsJOSzl6l28vbomQGaVkz2oaA"
export const bempaggoFactory = new BempaggoFactory().create(Environments.SANDBOX, token);