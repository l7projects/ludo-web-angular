import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from "@ludo/core/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _auth: AuthService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>{

    return this._auth.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn:boolean)=>{
        if(!isLoggedIn){
          this.router.navigate(['/login']);
          return false;
        }
        return true
      })
    )

  }
}
