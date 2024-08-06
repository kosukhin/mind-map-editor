import { CanvasStructure } from '@/objects/entities/CanvasStructure';
import { Result } from '@/objects/system/result/Result';
import { Canvas } from '@/objects/application/canvas/Canvas';

/**
 * Реакция на перетаскивание элемента на холсте
 */
export class CanvasWhenDragElement implements Canvas {
  public constructor(private parent: Canvas) {
    parent.value().channel().subscribe({
      notify: (canvasValue) => {
        console.log('CanvasWhenDragElement', canvasValue);
      },
    });
  }

  public value(): Result<CanvasStructure> {
    return this.value();
  }
}
