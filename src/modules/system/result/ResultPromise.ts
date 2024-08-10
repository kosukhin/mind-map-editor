import { Channel } from '@/modules/system/channel/Channel';
import { Result } from '@/modules/system/result/Result';
import { ResultOf } from '@/modules/system/result/ResultOf';

export class ResultPromise<T> implements Result<T> {
  private innerResult = new ResultOf<T>(null);

  public constructor(promise: Promise<T>) {
    promise.then((value) => this.innerResult.replace(new ResultOf(value)));
  }

  public channel(): Channel<Result<T>> {
    return this.innerResult.channel();
  }

  public exists(): boolean {
    return this.innerResult.exists();
  }

  public result(): T {
    return this.innerResult.result();
  }

  public replace(newResult: Result<T>): this {
    this.innerResult.replace(newResult);
    return this;
  }
}
