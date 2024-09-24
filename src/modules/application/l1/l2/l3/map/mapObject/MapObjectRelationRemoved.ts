import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestType } from '@/modules/system/guest/GuestType';
import { MapObjectType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';

type RelationInformation = {index: number, object: MapObjectDocument};

export class MapObjectRelationRemoved implements GuestType<RelationInformation> {
  public constructor(
    private mapObject: MapObjectType,
  ) {}

  receive(value: RelationInformation): this {
    const { arrows } = value.object;
    arrows.splice(value.index, 1);
    this.mapObject.receive({
      ...value.object,
      arrows,
    });
    return this;
  }
}
