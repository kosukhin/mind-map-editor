import { MapFileDocument, MapDocument } from '@/modules/entities/MapStructures';
import { GuestType } from '../../../system/guest/GuestType';

export interface MapFileType extends GuestType<MapFileDocument> {
  currentMap(target: GuestType<MapDocument>): this;
  mapFile(target: GuestType<MapFileDocument>): this;
}
