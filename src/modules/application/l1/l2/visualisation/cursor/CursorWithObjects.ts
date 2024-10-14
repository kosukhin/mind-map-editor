import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { MapObjectsType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';
import { ChainType } from '@/modules/system/guest/ChainType';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { debug } from 'debug';

type CursorProps = {objects: MapObjectDocument[], cursor: PointDocument}

const localDebug = debug('CursorWithObjects');

export class CursorWithObjects implements GuestAwareType<PointDocument> {
  public constructor(
    private objectsVisible: MapObjectsType,
    private cursor: GuestAwareType<PointDocument>,
    private factories: {
      guestInTheMiddle: FactoryType<GuestType>,
      chain: FactoryType<ChainType>,
      guestCast: FactoryType<GuestType>,
    },
  ) {
  }

  public receiving(guest: GuestType<PointDocument>): this {
    const chain = this.factories.chain.create();
    this.cursor.receiving(this.factories.guestCast.create(guest, chain.receiveKey('cursor')));
    this.objectsVisible.objects(this.factories.guestCast.create(guest, chain.receiveKey('objects')));
    chain.result(
      this.factories.guestInTheMiddle.create(guest, ({ cursor, objects }: CursorProps) => {
        const crossedObject = objects.find((object) => {
          const xStart = object.position[0];
          const xEnd = object.position[0] + object.width ?? 100;
          const yStart = object.position[1];
          const yEnd = object.position[1] + object.height ?? 100;
          const isCrossed = cursor.x >= xStart && cursor.x <= xEnd && cursor.y >= yStart && cursor.y <= yEnd;
          // localDebug('find cross', xStart, xEnd, yStart, yEnd, cursor.x, cursor.y, isCrossed, object.id);
          return isCrossed;
        });

        if (crossedObject) {
          localDebug('crossed with', crossedObject);
          guest.receive({
            x: crossedObject.position[0] + crossedObject.width / 2,
            y: crossedObject.position[1] + crossedObject.height / 2,
          });
        } else {
          localDebug('cursor pos', cursor);
          guest.receive(cursor);
        }
      }),
    );
    return this;
  }
}
