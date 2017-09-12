/**
 * Fitness component
 * Display a dashboard with several fitness indicators
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import { Moment } from 'moment';

import { StepService } from '../../service/step.service';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'fitness',
  templateUrl: './fitness.component.html'
})
export class FitnessComponent implements OnInit {
  private _charts: ChartComponent[] = []; 
    
  /**
   * Constructor
   * 
   * @param _stepService Step service
   */
  constructor(private _stepService: StepService) {  
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
   * Setter of details steps chart
   * 
   * @param chart Details Steps chart
   */
  @ViewChild('detailsSteps')
  set detailsStepsChart(chart: ChartComponent) {
    this._charts['detailsSteps'] = chart;
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
   * Component init
   * Read the values to display the differents cards
   */
  public ngOnInit(): void {
          
    for (let chart of this._charts) {
      chart.showLoading();
    }
      
    let start = moment().set({
      date: 1,
      hour: 0,
      minute:0,
      second: 0,
      millisecond: 0
    });
    
    let today = moment().set({
      hour: 0,
      minute:0,
      second: 0,
      millisecond: 0
    });

    this._stepService.readByDay({
      orderByChild: 'date',
      startAt: parseInt(start.format('x'))
    }).subscribe(
      result => {
        let totalSteps: number = 0;
        for (let step of result) {
          if (step.date == parseInt(today.format('x'))) {
             this._charts['todaySteps'].addPoint(step);
          }
          totalSteps += step.value;
          this._charts['detailsSteps'].addPoint(step);
        }
        this._charts['averageSteps'].addPoint({ value: Math.round(totalSteps/result.length) });
        this._charts['distance'].addPoint({ value: Math.round(totalSteps*0.07452)/100 });
        this._charts['distance'].setGoal(Math.round(result.length*8000*0.07452)/100);
          
        for (let chart of this._charts) {
          chart.hideLoading();
        }
      }  
    );
  }
}
