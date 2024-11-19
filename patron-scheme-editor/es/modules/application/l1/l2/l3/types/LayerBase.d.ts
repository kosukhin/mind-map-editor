import { Layer as KonvaLayer } from 'konva/lib/Layer';
import { PointDocument } from '../map/documents/PointDocument';
import { GuestObjectType } from 'patron-oop';
/**
 * Поведение для работы с характеристиками слоя рендеринга
 */
export interface LayerBase extends GuestObjectType<KonvaLayer> {
    layer(guest: GuestObjectType<KonvaLayer>): GuestObjectType<KonvaLayer>;
    position(guest: GuestObjectType<PointDocument>): GuestObjectType<PointDocument>;
}
