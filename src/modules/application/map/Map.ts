import {
  MapDocument,
  MapObjectDocument,
  MapSettingsDocument,
} from '@/modules/entities/MapStructures';
import { GuestType } from '../../system/guest/GuestType';

export interface Map extends GuestType<MapDocument> {
  mapSettings(guest: GuestType<MapSettingsDocument>): this;
  mapObjects(guest: GuestType<MapObjectDocument[]>): this;
}
