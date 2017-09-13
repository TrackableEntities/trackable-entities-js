import { INotifyInfo } from 'observable-entities-js';

export interface IPropertyNotifyInfo extends INotifyInfo {
  key?: string;
  origValue?: any;
  currentValue?: any;
}
