import { StageMoveType } from '@/modules/application/l1/l2/visualisation/stage/StageMoveType';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { FactoryType, GuestObjectType, GuestAwareType } from 'patron-oop';
import Konva from 'konva';
import { debug } from 'debug';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { StageMoveRestrictionType } from '@/modules/application/l1/l2/l3/l4/types/stage/StageMoveRestrictionType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';

const localDebug = debug('position');

/**
 * Сдвиг стейджа в новую позицию
 */
export class KonvaMove implements StageMoveType {
  public constructor(
    private layer: LayerBase,
    private canvas: BrowserCanvas,
    private stageSize: GuestAwareType<SizeDocument>,
    private stageMoveRestriction: StageMoveRestrictionType,
    private factories: {
      guest: FactoryType<GuestObjectType>;
    },
  ) {}

  public move(object: MapObjectDocument): void {
    localDebug('move stage to new point', object.position);
    this.stageSize.value(
      this.factories.guest.create(() => {
        this.canvas.size(
          this.factories.guest.create((size: SizeDocument) => {
            this.layer.layer(
              this.factories.guest.create((layer: typeof Konva.Layer) => {
                const [x, y] = object.position;
                const newPosition = {
                  x: -x - Math.round(object.width / 2) + Math.round(size.width / 2),
                  y: -y - Math.round(object.height / 2) + Math.round(size.height / 2),
                };

                this.stageMoveRestriction.position(
                  newPosition,
                  this.factories.guest.create((pos: PointDocument) => {
                    layer.getStage().position(pos);
                    setTimeout(() => {
                      this.layer.give(layer);
                    });
                  }),
                );
              }),
            );
          }),
        );
      }),
    );
  }
}
