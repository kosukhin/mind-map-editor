import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { GuestType } from '@/modules/system/guest/GuestType';

export interface StageMoveRestrictionType {
  position(pos: PointDocument, guest: GuestType<PointDocument>): GuestType;
}
