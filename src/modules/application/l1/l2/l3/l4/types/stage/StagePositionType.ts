import { GuestType } from '@/modules/system/guest/GuestType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';

export interface StagePositionType {
  position(guest: GuestType<PointDocument>): GuestType;
}
