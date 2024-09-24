import { MapObjectsType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';
import { GuestType } from '@/modules/system/guest/GuestType';
import {
  MapDocument,
  MapObjectDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { debug } from 'debug';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import debounce from 'lodash/debounce';

const localDebug = debug('ObjectGeometryFix');

/**
 * Исправление реальных размеров объектов.
 * ТК сохраненные значения размеров объектов могут отличаться от
 * автоматически рассчитанных при рендеринге
 */
export class ObjectGeometryFix implements GuestType<MapObjectDocument[]> {
  private readonly innerReceive: (value: MapObjectDocument[]) => void;

  public constructor(
    objectsVisible: MapObjectsType,
    private mapFile: MapFileType,
    private map: MapType,
    private factories: {
      guest: FactoryType<GuestType>,
    },
  ) {
    objectsVisible.objects(this);
    this.innerReceive = debounce((value: MapObjectDocument[]) => {
      this.mapFile.currentMap(this.factories.guest.create((latestMap: MapDocument) => {
        localDebug('objects to fix', value);
        const domObjects = document.querySelectorAll('.objects-container .rendered-object');
        const mapObjects = latestMap.objects;
        let hasChanges = false;
        domObjects.forEach((domObject) => {
          const id = domObject.getAttribute('data-object-id');
          localDebug('i see id', id);
          if (!id) {
            return;
          }
          const savedObject = mapObjects[id];
          localDebug('dom object geometry', domObject.clientWidth, domObject.clientHeight);
          localDebug('saved object geometry', savedObject.width, savedObject.height);
          if (savedObject.width !== domObject.clientWidth || savedObject.height !== domObject.clientHeight) {
            hasChanges = true;
            localDebug('update object geometry');
            savedObject.width = domObject.clientWidth;
            savedObject.height = domObject.clientHeight;
          }
        });
        // Немного оптимизируем сохраняем сразу все объекты а не по одному
        if (hasChanges) {
          this.map.receive({
            ...latestMap,
            objects: mapObjects,
          });
        }
      }));
    }, 200);
  }

  introduction() {
    return 'patron' as const;
  }

  receive(value: MapObjectDocument[]): this {
    this.innerReceive(value);
    return this;
  }
}
