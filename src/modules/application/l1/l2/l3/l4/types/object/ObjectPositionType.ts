import { GuestType } from '@/modules/system/guest/GuestType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

export interface ObjectPositionType {
  position(
    object: MapObjectDocument,
    point: PointDocument,
    guest: GuestType<PointDocument>
  ): GuestType<PointDocument>
}
