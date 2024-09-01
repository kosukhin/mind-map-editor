import { MapObject } from '@/modules/application/mapObject/MapObject';
import { MapDocument, MapObjectDocument } from '@/modules/entities/MapStructures';
import { MapType } from '@/modules/application/map/MapType';
import { MapFileType } from '@/modules/application/mapFile/MapFileType';
import { Guest } from '@/modules/system/guest/Guest';

export class MapObjectBase implements MapObject {
  public constructor(private map: MapType, private mapFile: MapFileType) {}

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
