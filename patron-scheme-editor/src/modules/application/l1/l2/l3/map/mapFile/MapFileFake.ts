import {
  MapDocument,
  MapFileDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { GuestObjectType, PatronPool } from 'patron-oop';

/**
 * Фейковый объект для получения файла с картами
 */
export class MapFileFake implements MapFileType {
  private currentMapPool = new PatronPool(this);

  private mapFilePool = new PatronPool(this);

  public constructor(private mapFileDocument: MapFileDocument) {}

  public currentMap(target: GuestObjectType<MapDocument>) {
    this.currentMapPool.distribute(this.mapFileDocument.current, target);
    return target;
  }

  public mapFile(target: GuestObjectType<MapFileDocument>) {
    this.mapFilePool.distribute(this.mapFileDocument, target);
    return target;
  }

  public give(value: MapFileDocument): this {
    this.mapFileDocument = value;
    this.currentMapPool.give(value.current);
    this.mapFilePool.give(value);
    return this;
  }
}
