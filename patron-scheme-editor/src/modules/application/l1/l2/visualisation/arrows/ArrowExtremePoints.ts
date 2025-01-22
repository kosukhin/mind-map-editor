import { MapObjectDocument } from "@/modules/application/l1/l2/l3/map/documents/MapStructures";
import { ArrowDepsDocument } from "@/modules/application/l1/l2/visualisation/arrows/ArrowType";
import { give, GuestAwareAll, GuestAwareObjectType, GuestCast, GuestType } from "patron-oop";

type ArrowExtremePointsParams = { objects: MapObjectDocument[], objectsMap: Record<string, MapObjectDocument> }

export class ArrowExtremePoints implements GuestAwareObjectType<ArrowDepsDocument[]> {
  public constructor(
    private objectsSource: GuestAwareObjectType<MapObjectDocument[]>,
    private objectsMapSource: GuestAwareObjectType<Record<string, MapObjectDocument>>,
  ) { }

  public value(guest: GuestType<ArrowDepsDocument[]>): this {
    const chain = new GuestAwareAll<ArrowExtremePointsParams>();
    this.objectsSource.value(new GuestCast(guest, chain.guestKey('objects')));
    this.objectsMapSource.value(new GuestCast(guest, chain.guestKey('objectsMap')));
    chain.value(
      new GuestCast(
        guest, ({ objects, objectsMap }) => {
          const resultObjects: ArrowDepsDocument[] = [];
          objects.forEach((fromObject) => {
            fromObject.arrows.forEach((toObjectRelation) => {
              const toObject = objectsMap[toObjectRelation.id];

              if (toObject) {
                resultObjects.push({
                  fromObject,
                  toObject,
                })
              }
            })
          });
          give(resultObjects, guest);
        }
      )
    )

    return this;
  }
}
