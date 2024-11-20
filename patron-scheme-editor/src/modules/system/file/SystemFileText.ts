import { SystemFileType } from '@/modules/system/file/SystemFileType';
import { GuestObjectType } from 'patron-oop';

export class SystemFileText implements SystemFileType {
  public constructor(private text: string) {}

  content(target: GuestObjectType<string>): this {
    target.give(this.text);
    return this;
  }
}
