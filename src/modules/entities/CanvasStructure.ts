import { CanvasArrowStructure } from '@/modules/entities/CanvasArrowStructure';
import { CanvasRectStructure } from '@/modules/entities/CanvasRectStructure';

export interface CanvasStructure {
  element: HTMLElement,
  arrows: CanvasArrowStructure[],
  rects: CanvasRectStructure[],
}
