import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {
  
  constructor(private router: Router) { }

  // Si existe el token o la autorizacion, no se puede 
  // ir a esa pagina
  // En caso de existir, se redirige a users y
  // no se permite entrar en ese path
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('jwt_token')){
      this.router.navigate(['inicio']);
      return false;
    }
    else return true;
  }
  
}
