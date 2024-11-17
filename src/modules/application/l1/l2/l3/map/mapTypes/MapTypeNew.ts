import { GuestObjectType } from 'patron-oop';
import { MapTypeWithNameDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

export class MapTypeNew {
  public constructor(
    private mapType: GuestObjectType<MapTypeWithNameDocument>,
  ) {}

  public byName() {
    const typeId = String(new Date().getTime());
    this.mapType.give({
      name: typeId,
      type: {
        id: typeId,
        name: 'Новый тип',
        svg: '<div style="background: lightyellow;border: 1px solid #ccc;">type</div>',
        width: 100,
        height: 40,
      },
    });
  }
}
