import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tavola } from '../models/tavola.interface';
@Injectable({
  providedIn: 'root',
})
export class TavolaService {
  baseUrl = environment.baseURL;
  constructor(private http: HttpClient) {}



  getAllTavole() {
    return this.http.get<Tavola[]>(`${this.baseUrl}home`);
  }
}
