import { CanvasStructure } from '@/entities/CanvasStructure';
import { BaseResult } from '@/objects/base/BaseResult';
import { Canvas } from '@/objects/canvas/Canvas';

/**
 * Реакция на перетаскивание холста
 */
export class CanvasWhenDrag implements Canvas {
  entity(): BaseResult<CanvasStructure> {
    throw new Error('Method not implemented.');
  }
}
