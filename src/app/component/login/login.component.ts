/**
 * Login component
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { User } from '../../entity/user';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user = new User();
  
  /**
   * Constructor
   *
   * @param _authService Authentication Service
   * @param _router Router factory
   * @param _snackBar Snackbar to display error messages 
   */
  constructor(private _authService: AuthService, private _router: Router, private _snackBar: MdSnackBar) { }
  
  /**
   * Login action
   */
  public login(): void {
  	this._authService.login(this.user).subscribe(
  	  result => {
  	    if (result == true) {
  	      this._router.navigate([ this._authService.redirectUrl ]);
  	    } else {
    	  //TODO internationalisation
    	  this._snackBar.open("Username or password incorrect", "", { duration: 2000 });
  	    }
  	  }
  	 );
  }
}
