import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { GuestType } from './GuestType';

export type CacheType<T> = GuestType<T> & GuestAwareType<T>
