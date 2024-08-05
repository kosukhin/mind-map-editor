import { BaseEntity } from '@/objects/base/BaseEntity';
import { BaseChannel } from './BaseChannel';

export interface BaseChannelEntity<T> extends BaseEntity<T> {
  channel(): BaseChannel<T>;
}
