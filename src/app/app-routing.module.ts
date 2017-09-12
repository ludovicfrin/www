/**
 * Routing configuration
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './service/auth.service';
import { FitnessComponent } from './component/fitness/fitness.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
 
import { environment } from '../environments/environment';
 
const ROUTING: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'fitness',
    component: FitnessComponent,
    //canActivate: [AuthGuard]
  }, {
    path: '',
    redirectTo: '/fitness',
    pathMatch: 'full'
  }, {
    path: '**', 
    component: PageNotFoundComponent,
  }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(ROUTING, { enableTracing: environment.production })
  ],
  exports: [ RouterModule ],
  providers: [ AuthGuard, AuthService ]
})
export class AppRoutingModule { }