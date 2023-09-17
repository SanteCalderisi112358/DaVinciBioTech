import { TipoRuolo } from "./tipo-utente.enum";

export interface UtenteNuovo {
  email:string,
  nome:string,
  cognome:string,
  password:string;
  ruolo: TipoRuolo;
}
