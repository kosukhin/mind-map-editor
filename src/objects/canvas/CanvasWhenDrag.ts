import { CanvasStructure } from '@/entities/CanvasStructure';
import { BaseResult } from '@/objects/base/BaseResult';
import { Canvas } from '@/objects/canvas/Canvas';

/**
 * Реакция на перетаскивание холста
 */
export class CanvasWhenDrag implements Canvas {
  public constructor(private parent: Canvas) {
    parent.entity().channel().subscribe({
      notify: (canvasValue) => {
        console.log('CanvasWhenDrag', canvasValue);
      },
    });
  }

  public entity(): BaseResult<CanvasStructure> {
    return this.entity();
  }
}
