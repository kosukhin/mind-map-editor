import { Channel } from '@/modules/system/channel/Channel';
import { ChannelOf } from '@/modules/system/channel/ChannelOf';
import { Result } from '@/modules/system/result/Result';

export class ResultOf<T> implements Result<T> {
  private innerChannel: Channel<Result<T>> | null = null;

  public constructor(private value: T | null) {}

  public channel(): Channel<Result<T>> {
    // Создаем канал только если он нужен
    if (!this.innerChannel) {
      this.innerChannel = new ChannelOf<Result<T>>(this.value ? this : null);
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

  public replace(newResult: Result<T>): this {
    this.value = newResult.result();
    this.channel().notify(this);
    return this;
  }
}
