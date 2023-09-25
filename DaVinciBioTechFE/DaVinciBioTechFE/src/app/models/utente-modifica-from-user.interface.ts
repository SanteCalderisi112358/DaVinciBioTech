import { TipoRuolo } from "./tipo-utente.enum";

export interface UtenteModifica {

  nome:string,
  cognome:string,
  email:string;
  ruolo:TipoRuolo,
  password:''
}
