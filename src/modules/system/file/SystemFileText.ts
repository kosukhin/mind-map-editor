import { SystemFileType } from '@/modules/system/file/SystemFileType';
import { GuestType } from '@/modules/system/guest/GuestType';

export class SystemFileText implements SystemFileType {
  public constructor(
    private text: string,
  ) {}

  content(target: GuestType<string>): this {
    target.receive(this.text);
    return this;
  }
}
