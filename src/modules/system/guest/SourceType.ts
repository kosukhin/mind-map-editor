import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { GuestType } from '@/modules/system/guest/GuestType';

export type SourceType<T = unknown> = GuestAwareType<T> & GuestType<T>;
