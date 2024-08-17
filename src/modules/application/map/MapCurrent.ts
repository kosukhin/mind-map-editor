import { Map } from '@/modules/application/map/Map';
import { Target } from '@/modules/system/target/Target';
import { MapDocument, MapSettingsDocument } from '@/modules/entities/MapStructures';
import { MapFile } from '@/modules/application/mapFile/MapFile';
import { TargetDynamic } from '@/modules/system/target/TargetDynamic';

export class MapCurrent implements Map, Target<MapDocument> {
  public constructor(private mapFile: MapFile) {
  }

  mapSettings(target: Target<MapSettingsDocument>): this {
    const currentTarget = new TargetDynamic((value: MapDocument) => {
      target.receive(value.settings);
    });
    this.mapFile.currentMap(currentTarget);
    return this;
  }

  receive(value: MapDocument): this {
    return this;
  }
}
