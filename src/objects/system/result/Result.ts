import { Channel } from '@/objects/system/channel/Channel';

export interface Result<T> {
  channel(): Channel<T>;
  exists(): boolean;
  result(): T;
  replace(newResult: Result<T>): this;
}
