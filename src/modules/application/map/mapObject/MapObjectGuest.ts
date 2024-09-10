import { MapObjectType } from '@/modules/application/map/mapObject/MapObjectType';
import { MapDocument, MapObjectDocument } from '@/modules/entities/MapStructures';
import { MapType } from '@/modules/application/map/mapCurrent/MapType';
import { MapFileType } from '@/modules/application/map/mapFile/MapFileType';
import { Guest } from '@/modules/system/guest/Guest';

export class MapObjectGuest implements MapObjectType {
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
