import { MapObject } from '@/modules/application/mapObject/MapObject';
import { MapDocument, MapObjectDocument } from '@/modules/entities/MapStructures';
import { Map } from '@/modules/application/map/Map';
import { MapFile } from '@/modules/application/mapFile/MapFile';
import { Guest } from '@/modules/system/guest/Guest';

export class MapObjectBase implements MapObject {
  public constructor(private map: Map, private mapFile: MapFile) {}

  receive(value: MapObjectDocument): this {
    this.mapFile.currentMap(new Guest((latestMap: MapDocument) => {
      this.map.receive({
        ...latestMap,
        objects: {
          ...latestMap.objects,
          [value.id]: value,
        },
      });
    }));
    return this;
  }
}
