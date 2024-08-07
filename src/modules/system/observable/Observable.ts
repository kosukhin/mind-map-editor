import { Observer } from '@/modules/system/observer/Observer';

export interface Observable<T> {
  subscribe(observer: Observer<T>): void;
}
