import { GuestType } from '../guest/GuestType';

export interface SystemFileType {
  content(target: GuestType<string>): this;
  save(content: string): this;
}
