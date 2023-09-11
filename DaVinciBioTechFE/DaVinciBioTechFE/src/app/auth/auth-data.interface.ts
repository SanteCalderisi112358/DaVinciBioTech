import { TipoRuolo } from "../models/tipo-utente.enum";

export interface AuthData {
  accessToken: string;
  utente: {
    email:string,
  password:string,
  nome:string,
  cognome:string,
  username:string,
  ruolo: TipoRuolo;
  id?:string
  };
}
