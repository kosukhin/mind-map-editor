import { CanvasStructure } from '@/entities/CanvasStructure';
import { BaseResult } from '@/objects/base/BaseResult';
import { Canvas } from '@/objects/canvas/Canvas';

/**
 * Реакция на перетаскивание элемента на холсте
 */
export class CanvasWhenDragElement implements Canvas {
  public constructor(private parent: Canvas) {
    parent.entity().channel().subscribe({
      notify: (canvasValue) => {
        console.log('CanvasWhenDragElement', canvasValue);
      },
    });
  }

  public entity(): BaseResult<CanvasStructure> {
    return this.entity();
  }
}
