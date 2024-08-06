import { BaseChannel } from '@/objects/base/BaseChannel';
import { BaseObserver } from '@/objects/base/BaseObserver';

export class BaseChannelOf<T> implements BaseChannel<T> {
  private observers: BaseObserver<T>[] = [];

  private lastValue: T | null = null;

  public notify(value: T): void {
    this.lastValue = value;
    this.observers.forEach((observer) => observer.notify(value));
  }

  public subscribe(observer: BaseObserver<T>): void {
    this.observers.push(observer);

    // Если уже есть значение сообщаем новым подписчикам о нем
    if (this.lastValue) {
      observer.notify(this.lastValue);
    }
  }
}
