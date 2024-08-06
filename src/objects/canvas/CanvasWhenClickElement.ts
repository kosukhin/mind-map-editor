import { CanvasStructure } from '@/entities/CanvasStructure';
import { BaseResult } from '@/objects/base/BaseResult';
import { Canvas } from '@/objects/canvas/Canvas';

/**
 * Реакция на клик по элементу на холсте
 */
export class CanvasWhenClickElement implements Canvas {
  public constructor(private parent: Canvas) {
    parent.entity().channel().subscribe({
      notify: (canvasValue) => {
        console.log('CanvasWhenClickElement', canvasValue);
      },
    });
  }

  public entity(): BaseResult<CanvasStructure> {
    return this.entity();
  }
}
