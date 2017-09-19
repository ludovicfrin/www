/**
 * Component with authentication params
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './auth.service';

export abstract class AuthComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean;
  private _authSubscription: Subscription;
    
  /**
   * Constructor
   *
   * @param _authService Authentication Service
   */
   constructor(protected _authService: AuthService) {}
   
   /**
    * Initialization of the component
    * - Check if a user is authenticated
    * - Define Navigation
    * - Change title
    */
   public ngOnInit(): void {
     let self = this;
       
     this._authSubscription = this._authService.getAuthStatus().subscribe(
       auth => { self.isLoggedIn = auth != null }
     );
  }
    
  /**
   * Component destruction
   * Unsubscribe to the auth service
   */
  ngOnDestroy() {
    this._authSubscription.unsubscribe();
  }  
}