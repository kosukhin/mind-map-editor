import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { GuestType } from './GuestType';

export type CacheType<T = unknown> = GuestType<T> & GuestAwareType<T>
