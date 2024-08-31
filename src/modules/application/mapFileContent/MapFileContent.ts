import { GuestType } from '../../system/guest/GuestType';

export interface MapFileContent extends GuestType<string> {
  content(target: GuestType<string>): this;
}
