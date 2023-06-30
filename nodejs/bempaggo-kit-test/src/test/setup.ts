//lembrar de atualizar o token, ele expira a cada 24 horas;
//rodar a classe OneTimeV2EredeSantilanaServiceTest para gerar um token novo;
import { BempaggoFactory } from "bempaggo-kit/lib/app/modules/Bempaggo";
import { Environments } from "bempaggo-kit/lib/app/modules/entity/Enum";

export const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidGVuYW50IjoiYmVtcGFnZ29fdXBjcm0iLCJpYXQiOjE2ODgxMzUzODAsImV4cCI6MTY4ODE5NTM4MH0.qwFW8HGOm2IfjWj5oLn5pgJNzocX0Q3epKAHKMPkn5uhv3Ah-aezLxqvSF2MzBIjWsmkGiI3MVQRVqIDUav3ow"
export const bempaggoFactory = new BempaggoFactory().create(Environments.DEVELOPMENT, token);