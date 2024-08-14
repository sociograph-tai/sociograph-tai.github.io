import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(private router: Router) { }

  // Si existe el token o la autorizacion, se puede 
  // ir a esa pagina
  // En caso de no existir, se redirige a login y
  // no se permite entrar en ese path
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('jwt_token')) return true;
    else{
      this.router.navigate(['login']);
      return false;
    } 
  }
  
}
