import {
  GuestAwareType, GuestObjectType, FactoryType, ChainType,
} from 'patron-oop';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { MapObjectsType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { debug } from 'debug';

type CursorProps = {objects: MapObjectDocument[], cursor: PointDocument}

const localDebug = debug('CursorWithObjects');

export class CursorWithObjects implements GuestAwareType<PointDocument> {
  public constructor(
    private objectsVisible: MapObjectsType,
    private cursor: GuestAwareType<PointDocument>,
    private factories: {
      guestInTheMiddle: FactoryType<GuestObjectType>,
      chain: FactoryType<ChainType>,
      guestCast: FactoryType<GuestObjectType>,
    },
  ) {
  }

  public value(guest: GuestObjectType<PointDocument>): this {
    const chain = this.factories.chain.create();
    this.cursor.value(this.factories.guestCast.create(guest, chain.receiveKey('cursor')));
    this.objectsVisible.objects(this.factories.guestCast.create(guest, chain.receiveKey('objects')));
    chain.result(
      this.factories.guestInTheMiddle.create(guest, ({ cursor, objects }: CursorProps) => {
        const crossedObject = objects.find((object) => {
          const xStart = object.position[0];
          const xEnd = object.position[0] + object.width || 100;
          const yStart = object.position[1];
          const yEnd = object.position[1] + object.height || 100;
          const isCrossed = cursor.x >= xStart && cursor.x <= xEnd && cursor.y >= yStart && cursor.y <= yEnd;
          // localDebug('find cross', xStart, xEnd, yStart, yEnd, cursor.x, cursor.y, isCrossed, object.id);
          return isCrossed;
        });

        if (crossedObject) {
          localDebug('crossed with', crossedObject);
          guest.give({
            x: crossedObject.position[0] + crossedObject.width / 2,
            y: crossedObject.position[1] + crossedObject.height / 2,
          });
        } else {
          localDebug('cursor pos', cursor);
          guest.give(cursor);
        }
      }),
    );
    return this;
  }
}
