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
import { PointDocument } from '@/modules/entities/PointDocument';
import { Cache } from '@/modules/system/guest/Cache';
import { CacheType } from '@/modules/system/guest/CacheType';
import { debug } from 'debug';
import { Stage } from 'konva/lib/Stage';

const localDebug = debug('KonvaLayer');

export class KonvaLayer implements LayerBase {
  private guestChain = new Chain<{canvas: HTMLElement, map: MapDocument}>();

  private positionCache: CacheType<PointDocument> = new Cache(
    this,
    {
      x: 0,
      y: 0,
    },
  );

  private layerCache = new Cache(this);

  public constructor(private mapFile: MapFileType, private canvasDep: BrowserCanvasType) {
    this.canvasDep.canvas(new Patron(this.guestChain.receiveKey('canvas')));
    this.mapFile.currentMap(new Patron(this.guestChain.receiveKey('map')));
    this.guestChain.result(new Guest(({ canvas, map }) => {
      localDebug('create new konva stage');
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
      this.layerCache.receive(layer);

      stage.on('dragend', (e) => {
        if (!(e.target instanceof Stage)) {
          return;
        }
        const position = {
          x: stage.x(),
          y: stage.y(),
        };
        localDebug('new position', position);
        this.positionCache.receive(position);
      });
    }));
  }

  public layer(guest: GuestType<Layer>): this {
    this.layerCache.receiving(guest);
    return this;
  }

  public size(guest: GuestType<SizeDocument>) {
    guest.receive({
      height: 3000,
      width: 3000,
    });
    return this;
  }

  public position(guest: GuestType<PointDocument>): this {
    this.positionCache.receiving(guest);
    return this;
  }
}
