import { Layer as KonvaLayer } from 'konva/lib/Layer';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { GuestType } from '@/modules/system/guest/GuestType';

/**
 * Поведение для работы с характеристиками слоя рендеринга
 */
export interface LayerBase extends GuestType<KonvaLayer> {
  layer(guest: GuestType<KonvaLayer>): GuestType<KonvaLayer>;
  size(guest: GuestType<SizeDocument>): GuestType<SizeDocument>;
  position(guest: GuestType<PointDocument>): GuestType<PointDocument>;
}
