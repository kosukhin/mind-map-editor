import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { GuestObjectType } from 'patron-oop';

export interface StageMoveRestrictionType {
  position(pos: PointDocument, guest: GuestObjectType<PointDocument>): GuestObjectType;
}
