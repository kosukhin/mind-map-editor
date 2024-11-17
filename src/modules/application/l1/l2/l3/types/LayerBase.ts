import { Layer as KonvaLayer } from 'konva/lib/Layer';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { GuestObjectType } from 'patron-oop';

/**
 * Поведение для работы с характеристиками слоя рендеринга
 */
export interface LayerBase extends GuestObjectType<KonvaLayer> {
  layer(guest: GuestObjectType<KonvaLayer>): GuestObjectType<KonvaLayer>;
  position(guest: GuestObjectType<PointDocument>): GuestObjectType<PointDocument>;
}
