import { PointDocument } from '@/modules/entities/PointDocument';

export interface CanvasRectDocument extends PointDocument {
  width: number;
  height: number;
}
