import { GuestType } from '../guest/GuestType';

export interface SystemFile {
  content(target: GuestType<string>): this;
  save(content: string): this;
}
