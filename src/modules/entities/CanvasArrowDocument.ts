import { MapTypeDocument } from '@/modules/entities/MapStructures';
import { PointDocument } from '@/modules/entities/PointDocument';

export interface CanvasArrowDocument {
  fromPoint: PointDocument,
  toPoint: PointDocument,
  label: string,
  beginMapType?: MapTypeDocument,
  endMapType?: MapTypeDocument,
}
