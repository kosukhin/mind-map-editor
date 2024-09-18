import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { MapTypeDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapObjectType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { debug } from 'debug';

const localDebug = debug('MapObjectNew');

/**
 * Добавление нового объекта на карту
 */
export class MapObjectNew {
  public constructor(
    private map: MapType,
    private mapObject: MapObjectType,
    private factories: {
      guest: FactoryType<GuestType>
    },
  ) { }

  public byTypeName(typeName: string, point: PointDocument): this {
    localDebug('start to add new type', typeName, point);
    this.map.types(this.factories.guest.create((types: MapTypeDocument[]) => {
      const type = types.find((ct) => ct.name === typeName);
      localDebug('is type found', type);
      if (type) {
        localDebug('add new type');
        this.mapObject.receive({
          additionalName: '',
          arrows: [],
          description: '',
          inMenu: false,
          lastClick: Date.now(),
          linked: false,
          menuOrder: 0,
          name: '',
          outlink: '',
          targetBlank: false,
          type: typeName,
          width: type.width,
          height: type.height,
          zindex: 0,
          id: new Date().getTime().toString(),
          position: [point.x, point.y],
        });
      }
    }));
    return this;
  }
}
