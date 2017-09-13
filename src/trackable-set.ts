import { Subject } from 'rxjs/Subject';

import { IEntityNotifyInfo } from './entity-notify-info';
import { ObservableSet } from 'observable-entities-js';
import { IPropertyNotifyInfo } from './property-notify-info';
import { ITrackable } from './trackable';
import { ITrackableCollection } from './trackable-collection';
import { TrackableEntity } from './trackable-entitiy';
import { TrackableHelper } from './trackable-helper';

export class TrackableSet<TEntity extends TrackableEntity>
  extends ObservableSet<TEntity> implements ITrackableCollection<TEntity> {

  private _tracking: boolean;
  private _modifyListener = new Subject<IPropertyNotifyInfo>();
  private _addListener = new Subject<IEntityNotifyInfo<TEntity>>();
  private _removeListener = new Subject<IEntityNotifyInfo<TEntity>>();

  protected deletedEntities = new Set<TEntity>();

  constructor(...items: TEntity[]) {
    super(...items);
  }

  get tracking(): boolean {
    return this._tracking;
  }

  set tracking(value: boolean) {
    this._tracking = value;
    this.setTracking();
  }

  private setTracking(): void {
    TrackableHelper.setTracking(this, this.deletedEntities, this._modifyListener, this._addListener, this._removeListener);
  }
}
