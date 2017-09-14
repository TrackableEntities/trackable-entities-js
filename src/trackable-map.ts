import { Subject } from 'rxjs/Subject';

import { IEntityNotifyInfo } from './entity-notify-info';
import { ObservableMap } from 'observable-entities';
import { IPropertyNotifyInfo } from './property-notify-info';
import { ITrackableCollection } from './trackable-collection';
import { TrackableEntity } from './trackable-entitiy';
import { TrackableHelper } from './trackable-helper';

export class TrackableMap<TKey, TEntity extends TrackableEntity>
  extends ObservableMap<TKey, TEntity> implements ITrackableCollection<TEntity> {

  private _tracking: boolean;
  private _modifyListener = new Subject<IPropertyNotifyInfo>();
  private _addListener = new Subject<IEntityNotifyInfo<TEntity>>();
  private _removeListener = new Subject<IEntityNotifyInfo<TEntity>>();

  protected deletedEntities = new Map<TKey, TEntity>();

  constructor(...entries: [TKey, TEntity][]) {
    super(...entries);
  }

  get tracking(): boolean {
    return this._tracking;
  }

  set tracking(value: boolean) {
    this._tracking = value;
    this.setTracking();
  }

  private setTracking() {
    TrackableHelper.setTracking(this, this.deletedEntities, this._modifyListener, this._addListener, this._removeListener);
  }
}
