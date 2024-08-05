import { BaseObservable } from '@/objects/base/BaseObservable';
import { BaseObserver } from '@/objects/base/BaseObserver';

export interface BaseChannel<T> extends BaseObservable<T>, BaseObserver<T> {
}
