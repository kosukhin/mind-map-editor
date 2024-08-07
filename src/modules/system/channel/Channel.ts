import { Observable } from '@/modules/system/observable/Observable';
import { Observer } from '@/modules/system/observer/Observer';

export interface Channel<T> extends Observable<T>, Observer<T> {
}
