import { GuestObjectType } from 'patron-oop';

export interface TextType {
  asString(guest: GuestObjectType<string>): GuestObjectType;
}
