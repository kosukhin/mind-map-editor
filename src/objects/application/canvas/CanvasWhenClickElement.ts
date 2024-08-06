import { CanvasStructure } from '@/objects/entities/CanvasStructure';
import { Result } from '@/objects/system/result/Result';
import { Canvas } from '@/objects/application/canvas/Canvas';

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
    return this.value();
  }
}
