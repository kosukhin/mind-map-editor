import { MapFileDocument, MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestObjectType } from 'patron-oop';

/**
 * Поведения для файла с картами
 */
export interface MapFileType extends GuestObjectType<MapFileDocument> {
  currentMap(target: GuestObjectType<MapDocument>): GuestObjectType<MapDocument>;
  mapFile(target: GuestObjectType<MapFileDocument>): GuestObjectType<MapFileDocument>;
}
