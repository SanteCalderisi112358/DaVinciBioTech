import { TipoRuolo } from "./tipo-utente.enum";

export interface Utente {


  email:string,
  password:string,
  nome:string,
  cognome:string,
  username:string,
  ruolo: TipoRuolo;
  id?:string
}
