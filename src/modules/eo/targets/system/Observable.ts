import { Observer } from '@/modules/eo/targets/system/Observer';

export interface Observable<T> {
  subscribe(observer: Observer<T>): void;
}
