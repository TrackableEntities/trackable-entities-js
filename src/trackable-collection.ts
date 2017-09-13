import { IObservableCollection } from 'observable-entities-js';

export interface ITrackableCollection<TEntity> extends IObservableCollection<TEntity> {
  tracking: boolean;
}
