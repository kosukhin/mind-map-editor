import { GuestObjectType } from 'patron-oop';
export interface MapCurrentIDType extends GuestObjectType<string> {
    id(guest: GuestObjectType<string>): GuestObjectType<string>;
}
