import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { PointIdDocument } from '@/modules/application/l1/l2/l3/map/documents/PointIdDocument';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { debug } from 'debug';
import { GuestObjectType, SourceType, FactoryType, ChainType, GuestAwareType } from 'patron-oop';
import { Layer } from 'konva/lib/Layer';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

const localDebug = debug('app:MiniMap');
const minimapWidth = 130;

type ViewPortChainDocument = {
  size: SizeDocument;
  position: PointDocument;
};

type MiniMapChainDocument = {
  layer: Layer;
  size: SizeDocument;
  objects: MapObjectDocument[];
};

type SizablePointDocument = PointIdDocument & SizeDocument;

/**
 * Объект для построения отображения миникарты
 */
export class MiniMap {
  private theSize: SourceType<SizeDocument>;

  private thePoints: SourceType<SizablePointDocument[]>;

  private viewportSizeCache: SourceType<SizeDocument>;

  public constructor(
    private map: MapType,
    private layer: LayerBase,
    private stageSize: GuestAwareType<SizeDocument>,
    private factories: {
      sourceEmpty: FactoryType<SourceType>;
      chain: FactoryType<ChainType<unknown>>;
      patron: FactoryType<GuestObjectType>;
      guest: FactoryType<GuestObjectType>;
      guestInTheMiddle: FactoryType<GuestObjectType>;
      guestCast: FactoryType<GuestObjectType>;
    },
  ) {
    this.theSize = factories.sourceEmpty.create();
    this.thePoints = factories.sourceEmpty.create();
    this.viewportSizeCache = factories.sourceEmpty.create();
    const chain = factories.chain.create();
    map.objects(factories.patron.create(chain.receiveKey('objects')));
    layer.layer(factories.patron.create(chain.receiveKey('layer')));
    stageSize.value(factories.patron.create(chain.receiveKey('size')));
    chain.result(
      factories.patron.create(
        factories.guest.create(({ layer: konvaLayer, size, objects }: MiniMapChainDocument) => {
          const scale = minimapWidth / size.width;
          const layerSize = {
            width: Math.round(konvaLayer.width() * scale),
            height: Math.round(konvaLayer.height() * scale),
          };
          this.viewportSizeCache.give(layerSize);
          const miniSize = {
            width: Math.round(size.width * scale),
            height: Math.round(size.height * scale),
          };
          this.theSize.give(miniSize);
          const points = objects.map((object) => ({
            id: object.id,
            x: Math.round(object.position[0] * scale),
            y: Math.round(object.position[1] * scale),
            width: Math.round(object.width * scale),
            height: Math.round(object.height * scale),
          }));
          localDebug('minimap points', points);
          this.thePoints.give(points);
        }),
      ),
    );
  }

  viewportPosition<R extends GuestObjectType<PointDocument>>(guest: R) {
    const chain = this.factories.chain.create();
    this.stageSize.value(this.factories.guestCast.create(guest, chain.receiveKey('size')));
    this.layer.position(this.factories.guestCast.create(guest, chain.receiveKey('position')));
    chain.result(
      this.factories.guestInTheMiddle.create(guest, ({ size, position }: ViewPortChainDocument) => {
        const scale = minimapWidth / size.width;
        const scaledPosition = {
          x: position.x * scale * -1,
          y: position.y * scale * -1,
        };
        localDebug('scaled position is', scaledPosition);
        guest.give(scaledPosition);
      }),
    );
    return guest;
  }

  viewportSize<R extends GuestObjectType<SizeDocument>>(guest: R) {
    this.viewportSizeCache.value(guest);
    return guest;
  }

  size<R extends GuestObjectType<SizeDocument>>(guest: R) {
    this.theSize.value(guest);
    return guest;
  }

  points<R extends GuestObjectType<PointIdDocument[]>>(guest: R) {
    this.thePoints.value(guest);
    return guest;
  }
}
