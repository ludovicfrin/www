/**
 * Modules declaration
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdGridListModule, MdIconModule, MdInputModule, MdListModule, MdSidenavModule, MdSnackBarModule, MdToolbarModule, MdTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppFirebaseModule } from './app-firebase.module';
import { AppComponent } from './component/app.component';

import { FitnessComponent } from './component/fitness/fitness.component';
import { ColumnChartComponent, GaugeChartComponent } from './component/fitness/chart';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { StepService } from './service/step.service';

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
    ColumnChartComponent,
    GaugeChartComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdSidenavModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule,
    ChartModule,
    AppRoutingModule,
    AppFirebaseModule
  ],
  providers: [{ provide: HighchartsStatic, useFactory: highchartsFactory }, StepService],
  bootstrap: [AppComponent]
})
export class AppModule { }
