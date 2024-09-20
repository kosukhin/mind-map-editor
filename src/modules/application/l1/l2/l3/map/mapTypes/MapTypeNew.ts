import { GuestType } from '@/modules/system/guest/GuestType';
import { MapTypeDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

export class MapTypeNew {
  public constructor(
    private mapType: GuestType<MapTypeDocument>,
  ) {}

  public byName(typeName: string) {
    this.mapType.receive({
      name: typeName,
      svg: '<div>type</div>',
      height: 100,
      width: 100,
    });
  }
}
