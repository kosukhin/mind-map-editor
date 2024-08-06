import { Channel } from '@/objects/system/channel/Channel';
import { Observer } from '@/objects/system/observer/Observer';

export class ChannelOf<T> implements Channel<T> {
  private observers: Observer<T>[] = [];

  private lastValue: T | null = null;

  public notify(value: T): void {
    this.lastValue = value;
    this.observers.forEach((observer) => observer.notify(value));
  }

  public subscribe(observer: Observer<T>): void {
    this.observers.push(observer);

    // Если уже есть значение сообщаем новым подписчикам о нем
    if (this.lastValue) {
      observer.notify(this.lastValue);
    }
  }
}
