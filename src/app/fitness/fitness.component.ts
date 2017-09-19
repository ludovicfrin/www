/**
 * Fitness component
 * Display a dashboard with several fitness indicators
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';

import { Moment } from 'moment';
import { Subscription } from 'rxjs/Subscription';

import { ChartComponent } from './chart/chart.component';
import { StepService } from './step/step.service';
import { Step } from './step/step';
import { DateUtils } from '../utils/date.utils';

@Component({
  selector: 'lf-fitness',
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.css']
})
export class FitnessComponent implements AfterViewInit, OnDestroy {
  public stepsGoal: number = 8000;
  private _charts: ChartComponent[] = [];
  private _subscriptions = [];
    
  /**
   * Constructor
   * 
   * @param _stepService Step service
   */
  constructor(private _stepService: StepService) {}
    
  /**
   * Component action after view init
   * Read the values to display the differents cards
   */
  public ngAfterViewInit(): void {
    let defaultView: string = 'week';
    this.readTodaySteps();
    this.readAverageSteps(defaultView);
    this.readSuccessSteps(defaultView);
    this.readDistance(defaultView);
  }    
    
  /**
   * Setter of today steps chart
   * 
   * @param chart Today Steps chart
   */
  @ViewChild('todaySteps')
  set todayStepsChart(chart: ChartComponent) {
    this._charts['todaySteps'] = chart;
  }
    
  /**
   * Setter of average steps chart
   * 
   * @param chart Average Steps chart
   */
  @ViewChild('averageSteps')
  set averageStepsChart(chart: ChartComponent) {
    this._charts['averageSteps'] = chart;
  }
    
  /**
   * Setter of success steps chart
   * 
   * @param chart Average Steps chart
   */
  @ViewChild('successSteps')
  set successStepsChart(chart: ChartComponent) {
    this._charts['successSteps'] = chart;
  }
    
  /**
   * Setter of distance chart
   * 
   * @param chart Distance chart
   */
  @ViewChild('distance')
  set distanceChart(chart: ChartComponent) {
    this._charts['distance'] = chart;
  }
    
  /**
   * Read the current steps of this day
   */
  public readTodaySteps () {
    let self = this;
    let date: number = parseInt(DateUtils.getThisDay('x'));
    
    this._charts['todaySteps'].showLoading();
    this._subscriptions.push(
      this._stepService.readByDate('day', date)
        .subscribe(data => {
          if (date != null && data.length > 0) {
            self._charts['todaySteps'].addPoint(data[0].value);
          }
          self._charts['todaySteps'].hideLoading();
        })
    );        
  } 
    
  /**
   * Read the average steps on a period
   * 
   * @param period Period
   */
  public readAverageSteps(period: string) {
    let self = this;
    let date: Moment;

    this._charts['averageSteps'].showLoading();
    switch (period) {
      case 'week':
        date = DateUtils.getFirstDayOfThisWeek();
        break;
      case 'month':
        date = DateUtils.getFirstDayOfThisMonth();
        break;
      case 'year':
        date = DateUtils.getFirstDayOfThisYear();
        break;                           
    }
      
    this._subscriptions.push(
      this._stepService.readByDate(period, parseInt(date.format('x')))
        .subscribe(data => {
          if (data.length > 0) {
            let nbDays = DateUtils.getThisDay().diff(date, 'days');
            self._charts['averageSteps'].addPoint(Math.round(data[0].value/nbDays));
          }
          self._charts['averageSteps'].hideLoading();
        })
    );    
  }    
    
  /**
   * Read the success steps on a period
   * 
   * @param period Period
   */
  public readSuccessSteps(period: string) {
    let self = this;
    let dates: any; 
    
    this._charts['successSteps'].showLoading();
    switch (period) {
      case 'week':
        dates = DateUtils.getStartAndEndOfThisWeek('x');
        break;
      case 'month':
        dates = DateUtils.getStartAndEndOfThisMonth('x');
        break;
      case 'year':
        dates = DateUtils.getStartAndEndOfThisYear('x');
        break;                           
    }
    this._subscriptions.push(
      this._stepService.readBetweenDatesOrderByDate('day', parseInt(dates.start), parseInt(dates.end))
        .subscribe(data => {
          let success: number = 0;
            
          for (let step of data) {
            if (step.value > self.stepsGoal) {
              success++;
            }
          }
          self._charts['successSteps'].addPoint(Math.round((success*10000)/data.length)/100);
          self._charts['successSteps'].hideLoading(); 
        })
    );    
  }
    
  /**
   * Read the distance on a period
   * 
   * @param period Period
   */
  public readDistance(period: string) {
    let self = this;
    let date: Moment;

    this._charts['distance'].showLoading();
    switch (period) {
      case 'week':
        date = DateUtils.getFirstDayOfThisWeek();
        break;
      case 'month':
        date = DateUtils.getFirstDayOfThisMonth();
        break;
      case 'year':
        date = DateUtils.getFirstDayOfThisYear();
        break;                           
    }
      
    this._subscriptions.push(
      this._stepService.readByDate(period, parseInt(date.format('x')))
        .subscribe(data => {
          if (data.length > 0) {
            self._charts['distance'].addPoint(Math.round(data[0].value*0.07452)/100);
          }
          self._charts['distance'].hideLoading();
        })
    ); 
  }    

  /**
   * Component destruction
   * Unsubscribe to the differents firebase connection
   */
  ngOnDestroy() {
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
