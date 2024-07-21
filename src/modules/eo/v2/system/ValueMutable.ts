import { Mutable } from '@/modules/eo/targets/system/Mutable';
import { Observable } from '@/modules/eo/targets/system/Observable';
import { Observer } from '@/modules/eo/targets/system/Observer';
import { Valueable } from '@/modules/eo/targets/system/Valueable';

export class ValueMutable<T> implements Valueable<T>, Mutable<T>, Observable<T> {
  private observers: Observer<T>[] = [];

  constructor(private innerValue: T) {}

  value(): T {
    return this.innerValue;
  }

  subscribe(observer: Observer<T>): void {
    this.observers.push(observer);
  }

  set(value: T): this {
    this.innerValue = value;
    this.observers.forEach((observer) => observer.notify(this.innerValue));
    return this;
  }
}
