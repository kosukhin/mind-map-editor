import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { BrowserCanvasType } from '@/modules/integration/browser/canvas/BrowserCanvasType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { CacheType } from '@/modules/system/guest/CacheType';
import { debug } from 'debug';
import { Stage } from 'konva/lib/Stage';
import { KonvaSizeDocument } from '@/modules/integration/konva/KonvaSizeDocument';
import { KonvaPointDocument } from '@/modules/integration/konva/KonvaPointDocument';
import { ChainType } from '@/modules/system/guest/ChainType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';

const localDebug = debug('app:konva:KonvaLayer');
const layerGeometry = {
  height: 3000,
  width: 3000,
};

export class KonvaLayer implements LayerBase {
  private guestChain: ChainType<{canvas: HTMLElement}>;

  private positionCache: CacheType<KonvaPointDocument>;

  private layerCache: CacheType<Layer>;

  public constructor(
    private canvasDep: BrowserCanvasType,
    private factories: {
      chain: FactoryType<ChainType<{canvas: HTMLElement}>>,
      cache: FactoryType<CacheType>,
      guest: FactoryType<GuestType>,
      patron: FactoryType<GuestType>,
    },
  ) {
    this.positionCache = factories.cache.create(
      this,
      {
        x: 0,
        y: 0,
      },
    );
    this.guestChain = factories.chain.create();
    this.layerCache = factories.cache.create(this);
    this.canvasDep.canvas(factories.patron.create(this.guestChain.receiveKey('canvas')));

    this.guestChain.result(factories.guest.create<[(props: { canvas: HTMLElement }) => void]>(({ canvas }) => {
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

      stage.on('dragmove', (e) => {
        if (!(e.target instanceof Stage)) {
          return;
        }
        const position = {
          x: stage.x(),
          y: stage.y(),
        };
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

  public layer<R extends GuestType<Layer>>(guest: R) {
    this.layerCache.receiving(guest);
    return guest;
  }

  public size<R extends GuestType<KonvaSizeDocument>>(guest: R) {
    guest.receive(layerGeometry);
    return guest;
  }

  public position<R extends GuestType<KonvaPointDocument>>(guest: R) {
    this.positionCache.receiving(guest);
    return guest;
  }

  receive(value: Layer): this {
    this.layerCache.receive(value);
    const stage = value.getStage();
    this.positionCache.receive({
      x: stage.x(),
      y: stage.y(),
    });
    return this;
  }
}
