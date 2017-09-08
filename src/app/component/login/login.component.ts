/**
 * Login component
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { User } from '../../entity/user';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _user = new User();
  private _returnUrl: string;
  
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
   * Login action
   */
  public login(): void {
    this._authService.emailPasswordLogin(this._user)
    	.then (success => {
    	  this._router.navigate([ this._returnUrl ]);
    	}).catch(error => {
    	  this._snackBar.open("Username or password incorrect", "", { duration: 2000 });
    	});
  }
}
