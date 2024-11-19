import { PointDocument } from '../../../application/l1/l2/l3/map/documents/PointDocument';
import { LayerBase } from '../../../application/l1/l2/l3/types/LayerBase';
import { FactoryType, GuestAwareType, GuestObjectType, PoolType } from 'patron-oop';
/**
 * Позиция курсора внутри стейджа, будто курсор это
 * часть стеджа. Для упрощения расчетов
 */
export declare class Cursor implements GuestAwareType<PointDocument> {
    private cursorPool;
    constructor(konvaLayer: LayerBase, factories: {
        pool: FactoryType<PoolType>;
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
    });
    value(guest: GuestObjectType<PointDocument>): this;
}
