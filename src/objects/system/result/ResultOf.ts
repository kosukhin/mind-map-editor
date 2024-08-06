import { ChannelOf } from '@/objects/system/channel/ChannelOf';
import { Result } from '@/objects/system/result/Result';

export class ResultOf<T> implements Result<T> {
  private innerChannel = new ChannelOf<T>()

  public constructor(private value: T | null) {
    this.innerChannel.subscribe({
      notify: (valueFromChannel) => {
        this.value = valueFromChannel;
      },
    });
  }

  public channel() {
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
    this.channel().notify(this.value);
    return this;
  }
}
