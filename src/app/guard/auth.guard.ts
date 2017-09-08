import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Constructor
   * @param _authService Auth Service
   * @param _router Router factory
   */
  constructor(private _authService: AuthService, private _router: Router) {}
  
  /**
   * Check if a route can be activated
   *
   * @param route Activated route snapshot
   * @param state Route state snapshot
   * @return Result of the check 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  } 
  
  /**
   * Check if a user is Logged and can access to an URL
   *
   * @param url URL to checked
   * @return Result of the check
   */
  private checkLogin(url: string): boolean {
    if (this._authService.isLoggedIn()) {
      return true;
    }
    this._router.navigate(['/login'], { queryParams: { returnUrl: url }});
    return false;
  }
}
