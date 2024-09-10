import Konva from 'konva';
import { MapFileType } from '@/modules/application/map/mapFile/MapFileType';
import { Chain } from '@/modules/system/guest/Chain';
import { Patron } from '@/modules/system/guest/Patron';
import { MapDocument } from '@/modules/entities/MapStructures';
import { Layer } from 'konva/lib/Layer';
import { SizeDocument } from '@/modules/entities/SizeDocument';
import { Guest } from '@/modules/system/guest/Guest';
import { BrowserCanvasType } from '@/modules/integration/browser/canvas/BrowserCanvasType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { PointDocument } from '@/modules/entities/PointDocument';
import { Cache } from '@/modules/system/guest/Cache';
import { CacheType } from '@/modules/system/guest/CacheType';
import { debug } from 'debug';
import { Stage } from 'konva/lib/Stage';

const localDebug = debug('app:konva:KonvaLayer');
const layerGeometry = {
  height: 3000,
  width: 3000,
};

export class KonvaLayer {
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

      stage.dragBoundFunc((pos) => {
        localDebug('boundings event', pos);
        const maxRight = layerGeometry.width - canvas.clientWidth;
        const maxBottom = layerGeometry.height - canvas.clientHeight;
        const right = pos.x * -1;
        const bottom = pos.y * -1;
        if (maxBottom < 0 || maxRight < 0) {
          return { x: 0, y: 0 };
        }
        localDebug('boundings', maxBottom, maxRight, bottom, right);
        return {
          // eslint-disable-next-line no-nested-ternary
          x: pos.x > 0 ? 0 : right > maxRight ? maxRight * -1 : pos.x,
          // eslint-disable-next-line no-nested-ternary
          y: pos.y > 0 ? 0 : bottom > maxBottom ? maxBottom * -1 : pos.y,
        };
      });
    }));
  }

  public layer(guest: GuestType<Layer>): this {
    this.layerCache.receiving(guest);
    return this;
  }

  public size(guest: GuestType<SizeDocument>) {
    guest.receive(layerGeometry);
    return this;
  }

  public position(guest: GuestType<PointDocument>): this {
    this.positionCache.receiving(guest);
    return this;
  }
}
