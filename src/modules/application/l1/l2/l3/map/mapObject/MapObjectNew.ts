import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { MapTypeDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapObjectType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { debug } from 'debug';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';

const localDebug = debug('MapObjectNew');

/**
 * Добавление нового объекта на карту
 */
export class MapObjectNew {
  public constructor(
    private map: MapType,
    private mapObject: MapObjectType,
    private canvas: BrowserCanvas,
    private factories: {
      guest: FactoryType<GuestType>
    },
  ) { }

  public byTypeName(typeName: string, point: PointDocument): this {
    localDebug('start to add new type', typeName, point);
    this.map.types(this.factories.guest.create((types: MapTypeDocument[]) => {
      this.canvas.canvas(
        this.factories.guest.create((canvasEl: HTMLCanvasElement) => {
          const canvasRect = canvasEl.getBoundingClientRect();
          const type = types.find((ct) => ct.name === typeName);
          localDebug('is type found', type);

          const insertX = point.x - canvasRect.left;
          const insertY = point.y - canvasRect.top;

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
              position: [
                insertX > 0 ? insertX : 0,
                insertY > 0 ? insertY : 0,
              ],
            });
          }
        }),
      );
    }));
    return this;
  }
}
