import { GuestType } from '@/modules/system/guest/GuestType';
import { MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { Layer } from 'konva/lib/Layer';

/**
 * Обработка изменения размера редактора
 */
export class Resizing implements GuestType<MapDocument> {
  public constructor(
    mapFile: MapFileType,
    private canvas: BrowserCanvas,
    private konvaLayer: LayerBase,
    private factories: {
      guest: FactoryType<GuestType>
    },
  ) {
    mapFile.currentMap(this);
  }

  receive(): this {
    const resizeObserver = new ResizeObserver((entries) => {
      const [body] = entries;
      this.canvas.canvas(this.factories.guest.create((canvasEl: HTMLCanvasElement) => {
        const canvasRect = canvasEl.getBoundingClientRect();
        this.konvaLayer.layer(this.factories.guest.create((layer: Layer) => {
          layer.getStage().width(body.contentRect.width - canvasRect.left);
          layer.getStage().height(body.contentRect.height - canvasRect.top);

          this.canvas.receive(canvasEl);
          this.konvaLayer.receive(layer);
        }));
      }));
    });
    const body = document.querySelector('body');
    if (body) {
      resizeObserver.observe(body);
    }
    return this;
  }
}
