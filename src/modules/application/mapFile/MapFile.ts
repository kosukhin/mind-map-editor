import { MapFileDocument, MapDocument } from '@/modules/entities/MapStructures';
import { Guest } from '@/modules/system/guest/Guest';

export interface MapFile extends Guest<MapFileDocument> {
  currentMap(target: Guest<MapDocument>): this;
  mapFile(target: Guest<MapFileDocument>): this;
}
