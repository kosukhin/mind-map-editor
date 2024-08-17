import { Guest } from '@/modules/system/guest/Guest';

export interface SystemFile {
  content(target: Guest<string>): this;
  save(content: string): this;
}
