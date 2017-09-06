/**
 * Modules declaration
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdCardModule, MdGridListModule, MdIconModule, MdListModule, MdSidenavModule, MdToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { ROUTING } from './app.routing';
import { AppComponent } from './component/app.component';
import { FitnessComponent } from './component/fitness/fitness.component';

@NgModule({
  declarations: [
    AppComponent,
    FitnessComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdGridListModule,
    MdIconModule,
    MdListModule,
    MdSidenavModule,
    MdToolbarModule,
    RouterModule.forRoot(ROUTING, { enableTracing: !environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
