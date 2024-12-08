import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { GuestObjectType } from 'patron-oop';
import { KonvaLayer } from '@/modules/integration/konva/KonvaTypes';

/**
 * Поведение для работы с характеристиками слоя рендеринга
 */
export interface LayerBase extends GuestObjectType<KonvaLayer> {
  layer(guest: GuestObjectType<KonvaLayer>): GuestObjectType<KonvaLayer>;
  position(guest: GuestObjectType<PointDocument>): GuestObjectType<PointDocument>;
}
