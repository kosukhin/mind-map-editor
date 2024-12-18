import { MapObjectDocument } from "@/modules/application/l1/l2/l3/map/documents/MapStructures";
import { ArrowDepsDocument, ArrowTypeType } from "@/modules/application/l1/l2/visualisation/arrows/ArrowType";
import { give, GuestAwareType, GuestCast, GuestChain, GuestType } from "patron-oop";

type ArrowExtremePointsParams = { objects: MapObjectDocument[], objectsMap: Record<string, MapObjectDocument> }

export class ArrowExtremePoints implements GuestAwareType<ArrowDepsDocument[]> {
  public constructor(
    private objectsSource: GuestAwareType<MapObjectDocument[]>,
    private objectsMapSource: GuestAwareType<Record<string, MapObjectDocument>>,
  ) { }

  public value(guest: GuestType<ArrowDepsDocument[]>): this {
    const chain = new GuestChain<ArrowExtremePointsParams>();
    this.objectsSource.value(new GuestCast(guest, chain.receiveKey('objects')));
    this.objectsMapSource.value(new GuestCast(guest, chain.receiveKey('objectsMap')));
    chain.result(
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
