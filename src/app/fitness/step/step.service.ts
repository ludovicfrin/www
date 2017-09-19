/**
 * Step service
 * Interact with firebase database
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { Step } from './step';
import { FirebaseService } from '../../shared/firebase.service';

@Injectable()
export class StepService extends FirebaseService<Step> {

  /**
   * Constructor
   *
   * @param _db Firebase database service
   */    
  constructor(protected _db: AngularFireDatabase) {
    super(_db);
  }
    
  /**
   * Read steps of a scale (raw, day, week, month, year) ordered by date
   *
   * @param scale Scale
   * @param query Query parameters
   * @return Observable
   */
  public readOrderByDate(scale: string, query: any): Observable<Step[]> {
    query.orderByChild = 'date';
    return this.read('/step/' + scale, query);
  }  
  
  /**
   * Read raw steps ordered by date
   *
   * @param query Query parameters
   * @return Observable
   */
  public reaRawOrderByDate(query: any): Observable<Step[]> {
    return this.readOrderByDate('raw', query);
  }  
    
  /**
   * Read day steps ordered by date
   *
   * @param query Query parameters
   * @return Observable
   */
  public reaDayOrderByDate(query: any): Observable<Step[]> {
    return this.readOrderByDate('day', query);
  }
    
  /**
   * Read week steps ordered by date
   *
   * @param query Query parameters
   * @return Observable
   */
  public readWeekOrderByDate(query: any): Observable<Step[]> {
    return this.readOrderByDate('week', query);
  }
    
  /**
   * Read month steps ordered by date
   *
   * @param query Query parameters
   * @return Observable
   */
  public readMonthOrderByDate(query: any): Observable<Step[]> {
    return this.readOrderByDate('month', query);
  }
    
  /**
   * Read year steps ordered by date
   *
   * @param query Query parameters
   * @return Observable
   */
  public readByYearOrderByDate(query: any): Observable<Step[]> {
    return this.readOrderByDate('year', query);
  }

/**
   * Read steps at a date
   *
   * @param scale Scale
   * @param date Date in epochtime milliseconds format
   * @return Observable
   */
  public readByDate(scale: string, date: number): Observable<Step[]> {
    let query: any = {
      orderByChild: 'date',
      equalTo: date,
    };
    return this.read('/step/' + scale, query);
  }    
    
  /**
   * Read day steps at a date
   *
   * @param date Date in epochtime milliseconds format
   * @return Observable
   */
  public readDayByDate(date: number): Observable<Step[]> {    
    return this.readByDate('day', date);
  }
    
  /**
   * Read week steps at a date
   *
   * @param date Date in epochtime milliseconds format
   * @return Observable
   */
  public readWeekByDate(date: number): Observable<Step[]> {    
    return this.readByDate('week', date);
  }
    
  /**
   * Read month steps at a date
   *
   * @param date Date in epochtime milliseconds format
   * @return Observable
   */
  public readMonthByDate(date: number): Observable<Step[]> {    
    return this.readByDate('month', date);
  }
    
  /**
   * Read year steps at a date 
   *
   * @param date Date in epochtime milliseconds format
   * @return Observable
   */
  public readYearByDate(date: number): Observable<Step[]> {    
    return this.readByDate('year', date);
  }

  /**
   * Read steps between 2 dates ordered by date
   *
   * @param scale Scale
   * @param start Start date in epochtime milliseconds format
   * @param end End date in epochtime milliseconds format
   * @return Observable
   */
  public readBetweenDatesOrderByDate(scale: string, start: number, end: number): Observable<Step[]> {
    let query: any = {
      startAt: start,
      endAt: end
    };
    return this.readOrderByDate(scale, query);
  }    
    
  /**
   * Read day steps between 2 dates ordered by date
   *
   * @param start Start date in epochtime milliseconds format
   * @param end End date in epochtime milliseconds format
   * @return Observable
   */
  public readDayBetweenDatesOrderByDate(start: number, end: number): Observable<Step[]> {    
    return this.readBetweenDatesOrderByDate('day', start, end);
  }
    
  /**
   * Read week steps between 2 dates ordered by date
   *
   * @param start Start date in epochtime milliseconds format
   * @param end End date in epochtime milliseconds format
   * @return Observable
   */
  public readWeekBetweenDatesOrderByDate(start: number, end: number): Observable<Step[]> {    
    return this.readBetweenDatesOrderByDate('week', start, end);
  }
    
  /**
   * Read month steps between 2 dates ordered by date
   *
   * @param start Start date in epochtime milliseconds format
   * @param end End date in epochtime milliseconds format
   * @return Observable
   */
  public readMonthBetweenDatesOrderByDate(start: number, end: number): Observable<Step[]> {    
    return this.readBetweenDatesOrderByDate('month', start, end);
  }
    
  /**
   * Read year steps between 2 dates ordered by date
   *
   * @param start Start date in epochtime milliseconds format
   * @param end End date in epochtime milliseconds format
   * @return Observable
   */
  public readYearBetweenDatesOrderByDate(start: number, end: number): Observable<Step[]> {    
    return this.readBetweenDatesOrderByDate('year', start, end);
  } 
}
