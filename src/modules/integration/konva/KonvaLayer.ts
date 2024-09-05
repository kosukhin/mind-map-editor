import Konva from 'konva';
import { MapFileType } from '@/modules/application/mapFile/MapFileType';
import { Chain } from '@/modules/system/guest/Chain';
import { Patron } from '@/modules/system/guest/Patron';
import { MapDocument } from '@/modules/entities/MapStructures';
import { Layer } from 'konva/lib/Layer';
import { LayerBase } from '@/modules/application/layer/LayerBase';
import { SizeDocument } from '@/modules/entities/SizeDocument';
import { Guest } from '@/modules/system/guest/Guest';
import { BrowserCanvasType } from '@/modules/integration/browser/canvas/BrowserCanvasType';
import { GuestType } from '@/modules/system/guest/GuestType';

export class KonvaLayer implements LayerBase {
  private guestChain = new Chain<{canvas: HTMLElement, map: MapDocument}>();

  public constructor(private mapFile: MapFileType, private canvas: BrowserCanvasType) {
    this.canvas.canvas(new Patron(this.guestChain.receiveKey('canvas')));
    this.mapFile.currentMap(new Patron(this.guestChain.receiveKey('map')));
  }

  public layer(guest: GuestType<Layer>): this {
    this.guestChain.result(new Guest(({ canvas, map }) => {
      const stage = new Konva.Stage({
        width: canvas.clientWidth,
        height: canvas.clientHeight,
        container: canvas as HTMLDivElement,
        fill: '#ffeeee',
        draggable: true,
      });
      const layer = new Konva.Layer();
      stage.add(layer);
      layer.draw();
      guest.receive(layer);

      // stage.on('dragend', () => {
      //   console.log('new position', stage.x(), stage.y());
      //   guest.receive(layer);
      // });
    }));
    return this;
  }

  public size(guest: GuestType<SizeDocument>) {
    guest.receive({
      height: 3000,
      width: 3000,
    });
    return this;
  }
}
