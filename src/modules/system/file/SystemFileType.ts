import { GuestObjectType } from 'patron-oop';

export interface SystemFileType {
  content(target: GuestObjectType<string>): this;
}
