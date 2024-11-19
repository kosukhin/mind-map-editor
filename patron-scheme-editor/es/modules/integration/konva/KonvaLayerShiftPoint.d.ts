import { StagePositionType } from '../../application/l1/l2/l3/l4/types/stage/StagePositionType';
import { GuestObjectType, FactoryType } from 'patron-oop';
import { PointDocument } from '../../application/l1/l2/l3/map/documents/PointDocument';
import { KonvaLayer } from './KonvaLayer';
/**
 * Точка сдвига стейджа, подходит для
 * рассчетов позиций внутри объектов внутри стейджа
 */
export declare class KonvaLayerShiftPoint implements StagePositionType {
    private konvaLayer;
    private factories;
    constructor(konvaLayer: KonvaLayer, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    position(guest: GuestObjectType<PointDocument>): GuestObjectType;
}
