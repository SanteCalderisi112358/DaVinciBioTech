//serve per proteggere le rotte in caso di assenza di un login corretto

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authSrv: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authSrv.user$.pipe(
      take(1),
      map((user) => {
        if (user) {
          if (user.utente.ruolo === 'USER' && state.url === '/profile-admin') {
            return this.router.createUrlTree(['/']);
          }
          return true;
        } else {
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}

