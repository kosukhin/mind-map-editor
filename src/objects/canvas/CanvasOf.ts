import { CanvasStructure } from '@/entities/CanvasStructure';
import { BaseChannel } from '@/objects/base/BaseChannel';
import { Canvas } from '@/objects/canvas/Canvas';

/**
 * Конвертация структуры данных холста в объект
 */
export class CanvasOf implements Canvas {
  channel(): BaseChannel<CanvasStructure> {
    throw new Error('Method not implemented.');
  }

  entity(): CanvasStructure {
    throw new Error('Method not implemented.');
  }
}
