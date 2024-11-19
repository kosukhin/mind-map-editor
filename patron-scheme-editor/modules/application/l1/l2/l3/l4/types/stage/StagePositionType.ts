import { GuestObjectType } from 'patron-oop';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';

export interface StagePositionType {
  position(guest: GuestObjectType<PointDocument>): GuestObjectType;
}
