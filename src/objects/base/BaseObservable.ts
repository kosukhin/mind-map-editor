import { BaseObserver } from '@/objects/base/BaseObserver';

export interface BaseObservable<T> {
  subscribe(observer: BaseObserver<T>): void;
}
