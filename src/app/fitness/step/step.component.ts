/**
 * Component to display steps details
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { AfterViewInit, Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MdDatepicker, MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';

import { ColumnChartComponent } from '../chart/column-chart.component';
import { StepConfig } from './step-config';
import { StepService } from './step.service';
import { IconButton } from '../../shared/icon-button';
import { DateUtils } from '../../utils/date.utils';

@Component({
  selector: 'lf-fitness-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements AfterViewInit, OnDestroy {
  
  public stepsGoal: number = 8000;
  private _config: StepConfig = {
    scale: 'day',
    period: 'thismonth',    
  };
    
  @ViewChild('chart')
  public chart: ColumnChartComponent;
    
  private _subscription: Subscription;
    
  public actionButtons: IconButton[] = [
   { icon: 'settings', action: 'function', target: function () { this.openConfiguration(); } }   
  ];
        
  /**
   * Constructor
   * 
   * @param _toolbarService Toolbar service
   * @param _stepService Step service
   */    
  constructor(private _stepService: StepService, private _dialog: MdDialog) { }    
    
  /**
   * Display configuration dialog
   */
  public openConfiguration(): void {
    let configDialog = this._dialog.open(StepConfigComponent, {
      width: '400px', 
      data: this._config 
    });  
    configDialog.afterClosed()
      .subscribe(data => {
        this._config = data;
        this._readSteps();
      });
  }
    
  /**
   * Component action after view init
   * Read the values
   */
  public ngAfterViewInit(): void {
    this._readSteps();
  }
    
  /**
   * Read steps values

   */
  private _readSteps(): void{
    let self = this;  

    if (this._config.period != 'custom') {
      let dates = DateUtils.getStartAndEndOfPeriod(this._config.period);
      this._config.start = dates.start.toDate();
      this._config.end = dates.end.toDate();
    }
    let goal = -1;
    switch(this._config.scale) {
      case 'day':
        goal = this.stepsGoal;
        break;
      case 'week':
        goal = this.stepsGoal*7;
        break;
      case 'month':
        goal = this.stepsGoal*30;
        break;
        case 'year':
        goal = this.stepsGoal*365;
        break;                         
    }
    
    this.chart.showLoading();
    this.chart.setScale(this._config.scale);
    this.chart.setGoal(goal);
    this._subscription = this._stepService.readBetweenDatesOrderByDate(this._config.scale, this._config.start.getTime(), this._config.end.getTime())
      .subscribe(
        data => {
          let points = [];
          for (let step of data) {
            points.push([step.date, step.value])
          }
          self.chart.setPoints(points);
          self.chart.hideLoading(); 
      }
    );  
  }

  /**
   * Component destruction
   * Unsubscribe to firebase connection
   */
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }    
}

/**
 * Dialog component to define configuration parameters
 */
@Component({
  selector: 'lf-fitness-step-config',
  templateUrl: './step-config.component.html',
  styles: [` 
    md-select { width: 100%; }
    md-form-field { width: 100%; }
  `]
})
export class StepConfigComponent {
  @ViewChild(MdDatepicker) datepicker: MdDatepicker<Date>;

  /**
   * Constructor
   * 
   * @param dialogRef
   * @param data 
   */
  constructor(public dialogRef: MdDialogRef<StepConfigComponent>, @Inject(MD_DIALOG_DATA) public config: StepConfig) {

  }
}
