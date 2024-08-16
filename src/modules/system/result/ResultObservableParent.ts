import { Channel } from '@/modules/system/channel/Channel';
import { ResultObservable } from '@/modules/system/result/ResultObservable';

export abstract class ResultObservableParent<T> implements ResultObservable<T> {
  constructor(private parent: ResultObservable<T>) {}

  channel(): Channel<ResultObservable<T>> {
    return this.parent.channel();
  }

  exists(): boolean {
    return this.parent.exists();
  }

  result(): T {
    return this.parent.result();
  }

  replaceResult(newResult: T): this {
    this.parent.replaceResult(newResult);
    return this;
  }
}
