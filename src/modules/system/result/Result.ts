import { Channel } from '@/modules/system/channel/Channel';

export interface Result<T> {
  channel(): Channel<Result<T>>;
  exists(): boolean;
  result(): T;
  replace(newResult: Result<T>): this;
}
