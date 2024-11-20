import { StageMoveRestrictionType } from '@/modules/application/l1/l2/l3/l4/types/stage/StageMoveRestrictionType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { GuestObjectType } from 'patron-oop';

export class StageMoveRestrictionTransfer implements StageMoveRestrictionType {
  position(pos: PointDocument, guest: GuestObjectType<PointDocument>): GuestObjectType {
    guest.give(pos);
    return guest;
  }
}
