import { MapObjectDocument } from '../../l3/map/documents/MapStructures';
import { GuestAwareType, FactoryType, SourceType, GuestObjectType } from 'patron-oop';
import { PointDocument } from '../../l3/map/documents/PointDocument';
import { LayerBase } from '../../l3/types/LayerBase';
import { ArrowPathType } from '../../l3/l4/types/arrow/ArrowPathType';
/**
 * Новая стрелка, появляется при создании новой связи
 */
export declare class NewArrow {
    private konvaLayer;
    private cursorPosition;
    private arrowPath;
    private factories;
    private cursorGuest;
    private arrowCache;
    constructor(konvaLayer: LayerBase, cursorPosition: GuestAwareType<PointDocument>, arrowPath: ArrowPathType, factories: {
        sourceEmpty: FactoryType<SourceType>;
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
    });
    /**
     * Создать новую стрелку для объекта
     */
    forObject(object: MapObjectDocument): void;
    /**
     * Отмена стрелки
     */
    dispose(): void;
}
