import { CanvasArrowDocument } from '@/modules/entities/CanvasArrowDocument';
import { CanvasRectDocument } from '@/modules/entities/CanvasRectDocument';

export interface CanvasDocument {
  element: HTMLElement,
  arrows: CanvasArrowDocument[],
  rects: CanvasRectDocument[],
}
