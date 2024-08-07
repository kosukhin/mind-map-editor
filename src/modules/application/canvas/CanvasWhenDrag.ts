import { CanvasStructure } from '@/modules/entities/CanvasStructure';
import { Result } from '@/modules/system/result/Result';
import { Canvas } from '@/modules/application/canvas/Canvas';

/**
 * Реакция на перетаскивание холста
 */
export class CanvasWhenDrag implements Canvas {
  public constructor(private parent: Canvas) {
    parent.value().channel().subscribe({
      notify: (canvasValue) => {
        console.log('CanvasWhenDrag', canvasValue);
      },
    });
  }

  public value(): Result<CanvasStructure> {
    return this.value();
  }
}
