import { CanvasStructure } from '@/objects/entities/CanvasStructure';
import { Result } from '@/objects/system/result/Result';
import { Canvas } from '@/objects/application/canvas/Canvas';

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
