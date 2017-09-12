/**
 * Chart card generic component
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { EventEmitter, Input } from '@angular/core';

export abstract class ChartComponent {

  public options: any;
  protected _chart: any;
    
  @Input('unit')
  protected _unit: String;
    

  @Input('goal')
  protected _goal: number;  

  /**
   * Save chart instance
   * 
   * @param chartInstance Chart Instance
   */
  saveInstance(chartInstance) {
    this._chart = chartInstance;
    if (this._goal) {
      this.setGoal(this._goal);
    }
  }
  
  /**
   * Add a point to the chart
   * 
   * @param point Point tu add
   */
  public addPoint(point: any): void {
    this._chart.series[0].addPoint({
      x: point.date,
      y: point.value
    });   
  }
    
  /**
   * Show chart loading
   */
  public showLoading() {
    this._chart.showLoading();
  }    
  
  /**
   * Hide chart loading
   */
  public hideLoading() {
    this._chart.hideLoading();
  }
    
  /**
   * Set a goal
   * 
   * @param goal Goal to add
   */
  public setGoal(goal: number): void {
    this._goal = goal;
  }    
}
