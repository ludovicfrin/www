/**
 * Modules declaration
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdDatepickerModule, MdDialogModule, MdGridListModule, MdIconModule, 
  MdInputModule, MdListModule, MdMenuModule, MdNativeDateModule, MdSelectModule, MdSidenavModule, 
  MdSnackBarModule,  MdToolbarModule, MdTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppFirebaseModule } from './app-firebase.module';
import { AppComponent } from './app.component';

import { ColumnChartComponent, FitnessComponent, GaugeChartComponent, StepComponent, StepConfigComponent, StepService } from './fitness/';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent, SidenavComponent, ToolbarComponent } from './shared/';

declare var require: any;
export function highchartsFactory() {
  const hc = require('highcharts');
  const hcm = require('highcharts/highcharts-more');
  const sg = require('highcharts/modules/solid-gauge');
  hcm(hc);
  sg(hc);
  hc.setOptions({
    global: {
      useUTC: false
    }
  });
  return hc;
}

@NgModule({
  declarations: [
    AppComponent,
    FitnessComponent,
    StepComponent,
    ColumnChartComponent,
    GaugeChartComponent,
    LoginComponent,
    PageNotFoundComponent,
    SidenavComponent,
    ToolbarComponent,
    StepConfigComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdDatepickerModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule,
    ChartModule,
    AppRoutingModule,
    AppFirebaseModule
  ],
  providers: [
    { provide: HighchartsStatic, useFactory: highchartsFactory },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    StepService
  ],
  entryComponents: [ StepConfigComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
