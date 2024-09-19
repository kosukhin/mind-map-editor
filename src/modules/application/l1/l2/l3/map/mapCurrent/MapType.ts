import {
  MapDocument,
  MapObjectDocument,
  MapSettingsDocument,
  MapTypeDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestType } from '@/modules/system/guest/GuestType';

/**
 * Поведения для получения частей карты
 */
export interface MapType extends GuestType<MapDocument> {
  settings(guest: GuestType<MapSettingsDocument>): GuestType<MapSettingsDocument>;
  objects(guest: GuestType<MapObjectDocument[]>): GuestType<MapObjectDocument[]>;
  types(guest: GuestType<MapTypeDocument[]>): GuestType<MapTypeDocument[]>;
}
