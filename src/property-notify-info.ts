import { INotifyInfo } from 'observable-entities';

export interface IPropertyNotifyInfo extends INotifyInfo {
  key?: string;
  origValue?: any;
  currentValue?: any;
}
