import { MapTypeDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';

export interface CanvasArrowDocument {
  fromPoint: PointDocument,
  toPoint: PointDocument,
  label: string,
  beginMapType?: MapTypeDocument,
  endMapType?: MapTypeDocument,
}
