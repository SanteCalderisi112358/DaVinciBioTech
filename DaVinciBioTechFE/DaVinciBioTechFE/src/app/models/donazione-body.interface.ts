import { Utente } from "./utente.interface";

export interface DonazioneBody {
  importo:number;
  data:string;
  utente: Utente
}
