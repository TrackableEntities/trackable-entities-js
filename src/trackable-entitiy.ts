import { Subject } from 'rxjs';

import { ObservableEntity } from 'observable-entities';
import { IPropertyNotifyInfo } from './property-notify-info';
import { ITrackable } from './trackable';
import { TrackingState } from './tracking-state';

export abstract class TrackableEntity extends ObservableEntity implements ITrackable {

  public trackingState = TrackingState.Unchanged;
  public modifiedProperties = new Set<string>();

  private _tracking: boolean;
  private _modifyListener = new Subject<IPropertyNotifyInfo>();

  constructor() {
    super();
    super.addExcludedProperties('tracking', 'TrackingState', 'ModifiedProperties');
  }

  get tracking(): boolean {
    return this._tracking;
  }

  set tracking(value: boolean) {
    this._tracking = value;
    this.setTracking();
  }

  private setTracking(): void {
    if (this.tracking) {
      const modifyIndex = this.modifyListeners.indexOf(this._modifyListener);
      if (modifyIndex < 0) {
        this.modifyListeners.push(this._modifyListener);
        this._modifyListener.subscribe(propInfo => {
          if (this._tracking === true && (propInfo.origValue !== propInfo.currentValue)) {
            this.trackingState = TrackingState.Modified;
            this.modifiedProperties.add(propInfo.key);
          }
        });
      }
    } else {
      const modifyIndex = this.modifyListeners.indexOf(this._modifyListener);
      if (modifyIndex >= 0) {
        this.modifyListeners.splice(modifyIndex, this.modifyListeners.length);
      }
    }
  }
}
