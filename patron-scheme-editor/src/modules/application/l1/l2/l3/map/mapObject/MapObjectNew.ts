import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { FactoryType, GuestObjectType } from 'patron-oop';
import { MapTypeDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapObjectType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { debug } from 'debug';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { StagePositionType } from '@/modules/application/l1/l2/l3/l4/types/stage/StagePositionType';

const localDebug = debug('MapObjectNew');

/**
 * Добавление нового объекта на карту
 */
export class MapObjectNew {
  public constructor(
    private map: MapType,
    private mapObject: MapObjectType,
    private canvas: BrowserCanvas,
    private stagePosition: StagePositionType,
    private factories: {
      guest: FactoryType<GuestObjectType>;
    },
  ) {}

  public byTypeName(typeName: string, point: PointDocument): this {
    localDebug('start to add new type', typeName, point);
    this.stagePosition.position(
      this.factories.guest.create((stagePosition: PointDocument) => {
        this.map.types(
          this.factories.guest.create((types: MapTypeDocument[]) => {
            this.canvas.canvas(
              this.factories.guest.create((canvasEl: HTMLCanvasElement) => {
                const canvasRect = canvasEl.getBoundingClientRect();
                const type = types.find((ct) => ct.id === typeName);
                localDebug('is type found', type);

                const insertX = point.x - canvasRect.left;
                const insertY = point.y - canvasRect.top;

                if (type) {
                  localDebug('add new type');
                  this.mapObject.give({
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
                    createTimestamp: Date.now(),
                    changeTimestamp: Date.now(),
                    position: [
                      insertX > 0 ? insertX + stagePosition.x : 0,
                      insertY > 0 ? insertY + stagePosition.y : 0,
                    ],
                  });
                }
              }),
            );
          }),
        );
      }),
    );
    return this;
  }
}
