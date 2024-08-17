import { Guest } from '@/modules/system/guest/Guest';
import { MapDocument, MapSettingsDocument } from '@/modules/entities/MapStructures';

export interface Map extends Guest<MapDocument> {
  mapSettings(guest: Guest<MapSettingsDocument>): this;
}
