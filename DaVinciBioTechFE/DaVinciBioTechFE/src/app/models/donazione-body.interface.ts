import { Utente } from "./utente.interface";

export interface DonazioneBody {
  importo:number;
  data:string;
  numeroCarta:string
  cvc: string
  mese:string
  anno:string
  utente: Utente
}
