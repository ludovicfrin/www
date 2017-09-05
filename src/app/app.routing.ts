/**
 * Routing configuration
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
 import { Routes } from '@angular/router';
 
 import { FitnessComponent } from './component/fitness/fitness.component';
 
 export const ROUTING: Routes = [
   { path: 'fitness', component: FitnessComponent },
   { path: '', redirectTo: '/fitness', pathMatch: 'full' }
 ];