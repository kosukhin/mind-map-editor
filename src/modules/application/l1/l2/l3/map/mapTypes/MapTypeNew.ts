import { GuestType } from '@/modules/system/guest/GuestType';
import { MapTypeWithNameDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

export class MapTypeNew {
  public constructor(
    private mapType: GuestType<MapTypeWithNameDocument>,
  ) {}

  public byName(typeName: string) {
    this.mapType.receive({
      name: typeName,
      type: {
        name: typeName,
        svg: '<div>type</div>',
        height: 100,
        width: 100,
      },
    });
  }
}
