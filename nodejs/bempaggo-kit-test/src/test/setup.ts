//lembrar de atualizar o token, ele expira a cada 24 horas;
//rodar a classe OneTimeV2EredeSantilanaServiceTest para gerar um token novo;
import { BempaggoFactory } from "bempaggo-kit/lib/app/modules/Bempaggo";
import { Environments } from "bempaggo-kit/lib/app/modules/entity/Enum";

export const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODgwNTk0NDYsImV4cCI6MTY4ODExOTQ0Nn0.04NadljeJyvnEoyuOdV969keHR4qBrDnvfNzaIIk-SgCxr1i_bQWmtD9S1U_A_rxDPVGj8oraWJVvgN9VntGIA"
export const bempaggoFactory = new BempaggoFactory().create(Environments.DEVELOPMENT, token);