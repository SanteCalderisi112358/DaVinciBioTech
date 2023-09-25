import { TipoRuolo } from "./tipo-utente.enum";

export interface UtenteModificato {
  nome:string;
  cognome:string;
  email:string;
  ruolo:TipoRuolo
}
