import { TipoRuolo } from "./tipo-utente.enum";

export interface Utente {


  email:string,
  nome:string,
  cognome:string,
  ruolo: TipoRuolo;
  id:string
}
