import { Guest } from '@/modules/system/guest/Guest';

export interface MapFileContent extends Guest<string> {
  content(target: Guest<string>): this;
}
