import { MapDocument, MapObjectDocument, MapSettingsDocument, MapTypeDocument } from '../documents/MapStructures';
import { GuestObjectType } from 'patron-oop';
/**
 * Поведения для получения частей карты
 */
export interface MapType extends GuestObjectType<MapDocument> {
    settings(guest: GuestObjectType<MapSettingsDocument>): GuestObjectType<MapSettingsDocument>;
    objects(guest: GuestObjectType<MapObjectDocument[]>): GuestObjectType<MapObjectDocument[]>;
    types(guest: GuestObjectType<MapTypeDocument[]>): GuestObjectType<MapTypeDocument[]>;
}
