import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { AuthData } from './auth-data.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Utente } from '../models/utente.interface';


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

  restore() {
    const user = localStorage.getItem('utente');
    if (!user) {
      return;
    } else {
      const userData: AuthData = JSON.parse(user);
      if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
        return;
      }
      this.authSubj.next(userData);
      this.autologout(userData);
      this.userProfile = userData.utente;
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
