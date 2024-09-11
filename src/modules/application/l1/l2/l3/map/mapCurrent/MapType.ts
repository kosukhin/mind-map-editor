import {
  MapDocument,
  MapObjectDocument,
  MapSettingsDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestType } from '@/modules/system/guest/GuestType';

export interface MapType extends GuestType<MapDocument> {
  mapSettings(guest: GuestType<MapSettingsDocument>): this;
  mapObjects(guest: GuestType<MapObjectDocument[]>): this;
}
