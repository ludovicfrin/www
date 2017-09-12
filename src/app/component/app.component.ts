/**
 * Application component
 * Define the application Layout (Toolbar, sidenav ...)
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean;

  /**
   * Constructor
   
   * @param _authService Authentication Service
   * @param _router Routing service  
   */
   constructor(private _authService: AuthService, private _router: Router) {
   }
   
   /**
    * Initialization
    * Check if a user is authenticated
    */
   public ngOnInit(): void {
     this._authService.getAuthStatus().subscribe(
       auth => { this.isLoggedIn = auth != null }
     );
   }
   
   /**
    * Logout
    */
   public logout(): void {
     this._router.navigate([ '/login' ]);
   } 
}
