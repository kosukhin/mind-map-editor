import { MapFileDocument, MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestType } from '@/modules/system/guest/GuestType';

/**
 * Поведения для файла с картами
 */
export interface MapFileType extends GuestType<MapFileDocument> {
  currentMap(target: GuestType<MapDocument>): GuestType<MapDocument>;
  mapFile(target: GuestType<MapFileDocument>): GuestType<MapFileDocument>;
}
