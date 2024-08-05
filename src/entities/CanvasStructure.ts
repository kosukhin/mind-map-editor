import { CanvasArrowStructure } from '@/entities/CanvasArrowStructure';
import { CanvasRectStructure } from '@/entities/CanvasRectStructure';

export interface CanvasStructure {
  element: HTMLElement,
  arrows: CanvasArrowStructure[],
  rects: CanvasRectStructure[],
}
