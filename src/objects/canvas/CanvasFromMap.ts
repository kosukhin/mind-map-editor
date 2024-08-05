import { CanvasStructure } from '@/entities/CanvasStructure';
import { BaseChannel } from '@/objects/base/BaseChannel';
import { Canvas } from '@/objects/canvas/Canvas';

/**
 * Реагируем на изменение Map отрисовкой нового холста
 */
export class CanvasFromMap implements Canvas {
  channel(): BaseChannel<CanvasStructure> {
    throw new Error('Method not implemented.');
  }

  entity(): CanvasStructure {
    throw new Error('Method not implemented.');
  }
}
