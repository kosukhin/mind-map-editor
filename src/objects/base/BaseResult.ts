import { BaseChannelOf } from '@/objects/base/BaseChannelOf';

export class BaseResult<T> {
  private innerChannel = new BaseChannelOf<T>()

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
      throw new Error('BaseResult: no value!');
    }

    return this.value;
  }

  public replace(newResult: BaseResult<T>): this {
    this.value = newResult.result();
    this.channel().notify(this.value);
    return this;
  }
}
