import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tavola } from '../models/tavola.interface';
import { Utente } from '../models/utente.interface';
import { Donazione } from '../models/donazione.interface';
@Injectable({
  providedIn: 'root',
})
export class DvbtService {
  baseUrl = environment.baseURL;
  constructor(private http: HttpClient) {}



  getAllTavole() {
    return this.http.get<Tavola[]>(`${this.baseUrl}home`);
  }

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
}
