import { ArrowPathType, ArrowPointDocument } from '../../l3/l4/types/arrow/ArrowPathType';
import { GuestObjectType } from 'patron-oop';
/**
 * Путь между двумя объектами
 */
export declare class ArrowPath implements ArrowPathType {
    private filledPoints;
    clear(): void;
    breakPoints(fromPoint: ArrowPointDocument, toPoint: ArrowPointDocument, pointsGuest: GuestObjectType<number[]>): this;
    private arrowPointPosition;
}
