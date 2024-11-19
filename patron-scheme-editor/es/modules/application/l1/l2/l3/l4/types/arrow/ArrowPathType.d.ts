import { SizeDocument } from '../../../map/documents/SizeDocument';
import { PointDocument } from '../../../map/documents/PointDocument';
import { GuestObjectType } from 'patron-oop';
export type ArrowPointDocument = {
    shapeGeometry: SizeDocument;
    shapePosition: PointDocument;
    lookToGeometry: SizeDocument;
    lookToPosition: PointDocument;
};
export interface ArrowPathType {
    breakPoints(fromPoint: ArrowPointDocument, toPoint: ArrowPointDocument, pointsGuest: GuestObjectType<number[]>): this;
    clear(): void;
}
