import { GuestObjectType } from 'patron-oop';
import { PointDocument } from '../../../map/documents/PointDocument';
export interface StagePositionType {
    position(guest: GuestObjectType<PointDocument>): GuestObjectType;
}
