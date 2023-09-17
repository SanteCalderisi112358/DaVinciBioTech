import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tavola } from '../models/tavola.interface';
import { Utente } from '../models/utente.interface';
import { Donazione } from '../models/donazione.interface';
import { UtenteModificato } from '../models/utenteModifica.interface';
import { TavolaModifica } from '../models/tavolaModifica.interface';
@Injectable({
  providedIn: 'root',
})
export class DvbtService {
  baseUrl = environment.baseURL;
  constructor(private http: HttpClient) {}


/* CRUD UTENTI */

  getAllUtenti(page:number, size:number, sortBy:String){
    return this.http.get<Utente[]>(`${this.baseUrl}utenti?page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  getAllUtentiDonatori(page:number, size:number, sortBy:String){
    return this.http.get<Tavola[]>(`${this.baseUrl}utenti/utenti-con-donazioni?page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  getAllDonazioniByIdUtente(idUtente:string){
    return this.http.get<Donazione[]>(`${this.baseUrl}utenti/${idUtente}/donazioni`);

  }

  deleteUtenteStepOne(idUtente:string){
    return this.http.delete<string>(`${this.baseUrl}utenti/${idUtente}`)
  }

  deleteUtenteAndDonazioni(idUtente:string){
    return this.http.delete<string>(`${this.baseUrl}utenti/utente-and-donazioni/${idUtente}`)

  }

  deleteJustUtente(idUtente:string){
    return this.http.delete<string>(`${this.baseUrl}utenti/only-utente/${idUtente}`)

  }

  putUtente(idUtente:string, utenteModificato:UtenteModificato){
    return this.http.put<Utente>(`${this.baseUrl}utenti/${idUtente}`,utenteModificato)

  }

  postUtente(utenteNuovo:UtenteModificato){
    return this.http.post<Utente>(`${this.baseUrl}auth/registrazione`,utenteNuovo)

  }

  /* CRUD TAVOLE */

  getAllTavoleHome() {
    return this.http.get<Tavola[]>(`${this.baseUrl}home`);
  }

  getAllTavoleAdmin(page:number, size:number, sortBy:String){
  return this.http.get<Tavola[]>(`${this.baseUrl}tavole-leonardo?page=${page}&size=${size}&sortBy=${sortBy}`);

}
  deleteTavola(idTavola:string){
    return this.http.delete<string>(`${this.baseUrl}tavole-leonardo/${idTavola}`)
  }

  putTavola(idTavola:string, tavolaModificata: TavolaModifica){
    return this.http.put<Tavola>(`${this.baseUrl}tavole-leonardo/${idTavola}`,tavolaModificata)

  }

}
