/**
 * Routing configuration
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { environment } from '../environments/environment';

import { AuthGuard, AuthService, PageNotFoundComponent } from './shared/';
import { FitnessComponent, StepComponent } from './fitness/';
import { LoginComponent } from './login/login.component';
 
const ROUTING: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login'}
  }, {
    path: 'fitness',
    component: FitnessComponent,
    data: {title: 'Fitness'},
    canActivate: [AuthGuard],
  }, {
    path: 'fitness/step',
    component: StepComponent,
    data: {title: 'Steps'},
    canActivate: [AuthGuard],
  }, {
    path: '',
    redirectTo: '/fitness',
    pathMatch: 'full'
  }, {
    path: '**', 
    component: PageNotFoundComponent,
    data: {title: '404 Error'}
  }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(ROUTING, { enableTracing: false })
  ],
  exports: [ RouterModule ],
  providers: [ AuthGuard, AuthService ]
})
export class AppRoutingModule { }