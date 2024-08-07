import { CanvasStructure } from '@/modules/entities/CanvasStructure';
import { Result } from '@/modules/system/result/Result';
import { Canvas } from '@/modules/application/canvas/Canvas';

/**
 * Реакция на клик по элементу на холсте
 */
export class CanvasWhenClickElement implements Canvas {
  public constructor(private parent: Canvas) {
    parent.value().channel().subscribe({
      notify: (canvasValue) => {
        console.log('CanvasWhenClickElement', canvasValue);
      },
    });
  }

  public value(): Result<CanvasStructure> {
    return this.parent.value();
  }
}
