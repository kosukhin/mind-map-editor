import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { BrowserCanvasType } from '@/modules/integration/browser/canvas/BrowserCanvasType';
import {
  GuestObjectType, SourceType, ChainType,
  FactoryType, GuestAwareType, GuestValueType,
} from 'patron-oop';
import { debug } from 'debug';
import { Stage } from 'konva/lib/Stage';
import { KonvaPointDocument } from '@/modules/integration/konva/KonvaPointDocument';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import {
  StageMoveRestrictionType,
} from '@/modules/application/l1/l2/l3/l4/types/stage/StageMoveRestrictionType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';

const localDebug = debug('app:konva:KonvaLayer');

export class KonvaLayer implements LayerBase {
  private guestChain: ChainType<{canvas: HTMLElement}>;

  private positionCache: SourceType<KonvaPointDocument>;

  private layerCache: SourceType<Layer>;

  public constructor(
    private canvasDep: BrowserCanvasType,
    stageSizeDep: GuestAwareType<SizeDocument>,
    private stageMoveRestriction: StageMoveRestrictionType,
    private factories: {
      chain: FactoryType<ChainType<{canvas: HTMLElement}>>,
      cache: FactoryType<SourceType>,
      guest: FactoryType<GuestObjectType>,
      patron: FactoryType<GuestObjectType>,
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
    stageSizeDep.value(this.guestChain.receiveKey('stageSize'));

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
      this.layerCache.give(layer);

      stage.on('dragend', (e) => {
        if (!(e.target instanceof Stage)) {
          return;
        }
        const position = {
          x: stage.x(),
          y: stage.y(),
        };
        localDebug('new position', position);
        this.positionCache.give(position);
      });

      stage.on('dragmove', (e) => {
        if (!(e.target instanceof Stage)) {
          return;
        }
        const position = {
          x: stage.x(),
          y: stage.y(),
        };
        this.positionCache.give(position);
      });

      const posGuest = this.factories.guestSync.create({
        x: 0, y: 0,
      });
      stage.dragBoundFunc((pos) => {
        stageMoveRestriction.position(
          pos,
          posGuest,
        );
        return posGuest.value() as PointDocument;
      });
    }));
  }

  public layer<R extends GuestObjectType<Layer>>(guest: R) {
    this.layerCache.value(guest);
    return guest;
  }

  public position<R extends GuestObjectType<KonvaPointDocument>>(guest: R) {
    this.positionCache.value(guest);
    return guest;
  }

  public give(value: Layer): this {
    this.layerCache.give(value);
    const stage = value.getStage();
    this.positionCache.give({
      x: stage.x(),
      y: stage.y(),
    });
    return this;
  }
}
