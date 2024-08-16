import { Channel } from '@/modules/system/channel/Channel';
import { Result } from '@/modules/system/result/Result';
import { ResultObservable } from '@/modules/system/result/ResultObservable';
import { ResultObservableOf } from '@/modules/system/result/ResultObservableOf';

export class ResultPromise<T> implements ResultObservable<T> {
  private innerResult = new ResultObservableOf<T>(null);

  public constructor(promise: Promise<T>) {
    promise.then((value) => this.innerResult.replaceResult(value));
  }

  replaceResult(newResult: T): this {
    this.innerResult.replaceResult(newResult);
    return this;
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
}
