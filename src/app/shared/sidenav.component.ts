/**
 * Sidenav component
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'lf-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent extends AuthComponent {

   /*
   * Constructor
   *
   * @param _authService Authentication Service
   * @param _router Routing service
   */
   constructor(protected _authService: AuthService, private _router: Router) {
     super(_authService);
   }

   /**
    * Logout
    */
   public logout(): void {
     this._router.navigate([ '/login' ]);
   }    
}
