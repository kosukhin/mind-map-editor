import { Channel } from '@/modules/system/channel/Channel';
import { Result } from '@/modules/system/result/Result';

export interface ResultObservable<T> extends Result<T> {
  channel(): Channel<ResultObservable<T>>;
}
