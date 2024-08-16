import { Channel } from '@/modules/system/channel/Channel';

export interface Channelable<T> {
  channel(): Channel<T>;
}
