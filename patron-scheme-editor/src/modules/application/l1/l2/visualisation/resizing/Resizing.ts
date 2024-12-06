import { MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { KonvaLayer } from '@/modules/integration/konva/KonvaTypes';
import { FactoryType, GuestObjectType } from 'patron-oop';

/**
 * Обработка изменения размера редактора
 */
export class Resizing implements GuestObjectType<MapDocument> {
  public constructor(
    mapFile: MapFileType,
    private canvas: BrowserCanvas,
    private konvaLayer: LayerBase,
    private factories: {
      guest: FactoryType<GuestObjectType>;
    },
  ) {
    mapFile.currentMap(this);
  }

  public give(): this {
    const resizeObserver = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        const [body] = entries;
        this.canvas.canvas(
          this.factories.guest.create((canvasEl: HTMLCanvasElement) => {
            const canvasRect = canvasEl.getBoundingClientRect();
            this.konvaLayer.layer(
              this.factories.guest.create((layer: KonvaLayer) => {
                layer.getStage().width(body.contentRect.width - canvasRect.left);
                layer.getStage().height(body.contentRect.height - canvasRect.top);

                this.canvas.give(canvasEl);
                this.konvaLayer.give(layer);
              }),
            );
          }),
        );
      });
    });
    const body = document.querySelector('body');
    if (body) {
      resizeObserver.observe(body);
    }
    return this;
  }
}
