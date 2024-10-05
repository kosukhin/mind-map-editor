import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { BrowserCanvasType } from '@/modules/integration/browser/canvas/BrowserCanvasType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { CacheType } from '@/modules/system/guest/CacheType';
import { debug } from 'debug';
import { Stage } from 'konva/lib/Stage';
import { KonvaPointDocument } from '@/modules/integration/konva/KonvaPointDocument';
import { ChainType } from '@/modules/system/guest/ChainType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import {
  StageMoveRestrictionType,
} from '@/modules/application/l1/l2/l3/l4/types/stage/StageMoveRestrictionType';
import { GuestValueType } from '@/modules/system/guest/GuestValueType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';

const localDebug = debug('app:konva:KonvaLayer');

export class KonvaLayer implements LayerBase {
  private guestChain: ChainType<{canvas: HTMLElement}>;

  private positionCache: CacheType<KonvaPointDocument>;

  private layerCache: CacheType<Layer>;

  public constructor(
    private canvasDep: BrowserCanvasType,
    stageSizeDep: GuestAwareType<SizeDocument>,
    private stageMoveRestriction: StageMoveRestrictionType,
    private factories: {
      chain: FactoryType<ChainType<{canvas: HTMLElement}>>,
      cache: FactoryType<CacheType>,
      guest: FactoryType<GuestType>,
      patron: FactoryType<GuestType>,
      guestSync: FactoryType<GuestValueType>,
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
    stageSizeDep.receiving(this.guestChain.receiveKey('stageSize'));

    this.guestChain.result(factories.guest.create<[(props: { canvas: HTMLElement, stageSize: SizeDocument }) => void]>(({ canvas, stageSize }) => {
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
        const posGuest = this.factories.guestSync.create(pos);
        stageMoveRestriction.position(
          pos,
          posGuest,
        );
        return posGuest.value() as PointDocument;
      });
    }));
  }

  public layer<R extends GuestType<Layer>>(guest: R) {
    this.layerCache.receiving(guest);
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
