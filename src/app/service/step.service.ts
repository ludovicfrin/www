/**
 * Step service
 * Interact with firebase database
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { FirebaseService } from './firebase.service';
import { Step } from '../entity/step';

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
   * Read steps by day
   *
   * @param query Query parameters
   * @return Observable
   */
  public readByDay(query: any): Observable<Step[]> {
    return this.read('/step/day', query);
  }
    
  /**
   * Read steps by day
   *
   * @param query Query parameters
   * @return Observable
   */
  public readByWeek(query: any): Observable<Step[]> {
    return this.read('/step/week', query);
  }
    
  /**
   * Read steps by day
   *
   * @param query Query parameters
   * @return Observable
   */
  public readByMonth(query: any): Observable<Step[]> {
    return this.read('/step/month', query);
  }
    
  /**
   * Read steps by day
   *
   * @param query Query parameters
   * @return Observable
   */
  public readByYear(query: any): Observable<Step[]> {
    return this.read('/step/year', query);
  }    

}
