import { IObservableCollection } from 'observable-entities';

export interface ITrackableCollection<TEntity> extends IObservableCollection<TEntity> {
  tracking: boolean;
}
