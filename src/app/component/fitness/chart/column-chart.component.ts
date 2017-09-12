/**
 * Component to create a column chart
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { Component, OnInit } from '@angular/core';

import { ChartComponent } from './chart.component';

@Component({
  selector: 'column-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ColumnChartComponent extends ChartComponent implements OnInit { 
    
  /**
   * Component initialisation
   * Define default chart options
   */
  public ngOnInit(): void {
    let self = this;
      
    this.options = {
      chart: {
        type: 'column'
      }, title : {
        text : ''
      }, xAxis: {
        type: 'datetime'
      }, yAxis: {
        title: {
          text: this._unit
        },
        min: 0
      }, series: [{
        name: 'serie',
        pointPadding: 0,
        groupPadding: 0,
      }], legend: {
        enabled: false
      }, tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}"><b>{point.y} ' + this._unit + '</b>'
      }, credits: {
        enabled: false
      }
    };
  } 
    
  /**
   * Set a goal
   * Add A line to define the goal to reach
   * 
   * @param goal Goal to set
   */
  public setGoal(goal: number): void {
    super.setGoal(goal);
      
    this._chart.update({
      plotOptions: {
        column: {
          zones: [{
            value: this._goal, 
            color: '#DF5353'
          }, {
            color: '#64E572'                              
          }]
        }
      }
    });
    this._chart.yAxis[0].addPlotLine({
      value: goal,
      dashStyle: 'ShortDash',
      color: '#DF5353',
      width: 2,
      zIndex: 1000
    });
  }    
}
