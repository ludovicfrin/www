/**
 * Authentication service
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { User } from '../entity/user';

@Injectable()
export class AuthService {
  public redirectUrl: string = '/';
  private loggedIn = false;
  
  /**
   * Getter for the login status
   *
   * @return Login status
   */
   public isLoggedIn(): boolean {
     return this.loggedIn;
   }  

  /**
   * Login action
   *
   * @param user User
   */
  public login(user: User): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.loggedIn = true);
  }

  /**
   * Logout action
   */
  public logout(): void {
    this.loggedIn = false;
  }
}
