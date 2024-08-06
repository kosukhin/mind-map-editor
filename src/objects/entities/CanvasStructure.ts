import { CanvasArrowStructure } from '@/objects/entities/CanvasArrowStructure';
import { CanvasRectStructure } from '@/objects/entities/CanvasRectStructure';

export interface CanvasStructure {
  element: HTMLElement,
  arrows: CanvasArrowStructure[],
  rects: CanvasRectStructure[],
}
