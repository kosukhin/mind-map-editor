import { MapObjectCurrent } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectCurrent';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapObjectType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';
import { CacheType } from '@/modules/system/guest/CacheType';
import { NewArrow } from '@/modules/application/l1/l2/visualisation/arrows/NewArrow';
import { debug } from 'debug';

const localDebug = debug('MapObjectsLink');

/**
 * Связь нескольких объектов стрелкой
 */
export class MapObjectsLink {
  private objectIdsCache: CacheType<string[]>

  public constructor(
    private mapObjectCurrent: MapObjectCurrent,
    private map: MapType,
    private mapObject: MapObjectType,
    private newArrow: NewArrow,
    private factories: {
      guest: FactoryType<GuestType>,
      cache: FactoryType<CacheType>,
      guestInTheMiddle: FactoryType<GuestType>
    },
  ) {
    this.objectIdsCache = factories.cache.create(this, []);
  }

  public objectIds<R extends GuestType<string[]>>(guest: R) {
    this.objectIdsCache.receiving(guest);
    return guest;
  }

  public startLink() {
    this.mapObjectCurrent.receive('');
    this.objectIdsCache.receiving(
      this.factories.guest.create((ids: string[]) => {
        if (ids.length) {
          this.mapObjectCurrent.silenceOff();
          this.objectIdsCache.receive([]);
          return;
        }

        const objectIds: string[] = ['first'];
        this.objectIdsCache.receive(objectIds);
        this.mapObjectCurrent.silenceOn(
          this.factories.guest.create((objectId: string) => {
            objectIds.push(objectId);
            this.objectIdsCache.receive([...objectIds]);
            localDebug('object ids', objectIds);

            if (objectIds.length === 2) {
              this.map.objects(
                this.factories.guest.create((objects: MapObjectDocument[]) => {
                  const [, formObjectId] = objectIds;
                  const fromObject = objects.find((object) => object.id === formObjectId);
                  if (fromObject) {
                    this.newArrow.forObject(fromObject);
                  }
                }),
              );
            }

            if (objectIds.length === 3) {
              this.newArrow.dispose();
              this.mapObjectCurrent.silenceOff();
              this.map.objects(
                this.factories.guest.create((objects: MapObjectDocument[]) => {
                  const [, formObjectId, toObjectId] = objectIds;
                  const fromObject = objects.find((object) => object.id === formObjectId);
                  if (fromObject && toObjectId) {
                    this.objectIdsCache.receive([]);
                    this.mapObject.receive({
                      ...fromObject,
                      arrows: [
                        ...fromObject.arrows,
                        {
                          id: toObjectId,
                          label: '',
                        },
                      ],
                    });
                  }
                }),
              );
            }
          }),
        );
      }),
    );
  }
}
