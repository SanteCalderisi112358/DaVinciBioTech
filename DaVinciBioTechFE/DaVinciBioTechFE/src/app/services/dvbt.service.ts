import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tavola } from '../models/tavola.interface';
import { Utente } from '../models/utente.interface';
import { Donazione } from '../models/donazione.interface';
import { UtenteModificato } from '../models/utente-modifica-from-admin.interface';
import { TavolaModifica } from '../models/tavolaModifica.interface';
import { UtenteNuovo } from '../models/utente-nuovo.interface';
import { RecuperoPassword } from '../models/recupero-password.interface';
import { DonazioneBody } from '../models/donazione-body.interface';
import { UtenteModifica } from '../models/utente-modifica-from-user.interface';
import { NuovaTavola } from '../models/nuova-tavola.interface';
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

  postUtente(utenteNuovo:UtenteNuovo){
    return this.http.post<Utente>(`${this.baseUrl}utenti`,utenteNuovo)

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

  postTavola(nuovaTavola:NuovaTavola){
    return this.http.post<Tavola>(`${this.baseUrl}tavole-leonardo`,nuovaTavola)
  }
  /* CRUD DONAZIONI */

  getAllDonazioniAdmin(page:number, size:number, sortBy:String){
    return this.http.get<Donazione[]>(`${this.baseUrl}donazioni?page=${page}&size=${size}&sortBy=${sortBy}`);

  }

  postDonazione(donazioneBody: DonazioneBody){
    return this.http.post<Donazione>(`${this.baseUrl}donazioni`, donazioneBody);

  }

  getDonazioniImportoPerPeriodo(dataInizio:string, dataFine:string){
    return this.http.get<number>(`${this.baseUrl}donazioni/somma-importi?dataInizio=${dataInizio}&dataFine=${dataFine}`);

  }

  getImportoAllDOnazioni(){
    return this.http.get<number>(`${this.baseUrl}donazioni/somma-all-importi`);

  }

  getDonazioniPerPeriodo(dataInizio:string, dataFine:string){
    return this.http.get<Donazione[]>(`${this.baseUrl}donazioni/donazioni-per-anno?dataInizio=${dataInizio}&dataFine=${dataFine}`);

  }



  recuperoPassword(email:RecuperoPassword){
    return this.http.put<Utente>(`${this.baseUrl}auth/recupera-password`, email);

  }

  getDonazioniFromUser(idUtente:string){
    return this.http.get<Donazione[]>(`${this.baseUrl}donazioni/donazioni-user/${idUtente}`)
  }

  getImportoDonazioniFromUser(idUtente:string){
    return this.http.get<number>(`${this.baseUrl}donazioni/importo-donazioni-utente/${idUtente}`)
  }

  putNomeFromUser(idUtente:string,cambioNomePayload:{dato:string}){
    return this.http.put<Utente>(`${this.baseUrl}utenti/utente-cambio-nome/${idUtente}`, cambioNomePayload)
  }

  putCognomeFromUser(idUtente:string,cambioCognomePayload:{dato:string}){
    return this.http.put<Utente>(`${this.baseUrl}utenti/utente-cambio-cognome/${idUtente}`, cambioCognomePayload)
  }

  putPasswordFromUser(idUtente:string,cambioPasswordpayload:{password:string}){
    return this.http.put<Utente>(`${this.baseUrl}utenti/utente-cambio-password/${idUtente}`, cambioPasswordpayload)
  }
}
