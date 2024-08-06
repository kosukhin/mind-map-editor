import { Observable } from '@/objects/system/observable/Observable';
import { Observer } from '@/objects/system/observer/Observer';

export interface Channel<T> extends Observable<T>, Observer<T> {
}
