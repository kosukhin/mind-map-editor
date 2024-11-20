import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestObjectType } from 'patron-oop';
import { MapObjectType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';

type RelationInformation = { index: number; object: MapObjectDocument };

export class MapObjectRelationRemoved implements GuestObjectType<RelationInformation> {
  public constructor(private mapObject: MapObjectType) {}

  give(value: RelationInformation): this {
    const { arrows } = value.object;
    arrows.splice(value.index, 1);
    this.mapObject.give({
      ...value.object,
      arrows,
    });
    return this;
  }
}
