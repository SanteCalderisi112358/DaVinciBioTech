import { TipoRuolo } from "../models/tipo-utente.enum";

export interface AuthData {
  accessToken: string;
  utente: {
  email:string,
  nome:string,
  cognome:string,
  ruolo: TipoRuolo;
  id?:string
  };
}
