import { CanvasStructure } from '@/entities/CanvasStructure';
import { BaseResult } from '@/objects/base/BaseResult';
import { Canvas } from '@/objects/canvas/Canvas';
import { Map } from '@/objects/map/Map';

/**
 * Реагируем на изменение Map отрисовкой нового холста
 */
export class CanvasFromMap implements Canvas {
  public constructor(private parent: Canvas, map: Map) {
    map.entity().channel().subscribe({
      notify: (mapValue) => {
        console.log('CanvasFromMap: do something', mapValue);
      },
    });
  }

  public entity(): BaseResult<CanvasStructure> {
    return this.parent.entity();
  }
}
