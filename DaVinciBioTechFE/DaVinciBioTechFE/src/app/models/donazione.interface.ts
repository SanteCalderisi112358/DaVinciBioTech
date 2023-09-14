import { Utente } from "./utente.interface";

export interface Donazione {
  id:string;
  importo:number;
  data:string;
  utente: Utente

}
