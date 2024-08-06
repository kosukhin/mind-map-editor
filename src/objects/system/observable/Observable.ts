import { Observer } from '@/objects/system/observer/Observer';

export interface Observable<T> {
  subscribe(observer: Observer<T>): void;
}
