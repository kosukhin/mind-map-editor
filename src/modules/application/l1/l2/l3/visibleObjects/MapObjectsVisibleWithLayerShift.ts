import { GuestType } from '@/modules/system/guest/GuestType';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { ChainType } from '@/modules/system/guest/ChainType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { MapObjectsType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';

type ChainProps = {objects: MapObjectDocument[], position: PointDocument};

/**
 * Видимые объекты с добавленным смешением относительно прокрутки карты
 */
export class MapObjectsVisibleWithLayerShift implements MapObjectsType {
  public constructor(
    private layerDep: LayerBase,
    private mapObjectsVisible: MapObjectsType,
    private factories: {
      chain: FactoryType<ChainType>,
      guestCast: FactoryType<GuestType>,
      guestInTheMiddle: FactoryType<GuestType>
    },
  ) {}

  public objects(guest: GuestType<MapObjectDocument[]>) {
    const chain = this.factories.chain.create();
    this.layerDep.position(this.factories.guestCast.create(guest, chain.receiveKey('position')));
    this.mapObjectsVisible.objects(this.factories.guestCast.create(guest, chain.receiveKey('objects')));
    chain.result(
      this.factories.guestInTheMiddle.create(guest, ({ position, objects }: ChainProps) => {
        guest.receive(objects.map((object) => ({
          ...object,
          position: [
            object.position[0] + position.x,
            object.position[1] + position.y,
          ],
        })));
      }),
    );
    return this;
  }
}
