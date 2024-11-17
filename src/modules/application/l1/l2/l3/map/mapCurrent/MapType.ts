import {
  MapDocument,
  MapObjectDocument,
  MapSettingsDocument,
  MapTypeDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestObjectType } from 'patron-oop';

/**
 * Поведения для получения частей карты
 */
export interface MapType extends GuestObjectType<MapDocument> {
  settings(guest: GuestObjectType<MapSettingsDocument>): GuestObjectType<MapSettingsDocument>;
  objects(guest: GuestObjectType<MapObjectDocument[]>): GuestObjectType<MapObjectDocument[]>;
  types(guest: GuestObjectType<MapTypeDocument[]>): GuestObjectType<MapTypeDocument[]>;
}
