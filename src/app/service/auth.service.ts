/**
 * Authentication service
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { User } from '../entity/user';

@Injectable()
export class AuthService {
  private _authStatus: Observable<firebase.User>;
  private _user: firebase.User;
  
  /**
   * Constructor
   *
   * @param _auth Firebase auth service
   */
  constructor(private _auth: AngularFireAuth) {
    this._authStatus = _auth.authState;
    this._authStatus.subscribe(
      auth => { this._user = auth; }
    );
  }
  
  /**
   * Getter for the authStatus
   *
   * @return Observable
   */
  public getAuthStatus(): Observable<firebase.User> {
    return this._authStatus;
  }
  
  /**
   * Getter for the login status
   *
   * @return Login status
   */
   public isLoggedIn(): boolean {
     return this._user != null;
   }  

  /**
   * Login action user e-mail/password
   *
   * @param user User
   */
  public emailPasswordLogin(user: User): firebase.Promise<any> {
    return this._auth.auth.signInWithEmailAndPassword(user.username, user.password);
  }
  
  /**
   * Login action using Google auth provider
   *
   * @param user User
   */
  public googleAuthLogin(user: User) {
    this._auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }  

  /**
   * Logout action
   */
  public logout(): void {
    this._auth.auth.signOut();
  }
}
