import { CanvasArrowDocument } from '@/modules/application/l1/l2/l3/map/documents/CanvasArrowDocument';
import { CanvasRectDocument } from '@/modules/application/l1/l2/l3/map/documents/CanvasRectDocument';

export interface CanvasDocument {
  element: HTMLElement,
  arrows: CanvasArrowDocument[],
  rects: CanvasRectDocument[],
}
