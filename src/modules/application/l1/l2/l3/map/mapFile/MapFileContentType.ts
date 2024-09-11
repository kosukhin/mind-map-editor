import { GuestType } from '@/modules/system/guest/GuestType';

export interface MapFileContentType extends GuestType<string> {
  content(target: GuestType<string>): this;
}
