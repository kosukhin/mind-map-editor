import { Channel } from '@/modules/system/channel/Channel';
import { ChannelOf } from '@/modules/system/channel/ChannelOf';
import { ResultObservable } from '@/modules/system/result/ResultObservable';

export class ResultObservableOf<T> implements ResultObservable<T> {
  private innerChannel: Channel<ResultObservable<T>> | null = null;

  public constructor(private value: T | null) {}

  public replaceResult(newResult: T): this {
    this.value = newResult;
    this.channel().notify(this);
    return this;
  }

  public channel(): Channel<ResultObservable<T>> {
    // Создаем канал только если он нужен
    if (!this.innerChannel) {
      this.innerChannel = new ChannelOf<ResultObservable<T>>(this.value ? this : null);
      this.innerChannel.subscribe({
        notify: (valueFromChannel) => {
          this.value = valueFromChannel.result();
        },
      });
    }

    return this.innerChannel;
  }

  public exists() {
    return this.value !== null;
  }

  public result() {
    if (this.value === null) {
      throw new Error('Result: no value!');
    }

    return this.value;
  }
}
