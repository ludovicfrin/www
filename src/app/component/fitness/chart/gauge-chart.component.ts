/**
 * Component which create a card with a gauge Chart
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { Component, OnInit } from '@angular/core';

import { ChartComponent } from './chart.component';

@Component({
  selector: 'gauge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class GaugeChartComponent extends ChartComponent implements OnInit {

  /**
   * Component initialisation
   * Define default chart options
   */
  public ngOnInit(): void {
    let self = this;
    this._options = {
      chart: {
        type: 'solidgauge'
      }, title: {
        text: ''
      }, pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{
          outerRadius: '100%',
          innerRadius: '80%',
          borderWidth: 0 }]
      }, yAxis: {
        min: 0, 
        lineWidth: 0,
        tickPositions: []      
      }, tooltip: {
        enabled: false
      }, plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 0,
            borderWidth: 0,
            style: {
              fontFamily: 'Roboto,Helvetica Neue,sans-serif',
              fontSize: '16px'
            }, 
            formatter: function () {
              let result = '<span style="font-size:3em; font-weight: bold">' + this.y + '</span> ' + self._unit;
              if (self._goal) {
                  console.log('ok');
                result += '<br /><span style="font-size:0.8em; font-weight: normal"> ';
                
                if (self._goal == this.y) {
                  result += '=';
                } else if (self._goal > this.y) {
                  result += '&lt;';
                } else {
                  result += '&gt;';
                }
                
                result += ' ' + self._goal + ' ' + self._unit + '</span>';
              }
                console.log(result);
              return result;
            } 
          },
          linecap: 'round',
          stickyTracking: false,
          rounded: true
        }
      }, series: [{
        name: 'serie',
        data: [{
          radius: '100%',
          innerRadius: '80%',
          y: 0
        }]
      }], credits: {
        enabled: false
      }
    };     
  }
  
  /**
   * Add a point to the chart
   * 
   * @param point Point tu add
   */    
  public addPoint(point: any): void {
    this._chart.series[0].addPoint({
            radius: '100%',
            innerRadius: '80%',
            y: point.value
    }, true, true, true);
  } 
  
  /**
   * Set a goal
   * Set the max value
   * 
   * @param goal Goal to set
   */
  public setGoal(goal: number): void {
    super.setGoal(goal);
      
    this._chart.update({
      yAxis: {
        min: 0,
        max: goal, 
        stops: [
          [0.5, '#DF5353'],
          [0.8, '#FF9655'],
          [1, '#64E572']
        ]        
      }
    });
  }
}
