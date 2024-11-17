import {
  MapDocument,
  MapObjectDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { MapObjectsType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';
import { debug } from 'debug';
import debounce from 'lodash/debounce';
import { FactoryType, GuestObjectType } from 'patron-oop';

const localDebug = debug('ObjectGeometryFix');

/**
 * Исправление реальных размеров объектов.
 * ТК сохраненные значения размеров объектов могут отличаться от
 * автоматически рассчитанных при рендеринге
 */
export class ObjectGeometryFix implements GuestObjectType<MapObjectDocument[]> {
  private readonly innerReceive: (value: MapObjectDocument[]) => void;

  public constructor(
    objectsVisible: MapObjectsType,
    private mapFile: MapFileType,
    private map: MapType,
    private factories: {
      guest: FactoryType<GuestObjectType>,
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
          if (!savedObject) {
            return;
          }
          localDebug('dom object geometry', domObject.clientWidth, domObject.clientHeight);
          localDebug('saved object geometry', savedObject.width, savedObject.height);
          if (savedObject.width !== domObject.clientWidth || savedObject.height !== domObject.clientHeight) {
            hasChanges = true;
            localDebug('update object geometry');
            savedObject.width = domObject.clientWidth;
            savedObject.height = domObject.clientHeight;
          }

          if (!savedObject.width || !savedObject.height) {
            const type = latestMap.types[savedObject.type];
            savedObject.width = type.width;
            savedObject.height = type.height;
          }
        });
        // Немного оптимизируем сохраняем сразу все объекты а не по одному
        if (hasChanges) {
          this.map.give({
            ...latestMap,
            objects: mapObjects,
          });
        }
      }));
    }, 500);
  }

  public give(value: MapObjectDocument[]): this {
    this.innerReceive(value);
    return this;
  }
}
