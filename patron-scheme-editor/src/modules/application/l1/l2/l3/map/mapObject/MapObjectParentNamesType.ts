import { GuestObjectType } from 'patron-oop';

export interface MapObjectParentNamesType {
  names(guest: GuestObjectType<string[]>): GuestObjectType<string[]>
}
