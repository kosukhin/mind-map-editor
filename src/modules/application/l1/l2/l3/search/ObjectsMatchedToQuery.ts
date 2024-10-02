import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { debug } from 'debug';
import debounce from 'lodash/debounce';

const localDebug = debug('ObjectsMatchedToQuery');

export class ObjectsMatchedToQuery {
  public constructor(
    private map: MapType,
    private factories: {
      guestInTheMiddle: FactoryType<GuestType>,
      guest: FactoryType<GuestType>,
    },
  ) {}

  public objects<R extends GuestType<MapObjectDocument[]>>(
    querySource: GuestAwareType<string>,
    guest: R,
  ): R {
    const objectsDebounceDelay = 500;
    querySource.receiving(
      this.factories.guestInTheMiddle.create(guest, debounce((query: string) => {
        this.map.objects(
          this.factories.guest.create((objects: MapObjectDocument[]) => {
            if (!query) {
              localDebug('reset results');
              guest.receive([]);
              return;
            }
            const results = objects.filter((object) => object.name.toLowerCase().includes(query) || object.additionalName?.toLowerCase().includes(query) || Object.values(object.additionalFields ?? {}).join(' ').toLowerCase().includes(query));
            localDebug('objects in searching', results, query);
            guest.receive(results);
          }),
        );
      }, objectsDebounceDelay)),
    );
    return guest;
  }
}
