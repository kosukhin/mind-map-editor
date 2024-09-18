import {
  MapDocument,
  MapObjectDocument,
  MapSettingsDocument,
  MapTypeDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestType } from '@/modules/system/guest/GuestType';

export interface MapType extends GuestType<MapDocument> {
  settings(guest: GuestType<MapSettingsDocument>): this;
  objects(guest: GuestType<MapObjectDocument[]>): this;
  types(guest: GuestType<MapTypeDocument[]>): this;
}
