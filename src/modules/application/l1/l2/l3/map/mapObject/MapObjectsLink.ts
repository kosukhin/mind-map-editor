import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { MapObjectCurrent } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectCurrent';
import { MapObjectType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';
import { NewArrow } from '@/modules/application/l1/l2/visualisation/arrows/NewArrow';
import { debug } from 'debug';
import { FactoryType, GuestObjectType, SourceType } from 'patron-oop';

const localDebug = debug('MapObjectsLink');

/**
 * Связь нескольких объектов стрелкой
 */
export class MapObjectsLink {
  private objectIdsCache: SourceType<string[]>

  public constructor(
    private mapObjectCurrent: MapObjectCurrent,
    private map: MapType,
    private mapObject: MapObjectType,
    private newArrow: NewArrow,
    private factories: {
      guest: FactoryType<GuestObjectType>,
      cache: FactoryType<SourceType>,
      guestInTheMiddle: FactoryType<GuestObjectType>
    },
  ) {
    this.objectIdsCache = factories.cache.create(this, []);
  }

  public objectIds<R extends GuestObjectType<string[]>>(guest: R) {
    this.objectIdsCache.value(guest);
    return guest;
  }

  public startLink() {
    this.mapObjectCurrent.receive('');
    this.objectIdsCache.value(
      this.factories.guest.create((ids: string[]) => {
        if (ids.length) {
          this.mapObjectCurrent.silenceOff();
          this.objectIdsCache.give([]);
          return;
        }

        const objectIds: string[] = ['first'];
        this.objectIdsCache.give(objectIds);
        this.mapObjectCurrent.silenceOn(
          this.factories.guest.create((objectId: string) => {
            objectIds.push(objectId);
            this.objectIdsCache.give([...objectIds]);
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
                    this.objectIdsCache.give([]);
                    this.mapObject.give({
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
