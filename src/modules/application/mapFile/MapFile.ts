import { MapFileDocument, MapDocument } from '@/modules/entities/MapStructures';
import { Target } from '@/modules/system/target/Target';

export interface MapFile {
  currentMap(target: Target<MapDocument>): this;
  currentMapPool(target: Target<MapDocument>): this;

  mapFile(target: Target<MapFileDocument>): this;
  mapFilePool(target: Target<MapFileDocument>): this;
}
