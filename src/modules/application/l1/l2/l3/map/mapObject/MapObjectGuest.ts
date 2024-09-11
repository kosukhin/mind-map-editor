import { MapObjectType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';
import { MapDocument, MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
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
