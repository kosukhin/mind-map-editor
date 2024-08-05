import { CanvasStructure } from '@/entities/CanvasStructure';
import { BaseChannel } from '@/objects/base/BaseChannel';
import { Canvas } from '@/objects/canvas/Canvas';

/**
 * Реакция на перетаскивание элемента на холсте
 */
export class CanvasWhenDragElement implements Canvas {
  channel(): BaseChannel<CanvasStructure> {
    throw new Error('Method not implemented.');
  }

  entity(): CanvasStructure {
    throw new Error('Method not implemented.');
  }
}
