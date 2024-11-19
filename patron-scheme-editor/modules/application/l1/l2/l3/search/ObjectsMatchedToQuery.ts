import { GuestAwareType, GuestObjectType, FactoryType } from 'patron-oop';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { debug } from 'debug';
import debounce from 'lodash/debounce';

const localDebug = debug('ObjectsMatchedToQuery');

export class ObjectsMatchedToQuery {
  public constructor(
    private map: MapType,
    private factories: {
      guestInTheMiddle: FactoryType<GuestObjectType>,
      guest: FactoryType<GuestObjectType>,
    },
  ) {}

  public objects<R extends GuestObjectType<MapObjectDocument[]>>(
    querySource: GuestAwareType<string>,
    guest: R,
  ): R {
    const objectsDebounceDelay = 500;
    querySource.value(
      this.factories.guestInTheMiddle.create(guest, debounce((query: string) => {
        query = query.toLowerCase();
        this.map.objects(
          this.factories.guest.create((objects: MapObjectDocument[]) => {
            if (!query) {
              localDebug('reset results');
              guest.give([]);
              return;
            }
            const results = objects.filter((object) => object.name.toLowerCase().includes(query) || object.additionalName?.toLowerCase().includes(query) || Object.values(object.additionalFields ?? {}).join(' ').toLowerCase().includes(query));
            localDebug('objects in searching', results, query);
            guest.give(results);
          }),
        );
      }, objectsDebounceDelay)),
    );
    return guest;
  }
}
