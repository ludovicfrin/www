/**
 * Login component
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';

@Component({
  selector: 'lf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _returnUrl: string;
    
  @ViewChild('errorMessage')
  private _errorMessage: ElementRef;
  
  /**
   * Constructor
   *
   * @param _authService Authentication Service
   * @param _route Current Route
   * @param _router Routing service
   * @param _snackBar Snackbar to display error messages 
   */
  constructor(private _authService: AuthService, private _route: ActivatedRoute, private _router: Router, private _snackBar: MdSnackBar) { }
    
  /**
   * Initialization
   * - Logout if a session exists
   * - Get the return URL if login success
   */
  public ngOnInit(): void {
    this._authService.logout();
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  /**
   * User login
   * 
   * @param user User
   */
  public login(user: User): void {
    this._authService.emailPasswordLogin(user)
      .then (success => {
        this._router.navigate([ this._returnUrl ]);
      }).catch(error => {
        this._snackBar.open(this._errorMessage.nativeElement.textContent, "", { duration: 2000 });
      });
  }
}
