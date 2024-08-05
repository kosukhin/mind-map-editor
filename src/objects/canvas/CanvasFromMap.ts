import { CanvasStructure } from '@/entities/CanvasStructure';
import { BaseResult } from '@/objects/base/BaseResult';
import { Canvas } from '@/objects/canvas/Canvas';

/**
 * Реагируем на изменение Map отрисовкой нового холста
 */
export class CanvasFromMap implements Canvas {
  public constructor(private parent: Canvas) {
    parent.entity().channel().subscribe({
      notify: (canvasValue) => {
        console.log('CanvasFromMap: do something', canvasValue);
      },
    });
  }

  entity(): BaseResult<CanvasStructure> {
    return this.parent.entity();
  }
}
