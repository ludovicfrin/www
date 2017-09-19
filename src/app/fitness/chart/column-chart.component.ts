/**
 * Component to create a column chart
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { Component, OnInit } from '@angular/core';

import { ChartComponent } from './chart.component';

@Component({
  selector: 'lf-column-chart',
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
        type: 'column',
        zoomType: 'x'
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
    
    this._chart.yAxis[0].removePlotLine('goal');
    if (goal > 0) {
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
        id: 'goal',
        value: goal,
        dashStyle: 'ShortDash',
        color: '#DF5353',
        width: 2,
        zIndex: 1000
      });
    }
  }

  /**
   * Set the xAxis scale for a datetime chart
   * 
   * @param scale Scale
   */
  public setScale(scale: string): void {
    let xAxis: any = {
      type: 'datetime'
    };

		switch (scale) {
			case 'year' :
				xAxis.dateTimeLabelFormats = { 
					millisecond: '%Y', 
					second: '%Y', 
					minute: '%Y', 
					hour: '%Y', 
					day: '%Y', 
					week: '%Y', 
					month: '%Y'
				};
				xAxis.minTickInterval = 3600000*24*365;
				break;
			case 'month' :
				xAxis.dateTimeLabelFormats = {
					millisecond: '%b %y',
					second: '%b %y',
					minute: '%b %y',
					hour: '%b %y',
					day: '%b %y',
					week:'%b  %y'
				}; 
				xAxis.minTickInterval = 3600000*24*30;
				break;
			case 'week' :
				xAxis.dateTimeLabelFormats = {
							millisecond: '%e. %b',
							second: '%e. %b',
							minute: '%e. %b',
							hour: '%e. %b',
					week: '%e. %b'
				};
				xAxis.minTickInterval = 3600000*24*7;
				break;
			case 'day' :
				xAxis.dateTimeLabelFormats = {
					millisecond: '%e. %b',
					second: '%e. %b',
					minute: '%e. %b',
					hour: '%e. %b'
				};
				xAxis.minTickInterval = 3600000*24;
				break;
      default :
        xAxis.dateTimeLabelFormats = {
          millisecond: '%e. %b',
          second: '%e. %b',
          minute: '%e. %b',
          hour: '%e. %b'
        };
				xAxis.minTickInterval = 360000;
				break;
    }
    //this._chart.update({ xAxis: xAxis });
  }
}
