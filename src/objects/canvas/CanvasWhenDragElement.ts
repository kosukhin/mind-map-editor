import { CanvasStructure } from '@/entities/CanvasStructure';
import { BaseResult } from '@/objects/base/BaseResult';
import { Canvas } from '@/objects/canvas/Canvas';

/**
 * Реакция на перетаскивание элемента на холсте
 */
export class CanvasWhenDragElement implements Canvas {
  entity(): BaseResult<CanvasStructure> {
    throw new Error('Method not implemented.');
  }
}
