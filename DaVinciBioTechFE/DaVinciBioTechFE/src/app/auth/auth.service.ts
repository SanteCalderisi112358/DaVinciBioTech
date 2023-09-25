import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { AuthData } from './auth-data.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Utente } from '../models/utente.interface';
import { TipoRuolo } from '../models/tipo-utente.enum';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  baseUrl = environment.baseURL;
  userProfile!: Utente;
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  utente!: AuthData;
  user$ = this.authSubj.asObservable();
  timeLogout: any;
  datiUtente: AuthData ={
    accessToken: "",
    utente: {
    email:"",
    nome:"",
    cognome:"",
    ruolo: TipoRuolo.USER,
    id:""
    }
  }
  utenteLoggato:any;
  constructor(private http: HttpClient, private router: Router) {}

  login(data: Utente) {
    return this.http.post<AuthData>(`${this.baseUrl}auth/login`, data).pipe(
      tap((data) => {
        console.log(data);
        this.router.navigate(['/']);
        this.authSubj.next(data);
        this.utente = data;
        console.log(this.utente);
        localStorage.setItem('utente', JSON.stringify(data));
        this.autologout(data);
        this.userProfile = data.utente;
      })
    );
  }

  loginAfterPut(data:Utente){
    localStorage.setItem('utente', JSON.stringify(data));
  }

  restore() {
     this.utenteLoggato = localStorage.getItem('utente');
    if (!this.utenteLoggato) {
        return;
    }

    this.datiUtente = JSON.parse(this.utenteLoggato);
    if (this.jwtHelper.isTokenExpired(this.datiUtente.accessToken)) {
        this.logout;
    }
    else {
      this.authSubj.next(this.datiUtente);
      this.userProfile = this.datiUtente.utente;
      this.autologout(this.datiUtente);
    }
}

  signup(data: {
    nome: string;
    cognome: string;
    email: string;
    password: string;
  }) {
    return this.http.post(`${this.baseUrl}auth/registrazione`, data);
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('utente');
    this.router.navigate(['/']);
    if (this.timeLogout) {
      clearTimeout(this.timeLogout);
    }
  }
  autologout(data: AuthData) {
    const expirationDate = this.jwtHelper.getTokenExpirationDate(
      data.accessToken
    ) as Date;
    const expirationMilliseconds =
      expirationDate.getTime() - new Date().getTime();
    this.timeLogout = setTimeout(() => {
      this.logout();
    }, expirationMilliseconds);
  }

  getUserData(): Utente {
    return this.userProfile;
  }
}
