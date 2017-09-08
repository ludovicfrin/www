/**
 * Service to interact with a firebase database
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export abstract class FirebaseService<E> {
  protected _observable$: FirebaseListObservable<E[]>;

  /**
   * Constructor
   *
   * @param _db Firebase database service
   * @param path Entity path access
   */
  constructor(protected _db: AngularFireDatabase, public path: string) {	
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
   * @param query Query parameters
   * @return Observable
   */
  public read(): Observable<E[]> {
    this._observable$ = this._db.list(this.path);
    return this._observable$;
  }

  /**
   * Read an entity by id
   *
   * @param id Identifier
   * @return Observable
   */
  public readById(id: string): Observable<E> {
   return this._db.object(this.path + '/' + id);
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