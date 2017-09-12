/**
 * Service to interact with a firebase database
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export abstract class FirebaseService<E> {
  private _observable$: FirebaseListObservable<E[]>;
  
  /**
   * Constructor
   *
   * @param _db Firebase database service
   */
  constructor(protected _db: AngularFireDatabase) {	
  }

  /**
   * Create an entity
   *
   * @param entity Entity to create
   * @return Promise
   */
  public create(entity: E): any {
    return this._observable$.push(entity);
  }

  /**
   * Read entities
   * 
   * @param path Path
   * @param query Query parameters
   * @return Observable
   */
  public read(path: string, query: any): Observable<E[]> {
    this._observable$ = this._db.list(path, { query: query });
    return this._observable$;
  }

  /**
   * Read an entity by id
   * 
   * @param path Path
   * @param id Identifier
   * @return Observable
   */
  public readById(path: string, id: string): Observable<E> {
   return this._db.object(path + '/' + id);
  }

  /**
   * Update an entity
   *
   * @param id Identifier
   * @param entity Entity to update
   * @return Promise
   */
	public update(id: string, entity: E): any {
		return this._observable$.update(id, entity);
	}

  /**
   * Delete an entity by id
   *
   * @param id Identifier
   * @return Promise
   */
  public delete (id: string): any {
    return this._observable$.remove(id);
  }
}