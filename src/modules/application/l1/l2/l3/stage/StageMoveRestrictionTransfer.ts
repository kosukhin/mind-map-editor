import {
  StageMoveRestrictionType,
} from '@/modules/application/l1/l2/l3/l4/types/stage/StageMoveRestrictionType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { GuestType } from '@/modules/system/guest/GuestType';

export class StageMoveRestrictionTransfer implements StageMoveRestrictionType {
  position(pos: PointDocument, guest: GuestType<PointDocument>): GuestType {
    guest.receive(pos);
    return guest;
  }
}
