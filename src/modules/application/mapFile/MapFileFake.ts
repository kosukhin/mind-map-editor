import { MapFileType } from '@/modules/application/mapFile/MapFileType';
import { MapFileDocument } from '@/modules/entities/MapStructures';
import { PatronPool } from '@/modules/system/guest/PatronPool';

export class MapFileFake implements MapFileType {
  public constructor(
    private mapFileDocument: MapFileDocument,
    private currentMapPool = new PatronPool(this),
    private mapFilePool = new PatronPool(this),
  ) {}

  public currentMap(target): this {
    this.currentMapPool.distribute(
      this.mapFileDocument.current,
      target,
    );
    return this;
  }

  public mapFile(target): this {
    this.mapFilePool.distribute(
      this.mapFileDocument,
      target,
    );
    return this;
  }

  public receive(value): this {
    this.mapFileDocument = value;
    this.currentMapPool.receive(value.current);
    this.mapFilePool.receive(value);
    return this;
  }
}
