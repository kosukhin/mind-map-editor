import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';

export interface CanvasRectDocument extends PointDocument {
  width: number;
  height: number;
}
