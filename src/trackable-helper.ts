import { Subject } from 'rxjs/Subject';

import { IDeletedEntities } from './deleted-entitites';
import { IEntityNotifyInfo } from './entity-notify-info';
import { IPropertyNotifyInfo } from './property-notify-info';
import { TrackingState } from './tracking-state';
import { ITrackableCollection } from './trackable-collection';
import { TrackableEntity } from './trackable-entitiy';

export abstract class TrackableHelper {

  public static setTracking<TEntity extends TrackableEntity>(
    trackable: ITrackableCollection<TEntity | [any, TrackableEntity]>,
    deletedEntities: IDeletedEntities,
    modifyListener: Subject<IPropertyNotifyInfo>,
    addListener: Subject<IEntityNotifyInfo<TEntity>>,
    removeListener: Subject<IEntityNotifyInfo<TEntity>>): void {

    if (trackable.tracking === true) {
      const addIndex = trackable.addListeners.indexOf(addListener);
      if (addIndex < 0) {
        addListener.subscribe(notifyInfo => {
          if (notifyInfo && notifyInfo.currentValue) {
            notifyInfo.currentValue.trackingState = TrackingState.Added;
          }
        });
        trackable.addListeners.push(addListener);
      }
      const removeIndex = trackable.removeListeners.indexOf(removeListener);
      if (removeIndex < 0) {
        removeListener.subscribe(notifyInfo => {
          if (notifyInfo && notifyInfo.currentValue) {
            notifyInfo.currentValue.trackingState = TrackingState.Deleted;
            if (deletedEntities.add) {
              deletedEntities.add(notifyInfo.currentValue);
            } else if (deletedEntities.set) {
              deletedEntities.set(notifyInfo.key, notifyInfo.currentValue);
            }
          }
        });
        trackable.removeListeners.push(removeListener);
      }
    } else {
      const addIndex = trackable.addListeners.indexOf(addListener);
      if (addIndex >= 0) {
        addListener.unsubscribe();
        trackable.addListeners.splice(addIndex, trackable.addListeners.length);
      }
      const removeIndex = trackable.removeListeners.indexOf(removeListener);
      if (removeIndex >= 0) {
        removeListener.unsubscribe();
        deletedEntities.clear();
        trackable.removeListeners.splice(addIndex, trackable.removeListeners.length);
      }
    }
    [...trackable].forEach(item => {
      if (item instanceof TrackableEntity) {
        item.tracking = trackable.tracking;
      } else {
        const entity = item as [any, TrackableEntity];
        entity[1].tracking = trackable.tracking;
      }
    });
  }
}
